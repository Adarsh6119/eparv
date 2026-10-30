export interface ModelLinkMapping {
  siblings: string[]
  intentHubs: string[]
  topCities: string[]
  guides: string[]
}

export const MODEL_LINK_GRAPH: Record<string, ModelLinkMapping> = {
  panther: {
    siblings: ['satya', 'savitri'],
    intentHubs: ['under-20000', 'for-students'],
    topCities: ['delhi', 'noida'],
    guides: ['electric-cycle-running-cost-per-km', 'electric-cycle-real-range-pas-vs-throttle'],
  },
  visakka: {
    siblings: ['satya', 'lahari'],
    intentHubs: ['under-25000', 'for-students'],
    topCities: ['delhi', 'gurugram'],
    guides: ['electric-cycle-real-range-pas-vs-throttle', 'electric-cycle-license-rto-rules-india'],
  },
  lahari: {
    siblings: ['savitri', 'visakka'],
    intentHubs: ['under-25000', 'for-delivery'],
    topCities: ['lucknow', 'patna'],
    guides: ['electric-cycle-real-range-pas-vs-throttle', 'electric-cycle-for-delivery-business-guide'],
  },
  savitri: {
    siblings: ['panther', 'lahari'],
    intentHubs: ['under-20000', 'for-delivery', 'for-senior-citizens'],
    topCities: ['lucknow', 'patna'],
    guides: ['electric-cycle-running-cost-per-km', 'electric-cycle-for-delivery-business-guide'],
  },
  satya: {
    siblings: ['visakka', 'panther'],
    intentHubs: ['under-25000', 'for-students'],
    topCities: ['delhi', 'indore'],
    guides: ['electric-cycle-license-rto-rules-india', 'electric-cycle-in-rain-monsoon-safety'],
  },
}

export interface RelatedLinkItem {
  title: string
  url: string
  category: 'model' | 'intent' | 'location' | 'guide' | 'support'
  description?: string
}

export function getRelatedLinksForModel(modelId: string): RelatedLinkItem[] {
  const mapping = MODEL_LINK_GRAPH[modelId]
  if (!mapping) return []

  const links: RelatedLinkItem[] = []

  // Siblings
  for (const sib of mapping.siblings) {
    links.push({
      title: `Eparv ${sib.charAt(0).toUpperCase() + sib.slice(1)} Specs & Price`,
      url: `/electric-cycles/eparv-${sib}`,
      category: 'model',
      description: 'Compare with sibling electric cycle',
    })
  }

  // Intent hubs
  for (const intent of mapping.intentHubs) {
    const slug = intent.startsWith('electric-cycle-') ? intent : `electric-cycle-${intent}`
    links.push({
      title: `Electric Cycle ${intent.replace('under-', 'Under ₹').replace('for-', 'For ').replace(/-/g, ' ')}`,
      url: `/${slug}`,
      category: 'intent',
      description: 'Explore matching buyer guide & criteria',
    })
  }

  // Top cities
  for (const city of mapping.topCities) {
    links.push({
      title: `Electric Cycles in ${city.charAt(0).toUpperCase() + city.slice(1)}`,
      url: `/electric-cycle-in/${city}`,
      category: 'location',
      description: 'Local test ride, pricing & delivery',
    })
  }

  // Guides
  for (const guide of mapping.guides) {
    links.push({
      title: guide.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `/posts/${guide}`,
      category: 'guide',
      description: 'In-depth guide & technical breakdown',
    })
  }

  return links
}
