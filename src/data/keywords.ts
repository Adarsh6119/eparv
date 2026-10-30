export interface KeywordEntry {
  pageUrl: string
  pageType: 'model' | 'hub' | 'intent' | 'location-hub' | 'state' | 'city' | 'guide' | 'core'
  primaryKeyword: string
  secondaryKeywords: string[]
  recommendedTitle: string
  recommendedMetaDescription: string
}

export const KEYWORD_MAP: Record<string, KeywordEntry> = {
  // CORE
  '/': {
    pageUrl: '/',
    pageType: 'core',
    primaryKeyword: 'eparv electric cycles india',
    secondaryKeywords: ['electric cycles india', 'best electric cycle brand', 'e cycle price india'],
    recommendedTitle: 'Eparv Electric Cycles: High-Torque Smart EV Cycles for India',
    recommendedMetaDescription:
      'Discover Eparv electric cycles engineered for Indian roads. 250W high-torque motors, smart BMS lithium batteries, up to 110 km range, and zero RTO registration.',
  },
  '/electric-cycles': {
    pageUrl: '/electric-cycles',
    pageType: 'hub',
    primaryKeyword: 'eparv electric cycle',
    secondaryKeywords: [
      'eparv electric cycle price list',
      'eparv cycles comparison',
      'electric cycle brands india',
    ],
    recommendedTitle: 'Eparv Electric Cycles: Price List, Range & Side-by-Side Comparison',
    recommendedMetaDescription:
      'Compare every Eparv electric cycle with transparent prices, motor power, battery capacity, and 55–110 km range. Find the right model for your daily commute.',
  },

  // 5 MODELS
  '/electric-cycles/eparv-panther': {
    pageUrl: '/electric-cycles/eparv-panther',
    pageType: 'model',
    primaryKeyword: 'eparv panther',
    secondaryKeywords: [
      'eparv panther price',
      'eparv panther range',
      'eparv panther review',
      'eparv panther specifications',
      'eparv panther kitne ki hai',
    ],
    recommendedTitle: 'Eparv Panther Electric Cycle: Price, Range & Specs | Eparv',
    recommendedMetaDescription:
      'Eparv Panther urban electric cycle: 250W BLDC motor, 55 km range, detachable 36V quick-charge battery, and dual disc brakes for daily city commutes.',
  },
  '/electric-cycles/eparv-visakka': {
    pageUrl: '/electric-cycles/eparv-visakka',
    pageType: 'model',
    primaryKeyword: 'eparv visakka',
    secondaryKeywords: [
      'eparv visakka price',
      'eparv visakka range',
      'eparv visakka review',
      'eparv visakka specifications',
      'eparv visakka kitne ki hai',
    ],
    recommendedTitle: 'Eparv Visakka Electric Cycle: Price, Range & Specs | Eparv',
    recommendedMetaDescription:
      'Eparv Visakka all-terrain electric cycle: front suspension fork, 250W high-torque motor, 60 km range, and dual disc brakes for rough roads and trails.',
  },
  '/electric-cycles/eparv-lahari': {
    pageUrl: '/electric-cycles/eparv-lahari',
    pageType: 'model',
    primaryKeyword: 'eparv lahari',
    secondaryKeywords: [
      'eparv lahari price',
      'eparv lahari range',
      'eparv lahari review',
      'eparv lahari specifications',
      'eparv lahari kitne ki hai',
    ],
    recommendedTitle: 'Eparv Lahari Electric Cycle: Price, Range & Specs | Eparv',
    recommendedMetaDescription:
      'Eparv Lahari long-range electric cycle: 110 km ultra-long range in pedal assist, extended 36V battery, front suspension, and touring comfort geometry.',
  },
  '/electric-cycles/eparv-savitri': {
    pageUrl: '/electric-cycles/eparv-savitri',
    pageType: 'model',
    primaryKeyword: 'eparv savitri',
    secondaryKeywords: [
      'eparv savitri price',
      'eparv savitri range',
      'eparv savitri review',
      'eparv savitri specifications',
      'eparv savitri kitne ki hai',
    ],
    recommendedTitle: 'Eparv Savitri Electric Cycle: Price, Range & Specs | Eparv',
    recommendedMetaDescription:
      'Eparv Savitri comfort electric cycle: classic upright roadster design, 110 km range, heavy-duty rear carrier rack, and relaxed posture for family commuting.',
  },
  '/electric-cycles/eparv-satya': {
    pageUrl: '/electric-cycles/eparv-satya',
    pageType: 'model',
    primaryKeyword: 'eparv satya',
    secondaryKeywords: [
      'eparv satya price',
      'eparv satya range',
      'eparv satya review',
      'eparv satya specifications',
      'eparv satya kitne ki hai',
    ],
    recommendedTitle: 'Eparv Satya Electric Cycle: Price, Range & Specs | Eparv',
    recommendedMetaDescription:
      'Eparv Satya rugged electric cycle: 26T heavy-duty steel frame, 250W BLDC motor, 55 km range, anti-theft key lock, and dual disc brakes for rough Indian roads.',
  },

  // 5 INTENT HUBS
  '/electric-cycle-under-20000': {
    pageUrl: '/electric-cycle-under-20000',
    pageType: 'intent',
    primaryKeyword: 'electric cycle under 20000',
    secondaryKeywords: [
      'cheapest electric cycle in india',
      '20000 ke andar electric cycle',
      'सस्ती इलेक्ट्रिक साइकिल',
    ],
    recommendedTitle: 'Electric Cycle Under 20000 in India: Models, Range & Specs | Eparv',
    recommendedMetaDescription:
      'Explore best electric cycles under 20000 in India. Genuine 250W hub motors, detachable lithium battery, 55–110 km range, and zero RTO registration required.',
  },
  '/electric-cycle-under-25000': {
    pageUrl: '/electric-cycle-under-25000',
    pageType: 'intent',
    primaryKeyword: 'electric cycle under 25000',
    secondaryKeywords: [
      'best electric cycle under 25000',
      '25000 me electric cycle',
      'बैटरी वाली साइकिल कीमत',
    ],
    recommendedTitle: 'Best Electric Cycle Under 25000: Ranked by Range & Terrain | Eparv',
    recommendedMetaDescription:
      'Find the best electric cycle under 25000 in India. Front suspension models, 110 km extended range batteries, dual disc brakes, and low maintenance design.',
  },
  '/electric-cycle-for-delivery': {
    pageUrl: '/electric-cycle-for-delivery',
    pageType: 'intent',
    primaryKeyword: 'electric cycle for delivery',
    secondaryKeywords: [
      'delivery boy electric cycle',
      'heavy duty electric cycle with carrier',
      'bulk electric cycle',
    ],
    recommendedTitle: 'Electric Cycle for Delivery: Commercial Fleet ROI & Heavy Carrier | Eparv',
    recommendedMetaDescription:
      'Commercial electric cycles for delivery fleets: 140 kg payload capacity, reinforced steel carrier rack, 110 km range, and 90% fuel cost savings.',
  },
  '/electric-cycle-for-students': {
    pageUrl: '/electric-cycle-for-students',
    pageType: 'intent',
    primaryKeyword: 'electric cycle for students',
    secondaryKeywords: [
      'electric cycle for college',
      'student ke liye electric cycle',
      'electric cycle without license',
    ],
    recommendedTitle: 'Electric Cycle for Students: Affordable, No License & Anti-Theft | Eparv',
    recommendedMetaDescription:
      'Best electric cycles for college and school students: 100% legal with zero license required, anti-theft key lock, 55 km range, and ₹0.05/km running cost.',
  },
  '/electric-cycle-for-senior-citizens': {
    pageUrl: '/electric-cycle-for-senior-citizens',
    pageType: 'intent',
    primaryKeyword: 'electric cycle for senior citizens',
    secondaryKeywords: [
      'electric cycle for elderly',
      'bujurgo ke liye electric cycle',
      'upright comfort electric bicycle',
    ],
    recommendedTitle: 'Electric Cycle for Senior Citizens: Upright Comfort & Easy Throttle | Eparv',
    recommendedMetaDescription:
      'Comfort electric cycles for seniors: relaxed upright seating, gentle 25 km/h throttle for zero knee strain, electronic cutoff brakes, and simple charging.',
  },

  // LOCATION HUB & STATES
  '/electric-cycle-in': {
    pageUrl: '/electric-cycle-in',
    pageType: 'location-hub',
    primaryKeyword: 'electric cycle in india',
    secondaryKeywords: ['electric cycle dealers by city', 'e-cycle showroom near me', 'electric cycle price by state'],
    recommendedTitle: 'Electric Cycle in India: State & City Dealership Directory | Eparv',
    recommendedMetaDescription:
      'Find authorized Eparv electric cycle showrooms, test rides, local delivery timelines, and verified dealers across Indian states and cities.',
  },
  '/electric-cycle-in/delhi-ncr': {
    pageUrl: '/electric-cycle-in/delhi-ncr',
    pageType: 'state',
    primaryKeyword: 'electric cycle in delhi ncr',
    secondaryKeywords: ['electric cycle price in delhi ncr', 'delhi ncr me electric cycle', 'electric cycle dealers delhi ncr'],
    recommendedTitle: 'Electric Cycle in Delhi NCR: Price, Showrooms & Free Test Ride | Eparv',
    recommendedMetaDescription:
      'Explore Eparv electric cycles in Delhi NCR: Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad. Free test rides, local showroom networks, and fast delivery.',
  },
  '/electric-cycle-in/uttar-pradesh': {
    pageUrl: '/electric-cycle-in/uttar-pradesh',
    pageType: 'state',
    primaryKeyword: 'electric cycle in uttar pradesh',
    secondaryKeywords: ['electric cycle price in uttar pradesh', 'up me electric cycle', 'electric cycle dealer up'],
    recommendedTitle: 'Electric Cycle in Uttar Pradesh: Price, Cities & Dealers | Eparv',
    recommendedMetaDescription:
      'Electric cycles across Uttar Pradesh: Lucknow, Kanpur, Varanasi, Agra, Meerut & more. Compare models, prices, doorstep delivery, and dealer networks.',
  },
  '/electric-cycle-in/bihar': {
    pageUrl: '/electric-cycle-in/bihar',
    pageType: 'state',
    primaryKeyword: 'electric cycle in bihar',
    secondaryKeywords: ['electric cycle price in bihar', 'bihar me electric cycle', 'electric cycle dealer bihar'],
    recommendedTitle: 'Electric Cycle in Bihar: Price, Delivery & Dealerships | Eparv',
    recommendedMetaDescription:
      'Electric cycles across Bihar: Patna, Gaya, Muzaffarpur, Bhagalpur & Darbhanga. Reliable 250W hub motors, home charging, and direct delivery.',
  },
  '/electric-cycle-in/madhya-pradesh': {
    pageUrl: '/electric-cycle-in/madhya-pradesh',
    pageType: 'state',
    primaryKeyword: 'electric cycle in madhya pradesh',
    secondaryKeywords: ['electric cycle price in madhya pradesh', 'mp me electric cycle', 'electric cycle dealer mp'],
    recommendedTitle: 'Electric Cycle in Madhya Pradesh: Price, Test Ride & Dealers | Eparv',
    recommendedMetaDescription:
      'Electric cycles across Madhya Pradesh: Indore, Bhopal, Gwalior, Jabalpur & Ujjain. High-torque climbing power, fast charging, and local service.',
  },
}

export function getKeywordData(pageUrl: string): KeywordEntry | undefined {
  return KEYWORD_MAP[pageUrl]
}

export function getCityKeywords(citySlug: string, displayName: string, displayNameHi: string): KeywordEntry {
  return {
    pageUrl: `/electric-cycle-in/${citySlug}`,
    pageType: 'city',
    primaryKeyword: `electric cycle in ${displayName}`,
    secondaryKeywords: [
      `electric cycle price in ${displayName}`,
      `electric cycle dealer in ${displayName}`,
      `electric cycle showroom ${displayName}`,
      `${displayName} me electric cycle`,
      `बैटरी वाली साइकिल ${displayNameHi}`,
    ],
    recommendedTitle: `Electric Cycle in ${displayName}: Price, Dealers & Free Test Ride | Eparv`,
    recommendedMetaDescription: `Looking for an electric cycle in ${displayName}? Compare Eparv 250W models, check local dealer locations, calculate petrol savings, and book a free test ride.`,
  }
}
