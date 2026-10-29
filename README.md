# Eparv — EV Cycle Brand Platform

Production-oriented website and lead-generation platform for **Eparv**, an electric
bicycle brand targeting customers and dealership partners across India. Built on
the official [Payload CMS 3 website template](https://github.com/payloadcms/payload)
(template tag `v3.92.0`, MIT licensed) with Next.js App Router.

> **Status: development build with clearly marked demo data.** All product
> specifications, prices and dealership records are placeholders flagged with an
> `isDemoData` marker and a visible on-page notice until verified information is
> supplied. Payments are **not** active.

---

## Stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack dev, standalone output)          |
| CMS        | Payload CMS 3.92 (admin at `/admin`)                               |
| Database   | SQLite (local dev) / PostgreSQL 17 (production), adapter-switchable |
| Styling    | Tailwind CSS 4 + shadcn-style components                           |
| Validation | Zod (shared client + server schemas)                               |
| CSV        | PapaParse (safe parsing, no HTML eval)                             |
| Email      | Nodemailer transport (optional, for lead notifications)            |
| Auth       | Payload auth + role-based access control (server-enforced)         |

## Quick start (Windows, zero infrastructure)

Requirements: **Node.js ≥ 24**, npm (no Docker or PostgreSQL needed for local dev).

```powershell
cd eparv
npm install          # already done if node_modules exists
npm run dev          # http://localhost:3000  (admin: http://localhost:3000/admin)
```

On first open of `/admin`, create the first user — it becomes the Super Admin
(demo credentials used during development: `admin@eparv.local` / `EparvAdmin!2026`
— **change these before any real deployment**).

Seed the clearly-labelled demo data (products, dealers, blog, city pages, legal
pages) by pressing **"Seed the demo data"** on the admin dashboard, or:
`POST /next/seed` while logged in.

### All scripts

| Command                 | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Dev server at :3000                                  |
| `npm run build`         | Production build (runs `next-sitemap` postbuild)     |
| `npm run start`         | Serve the production build                           |
| `npm run typecheck`     | `tsc --noEmit`                                       |
| `npm run lint`          | ESLint (flat config, 0 errors expected)              |
| `npm run smoke`         | 61-check end-to-end suite against a running server   |
| `npm run generate:types`| Regenerate `src/payload-types.ts` after schema edits |
| `npm run generate:importmap` | Regenerate admin import map after UI components |
| `npm run migrate`       | Apply DB migrations (production Postgres)            |

## Environment variables

Copy `.env.example` → `.env` and fill in. Highlights:

- `DATABASE_ADAPTER` — `sqlite` (dev default) or `postgres` (production)
- `DATABASE_URL` — `file:./eparv.db` or `postgresql://user:pass@host:5432/eparv`
- `PAYLOAD_SECRET` — required long random string (JWT signing); configure it in
  the Vercel build environment as well as at runtime
- `NEXT_PUBLIC_SERVER_URL` — public origin, no trailing slash
- `PREVIEW_SECRET` / `CRON_SECRET` — random strings for draft preview / cron auth
- `SMTP_*`, `LEAD_NOTIFICATION_FROM`, `LEAD_NOTIFICATION_TO` — optional lead emails
- `NEXT_PUBLIC_GSC_VERIFICATION_TOKEN` — optional Google Search Console token
- `LEAD_RATE_LIMIT_IP_PER_HOUR` (default 10), `LEAD_RATE_LIMIT_PHONE_PER_HOUR` (default 3)

Never commit real secrets — `.env` is gitignored.

## Routes

**Public:** `/` · `/electric-cycles` · `/electric-cycles/[slug]` · `/compare/[slug]`
· `/electric-cycle-in-[city]` + `/electric-cycle-in-[state]` (city/state landing pages)
· `/dealers` · `/dealers/[slug]` · `/become-a-dealer` · `/book-test-ride` · `/bulk-orders`
· `/blog` · `/blog/[slug]` · `/contact` · `/privacy-policy` · `/terms`

**City & state landing pages** are code-defined in `src/cities` (99 pages: 66 UP cities,
12 Bihar, 15 MP, Delhi, Delhi NCR, Hyderabad). Each page is built from hand-written, city-specific content —
local routes, delivery areas, FAQs, unique meta — so no two pages share body copy.
They are served by the `[slug]` catch-all, which gives registry pages precedence over
CMS pages; admin/CSV imports are blocked from creating colliding slugs.

To add a city: append an entry to the relevant file in `src/cities/` (e.g.
`uttar-pradesh.ts`) following `src/cities/types.ts`, add a nearby-slug link, and
register a new state file in `src/cities/index.ts` if needed. Route, static
generation, metadata, sitemap entry (`/cities-sitemap.xml`) and internal links are
derived automatically.

**Admin:** `/admin` — content, products, dealers, leads CRM, CSV import manager.

**API:** `/api/lead-submit` (public form POST), `/api/exports/leads` (CSV export,
staff only), `/api/imports/*` (CSV upload / run / report, staff only),
`/api/imports/template` (CSV template download), plus standard Payload REST/GraphQL.

URL collision safety: page slugs are validated server-side against a reserved list
(`src/utilities/reservedSlugs.ts`) and the city-page registry (`src/cities`), so CMS
content can never shadow an app route or a built-in city page.

## Roles

| Role            | Can                                                              |
| --------------- | ---------------------------------------------------------------- |
| Super Admin     | Everything, including user management and deletes                |
| Content Editor  | Pages, posts, products, dealers, media, CSV imports — no leads   |
| Sales Executive | Leads CRM, lead CSV export — no content editing, no publishing   |

All checks run server-side (`src/access/*`) on every REST/GraphQL/local-API call;
draft pages and unverified dealers are invisible to the public at the query level.

## CSV bulk page import (with approval)

Admin → **CSV Page Import Manager**:

1. Download the CSV template (`GET /api/imports/template`).
2. Upload (≤ 5 MB, ≤ 500 rows) — file type/size/headers validated; row-level
   errors and warnings (bad slugs, thin content, unknown products, duplicate
   slugs in-file, `status=published` attempts are all rejected).
3. Import valid rows — pages are created as **drafts** with approval status
   **Pending**. Published pages with the same slug are never overwritten.
4. Review each page, set *Approval Status → Approved*, then publish.
   Publishing a pending page is blocked server-side — even for Super Admins.

## Lead generation

One reusable, validated pipeline (`src/services/leadService.ts`) behind all five
forms (product enquiry, test ride, dealer application, bulk order, contact):
zod validation on client **and** server, honeypot + fill-time bot checks,
per-IP and per-phone rate limits, duplicate suppression (15-min window),
UTM + source attribution, consent capture, optional SMTP notification.
Leads are never exposed through public APIs; CSV export is staff-only.

## SEO

Per-page metadata + canonical URLs + noindex control, dynamic XML sitemaps
(cities / pages / blog / products / dealers) that exclude drafts and noindex pages,
robots.txt, breadcrumbs + BreadcrumbList JSON-LD, Organization / Product /
LocalBusiness / Article structured data — offers, ratings and addresses only
render for verified, non-demo data. 301 redirects: `/posts/* → /blog/*`, `/ → /home`.

## Testing

```powershell
# terminal 1
npm run dev
# terminal 2
npm run smoke        # 61 checks: auth, roles, workflows, CSV pipeline, leads, SEO, 404s
```

The suite is re-runnable (cleans up its own artifacts). It passes against both
dev and production builds. Typecheck (`npm run typecheck`) and lint
(`npm run lint`) are clean.

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full VPS guide (Docker or bare
Node, PostgreSQL, Nginx + HTTPS, backups, monitoring) and the cost breakdown.
See **[docs/TESTING.md](./docs/TESTING.md)** for what is tested and what is not.
See **[docs/ROADMAP.md](./docs/ROADMAP.md)** for payment integration and other
not-yet-implemented features.

## Project layout

```
src/
├── access/            # role helpers + per-collection access rules (server-side)
├── app/(frontend)/    # public site routes
├── app/(payload)/     # admin panel
├── blocks/            # reusable content blocks (template + content block)
├── collections/       # Pages, Posts, Products, Dealers, Leads, ImportBatches, Media, Categories, Users
├── components/        # LeadForm, ProductCard, Breadcrumbs, JsonLd, DemoNotice, …
├── endpoints/         # custom endpoints (CSV import / lead export)
├── services/          # leadService, leadSchemas (zod), csvImport, rateLimiter
└── utilities/         # SEO / meta / slug helpers
scripts/smoke-test.mjs # 61-check end-to-end suite (npm run smoke)
```

## License

MIT (inherited from the Payload template base).
