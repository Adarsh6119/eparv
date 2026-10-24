import type { Endpoint, PayloadRequest, Where } from 'payload'

import { isAdminOrEditor, isAdminOrSales } from '@/access/roles'
import type { ImportBatch, Page } from '@/payload-types'
import {
  CSV_MAX_FILE_SIZE_BYTES,
  CSV_MAX_ROWS,
  buildCsvTemplate,
  parseAndValidateCsv,
  plainTextToLexical,
  type ParsedImport,
  type ParsedRow,
} from '@/services/csvImport'
import { checkRateLimit } from '@/services/rateLimiter'

const json = (data: unknown, status = 200): Response =>
  Response.json(data, {
    status,
    headers: { 'cache-control': 'no-store' },
  })

const forbidden = (): Response =>
  json({ error: 'You do not have permission to manage CSV imports.' }, 403)

/** Maximum number of CSV uploads per user per hour. */
const UPLOAD_HOURLY_LIMIT = 10

const serializeBatch = (batch: ImportBatch) => ({
  id: batch.id,
  filename: batch.filename,
  status: batch.status,
  rowCount: batch.rowCount,
  validRowCount: batch.validRowCount,
  errorRowCount: batch.errorRowCount,
  createdAt: batch.createdAt,
})

type ImportRecord = {
  rows?: ParsedRow[]
  fileIssues?: ParsedImport['fileIssues']
}

/**
 * POST /api/imports/upload
 * Accepts multipart/form-data with a `file` field. Validates the file and
 * every row, stores the batch with its preview, and returns the preview —
 * nothing is imported yet.
 */
const uploadImport: Endpoint['handler'] = async (req: PayloadRequest) => {
  const user = req.user
  const payload = req.payload
  if (!user || !payload || !isAdminOrEditor(user)) {
    return forbidden()
  }

  if (!checkRateLimit(`import-upload:${user.id}`, UPLOAD_HOURLY_LIMIT, 3_600_000)) {
    return json(
      { error: `Upload limit reached (${UPLOAD_HOURLY_LIMIT} files per hour). Try again later.` },
      429,
    )
  }

  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.includes('multipart/form-data')) {
    return json({ error: 'Expected a multipart/form-data upload with a "file" field.' }, 400)
  }

  let form: FormData
  try {
    if (!req.formData) {
      return json({ error: 'This server cannot process file uploads.' }, 500)
    }
    form = await req.formData()
  } catch {
    return json({ error: 'Could not read the uploaded form data.' }, 400)
  }

  const file = form.get('file')
  if (!(file instanceof File)) {
    return json({ error: 'No file provided. Attach the CSV as the "file" field.' }, 400)
  }

  if (!file.name.toLowerCase().endsWith('.csv')) {
    return json({ error: 'Only .csv files are accepted.' }, 400)
  }

  if (file.size === 0) {
    return json({ error: 'The file is empty.' }, 400)
  }

  if (file.size > CSV_MAX_FILE_SIZE_BYTES) {
    return json(
      { error: `The file is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.` },
      413,
    )
  }

  const text = await file.text()

  let parsed: ParsedImport
  try {
    parsed = await parseAndValidateCsv(text, payload)
  } catch (error) {
    payload.logger.error({ err: error, msg: 'CSV parse failure' })
    return json({ error: 'The file could not be parsed as CSV. Check for unclosed quotes.' }, 400)
  }

  const hasFileErrors = parsed.fileIssues.some((issue) => issue.severity === 'error')

  const batch = await payload.create({
    collection: 'import-batches',
    overrideAccess: true,
    data: {
      filename: file.name.slice(0, 200),
      uploadedBy: user.id,
      status: hasFileErrors || parsed.errorRowCount === parsed.rows.length ? 'failed' : 'validated',
      rowCount: parsed.rows.length,
      validRowCount: parsed.validRowCount,
      errorRowCount: parsed.errorRowCount,
      records: {
        rows: parsed.rows,
        fileIssues: parsed.fileIssues,
      } satisfies ImportRecord,
      events: [
        {
          at: new Date().toISOString(),
          actor: user.id,
          action: 'uploaded',
          detail: `${parsed.rows.length} rows, ${parsed.validRowCount} valid, ${parsed.errorRowCount} with errors, file size ${(file.size / 1024).toFixed(1)} KB`,
        },
      ],
    },
  })

  return json({
    batch: serializeBatch(batch),
    rows: parsed.rows,
    fileIssues: parsed.fileIssues,
    limits: { maxRows: CSV_MAX_ROWS, maxFileSizeBytes: CSV_MAX_FILE_SIZE_BYTES },
  })
}

/**
 * POST /api/imports/:id/import
 * Imports all valid rows from a validated batch as draft pages. Published
 * pages with the same slug are never touched; existing drafts are updated
 * (safe upsert). Each page is created with approvalStatus "pending".
 */
const runImport: Endpoint['handler'] = async (req: PayloadRequest) => {
  const user = req.user
  const payload = req.payload
  if (!user || !payload || !isAdminOrEditor(user)) {
    return forbidden()
  }

  const id = req.routeParams?.id
  if (!id) {
    return json({ error: 'Missing batch id.' }, 400)
  }

  const batch = await payload.findByID({
    collection: 'import-batches',
    id: id as string,
    overrideAccess: true,
  })

  if (batch.status !== 'validated') {
    return json(
      { error: `This batch is "${batch.status}" — only validated batches can be imported.` },
      409,
    )
  }

  const records = (batch.records ?? {}) as ImportRecord
  const rows = records.rows ?? []

  let createdCount = 0
  let updatedCount = 0
  let skippedCount = 0
  let invalidCount = 0
  let failedCount = 0

  const createdPageIds: number[] = []
  const failures: { row: number; slug: string; error: string }[] = []

  for (const row of rows) {
    const hasErrors = row.issues.some((issue) => issue.severity === 'error')
    if (hasErrors) {
      invalidCount++
      continue
    }

    // Resolve related product (validated earlier, re-checked defensively).
    let relatedProductId: number | undefined
    if (row.productSlug) {
      const product = await payload.find({
        collection: 'products',
        where: { slug: { equals: row.productSlug } },
        limit: 1,
        pagination: false,
        overrideAccess: true,
        draft: true,
      })
      if (product.docs.length === 0) {
        failedCount++
        failures.push({
          row: row.rowNumber,
          slug: row.slug,
          error: `Product ${row.productSlug} no longer exists`,
        })
        continue
      }
      relatedProductId = product.docs[0].id
    }

    const pageData = {
      title: row.pageTitle,
      slug: row.slug,
      pageType: (row.pageType || 'standard') as Page['pageType'],
      city: row.city || undefined,
      state: row.state || undefined,
      relatedProducts: relatedProductId ? [relatedProductId] : undefined,
      layout: [
        {
          blockType: 'content' as const,
          columns: [
            {
              size: 'full' as const,
              richText: plainTextToLexical(row.content),
            },
          ],
        },
      ],
      meta: {
        title: row.metaTitle || row.pageTitle,
        description: row.metaDescription || undefined,
        canonicalUrl: row.canonicalUrl || undefined,
      },
      approvalStatus: 'pending' as const,
      importBatch: batch.id,
      _status: 'draft' as const,
    }

    try {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: row.slug } },
        limit: 1,
        pagination: false,
        overrideAccess: true,
        draft: true,
      })

      if (existing.docs.length > 0) {
        const existingDoc = existing.docs[0]
        if (existingDoc._status === 'published') {
          // Never overwrite live content from an import.
          skippedCount++
          continue
        }

        await payload.update({
          collection: 'pages',
          id: existingDoc.id,
          draft: true,
          overrideAccess: true,
          data: pageData,
        })
        updatedCount++
        createdPageIds.push(existingDoc.id)
      } else {
        const created = await payload.create({
          collection: 'pages',
          draft: true,
          overrideAccess: true,
          data: pageData,
        })
        createdCount++
        createdPageIds.push(created.id)
      }
    } catch (error) {
      failedCount++
      failures.push({
        row: row.rowNumber,
        slug: row.slug,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      payload.logger.error({ err: error, msg: `Import row failed: ${row.slug}` })
    }
  }

  const status = createdCount + updatedCount > 0 ? 'imported' : 'failed'

  const updatedBatch = await payload.update({
    collection: 'import-batches',
    id: batch.id,
    overrideAccess: true,
    data: {
      status,
      createdPages: createdPageIds,
      report: {
        createdCount,
        updatedCount,
        skippedCount,
        invalidCount,
        failedCount,
      },
      events: [
        ...(batch.events ?? []),
        {
          at: new Date().toISOString(),
          actor: user.id,
          action: 'imported',
          detail: `created ${createdCount}, updated ${updatedCount}, skipped published ${skippedCount}, invalid ${invalidCount}, failed ${failedCount}`,
        },
      ],
    },
  })

  return json({
    batch: serializeBatch(updatedBatch),
    report: { createdCount, updatedCount, skippedCount, invalidCount, failedCount },
    failures,
    reviewUrl: `/admin/collections/pages?where%5BimportBatch%5D%5Bequals%5D=${batch.id}`,
  })
}

/**
 * GET /api/imports/:id/report
 * Live import report — recomputes the draft/published split for the pages
 * created by this batch so the published count reflects approvals that
 * happened after the import ran.
 */
const importReport: Endpoint['handler'] = async (req: PayloadRequest) => {
  const payload = req.payload
  if (!payload || !isAdminOrEditor(req.user)) {
    return forbidden()
  }

  const id = req.routeParams?.id
  if (!id) {
    return json({ error: 'Missing batch id.' }, 400)
  }

  const batch = await payload.findByID({
    collection: 'import-batches',
    id: id as string,
    overrideAccess: true,
  })

  const pages = await payload.find({
    collection: 'pages',
    where: { importBatch: { equals: batch.id } },
    limit: CSV_MAX_ROWS,
    pagination: false,
    overrideAccess: true,
    draft: true,
    select: {
      _status: true,
      approvalStatus: true,
    },
  })

  const live = {
    total: pages.docs.length,
    draft: pages.docs.filter((page) => page._status === 'draft').length,
    published: pages.docs.filter((page) => page._status === 'published').length,
    pendingApproval: pages.docs.filter(
      (page) => page._status === 'draft' && page.approvalStatus === 'pending',
    ).length,
  }

  return json({ batch: serializeBatch(batch), live })
}

/**
 * GET /api/imports/template
 * Downloadable CSV template.
 */
const importTemplate: Endpoint['handler'] = async () => {
  return new Response(buildCsvTemplate(), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="eparv-page-import-template.csv"',
      'cache-control': 'no-store',
    },
  })
}

/**
 * GET /api/leads/export
 * CSV export of leads for admin/sales. Supports status, type, assignee and
 * date-range filters. Capped at 10,000 rows per export.
 */
const exportLeads: Endpoint['handler'] = async (req: PayloadRequest) => {
  const payload = req.payload
  if (!payload || !isAdminOrSales(req.user)) {
    return json({ error: 'You do not have permission to export leads.' }, 403)
  }

  const url = new URL(req.url ?? 'http://localhost')

  const conditions: Where[] = []
  const status = url.searchParams.get('status')
  if (status) {
    conditions.push({ status: { equals: status } })
  }
  const leadType = url.searchParams.get('leadType')
  if (leadType) {
    conditions.push({ leadType: { equals: leadType } })
  }
  const assignedTo = url.searchParams.get('assignedTo')
  if (assignedTo) {
    conditions.push({ assignedTo: { equals: assignedTo } })
  }
  const createdAfter = url.searchParams.get('createdAfter')
  const createdBefore = url.searchParams.get('createdBefore')
  if (createdAfter) {
    conditions.push({ createdAt: { greater_than: createdAfter } })
  }
  if (createdBefore) {
    conditions.push({ createdAt: { less_than: createdBefore } })
  }

  const leads = await payload.find({
    collection: 'leads',
    where: conditions.length > 0 ? { and: conditions } : undefined,
    sort: '-createdAt',
    limit: 10_000,
    pagination: false,
    overrideAccess: true,
    depth: 1,
  })

  const rows = leads.docs.map((lead) => ({
    leadId: lead.leadId,
    createdAt: lead.createdAt,
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? '',
    leadType: lead.leadType,
    city: lead.city,
    state: lead.state ?? '',
    product: typeof lead.product === 'object' && lead.product ? lead.product.name : '',
    organization: lead.organization ?? '',
    quantity: lead.quantity ?? '',
    status: lead.status,
    assignedTo: typeof lead.assignedTo === 'object' && lead.assignedTo ? lead.assignedTo.name : '',
    nextFollowUpDate: lead.nextFollowUpDate ?? '',
    sourceUrl: lead.source?.sourceUrl ?? '',
    utmSource: lead.source?.utmSource ?? '',
    utmMedium: lead.source?.utmMedium ?? '',
    utmCampaign: lead.source?.utmCampaign ?? '',
    message: (lead.message ?? '').replace(/\s+/g, ' '),
  }))

  // Build CSV without an extra dependency: values are escaped per RFC 4180.
  const headers = Object.keys(rows[0] ?? { leadId: '' })
  const escape = (value: unknown) => {
    const str = String(value ?? '')
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
  }
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => escape((row as Record<string, unknown>)[header])).join(',')),
  ].join('\n')

  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="eparv-leads-export-${new Date().toISOString().slice(0, 10)}.csv"`,
      'cache-control': 'no-store',
    },
  })
}

export const importEndpoints: Endpoint[] = [
  {
    path: '/imports/upload',
    method: 'post',
    handler: uploadImport,
  },
  {
    path: '/imports/:id/import',
    method: 'post',
    handler: runImport,
  },
  {
    path: '/imports/:id/report',
    method: 'get',
    handler: importReport,
  },
  {
    path: '/imports/template',
    method: 'get',
    handler: importTemplate,
  },
  {
    path: '/leads/export',
    method: 'get',
    handler: exportLeads,
  },
]
