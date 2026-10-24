/**
 * Slugs that must never be assigned to a CMS page because they are already
 * served by static application routes. Enforced both when editing pages in
 * the admin panel and when validating CSV imports, so CMS content can never
 * shadow (or be shadowed by) an application route.
 */
export const RESERVED_SLUGS: string[] = [
  'home',
  'electric-cycles',
  'dealers',
  'blog',
  'compare',
  'contact',
  'become-a-dealer',
  'book-test-ride',
  'bulk-orders',
  'search',
  'admin',
  'api',
  'media',
  'next',
  'login',
  'logout',
  'forgot-password',
  'create-first-user',
  'robots.txt',
  'sitemap.xml',
  'sitemap',
  'favicon.ico',
  'favicon.svg',
  'ie-incompatible.html',
]

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const isReservedSlug = (slug: string | null | undefined): boolean =>
  typeof slug === 'string' && RESERVED_SLUGS.includes(slug.toLowerCase())

export const isValidSlugFormat = (slug: string | null | undefined): boolean =>
  typeof slug === 'string' && SLUG_PATTERN.test(slug)
