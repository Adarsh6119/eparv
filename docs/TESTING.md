# Testing — what is verified and what is not

Run: `npm run smoke` (needs a running server; re-runnable, cleans up after itself).

## Verified by the automated smoke suite (61 checks)

**Application**
- Homepage renders 200; unknown routes return real 404s.

**Auth & roles (server-side enforcement)**
- Admin login; editor and sales accounts can log in.
- Sales **cannot** create users (privilege escalation blocked).
- Sales **cannot** edit pages.
- Editor **cannot** read leads; editor can read products.

**Products**
- Create product as draft; draft is not publicly visible (real 404).
- Publish; public page renders with name and demo-data notice.
- Catalogue lists the product.

**Blog**
- Draft post invisible publicly; publish; public render; blog sitemap entry.

**CSV import → approval → publish pipeline**
- Upload accepted; 6-row preview returns row-level issues.
- Invalid slug / thin content / unknown product / in-file duplicate slug /
  `status=published` rows all blocked with explicit errors.
- Import report: 1 created, 5 invalid.
- Imported page is a draft with `approvalStatus: pending`, publicly invisible.
- **Publishing before approval is blocked — including for Super Admin.**
- Sales cannot publish. Approve → publish succeeds; page renders.
- Live import report reflects the published count.
- Template downloadable; upload endpoints require staff auth.

**Lead capture**
- Valid lead saved (with lead reference id).
- Duplicate submission within the window returns idempotent success.
- Invalid phone → per-field error; missing consent → rejected.
- Honeypot submissions silently dropped.
- Dealer application saved; bulk order without quantity rejected.

**Lead privacy**
- Anonymous users get 401/403 on `/api/leads`; sales can read + CSV-export;
  export requires auth.

**SEO**
- Product page: canonical URL, Product JSON-LD, and **no** offers/ratings for
  demo data. City page: BreadcrumbList JSON-LD. Approved+published page appears
  in the pages sitemap; blocked rows never do; products sitemap includes the
  published product.

## Verified manually during development
- Production build succeeds (`npm run build`) and the smoke suite passes against
  `npm run start` (production mode), not just dev.
- `npm run typecheck` — 0 errors. `npm run lint` — 0 errors (10 warnings, all in
  pre-existing template test files/legacy hooks).
- All seeded routes render with content: home, catalogue, product, compare,
  dealers, dealer detail, blog, blog post, city pages, state page, legal pages,
  contact, test-ride, dealer application, bulk orders.
- Draft preview flow uses the template's preview mechanism (auth + secret).

## Not covered by automation (manual review recommended)
- Real email delivery (SMTP notification) — unconfigured locally; code path
  exercised only in the skip branch.
- Visual QA across devices/browsers.
- Load testing / concurrency behaviour of the in-memory rate limiter.
- The template's Playwright e2e specs (they target template seed content and
  were replaced by the smoke suite; not maintained for Eparv content).
- Payment flows — intentionally not implemented (see docs/ROADMAP.md).
