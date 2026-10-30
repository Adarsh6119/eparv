import { getServerSideSitemap } from 'next-sitemap'
import { CITIES, STATE_HUBS, isCityIndexable, isStateHubIndexable, type StateHubSlug } from '@/data/cities'
import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const SITE_URL = getServerSideURL()
  const lastmod = new Date().toISOString()

  const entries: { loc: string; lastmod: string; changefreq: 'daily' | 'weekly' | 'monthly'; priority: number }[] = []

  // 1. National Location Hub
  entries.push({
    loc: `${SITE_URL}/electric-cycle-in`,
    lastmod,
    changefreq: 'weekly',
    priority: 0.9,
  })

  // 2. Indexable State Hubs
  for (const [slug, hub] of Object.entries(STATE_HUBS)) {
    if (isStateHubIndexable(slug as StateHubSlug)) {
      entries.push({
        loc: `${SITE_URL}/electric-cycle-in/${slug}`,
        lastmod,
        changefreq: 'weekly',
        priority: 0.8,
      })
    }
  }

  // 3. Indexable Cities
  for (const city of Object.values(CITIES)) {
    if (isCityIndexable(city)) {
      entries.push({
        loc: `${SITE_URL}/electric-cycle-in/${city.slug}`,
        lastmod,
        changefreq: 'weekly',
        priority: 0.7,
      })
    }
  }

  return getServerSideSitemap(entries)
}
