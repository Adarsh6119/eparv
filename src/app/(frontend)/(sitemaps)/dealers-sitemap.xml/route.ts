import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getDealersSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    // overrideAccess: false applies the dealers read access rule, so only
    // verified + publicly listed dealers are returned to the sitemap.
    const results = await payload.find({
      collection: 'dealers',
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        isDemoData: {
          not_equals: true,
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = '2026-11-17T00:00:00.000Z'

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
