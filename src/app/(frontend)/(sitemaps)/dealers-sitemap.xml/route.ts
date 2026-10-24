import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getDealersSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    // overrideAccess: false applies the dealers read access rule, so only
    // verified + publicly listed dealers are returned to the sitemap.
    const results = await payload.find({
      collection: 'dealers',
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((dealer) => Boolean(dealer?.slug))
          .map((dealer) => ({
            loc: `${SITE_URL}/dealers/${dealer?.slug}`,
            lastmod: dealer.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['dealers-sitemap'],
  {
    tags: ['dealers-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getDealersSitemap()

  return getServerSideSitemap(sitemap)
}
