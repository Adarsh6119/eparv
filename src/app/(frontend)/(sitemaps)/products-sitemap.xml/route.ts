import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getProductsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    // overrideAccess: false means the collection's read access applies —
    // only published products are ever returned.
    const results = await payload.find({
      collection: 'products',
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
      },
    })

    const dateFallback = new Date().toISOString()
    const officialSlugs = [
      'eparv-panther',
      'eparv-visakka',
      'eparv-lahari',
      'eparv-savitri',
      'eparv-satya',
    ]

    const dbItems = results.docs
      ? results.docs
          .filter(
            (product) =>
              Boolean(product?.slug) &&
              !product.slug.endsWith('-electric-bike') &&
              product.slug !== 'smoke-test-cycle',
          )
          .map((product) => ({
            slug: product.slug,
            updatedAt: product.updatedAt || dateFallback,
          }))
      : []

    const map = new Map<string, { slug: string; updatedAt: string }>()
    for (const slug of officialSlugs) {
      map.set(slug, { slug, updatedAt: dateFallback })
    }
    for (const item of dbItems) {
      map.set(item.slug, item)
    }
    const combined = Array.from(map.values())

    const sitemap = combined.map((item) => ({
      loc: `${SITE_URL}/electric-cycles/${item.slug}`,
      lastmod: item.updatedAt,
    }))

    return sitemap
  },
  ['products-sitemap'],
  {
    tags: ['products-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getProductsSitemap()

  return getServerSideSitemap(sitemap)
}
