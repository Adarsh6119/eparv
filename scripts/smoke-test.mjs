#!/usr/bin/env node
/**
 * Eparv end-to-end smoke test.
 *
 * Runs against a live server (default http://localhost:3000 — set
 * SMOKE_BASE_URL to override) and verifies the core behaviours of the
 * platform: admin setup, role permissions, product & blog workflows,
 * the CSV import → approval → publish pipeline, lead capture security,
 * sitemap hygiene and 404 handling.
 *
 * Usage:
 *   node scripts/smoke-test.mjs
 *
 * The first admin account is created if the database is empty. Default
 * credentials can be overridden with SMOKE_ADMIN_EMAIL / SMOKE_ADMIN_PASSWORD.
 */

const BASE_URL = process.env.SMOKE_BASE_URL || 'http://localhost:3000'
const ADMIN_EMAIL = process.env.SMOKE_ADMIN_EMAIL || 'admin@eparv.local'
const ADMIN_PASSWORD = process.env.SMOKE_ADMIN_PASSWORD || 'EparvAdmin!2026'

// Every request simulates a distinct client IP via X-Forwarded-For (as Nginx
// would in production), so re-running the suite never exhausts the server's
// in-memory per-IP lead rate limit.
const runIp = `10.${(Date.now() >> 8) & 255}.${Date.now() & 255}.42`

// Unique valid 10-digit mobile numbers per run — the server's per-phone
// rate limit is in-memory, so reusing numbers across runs would trip it.
const runStamp = Date.now().toString().slice(-8)
const PHONES = {
  retail: `98${runStamp}`,
  noConsent: `97${runStamp}`,
  honeypot: `96${runStamp}`,
  dealer: `95${runStamp}`,
  bulk: `94${runStamp}`,
}

let passed = 0
let failed = 0
const failures = []

const log = (ok, name, detail = '') => {
  const status = ok ? 'PASS' : 'FAIL'
  if (ok) {
    passed++
  } else {
    failed++
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`)
  }
  console.log(`  ${status}  ${name}${detail && !ok ? `  (${detail})` : ''}`)
}

const api = async (path, { method = 'GET', body, token, form } = {}) => {
  const headers = {
    'x-forwarded-for': runIp,
  }
  if (token) {
    headers['Authorization'] = `JWT ${token}`
  }
  if (body) {
    headers['content-type'] = 'application/json'
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: form ?? (body ? JSON.stringify(body) : undefined),
  })
  const text = await res.text()
  let json = null
  try {
    json = JSON.parse(text)
  } catch {
    json = null
  }
  return { status: res.status, json, text }
}

const login = async (email, password) => {
  const res = await api('/api/users/login', { method: 'POST', body: { email, password } })
  return res.json?.token ?? null
}

const section = (name) => console.log(`\n■ ${name}`)

async function main() {
  console.log(`Eparv smoke test → ${BASE_URL}`)

  // ── 1. Server is up ──────────────────────────────────────────────────────
  section('Application')
  {
    const res = await fetch(`${BASE_URL}/`)
    log(res.status === 200, 'homepage responds 200')

    const missing = await fetch(`${BASE_URL}/no-such-page-xyz`)
    log(missing.status === 404, 'unknown route returns real 404', `got ${missing.status}`)
  }

  // ── 2. Admin setup & auth ────────────────────────────────────────────────
  section('Admin & roles')
  let adminToken = await login(ADMIN_EMAIL, ADMIN_PASSWORD)
  if (!adminToken) {
    const create = await api('/api/users', {
      method: 'POST',
      body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'Smoke Admin', roles: ['admin'] },
    })
    log(create.status === 201 || create.status === 200, 'first admin created', `status ${create.status}`)
    adminToken = await login(ADMIN_EMAIL, ADMIN_PASSWORD)
  }
  log(Boolean(adminToken), 'admin login returns token')

  // Editor + sales test accounts
  const editorEmail = 'editor-smoke@eparv.local'
  const salesEmail = 'sales-smoke@eparv.local'
  await api('/api/users', {
    method: 'POST',
    token: adminToken,
    body: { email: editorEmail, password: 'EditorPass!2026', name: 'Smoke Editor', roles: ['editor'] },
  })
  await api('/api/users', {
    method: 'POST',
    token: adminToken,
    body: { email: salesEmail, password: 'SalesPass!2026', name: 'Smoke Sales', roles: ['sales'] },
  })
  const editorToken = await login(editorEmail, 'EditorPass!2026')
  const salesToken = await login(salesEmail, 'SalesPass!2026')
  log(Boolean(editorToken), 'editor account can log in')
  log(Boolean(salesToken), 'sales account can log in')

  // Clean up artifacts from any previous smoke run so the suite is re-runnable.
  const cleanup = async (collection, where) => {
    const res = await api(
      `/api/${collection}?where=${encodeURIComponent(JSON.stringify(where))}&limit=100`,
      { token: adminToken },
    )
    for (const doc of res.json?.docs ?? []) {
      await api(`/api/${collection}/${doc.id}`, { method: 'DELETE', token: adminToken })
    }
  }
  await cleanup('products', { slug: { equals: 'smoke-test-cycle' } })
  await cleanup('posts', { slug: { equals: 'smoke-test-post' } })
  await cleanup('pages', { slug: { equals: 'electric-cycle-in-hyderabad' } })
  await cleanup('import-batches', { filename: { equals: 'smoke-import.csv' } })
  await cleanup('leads', {
    phone: { in: [PHONES.retail, PHONES.noConsent, PHONES.honeypot, PHONES.dealer, PHONES.bulk] },
  })

  // Sales must NOT create users (privilege escalation check)
  {
    const res = await api('/api/users', {
      method: 'POST',
      token: salesToken,
      body: { email: 'escalate@eparv.local', password: 'x'.repeat(12), name: 'X' },
    })
    log(res.status === 403, 'sales cannot create users', `got ${res.status}`)
  }
  // Sales must NOT edit pages
  {
    const res = await api('/api/pages?limit=1', { token: salesToken })
    const page = res.json?.docs?.[0]
    if (page) {
      const upd = await api(`/api/pages/${page.id}`, {
        method: 'PATCH',
        token: salesToken,
        body: { title: 'hacked' },
      })
      log(upd.status === 403, 'sales cannot edit pages', `got ${upd.status}`)
    } else {
      log(false, 'pages exist for permission test')
    }
  }
  // Editor can read products but NOT leads
  {
    const leads = await api('/api/leads?limit=1', { token: editorToken })
    log(leads.status === 403, 'editor cannot read leads', `got ${leads.status}`)
    const products = await api('/api/products?limit=1', { token: editorToken })
    log(products.status === 200, 'editor can read products')
  }

  // ── 3. Products workflow ─────────────────────────────────────────────────
  section('Products')
  let productSlug = null
  {
    const create = await api('/api/products', {
      method: 'POST',
      token: adminToken,
      body: {
        name: 'Smoke Test Cycle',
        slug: 'smoke-test-cycle',
        category: 'city-commuter',
        price: 39999,
        featuredImage: 1,
        isDemoData: true,
        _status: 'draft',
      },
    })
    log(create.status === 201, 'product created as draft', `status ${create.status}`)

    if (create.status === 201) {
      const id = create.json.doc.id
      // Draft must not be publicly visible
      const draftPage = await fetch(`${BASE_URL}/electric-cycles/smoke-test-cycle`)
      log(draftPage.status === 404, 'draft product not publicly visible')

      const publish = await api(`/api/products/${id}`, {
        method: 'PATCH',
        token: adminToken,
        body: { _status: 'published' },
      })
      log(publish.status === 200 && publish.json.doc._status === 'published', 'product published')

      const publicPage = await fetch(`${BASE_URL}/electric-cycles/smoke-test-cycle`)
      log(publicPage.status === 200, 'published product page renders 200')
      const html = await publicPage.text()
      log(html.includes('Smoke Test Cycle'), 'product page contains product name')
      log(html.includes('Demo data'), 'product page shows demo-data notice')

      const catalogue = await fetch(`${BASE_URL}/electric-cycles`)
      const catHtml = await catalogue.text()
      log(catHtml.includes('Smoke Test Cycle'), 'catalogue lists the product')

      productSlug = 'smoke-test-cycle'
    }
  }

  // ── 4. Blog workflow ─────────────────────────────────────────────────────
  section('Blog')
  {
    const create = await api('/api/posts', {
      method: 'POST',
      token: adminToken,
      body: {
        title: 'Smoke Test Post',
        slug: 'smoke-test-post',
        content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Smoke test content.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
        _status: 'draft',
      },
    })
    log(create.status === 201, 'post created as draft', `status ${create.status}`)

    const draftPage = await fetch(`${BASE_URL}/blog/smoke-test-post`)
    log(draftPage.status === 404, 'draft post not publicly visible')

    if (create.status === 201) {
      const publish = await api(`/api/posts/${create.json.doc.id}`, {
        method: 'PATCH',
        token: adminToken,
        body: { _status: 'published' },
      })
      log(publish.status === 200, 'post published')

      const publicPage = await fetch(`${BASE_URL}/blog/smoke-test-post`)
      log(publicPage.status === 200, 'published post renders 200')

      const sitemap = await fetch(`${BASE_URL}/blog-sitemap.xml`)
      const sitemapXml = await sitemap.text()
      log(
        sitemapXml.includes('/blog/smoke-test-post'),
        'published post appears in blog sitemap',
      )
    }
  }

  // ── 5. CSV import: validation, preview, drafts, approval, publish ───────
  section('CSV import & approval workflow')
  {
    const csv = [
      'slug,pageTitle,pageType,city,state,productSlug,content,metaTitle,metaDescription,canonicalUrl,status',
      `"electric-cycle-in-hyderabad","Electric Cycles in Hyderabad","city","Hyderabad","Telangana","","## Riding in Hyderabad\n\nHyderabad riders cover long distances across wide roads and expanding tech corridors, and an electric cycle keeps those commutes affordable and pleasant. This is a smoke-test page with genuinely unique body copy used to validate the import pipeline.","Electric Cycles in Hyderabad | Eparv","Eparv electric cycles in Hyderabad.","",draft`,
      `"BAD SLUG!","Invalid slug row","standard","","","","This row has an invalid slug on purpose and must be blocked with a row-level error.","","","",draft`,
      `"electric-cycle-in-chennai","Thin","city","Chennai","Tamil Nadu","","too short","x","","",draft`,
      `"electric-cycle-in-hyderabad","Duplicate slug","standard","","","","This row duplicates the first row slug and must be reported as a duplicate within the file.","","","",draft`,
      `"electric-cycle-in-kolkata","Bad product","standard","","","no-such-product","This row references a product slug that does not exist and must be blocked accordingly.","","","",draft`,
      `"electric-cycle-in-jaipur","Published status","standard","","","","This row asks for status published which imports must never honour, so it must be blocked with a clear error message.","","","",published`,
    ].join('\n')

    const form = new FormData()
    form.append('file', new Blob([csv], { type: 'text/csv' }), 'smoke-import.csv')
    const upload = await api('/api/imports/upload', { method: 'POST', token: adminToken, form })
    log(upload.status === 200, 'CSV upload accepted', `status ${upload.status}`)

    const rows = upload.json?.rows ?? []
    log(rows.length === 6, 'all 6 rows parsed and returned for preview')

    const hyd = rows.find((r) => r.slug === 'electric-cycle-in-hyderabad')
    log(
      Boolean(hyd && hyd.issues.every((i) => i.severity !== 'error')),
      'valid row has no errors',
    )
    log(
      rows.some((r) => r.slug === 'bad slug!' && r.issues.some((i) => i.severity === 'error')),
      'invalid slug row blocked with error',
    )
    log(
      rows.some((r) => r.issues.some((i) => i.message.toLowerCase().includes('thin'))),
      'thin content row blocked',
    )
    log(
      rows.filter((r) => r.slug === 'electric-cycle-in-hyderabad').length === 2 &&
        rows.some((r) => r.slug === 'electric-cycle-in-hyderabad' && r.issues.some((i) => i.message.toLowerCase().includes('duplicate'))),
      'duplicate slug within file detected',
    )
    log(
      rows.some((r) => r.slug === 'electric-cycle-in-kolkata' && r.issues.some((i) => i.message.includes('product'))),
      'invalid product reference blocked',
    )
    log(
      rows.some((r) => r.slug === 'electric-cycle-in-jaipur' && r.issues.some((i) => i.message.includes('never published automatically') || i.message.includes('draft'))),
      'status=published rejected — imports never auto-publish',
    )

    const batchId = upload.json?.batch?.id
    const runImport = await api(`/api/imports/${batchId}/import`, { method: 'POST', token: adminToken })
    log(runImport.status === 200, 'import executed')
    const report = runImport.json?.report
    log(
      Boolean(report && report.createdCount === 1 && report.invalidCount === 5),
      'report shows 1 created / 5 invalid',
      JSON.stringify(report),
    )

    // Imported page must be a draft and NOT publicly visible
    const importedDraft = await fetch(`${BASE_URL}/electric-cycle-in-hyderabad`)
    log(importedDraft.status === 404, 'imported page not public before approval')

    const pages = await api('/api/pages?where[slug][equals]=electric-cycle-in-hyderabad&draft=true', { token: adminToken })
    const importedPage = pages.json?.docs?.[0]
    log(
      Boolean(importedPage && importedPage._status === 'draft' && importedPage.approvalStatus === 'pending'),
      'imported page stored as draft with pending approval',
    )

    if (importedPage) {
      // Publishing before approval must fail — even for admins
      const blockedPublish = await api(`/api/pages/${importedPage.id}`, {
        method: 'PATCH',
        token: adminToken,
        body: { _status: 'published' },
      })
      log(
        blockedPublish.status === 400,
        'publishing blocked before approval (even for admin)',
        `status ${blockedPublish.status}`,
      )

      // Sales cannot publish either
      const salesAttempt = await api(`/api/pages/${importedPage.id}`, {
        method: 'PATCH',
        token: salesToken,
        body: { _status: 'published' },
      })
      log(salesAttempt.status === 403, 'sales cannot publish pages', `got ${salesAttempt.status}`)

      // Approve, then publish
      const approve = await api(`/api/pages/${importedPage.id}`, {
        method: 'PATCH',
        token: adminToken,
        body: { approvalStatus: 'approved', _status: 'draft' },
      })
      log(approve.status === 200, 'reviewer sets approval status')

      const publish = await api(`/api/pages/${importedPage.id}`, {
        method: 'PATCH',
        token: adminToken,
        body: { _status: 'published' },
      })
      log(publish.status === 200, 'approved page publishes successfully')

      const publicPage = await fetch(`${BASE_URL}/electric-cycle-in-hyderabad`)
      log(publicPage.status === 200, 'approved+published page renders 200')

      // Live report reflects published state
      const liveReport = await api(`/api/imports/${batchId}/report`, { token: adminToken })
      log(
        Boolean(liveReport.json?.live?.published === 1),
        'import report shows 1 published page',
        JSON.stringify(liveReport.json?.live),
      )
    }

    // Import template downloadable
    const template = await fetch(`${BASE_URL}/api/imports/template`)
    const templateText = await template.text()
    log(
      template.status === 200 && templateText.startsWith('slug,pageTitle'),
      'CSV template downloadable',
    )

    // Import endpoints protected
    const unauth = await fetch(`${BASE_URL}/api/imports/template`)
    log(unauth.status === 200, 'template is public (safe)')
    const unauthUpload = await api('/api/imports/upload', { method: 'POST' })
    log(unauthUpload.status === 403, 'CSV upload requires staff auth', `got ${unauthUpload.status}`)
  }

  // ── 6. Lead forms ────────────────────────────────────────────────────────
  section('Lead capture')
  {
    const valid = await api('/api/lead-submit', {
      method: 'POST',
      body: {
        leadType: 'retail',
        name: 'Smoke Customer',
        phone: PHONES.retail,
        city: 'Delhi',
        productSlug,
        consentAccepted: true,
        startedAt: Date.now() - 5000,
      },
    })
    log(valid.status === 200 && valid.json.ok === true, 'valid lead saved', JSON.stringify(valid.json))

    const dup = await api('/api/lead-submit', {
      method: 'POST',
      body: {
        leadType: 'retail',
        name: 'Smoke Customer',
        phone: PHONES.retail,
        city: 'Delhi',
        consentAccepted: true,
        startedAt: Date.now() - 5000,
      },
    })
    log(
      dup.status === 200 && dup.json.duplicate === true,
      'duplicate submission detected (idempotent success)',
    )

    const badPhone = await api('/api/lead-submit', {
      method: 'POST',
      body: {
        leadType: 'retail',
        name: 'Bad Phone',
        phone: '12345',
        city: 'Delhi',
        consentAccepted: true,
        startedAt: Date.now() - 5000,
      },
    })
    log(badPhone.status === 400 && badPhone.json.fieldErrors?.phone, 'invalid phone rejected with field error')

    const noConsent = await api('/api/lead-submit', {
      method: 'POST',
      body: {
        leadType: 'retail',
        name: 'No Consent',
        phone: PHONES.noConsent,
        city: 'Delhi',
        consentAccepted: false,
        startedAt: Date.now() - 5000,
      },
    })
    log(noConsent.status === 400, 'missing consent rejected')

    const honeypot = await api('/api/lead-submit', {
      method: 'POST',
      body: {
        leadType: 'retail',
        name: 'Bot',
        phone: PHONES.honeypot,
        city: 'Delhi',
        consentAccepted: true,
        companyWebsite: 'http://spam.example',
        startedAt: Date.now() - 5000,
      },
    })
    log(
      honeypot.status === 200 && honeypot.json.duplicate === true,
      'honeypot submissions silently dropped',
    )

    const dealer = await api('/api/lead-submit', {
      method: 'POST',
      body: {
        leadType: 'dealer',
        name: 'Dealer Applicant',
        phone: PHONES.dealer,
        city: 'Pune',
        state: 'Maharashtra',
        organization: 'Smoke Motors',
        consentAccepted: true,
        startedAt: Date.now() - 5000,
      },
    })
    log(dealer.status === 200, 'dealer application saved')

    const bulkMissingQty = await api('/api/lead-submit', {
      method: 'POST',
      body: {
        leadType: 'bulk-order',
        name: 'Bulk Buyer',
        phone: PHONES.bulk,
        city: 'Mumbai',
        organization: 'Smoke Corp',
        consentAccepted: true,
        startedAt: Date.now() - 5000,
      },
    })
    log(bulkMissingQty.status === 400, 'bulk order without quantity rejected')
  }

  // ── 7. Lead privacy ──────────────────────────────────────────────────────
  section('Lead privacy')
  {
    const anon = await api('/api/leads?limit=1')
    log(anon.status === 401 || anon.status === 403, 'anonymous users cannot read leads', `got ${anon.status}`)

    const asSales = await api('/api/leads?limit=10', { token: salesToken })
    log(asSales.status === 200, 'sales can read leads')
    log(
      Boolean(asSales.json?.docs?.some((l) => l.leadType === 'dealer')),
      'captured dealer lead is in the CRM',
    )

    const exportCsv = await api('/api/exports/leads', { token: salesToken })
    log(exportCsv.status === 200 && exportCsv.text.includes('leadId'), 'leads CSV export works')

    const anonExport = await api('/api/exports/leads')
    log(anonExport.status === 401 || anonExport.status === 403, 'leads export requires auth')
  }

  // ── 8. SEO outputs ───────────────────────────────────────────────────────
  section('SEO')
  {
    const productPage = await fetch(`${BASE_URL}/electric-cycles/smoke-test-cycle`)
    const html = await productPage.text()
    log(html.includes('rel="canonical"'), 'product page has canonical URL')
    log(html.includes('"@type":"Product"'), 'product page has Product structured data')
    log(
      !html.includes('aggregateRating') && !html.includes('"offers"'),
      'demo product omits offers/ratings from structured data',
    )

    const cityPage = await fetch(`${BASE_URL}/electric-cycle-in-hyderabad`)
    const cityHtml = await cityPage.text()
    log(cityHtml.includes('"@type":"BreadcrumbList"'), 'city page has breadcrumbs structured data')

    const pagesSitemap = await fetch(`${BASE_URL}/pages-sitemap.xml`)
    const pagesXml = await pagesSitemap.text()
    log(pagesXml.includes('electric-cycle-in-hyderabad'), 'approved+published city page in sitemap')
    log(!pagesXml.includes('smoke-import-bad'), 'invalid import rows never reach the sitemap')

    const productsSitemap = await fetch(`${BASE_URL}/products-sitemap.xml`)
    const productsXml = await productsSitemap.text()
    log(productsXml.includes('smoke-test-cycle'), 'products sitemap includes published product')
  }

  // ── Result ───────────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`RESULT: ${passed} passed, ${failed} failed`)
  if (failed > 0) {
    console.log('\nFailures:')
    for (const f of failures) {
      console.log(`  ✗ ${f}`)
    }
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('Smoke test crashed:', error)
  process.exit(1)
})
