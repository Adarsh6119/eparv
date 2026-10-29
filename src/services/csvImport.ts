import Papa from 'papaparse'

import type { Payload } from 'payload'

import type { ContentBlock } from '@/payload-types'
import { isRegistrySlug } from '@/cities'
import { isValidSlugFormat, isReservedSlug } from '@/utilities/reservedSlugs'

/** The JSON shape Payload expects in a richText field (from the generated Content block type). */
type RichTextData = NonNullable<NonNullable<ContentBlock['columns']>[number]['richText']>

/**
 * CSV bulk page import: shared constants, parsing and row-level validation.
 *
 * All imported content is treated as untrusted: values are length-capped,
 * control characters stripped, and plain text is converted into structured
 * Lexical nodes (never raw HTML). Imported pages are always created as
 * drafts with approvalStatus "pending" — publishing requires explicit
 * approval through the admin workflow.
 */

export const CSV_TEMPLATE_HEADERS = [
  'slug',
  'pageTitle',
  'pageType',
  'city',
  'state',
  'productSlug',
  'content',
  'metaTitle',
  'metaDescription',
  'canonicalUrl',
  'status',
] as const

export const CSV_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
export const CSV_MAX_ROWS = 500
export const CSV_MAX_CELL_LENGTH = 20_000

export const VALID_PAGE_TYPES = ['standard', 'city', 'state', 'legal', 'landing'] as const
type PageType = (typeof VALID_PAGE_TYPES)[number]

export type RowIssue = {
  severity: 'error' | 'warning'
  field?: string
  message: string
}

export type ParsedRow = {
  rowNumber: number
  slug: string
  pageTitle: string
  pageType: string
  city: string
  state: string
  productSlug: string
  content: string
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  status: string
  issues: RowIssue[]
}

export type ParsedImport = {
  rows: ParsedRow[]
  fileIssues: RowIssue[]
  validRowCount: number
  errorRowCount: number
}

const stripUnsafe = (value: string): string =>
  value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, CSV_MAX_CELL_LENGTH)

const parseCsv = (text: string): { headers: string[]; rows: Record<string, string>[] } => {
  const cleaned = text.replace(/^\uFEFF/, '')

  const result = Papa.parse<Record<string, string>>(cleaned, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (header: string) => header.trim(),
  })

  const headers = (result.meta.fields ?? []) as string[]

  // Rows papaparse could not parse at all become empty entries; keep going —
  // unparseable content surfaces as per-row errors rather than a crash.
  const rows = (result.data ?? []).filter((row) => row && typeof row === 'object')

  return { headers, rows }
}

const checkCanonicalUrl = (value: string): boolean => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Converts plain text (paragraphs separated by blank lines, optional "## "
 * headings) into serialized Lexical nodes matching the editor's expected
 * shape. Imported content becomes structured nodes — never raw HTML — which
 * sanitizes it by construction.
 */
export const plainTextToLexical = (text: string): RichTextData => {
  const blocks = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  const textNode = (value: string) => ({
    type: 'text' as const,
    detail: 0,
    format: 0,
    mode: 'normal' as const,
    style: '',
    text: value,
    version: 1,
  })

  const children = blocks.map((block) => {
    if (block.startsWith('## ')) {
      return {
        type: 'heading' as const,
        children: [textNode(block.slice(3).trim())],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        tag: 'h2' as const,
        version: 1,
      }
    }
    return {
      type: 'paragraph' as const,
      children: [textNode(block)],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    }
  })

  return {
    root: {
      type: 'root' as const,
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Parses and validates a CSV file body. Queries the database once for
 * existing page slugs and product slugs so validation is accurate without
 * per-row queries.
 */
export const parseAndValidateCsv = async (
  text: string,
  payload: Payload,
): Promise<ParsedImport> => {
  const fileIssues: RowIssue[] = []
  const { headers, rows } = parseCsv(text)

  // ── File-level validation ────────────────────────────────────────────────
  const missingHeaders = CSV_TEMPLATE_HEADERS.filter((header) => !headers.includes(header))
  if (missingHeaders.length > 0) {
    fileIssues.push({
      severity: 'error',
      message: `Missing required column(s): ${missingHeaders.join(', ')}. Download the template for the expected format.`,
    })
  }

  const unknownHeaders = headers.filter((header) => !CSV_TEMPLATE_HEADERS.includes(header as never))
  if (unknownHeaders.length > 0) {
    fileIssues.push({
      severity: 'warning',
      message: `Ignoring unknown column(s): ${unknownHeaders.join(', ')}.`,
    })
  }

  if (rows.length === 0) {
    fileIssues.push({ severity: 'error', message: 'The file contains no data rows.' })
  }

  if (rows.length > CSV_MAX_ROWS) {
    fileIssues.push({
      severity: 'error',
      message: `The file contains ${rows.length} rows. Maximum is ${CSV_MAX_ROWS} rows per import — split the file into several imports.`,
    })
  }

  if (fileIssues.some((issue) => issue.severity === 'error')) {
    return { rows: [], fileIssues, validRowCount: 0, errorRowCount: 0 }
  }

  // ── Bulk existence lookups ───────────────────────────────────────────────
  const allSlugs = rows
    .map((row) => String(row.slug ?? '').trim().toLowerCase())
    .filter((slug) => isValidSlugFormat(slug))

  const existingPages = new Map<string, { id: number | string; status: string }>()
  if (allSlugs.length > 0) {
    const found = await payload.find({
      collection: 'pages',
      where: { slug: { in: allSlugs } },
      limit: allSlugs.length,
      pagination: false,
      overrideAccess: true,
      draft: true,
      select: { slug: true, _status: true },
    })
    for (const doc of found.docs) {
      existingPages.set(doc.slug, { id: doc.id, status: doc._status ?? 'draft' })
    }
  }

  const productSlugs = Array.from(
    new Set(
      rows
        .map((row) => String(row.productSlug ?? '').trim())
        .filter((slug) => slug.length > 0),
    ),
  )

  const existingProducts = new Set<string>()
  if (productSlugs.length > 0) {
    const found = await payload.find({
      collection: 'products',
      where: { slug: { in: productSlugs } },
      limit: productSlugs.length,
      pagination: false,
      overrideAccess: true,
      draft: true,
      select: { slug: true },
    })
    for (const doc of found.docs) {
      existingProducts.add(doc.slug)
    }
  }

  // ── Row-level validation ─────────────────────────────────────────────────
  const seenSlugs = new Set<string>()
  const parsedRows: ParsedRow[] = rows.map((raw, index) => {
    const row: ParsedRow = {
      rowNumber: index + 2, // +2: header row + 1-based index
      slug: stripUnsafe(String(raw.slug ?? '')).trim().toLowerCase(),
      pageTitle: stripUnsafe(String(raw.pageTitle ?? '')).trim(),
      pageType: stripUnsafe(String(raw.pageType ?? '')).trim().toLowerCase(),
      city: stripUnsafe(String(raw.city ?? '')).trim(),
      state: stripUnsafe(String(raw.state ?? '')).trim(),
      productSlug: stripUnsafe(String(raw.productSlug ?? '')).trim(),
      content: stripUnsafe(String(raw.content ?? '')).trim(),
      metaTitle: stripUnsafe(String(raw.metaTitle ?? '')).trim(),
      metaDescription: stripUnsafe(String(raw.metaDescription ?? '')).trim(),
      canonicalUrl: stripUnsafe(String(raw.canonicalUrl ?? '')).trim(),
      status: stripUnsafe(String(raw.status ?? '')).trim().toLowerCase(),
      issues: [],
    }

    const issues = row.issues

    // slug
    if (!row.slug) {
      issues.push({ severity: 'error', field: 'slug', message: 'Slug is required.' })
    } else if (!isValidSlugFormat(row.slug)) {
      issues.push({
        severity: 'error',
        field: 'slug',
        message: 'Slug may only contain lowercase letters, numbers and single hyphens.',
      })
    } else if (isReservedSlug(row.slug)) {
      issues.push({
        severity: 'error',
        field: 'slug',
        message: `"${row.slug}" is a reserved application route.`,
      })
    } else if (isRegistrySlug(row.slug)) {
      issues.push({
        severity: 'error',
        field: 'slug',
        message: `"${row.slug}" is served by the built-in city page template (src/cities) — add or edit the city there instead.`,
      })
    } else if (seenSlugs.has(row.slug)) {
      issues.push({
        severity: 'error',
        field: 'slug',
        message: `Duplicate slug within this file (first used on an earlier row).`,
      })
    } else {
      seenSlugs.add(row.slug)
      const existing = existingPages.get(row.slug)
      if (existing?.status === 'published') {
        issues.push({
          severity: 'warning',
          field: 'slug',
          message:
            'A published page already uses this slug — the row will be SKIPPED to protect live content. Edit that page manually instead.',
        })
      } else if (existing) {
        issues.push({
          severity: 'warning',
          field: 'slug',
          message: 'A draft page already uses this slug — it will be UPDATED by this import (safe upsert).',
        })
      }
    }

    // pageTitle
    if (!row.pageTitle) {
      issues.push({ severity: 'error', field: 'pageTitle', message: 'pageTitle is required.' })
    } else if (row.pageTitle.length > 200) {
      issues.push({ severity: 'error', field: 'pageTitle', message: 'pageTitle must be under 200 characters.' })
    }

    // pageType
    if (row.pageType && !VALID_PAGE_TYPES.includes(row.pageType as PageType)) {
      issues.push({
        severity: 'error',
        field: 'pageType',
        message: `pageType must be one of: ${VALID_PAGE_TYPES.join(', ')}.`,
      })
    }
    const effectiveType = (row.pageType || 'standard') as PageType

    // location requirements
    if (effectiveType === 'city' && !row.city) {
      issues.push({ severity: 'error', field: 'city', message: 'City pages require the city column.' })
    }
    if (effectiveType === 'state' && !row.state) {
      issues.push({ severity: 'error', field: 'state', message: 'State pages require the state column.' })
    }

    // productSlug
    if (row.productSlug && !existingProducts.has(row.productSlug)) {
      issues.push({
        severity: 'error',
        field: 'productSlug',
        message: `No product exists with slug "${row.productSlug}".`,
      })
    }

    // content
    if (!row.content) {
      issues.push({ severity: 'error', field: 'content', message: 'content is required.' })
    } else if (row.content.length < 80) {
      issues.push({
        severity: 'error',
        field: 'content',
        message: 'content is too thin (minimum 80 characters — location pages must be genuinely useful).',
      })
    } else if (row.content.length < 200) {
      issues.push({
        severity: 'warning',
        field: 'content',
        message: 'content is short — consider expanding before publishing.',
      })
    }

    // meta
    if (row.metaTitle.length > 60) {
      issues.push({
        severity: 'warning',
        field: 'metaTitle',
        message: `metaTitle is ${row.metaTitle.length} characters — search engines truncate around 60.`,
      })
    }
    if (row.metaDescription.length > 160) {
      issues.push({
        severity: 'warning',
        field: 'metaDescription',
        message: `metaDescription is ${row.metaDescription.length} characters — search engines truncate around 160.`,
      })
    }

    // canonicalUrl
    if (row.canonicalUrl && !checkCanonicalUrl(row.canonicalUrl)) {
      issues.push({
        severity: 'error',
        field: 'canonicalUrl',
        message: 'canonicalUrl must be an absolute URL starting with http:// or https://',
      })
    }

    // status — imports always create drafts
    if (row.status && row.status !== 'draft') {
      issues.push({
        severity: 'error',
        field: 'status',
        message: `status must be "draft" — imported pages are never published automatically.`,
      })
    }

    return row
  })

  const errorRowCount = parsedRows.filter((row) =>
    row.issues.some((issue) => issue.severity === 'error'),
  ).length

  return {
    rows: parsedRows,
    fileIssues,
    validRowCount: parsedRows.length - errorRowCount,
    errorRowCount,
  }
}

/** The downloadable CSV template with two example rows. */
export const buildCsvTemplate = (): string => {
  const example1 = [
    'electric-cycle-in-mumbai',
    'Electric Cycles in Mumbai',
    'city',
    'Mumbai',
    'Maharashtra',
    '',
    '## Riding an electric cycle in Mumbai\n\nMumbai riders face stop-and-go traffic, monsoon roads and rising fuel costs. An electric cycle keeps daily commutes affordable and parking effortless.\n\nThis page is maintained by the Eparv team. Contact us for test rides and delivery availability in your area.',
    'Electric Cycles in Mumbai | Eparv',
    'Explore Eparv electric cycles available in Mumbai — test rides, dealer information and delivery availability.',
    '',
    'draft',
  ]

  const example2 = [
    'electric-cycles-in-maharashtra',
    'Electric Cycles in Maharashtra',
    'state',
    '',
    'Maharashtra',
    '',
    '## Electric cycles across Maharashtra\n\nEparv serves riders across Maharashtra through verified dealers and direct delivery. This page is maintained by the Eparv team.',
    'Electric Cycles in Maharashtra | Eparv',
    'Eparv electric cycles, dealers and service coverage across Maharashtra.',
    '',
    'draft',
  ]

  const escape = (value: string) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value)

  return [
    CSV_TEMPLATE_HEADERS.join(','),
    example1.map(escape).join(','),
    example2.map(escape).join(','),
    '',
  ].join('\n')
}
