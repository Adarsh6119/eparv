import { getServerSideSitemap } from 'next-sitemap'

import { REGISTRY_SLUGS } from '@/cities'

/**
 * Sitemap for the code-defined `/electric-cycle-in-*` city, state and region
 * pages. These pages live in src/cities rather than the pages collection, so
 * they get their own sitemap instead of appearing in pages-sitemap.xml.
 */
export async function GET() {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  const lastmod = new Date().toISOString()

  return getServerSideSitemap(
    REGISTRY_SLUGS.map((slug) => ({
      loc: `${SITE_URL}/${slug}`,
      lastmod,
      changefreq: 'weekly' as const,
      priority: slug.startsWith('electric-cycle-in-uttar-pradesh') ||
        slug === 'electric-cycle-in-bihar' ||
        slug === 'electric-cycle-in-madhya-pradesh' ||
        slug === 'electric-cycle-in-delhi-ncr'
        ? 0.8
        : 0.7,
    })),
  )
}
