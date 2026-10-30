import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { GUIDES } from '@/data/guides'
import { getServerSideURL } from '@/utilities/getURL'

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()
    const dateFallback = new Date().toISOString()

    const results = await payload.find({
      collection: 'posts',
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

    const dbPosts = results.docs
      ? results.docs
          .filter((post) => Boolean(post?.slug))
          .map((post) => ({
            loc: `${SITE_URL}/posts/${post?.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : []

    // 10 Code-defined technical guides from data/guides.ts
    const guidePosts = Object.values(GUIDES).map((guide) => ({
      loc: `${SITE_URL}/posts/${guide.slug}`,
      lastmod: dateFallback,
    }))

    // Deduplicate by URL
    const seen = new Set<string>()
    const merged: { loc: string; lastmod: string }[] = []

    for (const item of [...guidePosts, ...dbPosts]) {
      if (!seen.has(item.loc)) {
        seen.add(item.loc)
        merged.push(item)
      }
    }

    return merged
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
