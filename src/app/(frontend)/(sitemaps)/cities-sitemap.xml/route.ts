import { getServerSideSitemap } from 'next-sitemap'
import { REGISTRY_SLUGS } from '@/cities'
import { getServerSideURL } from '@/utilities/getURL'

const EXTRA_CITY_SLUGS = [
  'electric-cycle-in-mumbai',
  'electric-cycle-in-bengaluru',
  'electric-cycles-in-maharashtra',
]

export async function GET() {
  const SITE_URL = getServerSideURL()
  const lastmod = '2026-11-14T00:00:00.000Z'

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

  // 2. All 99 programmatic city & state hub landing pages from src/cities
  for (const slug of REGISTRY_SLUGS) {
    addEntry(`/${slug}`, 0.8)
  }

  // 3. Extra seeded CMS city/state landing pages
  for (const slug of EXTRA_CITY_SLUGS) {
    addEntry(`/${slug}`, 0.75)
  }

  return getServerSideSitemap(entries)
}
