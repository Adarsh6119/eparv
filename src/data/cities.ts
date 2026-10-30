import { VERIFIED_DEALERS, type VerifiedDealer } from './dealers'

export type StateHubSlug = 'delhi-ncr' | 'uttar-pradesh' | 'bihar' | 'madhya-pradesh'

export interface StateHub {
  slug: StateHubSlug
  displayName: string
  displayNameHi: string
  cities: string[]
  metaDescription: string
  introText: string
}

export interface LocalUseCase {
  title: string
  description: string
}

export interface LocalFaq {
  question: string
  questionHi?: string
  answer: string
  answerHi?: string
}

export interface CityData {
  slug: string
  displayName: string
  displayNameHi: string
  stateHub: StateHubSlug
  petrolPricePerLitre: number | null
  petrolPriceDate: string | null
  petrolPriceSource: string | null
  electricityRatePerUnit: number | null
  deliveryTimeDays: string | null
  dealers: VerifiedDealer[]
  localUseCases: LocalUseCase[]
  localFaq: LocalFaq[]
  nearby: string[]
}

export type City = CityData

export const STATE_HUBS: Record<StateHubSlug, StateHub> = {
  'delhi-ncr': {
    slug: 'delhi-ncr',
    displayName: 'Delhi NCR',
    displayNameHi: 'दिल्ली एनसीआर',
    cities: ['delhi', 'noida', 'greater-noida', 'gurugram', 'ghaziabad', 'faridabad'],
    metaDescription:
      'Electric cycles in Delhi NCR — explore high-torque e-cycles with test rides, doorstep delivery, and authorized service across Delhi, Noida, Gurgaon & Faridabad.',
    introText:
      'Delhi NCR riders navigate dense arterial traffic, severe summer heat, and winter air pollution. An electric cycle offers an agile, sweat-free commute for ₹0.05/km while bypassing peak-hour congestion.',
  },
  'uttar-pradesh': {
    slug: 'uttar-pradesh',
    displayName: 'Uttar Pradesh',
    displayNameHi: 'उत्तर प्रदेश',
    cities: [
      'lucknow',
      'kanpur',
      'varanasi',
      'prayagraj',
      'agra',
      'meerut',
      'gorakhpur',
      'bareilly',
      'aligarh',
    ],
    metaDescription:
      'Electric cycles across Uttar Pradesh — find models, prices, test rides, and dealership networks across Lucknow, Kanpur, Varanasi, Agra and 5+ cities.',
    introText:
      'From Lucknow and Kanpur to Varanasi and Agra, riders across UP are upgrading daily commuting with 250W high-torque electric cycles that eliminate high fuel expenses with zero RTO paperwork.',
  },
  bihar: {
    slug: 'bihar',
    displayName: 'Bihar',
    displayNameHi: 'बिहार',
    cities: ['patna', 'gaya', 'muzaffarpur', 'bhagalpur', 'darbhanga'],
    metaDescription:
      'Electric cycles in Bihar — check model pricing, range, battery specifications, and doorstep delivery for Patna, Gaya, Muzaffarpur, Bhagalpur, and Darbhanga.',
    introText:
      'Across Patna, Muzaffarpur, and Bihar’s growing urban hubs, Eparv electric cycles offer dependable micro-mobility with removable lithium batteries suited for home charging.',
  },
  'madhya-pradesh': {
    slug: 'madhya-pradesh',
    displayName: 'Madhya Pradesh',
    displayNameHi: 'मध्य प्रदेश',
    cities: ['indore', 'bhopal', 'gwalior', 'jabalpur', 'ujjain'],
    metaDescription:
      'Electric cycles in Madhya Pradesh — explore 250W electric bikes for daily commutes in Indore, Bhopal, Gwalior, Jabalpur, and Ujjain.',
    introText:
      'Madhya Pradesh cities with expanding educational and IT hubs are prime terrain for clean electric bicycles that effortlessly tackle gradients with 5-level pedal assist.',
  },
}

export const CITIES: Record<string, CityData> = {
  // DELHI NCR (6)
  delhi: {
    slug: 'delhi',
    displayName: 'Delhi',
    displayNameHi: 'दिल्ली',
    stateHub: 'delhi-ncr',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['noida', 'gurugram', 'ghaziabad', 'faridabad'],
  },
  noida: {
    slug: 'noida',
    displayName: 'Noida',
    displayNameHi: 'नोएडा',
    stateHub: 'delhi-ncr',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['greater-noida', 'ghaziabad', 'delhi'],
  },
  'greater-noida': {
    slug: 'greater-noida',
    displayName: 'Greater Noida',
    displayNameHi: 'ग्रेटर नोएडा',
    stateHub: 'delhi-ncr',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['noida', 'ghaziabad', 'delhi'],
  },
  gurugram: {
    slug: 'gurugram',
    displayName: 'Gurugram',
    displayNameHi: 'गुरुग्राम',
    stateHub: 'delhi-ncr',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['delhi', 'faridabad', 'noida'],
  },
  ghaziabad: {
    slug: 'ghaziabad',
    displayName: 'Ghaziabad',
    displayNameHi: 'गाज़ियाबाद',
    stateHub: 'delhi-ncr',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['noida', 'delhi', 'meerut'],
  },
  faridabad: {
    slug: 'faridabad',
    displayName: 'Faridabad',
    displayNameHi: 'फरीदाबाद',
    stateHub: 'delhi-ncr',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['delhi', 'gurugram', 'noida'],
  },

  // UTTAR PRADESH (9)
  lucknow: {
    slug: 'lucknow',
    displayName: 'Lucknow',
    displayNameHi: 'लखनऊ',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['kanpur', 'prayagraj', 'bareilly', 'gorakhpur'],
  },
  kanpur: {
    slug: 'kanpur',
    displayName: 'Kanpur',
    displayNameHi: 'कानपुर',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['lucknow', 'prayagraj', 'agra'],
  },
  varanasi: {
    slug: 'varanasi',
    displayName: 'Varanasi',
    displayNameHi: 'वाराणसी',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['prayagraj', 'gorakhpur', 'gaya'],
  },
  prayagraj: {
    slug: 'prayagraj',
    displayName: 'Prayagraj',
    displayNameHi: 'प्रयागराज',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['varanasi', 'kanpur', 'lucknow'],
  },
  agra: {
    slug: 'agra',
    displayName: 'Agra',
    displayNameHi: 'आगरा',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['aligarh', 'gwalior', 'meerut'],
  },
  meerut: {
    slug: 'meerut',
    displayName: 'Meerut',
    displayNameHi: 'मेरठ',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['ghaziabad', 'aligarh', 'delhi'],
  },
  gorakhpur: {
    slug: 'gorakhpur',
    displayName: 'Gorakhpur',
    displayNameHi: 'गोरखपुर',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['varanasi', 'lucknow', 'muzaffarpur'],
  },
  bareilly: {
    slug: 'bareilly',
    displayName: 'Bareilly',
    displayNameHi: 'बरेली',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['lucknow', 'aligarh', 'meerut'],
  },
  aligarh: {
    slug: 'aligarh',
    displayName: 'Aligarh',
    displayNameHi: 'अलीगढ़',
    stateHub: 'uttar-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['agra', 'meerut', 'bareilly'],
  },

  // BIHAR (5)
  patna: {
    slug: 'patna',
    displayName: 'Patna',
    displayNameHi: 'पटना',
    stateHub: 'bihar',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['gaya', 'muzaffarpur', 'bhagalpur', 'darbhanga'],
  },
  gaya: {
    slug: 'gaya',
    displayName: 'Gaya',
    displayNameHi: 'गया',
    stateHub: 'bihar',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['patna', 'bhagalpur', 'varanasi'],
  },
  muzaffarpur: {
    slug: 'muzaffarpur',
    displayName: 'Muzaffarpur',
    displayNameHi: 'मुज़फ़्फ़रपुर',
    stateHub: 'bihar',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['patna', 'darbhanga', 'gorakhpur'],
  },
  bhagalpur: {
    slug: 'bhagalpur',
    displayName: 'Bhagalpur',
    displayNameHi: 'भागलपुर',
    stateHub: 'bihar',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['patna', 'gaya', 'darbhanga'],
  },
  darbhanga: {
    slug: 'darbhanga',
    displayName: 'Darbhanga',
    displayNameHi: 'दरभंगा',
    stateHub: 'bihar',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['muzaffarpur', 'patna', 'bhagalpur'],
  },

  // MADHYA PRADESH (5)
  indore: {
    slug: 'indore',
    displayName: 'Indore',
    displayNameHi: 'इंदौर',
    stateHub: 'madhya-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['ujjain', 'bhopal'],
  },
  bhopal: {
    slug: 'bhopal',
    displayName: 'Bhopal',
    displayNameHi: 'भोपाल',
    stateHub: 'madhya-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['indore', 'ujjain', 'jabalpur'],
  },
  gwalior: {
    slug: 'gwalior',
    displayName: 'Gwalior',
    displayNameHi: 'ग्वालियर',
    stateHub: 'madhya-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['agra', 'bhopal'],
  },
  jabalpur: {
    slug: 'jabalpur',
    displayName: 'Jabalpur',
    displayNameHi: 'जबलपुर',
    stateHub: 'madhya-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['bhopal', 'gwalior'],
  },
  ujjain: {
    slug: 'ujjain',
    displayName: 'Ujjain',
    displayNameHi: 'उज्जैन',
    stateHub: 'madhya-pradesh',
    petrolPricePerLitre: null,
    petrolPriceDate: null,
    petrolPriceSource: null,
    electricityRatePerUnit: null,
    deliveryTimeDays: null,
    dealers: [],
    localUseCases: [],
    localFaq: [],
    nearby: ['indore', 'bhopal'],
  },
}

export const CITY_LIST: CityData[] = Object.values(CITIES)

/**
 * Quality Gate Rule (Build Time & Static Generation):
 * A city page is indexable only if ALL true:
 * 1. >= 1 verified dealer OR confirmed deliveryTimeDays
 * 2. petrolPricePerLitre and petrolPriceDate present
 * 3. >= 3 localUseCases and >= 2 localFaq
 * Else: robots 'noindex,follow', excluded from sitemap.
 */
export function getCityQualityStatus(city: CityData): {
  isIndexable: boolean
  missingFields: string[]
} {
  const missing: string[] = []
  const hasDealerOrDelivery = city.dealers.length > 0 || Boolean(city.deliveryTimeDays)
  if (!hasDealerOrDelivery) missing.push('dealer or deliveryTimeDays')
  if (city.petrolPricePerLitre == null || !city.petrolPriceDate) missing.push('petrolPrice & date')
  if (city.localUseCases.length < 3) missing.push(`localUseCases (has ${city.localUseCases.length}/3)`)
  if (city.localFaq.length < 2) missing.push(`localFaq (has ${city.localFaq.length}/2)`)

  return {
    isIndexable: missing.length === 0,
    missingFields: missing,
  }
}

export function isCityIndexable(city: CityData): boolean {
  return getCityQualityStatus(city).isIndexable
}

export function isStateHubIndexable(hubSlug: StateHubSlug): boolean {
  const hub = STATE_HUBS[hubSlug]
  if (!hub) return false
  const indexableCities = hub.cities.filter((c) => {
    const city = CITIES[c]
    return city && isCityIndexable(city)
  })
  return indexableCities.length >= 2
}

export function getCitiesByStateHub(hubSlug: StateHubSlug): CityData[] {
  return CITY_LIST.filter((c) => c.stateHub === hubSlug)
}
