import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()
    const dateFallback = new Date().toISOString()

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
        meta: {
          noindex: true,
        },
      },
    })

    const dbPages = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug) && !page?.meta?.noindex && page.slug !== 'home')
          .map((page) => ({
            loc: `${SITE_URL}/${page?.slug}`,
            lastmod: page.updatedAt || dateFallback,
          }))
      : []

    // Static code-defined SEO hubs and landing pages
    const staticCodePages = [
      { loc: `${SITE_URL}/`, lastmod: dateFallback },
      { loc: `${SITE_URL}/electric-cycles`, lastmod: dateFallback },
      { loc: `${SITE_URL}/electric-cycle-under-20000`, lastmod: dateFallback },
      { loc: `${SITE_URL}/electric-cycle-under-25000`, lastmod: dateFallback },
      { loc: `${SITE_URL}/electric-cycle-for-delivery`, lastmod: dateFallback },
      { loc: `${SITE_URL}/electric-cycle-for-students`, lastmod: dateFallback },
      { loc: `${SITE_URL}/electric-cycle-for-senior-citizens`, lastmod: dateFallback },
      { loc: `${SITE_URL}/bulk-orders`, lastmod: dateFallback },
      { loc: `${SITE_URL}/become-a-dealer`, lastmod: dateFallback },
      { loc: `${SITE_URL}/dealers`, lastmod: dateFallback },
      { loc: `${SITE_URL}/book-test-ride`, lastmod: dateFallback },
      { loc: `${SITE_URL}/about`, lastmod: dateFallback },
    ]

    // Deduplicate by URL
    const seen = new Set<string>()
    const merged: { loc: string; lastmod: string }[] = []

    for (const item of [...staticCodePages, ...dbPages]) {
      if (!seen.has(item.loc)) {
        seen.add(item.loc)
        merged.push(item)
      }
    }

    return merged
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
