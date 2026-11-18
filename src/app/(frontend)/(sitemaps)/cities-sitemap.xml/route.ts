import { getServerSideSitemap } from 'next-sitemap'
import { REGISTRY_SLUGS, isCityOrStateIndexable } from '@/cities'
import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const SITE_URL = getServerSideURL()
  const lastmod = '2026-11-17T00:00:00.000Z'

  const entries: { loc: string; lastmod: string; changefreq: 'daily' | 'weekly' | 'monthly'; priority: number }[] = []
  const seen = new Set<string>()

  const addEntry = (path: string, priority: number = 0.8) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    const loc = `${SITE_URL}${cleanPath}`
    if (!seen.has(loc)) {
      seen.add(loc)
      entries.push({
        loc,
        lastmod,
        changefreq: 'weekly',
        priority,
      })
    }
  }

  // 1. National Location Hub
  addEntry('/electric-cycle-in', 0.9)

  // 2. Verified Tier A & Tier B city & state hub landing pages
  for (const slug of REGISTRY_SLUGS) {
    if (isCityOrStateIndexable(slug)) {
      addEntry(`/${slug}`, 0.8)
    }
  }

  return getServerSideSitemap(entries)
}
