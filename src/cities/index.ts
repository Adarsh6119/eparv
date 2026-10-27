import type { CityPageData, StatePageData } from './types'

import { CITIES as UP_CITIES } from './uttar-pradesh'
import { CITIES as UP_CITIES_2 } from './uttar-pradesh-2'
import { CITIES as UP_CITIES_3 } from './uttar-pradesh-3'
import { CITIES as UP_CITIES_4 } from './uttar-pradesh-4'
import { CITIES as UP_CITIES_5 } from './uttar-pradesh-5'
import { CITIES as BIHAR_CITIES } from './bihar'
import { CITIES as MP_CITIES } from './madhya-pradesh'
import { CITIES as DELHI_CITIES, REGION_PAGES as DELHI_REGION_PAGES } from './delhi-ncr'
import { CITIES as TELANGANA_CITIES } from './telangana'

export * from './types'

/** Hand-written state-hub content (region pages for Delhi NCR live in ./delhi-ncr). */
const STATE_HUBS: StatePageData[] = [
  {
    slug: 'electric-cycle-in-uttar-pradesh',
    state: 'Uttar Pradesh',
    metaDescription:
      'Electric cycles across Uttar Pradesh — city-wise guides for Lucknow, Kanpur, Noida, Varanasi and more, with delivery, test rides and EMI in every major town.',
    intro: [
      'Uttar Pradesh is too large and too varied for one-size riding advice: Noida’s sector grid, Lucknow’s Shaheed Path corridors, Varanasi’s ghat-adjacent lanes and the sugar-belt towns of the west each produce a different kind of daily trip. What they share is distance — almost every routine journey in every UP city sits between two and ten kilometres, the exact band where an electric cycle beats scooters on cost and cars on convenience. That is why the state is one of the strongest e-cycle markets in the country, and why each city below gets its own guide rather than a copy-paste brochure.',
      'Every city page in this section carries the same practical substance: the real commute corridors riders use, the localities delivery reaches, honest answers about charging and servicing in that town, and a way to book a test ride at your own doorstep. Pick your city to see how an Eparv would actually fit into your week — the economics, the routes and the delivery timeline are spelled out town by town, not invented for the state as a whole.',
      'The buying process is identical everywhere in the state: shortlist a model from the live price and specification comparison on any city page, book the free doorstep test ride, confirm your order with the team, and receive the cycle at your address with a full walkthrough. What changes from town to town is only the delivery timeline and the local riding character — the Kanpur coaching commute, the Varanasi ghat-adjacent lanes, the Noida sector grid — and that is precisely what each guide documents.',
    ],
    whyPoints: [
      {
        title: 'Every city is short-trip country',
        body: 'From Noida’s office sectors to Gorakhpur’s university belt, UP’s routine journeys sit inside e-cycle range — which makes the state’s running-cost savings the largest in absolute terms.',
      },
      {
        title: 'Statewide delivery, one process',
        body: 'Ordering works identically in every covered town: confirm online, get a delivery window, and the cycle arrives mostly assembled with a doorstep walkthrough.',
      },
      {
        title: 'Terrain the assist was built for',
        body: 'Level Gangetic plains, Bundelkhand’s gentle rises, the west’s dust — pedal assist flattens all of it, which is what turns seasonal riders into daily commuters.',
      },
      {
        title: 'Genuine local guides, not templates',
        body: 'Each city page names its own roads, markets and neighbourhoods — because a Kanpur coaching commute and a Varanasi silk-trade run have nothing else in common.',
      },
    ],
    faqs: [
      {
        question: 'Which UP cities do you currently cover?',
        answer:
          'Sixty-six cities across all eighteen divisions have their own pages — the metros (Lucknow, Kanpur, Noida, Ghaziabad, Agra, Varanasi, Prayagraj, Meerut), the west (Bareilly, Moradabad, Aligarh, Saharanpur, Muzaffarnagar), the east (Gorakhpur, Ayodhya, Ballia, Ghazipur, Jaunpur) and Bundelkhand (Jhansi, Banda, Lalitpur, Orai), plus dozens of district towns from Hapur to Sonbhadra. If your town is not listed, you can still enquire; delivery coverage is confirmed when you order.',
      },
      {
        question: 'Do prices and EMI options differ across UP?',
        answer:
          'Pricing is national, so the same model costs the same whether you order in Noida or in Etawah. Where EMI or seasonal offers apply, they apply statewide. What genuinely varies by town is delivery timing and test-ride scheduling, and each city page spells those details out.',
      },
      {
        question: 'How does servicing work outside the big UP metros?',
        answer:
          'Eparv cycles deliberately use standard bicycle components, so mechanical service — brakes, tyres, chains — is handled by the local cycle shops that already exist in every district town. Battery, motor and controller issues run through Eparv’s warranty process regardless of city size.',
      },
      {
        question: 'Is there a state subsidy or registration requirement in UP?',
        answer:
          'Eparv cycles are pedal-assist bicycles built to stay within the low-speed category that needs no RTO registration, licence or insurance in India — so there is no paperwork in any UP city. Subsidy schemes change often and apply mostly to e-two-wheelers; nothing extra is required to ride an e-cycle.',
      },
      {
        question: 'Which Eparv model suits a typical UP city commute?',
        answer:
          'For the flat, 4–10 km routines that define most UP cities, the city-commuter models are the default choice — comfortable geometry, full mudguards and enough range for days of riding. Cargo-friendly variants suit traders moving stock, and the foldable models work for riders combining metro or train legs. The specification comparison table on each city page lays out the trade-offs side by side.',
      },
      {
        question: 'How long does delivery take in UP’s smaller cities?',
        answer:
          'Metro cities like Lucknow, Kanpur and the NCR towns usually receive orders within a few working days. District towns such as Etawah, Firozabad or Saharanpur can need a little longer depending on courier legs, and the exact window is confirmed before you pay — never guessed after.',
      },
    ],
  },
  {
    slug: 'electric-cycle-in-bihar',
    state: 'Bihar',
    metaDescription:
      'Electric cycles across Bihar — city-wise pages for Patna, Gaya, Muzaffarpur, Bhagalpur and more, covering delivery, test rides, charging and servicing locally.',
    intro: [
      'Bihar’s cities share a rhythm: dense markets, college towns that empty and fill with the academic calendar, and distances that rarely cross ten kilometres. Patna’s river-crossing commutes, Gaya’s pilgrim-and-education economy, Muzaffarpur’s trade belts and the district towns in between all run on short, repeated trips — exactly the pattern where an electric cycle’s cost advantage is largest. Fuel saved on those loops compounds into one of the most persuasive household economics in the state.',
      'Rather than one vague state page, every covered city here has its own guide: the real routes riders take, the localities delivery reaches, and honest answers about charging through outages, monsoon practicality and servicing in that specific town. Choose your city below — or enquire directly if yours is not listed yet — and book a test ride at your own door before deciding.',
      'The practical starting point for most Bihar buyers is the specification comparison on each city page: prices, battery capacity, real-world range and charging times laid out side by side for the current lineup. From there, the doorstep test ride settles the question that no table can — how the assist actually feels on your own roads, whether that is a Patna river-crossing commute or the market loops of a district town.',
    ],
    whyPoints: [
      {
        title: 'Short trips, big savings',
        body: 'Bihar’s urban routines — market loops, college runs, river-crossing hops — all sit inside e-cycle range, so the petrol they replace is recurring and the saving compounds monthly.',
      },
      {
        title: 'Built for outage-prone towns',
        body: 'The removable battery charges opportunistically — overnight or whenever power is on — so Patchy supply stops being a barrier; one full charge still covers days of city riding.',
      },
      {
        title: 'Monsoon-honest engineering',
        body: 'Sealed electronics handle rain and splash, and a cycle’s narrow footprint routes around waterlogged stretches that stall heavier two-wheelers every season.',
      },
      {
        title: 'Students first in line',
        body: 'From Patna’s coaching belts to Bhagalpur’s university lanes, the state’s dense student population gets licence-free, fuel-free commuting at the lowest possible running cost.',
      },
    ],
    faqs: [
      {
        question: 'Which Bihar cities have their own pages right now?',
        answer:
          'Twelve cities are covered today: Patna, Gaya, Bhagalpur, Muzaffarpur, Darbhanga, Purnia, Bihar Sharif, Arrah, Begusarai, Katihar, Chhapra and Hajipur — each with local routes, localities and FAQs. Other towns can still order; coverage is confirmed for your pin code when you enquire.',
      },
      {
        question: 'How does delivery to Bihar work?',
        answer:
          'The same way it works everywhere: you order online, the team confirms your address and delivery window, and the cycle reaches your town largely assembled with a doorstep walkthrough of brakes, battery and assist modes. District towns sometimes need an extra transit day, which is stated upfront.',
      },
      {
        question: 'Will charging be a problem with Bihar’s power supply?',
        answer:
          'The charger works from any ordinary socket and tolerates normal voltage fluctuation. Because one charge lasts several days of typical city riding, you simply top up on the nights the supply is on — most riders never consciously plan around outages at all.',
      },
      {
        question: 'Is an e-cycle usable through the monsoon in Bihar?',
        answer:
          'Yes, with the same judgement any rider applies in the season: the electricals are sealed against rain splash but should not be submerged, and waterlogged stretches are routed around rather than ridden through. For many commuters the cycle is actually the most reliable monsoon machine they own.',
      },
      {
        question: 'Can the cycle carry loads for shop and mandi work in Bihar?',
        answer:
          'The cargo-friendly models are specified for short, repeated, loaded runs — sacks from the mandi, cartons between shop and godown, stock to the weekly haat. The rack and frame take real weight, the motor handles stop-start hauling, and each trip costs a few paise of electricity instead of a tempo hire.',
      },
      {
        question: 'What does an Eparv cost and is EMI available in Bihar?',
        answer:
          'Pricing is the same as everywhere — the live comparison table on each city page lists current model prices and specifications. EMI options are confirmed with the team when you order, so the purchase can be spread over monthly instalments rather than paid upfront.',
      },
    ],
  },
  {
    slug: 'electric-cycle-in-madhya-pradesh',
    state: 'Madhya Pradesh',
    metaDescription:
      'Electric cycles across Madhya Pradesh — dedicated guides for Bhopal, Indore, Jabalpur, Gwalior and more, with delivery, test rides and local servicing FAQs.',
    intro: [
      'Madhya Pradesh spreads from Indore’s commercial energy and Bhopal’s lake-side capital calm to the coal belt of Singrauli and the pilgrim flows of Ujjain — and its towns share one commuting truth: the daily distances are short, the roads are rideable, and the petrol bill for covering them keeps rising. An electric cycle answers all three at once, turning the typical 4–10 km town trip into a paise-per-ride affair that also happens to be the most pleasant way to move through MP’s wide markets and quiet colonies.',
      'Each covered city below has its own page with the details that actually matter locally — the corridors riders use, the neighbourhoods delivery reaches, how charging and servicing work in that town, and a doorstep test ride before you commit. The state guide ties them together; the city pages do the honest, specific work.',
      'For buyers comparing options, every city page now carries a live price and specification comparison of the current Eparv lineup — battery capacity, claimed range, charging time, top speed, weight and warranty side by side. Combined with the real corridors and localities listed for each town, that is everything needed to shortlist a model before the test ride settles it.',
    ],
    whyPoints: [
      {
        title: 'Town distances favour assist',
        body: 'MP’s cities are built at cycling scale — markets, campuses and industrial belts within a few kilometres — so pedal assist covers a full day of errands on one cheap charge.',
      },
      {
        title: 'Summer-proof commuting',
        body: 'MP summers end plain cycling; the motor carrying most of the effort is what makes year-round riding realistic from Gwalior to Rewa.',
      },
      {
        title: 'Industrial and trade use',
        body: 'From Pithampur’s belts to Singrauli’s energy townships, shift workers and traders gain schedule independence with a machine that charges at home overnight.',
      },
      {
        title: 'One process, every city',
        body: 'Ordering, delivery, EMI and support work identically across the state — only the delivery timeline and test-ride scheduling change from town to town, and each page says so.',
      },
    ],
    faqs: [
      {
        question: 'Which Madhya Pradesh cities are covered so far?',
        answer:
          'Fifteen cities currently have dedicated pages: Bhopal, Indore, Jabalpur, Gwalior, Ujjain, Sagar, Dewas, Satna, Ratlam, Rewa, Khandwa, Chhindwara, Guna, Vidisha and Singrauli. If your town is not on the list yet, you can still enquire — coverage and timelines are confirmed when you order.',
      },
      {
        question: 'Do I need registration or a licence for an e-cycle in MP?',
        answer:
          'No. Eparv cycles are pedal-assist bicycles in the low-speed category that requires no RTO registration, driving licence or insurance anywhere in India — including every MP city. You buy it, charge it and ride it, with none of the paperwork a scooter demands.',
      },
      {
        question: 'How is servicing handled in MP’s smaller cities?',
        answer:
          'The mechanical side — brakes, tyres, chains — follows ordinary bicycle service that cycle shops in every district town already provide. Electrical components are warranty-backed and supported directly by Eparv, so nothing depends on finding a local e-vehicle specialist.',
      },
      {
        question: 'Are test rides available outside Bhopal and Indore?',
        answer:
          'Yes. Test rides are arranged in every covered city — coordinated around your home or workplace, on the roads you actually ride. Book through the form on any city page and the team fixes a slot; smaller towns sometimes need a day or two of notice.',
      },
      {
        question: 'Which model works best for MP’s mixed terrain?',
        answer:
          'The state splits into flat plains (Bhopal, Ujjain, Ratlam), river-and-rock towns (Jabalpur) and genuinely hilly pockets (Chhindwara). City-commuter models handle the first category easily; for hillier towns the models with stronger motor output and bigger batteries keep climbs comfortable. The comparison table on each city page shows which lineup member suits which terrain.',
      },
      {
        question: 'How does an e-cycle handle MP summers on longer town routes?',
        answer:
          'The assist does the heavy lifting — a 6–10 km ride that would drench a plain cyclist stays manageable because the motor carries most of the effort. Charge indoors during peak afternoon heat, park in shade where possible, and the battery stays healthy through May and June.',
      },
    ],
  },
]

const RAW_CITY_PAGES: CityPageData[] = [
  ...UP_CITIES,
  ...UP_CITIES_2,
  ...UP_CITIES_3,
  ...UP_CITIES_4,
  ...UP_CITIES_5,
  ...BIHAR_CITIES,
  ...MP_CITIES,
  ...DELHI_CITIES,
  ...TELANGANA_CITIES,
]

const CITY_PAGE_SLUG_SET = new Set(RAW_CITY_PAGES.map((city) => city.slug))

const CITY_PAGES: CityPageData[] = RAW_CITY_PAGES.map((city) => ({
  ...city,
  // Internal links must only ever point at pages that exist.
  nearbySlugs: city.nearbySlugs.filter(
    (slug) => slug !== city.slug && CITY_PAGE_SLUG_SET.has(slug),
  ),
}))

const STATE_PAGES: StatePageData[] = [...STATE_HUBS, ...DELHI_REGION_PAGES]

const STATE_PAGE_SLUG_SET = new Set(STATE_PAGES.map((page) => page.slug))

if (process.env.NODE_ENV !== 'production') {
  const seen = new Set<string>()
  for (const city of CITY_PAGES) {
    if (seen.has(city.slug)) {
      console.warn(`[cities] duplicate city slug: ${city.slug}`)
    }
    seen.add(city.slug)
  }
  for (const page of STATE_PAGES) {
    if (seen.has(page.slug)) {
      console.warn(`[cities] duplicate state/region slug: ${page.slug}`)
    }
    seen.add(page.slug)
  }
}

export const CITY_PAGE_SLUGS: string[] = [...CITY_PAGE_SLUG_SET]
export const STATE_PAGE_SLUGS: string[] = [...STATE_PAGE_SLUG_SET]

/** Every programmatically-served `/electric-cycle-in-*` slug (cities + state/region hubs). */
export const REGISTRY_SLUGS: string[] = [...CITY_PAGE_SLUGS, ...STATE_PAGE_SLUGS]

export const getCityPageBySlug = (slug: string): CityPageData | undefined =>
  CITY_PAGES.find((city) => city.slug === slug)

export const getStatePageBySlug = (slug: string): StatePageData | undefined =>
  STATE_PAGES.find((page) => page.slug === slug)

export const isRegistrySlug = (slug: string | null | undefined): boolean =>
  typeof slug === 'string' &&
  (CITY_PAGE_SLUG_SET.has(slug) || STATE_PAGE_SLUG_SET.has(slug))

export const nearbyCities = (city: CityPageData): CityPageData[] =>
  city.nearbySlugs
    .map((slug) => getCityPageBySlug(slug))
    .filter((city): city is CityPageData => Boolean(city))

/** Cities belonging to a state hub (or explicitly listed for a region page). */
export const citiesForStatePage = (page: StatePageData): CityPageData[] => {
  if (page.linkedCitySlugs?.length) {
    return page.linkedCitySlugs
      .map((slug) => getCityPageBySlug(slug))
      .filter((city): city is CityPageData => Boolean(city))
  }
  return CITY_PAGES.filter((city) => city.stateHubSlug === page.slug)
}

/** Other state/region hubs, for cross-linking at the bottom of each page. */
export const otherStatePages = (page: StatePageData): StatePageData[] =>
  STATE_PAGES.filter((candidate) => candidate.slug !== page.slug)

export const allStatePages = (): StatePageData[] => STATE_PAGES
