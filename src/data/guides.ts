export interface GuideSection {
  heading: string
  body: string
}

export interface GuideFaq {
  question: string
  answer: string
}

export interface GuidePost {
  slug: string
  url: string
  title: string
  isPillar: boolean
  primaryKeyword: string
  secondaryKeywords: string[]
  author: string
  authorRole: string
  lastReviewedDate: string
  readTimeMinutes: number
  directAnswer: string
  moneyPageLinks: { anchor: string; url: string }[]
  siblingPostSlugs: string[]
  sections: GuideSection[]
  faqs: GuideFaq[]
}

export const GUIDES: Record<string, GuidePost> = {
  'electric-cycles-explained': {
    slug: 'electric-cycles-explained',
    url: '/posts/electric-cycles-explained',
    title: 'Electric Cycles Explained: The Complete Guide to Electric Bicycles in India',
    isPillar: true,
    primaryKeyword: 'electric cycle guide india',
    secondaryKeywords: [
      'how electric cycle works',
      'electric cycle buying guide',
      'types of electric cycles india',
    ],
    author: 'Eparv Engineering Team',
    authorRole: 'EV Mobility Research Group',
    lastReviewedDate: '2026-10-28',
    readTimeMinutes: 10,
    directAnswer:
      'An electric cycle (e-cycle) combines a standard bicycle chassis with a 250W electric motor, rechargeable lithium-ion battery, and intelligent controller. In India, low-speed e-cycles capped at 25 km/h require zero driving license or RTO registration, offering 50–110 km range per charge at just ₹0.05 per kilometer.',
    moneyPageLinks: [
      { anchor: 'Eparv electric cycles', url: '/electric-cycles' },
      { anchor: 'book a free test ride', url: '/book-test-ride' },
    ],
    siblingPostSlugs: ['electric-cycle-license-rto-rules-india', 'electric-cycle-real-range-pas-vs-throttle'],
    sections: [
      {
        heading: 'Anatomy of an Electric Cycle',
        body: 'Every modern electric bicycle consists of five core synchronized sub-systems: the frame chassis, a brushless DC hub motor, a high-density lithium-ion battery pack with an integrated Battery Management System (BMS), an electronic motor controller, and rider interface controls (throttle and pedal-assist sensors).',
      },
      {
        heading: 'Motor Technology: Why 250W BLDC Hub Motors Dominate India',
        body: 'Brushless DC (BLDC) motors positioned in the rear wheel hub deliver high starting torque (35 to 45 Nm) directly to the road surface without putting stress on the pedal crank or chain. With no mechanical brushes to wear out, BLDC hub motors offer 50,000+ kilometer service lifetimes with zero maintenance.',
      },
      {
        heading: 'Riding Modes: Pure Throttle vs Pedal Assist (PAS)',
        body: 'Eparv cycles feature dual drive modes: Pure Throttle operates identically to a scooter, propelling you up to 25 km/h with zero pedaling. Pedal Assist System (PAS) uses cadence sensors to detect crank rotation, multiplying your human pedaling effort by up to 80% for sweat-free riding and extended battery range up to 110 km.',
      },
      {
        heading: 'Battery Chemistry and Charging Dynamics',
        body: 'Advanced NMC and LFP lithium-ion chemistries have replaced heavy lead-acid batteries. A key-detachable 36V 10.4Ah pack weighs under 3 kg and recharges from empty in 3 to 4 hours from any standard 5A household wall socket, consuming less than 0.4 units of electricity.',
      },
      {
        heading: 'Indian CMVR Legal Regulations Explained',
        body: 'Under Rule 2(u) of the Central Motor Vehicles Rules (CMVR), electric bicycles with electric motors rated under 250W and maximum assisted speed not exceeding 25 km/h are legally categorized as non-motorized vehicles. They do not require a driving license, road tax, or RTO registration plate.',
      },
    ],
    faqs: [
      {
        question: 'Do I need a driving license for an electric cycle in India?',
        answer:
          'No. As long as the motor is 250W or less and the top speed is capped at 25 km/h, Indian CMVR law classifies it as a non-motorized bicycle requiring no driving license, registration, or road tax.',
      },
      {
        question: 'What is the daily running cost of an electric cycle?',
        answer:
          'A typical 36V battery consumes around 0.3 to 0.4 units of domestic electricity per full charge (costing ₹2 to ₹3), providing 50 to 110 km of range, which works out to approximately ₹0.05 per kilometer.',
      },
    ],
  },

  'e-cycle-battery-care-basics': {
    slug: 'e-cycle-battery-care-basics',
    url: '/posts/e-cycle-battery-care-basics',
    title: 'Electric Cycle Battery Care: How to Maximize Lithium-ion Life and Range',
    isPillar: false,
    primaryKeyword: 'electric cycle battery care',
    secondaryKeywords: [
      'lithium battery life cycle',
      'how to charge electric bicycle battery',
      'electric cycle battery maintenance',
    ],
    author: 'Vikram Joshi',
    authorRole: 'Battery Systems Engineer',
    lastReviewedDate: '2026-10-25',
    readTimeMinutes: 6,
    directAnswer:
      'To maximize electric cycle lithium battery life to 4+ years, avoid discharging below 20%, do not leave the battery on the charger overnight after reaching 100%, charge at room temperature away from direct midday sun, and store at 50% charge if unused for extended periods.',
    moneyPageLinks: [
      { anchor: 'long-range electric cycles', url: '/electric-cycle-under-25000' },
      { anchor: 'Eparv Lahari 110 km', url: '/electric-cycles/eparv-lahari' },
    ],
    siblingPostSlugs: ['electric-cycles-explained', 'electric-cycle-real-range-pas-vs-throttle'],
    sections: [
      {
        heading: 'The 20% to 80% State-of-Charge Rule',
        body: 'Lithium-ion cells experience the lowest chemical stress when operated between 20% and 80% charge. Avoid running the pack down to zero until the motor cuts out, as deep discharges accelerate anode degradation.',
      },
      {
        heading: 'Managing Indian Summer Ambient Heat',
        body: 'Never charge a battery immediately after a long ride in 42°C summer heat. Allow the cells to cool indoors for 30 minutes before plugging into the charger.',
      },
    ],
    faqs: [
      {
        question: 'How many years does an e-cycle lithium battery last?',
        answer:
          'A quality lithium pack rated for 800–1,200 charge cycles lasts 3 to 5 years under normal daily commute conditions before capacity drops to 80%.',
      },
    ],
  },

  'five-questions-before-buying-an-electric-cycle': {
    slug: 'five-questions-before-buying-an-electric-cycle',
    url: '/posts/five-questions-before-buying-an-electric-cycle',
    title: 'Things to Check Before Buying an Electric Cycle in India (Buyer Checklist)',
    isPillar: false,
    primaryKeyword: 'things to check before buying electric cycle',
    secondaryKeywords: [
      'electric cycle buyer checklist',
      'how to choose electric cycle',
      'questions before buying e-cycle',
    ],
    author: 'Ananya Sen',
    authorRole: 'Product Evaluation Lead',
    lastReviewedDate: '2026-10-27',
    readTimeMinutes: 7,
    directAnswer:
      'Before purchasing an electric cycle in India, verify 5 critical factors: true motor wattage (250W legal cap), battery chemistry (insist on Grade-A Lithium-ion over lead-acid), real-world throttle vs pedal-assist range, availability of electronic motor cut-off brakes, and pan-India warranty spare parts support.',
    moneyPageLinks: [
      { anchor: 'compare all Eparv models', url: '/electric-cycles' },
      { anchor: 'test ride at your doorstep', url: '/book-test-ride' },
    ],
    siblingPostSlugs: ['electric-cycles-explained', 'electric-cycle-running-cost-per-km'],
    sections: [
      {
        heading: '1. Motor Wattage & Legal Compliance',
        body: 'Confirm the hub motor is rated at 250W. Overpowered motors above 250W require RTO registration, road tax, and driving licenses under Motor Vehicles Act provisions.',
      },
      {
        heading: '2. Battery Type & Portability',
        body: 'Ensure the pack is detachable with an anti-theft key lock, enabling charging inside high-rise apartments without parking socket access.',
      },
    ],
    faqs: [
      {
        question: 'Is pedal assist better than pure throttle for Indian commutes?',
        answer:
          'Dual-mode cycles with both throttle and pedal assist offer the best flexibility: throttle for effortless flyover starts, and pedal assist for extended 60–110 km range.',
      },
    ],
  },

  'electric-cycle-license-rto-rules-india': {
    slug: 'electric-cycle-license-rto-rules-india',
    url: '/posts/electric-cycle-license-rto-rules-india',
    title: 'Do Electric Cycles Need a Driving License or RTO Registration in India? (CMVR Rules)',
    isPillar: false,
    primaryKeyword: 'electric cycle license required',
    secondaryKeywords: [
      'electric cycle rto rules india',
      'is helmet compulsory for electric cycle',
      'electric bicycle motor vehicle act',
    ],
    author: 'Legal & Compliance Desk',
    authorRole: 'Regulatory Affairs',
    lastReviewedDate: '2026-10-29',
    readTimeMinutes: 6,
    directAnswer:
      'Under the Central Motor Vehicles Rules (CMVR), electric cycles with a maximum power output of 250 Watts or less and a maximum assisted speed capped at 25 km/h do NOT require a driving license, RTO registration, or road tax in India. They are legally treated as non-motorized bicycles.',
    moneyPageLinks: [
      { anchor: 'Eparv student electric cycles', url: '/electric-cycle-for-students' },
      { anchor: 'electric cycle under 20000', url: '/electric-cycle-under-20000' },
    ],
    siblingPostSlugs: ['electric-cycles-explained', 'electric-cycle-vs-petrol-scooter-cost'],
    sections: [
      {
        heading: 'The Official CMVR Exemption Criteria',
        body: 'Section 2(u) of the CMVR explicitly exempts two-wheeled battery-operated vehicles with maximum continuous 30-minute power output not exceeding 0.25 kW (250 Watts) and maximum design speed not exceeding 25 km/h from motor vehicle status.',
      },
      {
        heading: 'Age Restrictions and Helmet Requirements',
        body: 'Because they are categorized as non-motorized pedal cycles, riders 16 years and older can commute freely to schools and colleges. While motorbike helmets are not legally enforced by traffic police for 250W cycles, Eparv strongly recommends wearing a standard cycling helmet.',
      },
    ],
    faqs: [
      {
        question: 'Can traffic police stop me for not having a license on a 250W electric cycle?',
        answer:
          'No. Traffic police have no jurisdiction to demand a driving license or registration certificate for cycles compliant with the CMVR 250W / 25 km/h limit.',
      },
      {
        question: 'Do I need insurance for an electric cycle?',
        answer:
          'Third-party vehicle insurance is not legally mandatory for 250W e-cycles, though personal property or home contents insurance may cover theft.',
      },
    ],
  },

  'electric-cycle-real-range-pas-vs-throttle': {
    slug: 'electric-cycle-real-range-pas-vs-throttle',
    url: '/posts/electric-cycle-real-range-pas-vs-throttle',
    title: 'Electric Cycle Real Range: Pedal Assist (PAS) vs Pure Throttle Explained',
    isPillar: false,
    primaryKeyword: 'electric cycle real range',
    secondaryKeywords: [
      'pedal assist vs throttle range',
      'electric bicycle km per charge',
      'real world e-cycle mileage',
    ],
    author: 'Eparv Test Lab',
    authorRole: 'Powertrain Validation',
    lastReviewedDate: '2026-10-28',
    readTimeMinutes: 7,
    directAnswer:
      'Real-world electric cycle range depends heavily on drive mode: Pure Throttle typically delivers 35 to 60 km per charge, while Pedal Assist System (PAS) delivers 55 to 110 km on the exact same battery by combining human effort with intelligent motor assistance.',
    moneyPageLinks: [
      { anchor: 'Eparv Lahari 110 km range', url: '/electric-cycles/eparv-lahari' },
      { anchor: 'Eparv Visakka trail cycle', url: '/electric-cycles/eparv-visakka' },
    ],
    siblingPostSlugs: ['electric-cycles-explained', 'e-cycle-battery-care-basics'],
    sections: [
      {
        heading: 'Understanding Watt-Hours (Wh) Calculation',
        body: 'Range is determined by battery energy capacity in Watt-Hours (Voltage × Amp-Hours). A 36V 10.4Ah battery contains 374.4 Wh. In throttle mode, consumption averages 7–9 Wh/km; in pedal assist mode, consumption drops to 3–4 Wh/km.',
      },
      {
        heading: 'Factors Impacting Real-World Range in India',
        body: 'Rider body weight, tyre inflation pressure (keep at 40 PSI), frequent stop-and-go city signals, headwinds, and elevation gradients all influence final mileage.',
      },
    ],
    faqs: [
      {
        question: 'Why does pedal assist give almost double the range of throttle?',
        answer:
          'Because your legs provide 40% to 60% of the mechanical energy needed to sustain speed, dramatically reducing current draw from the lithium battery cells.',
      },
    ],
  },

  'electric-cycle-running-cost-per-km': {
    slug: 'electric-cycle-running-cost-per-km',
    url: '/posts/electric-cycle-running-cost-per-km',
    title: 'Electric Cycle Running Cost Per KM: Complete Electricity & Maintenance Maths',
    isPillar: false,
    primaryKeyword: 'electric cycle running cost per km',
    secondaryKeywords: [
      'cost per km electric cycle',
      'electric cycle electricity bill',
      'e-cycle vs petrol cost calculation',
    ],
    author: 'Financial Analysis Desk',
    authorRole: 'EV Total Cost of Ownership Group',
    lastReviewedDate: '2026-10-29',
    readTimeMinutes: 5,
    directAnswer:
      'An electric cycle in India costs approximately ₹0.04 to ₹0.06 per kilometer in electricity. Charging a 36V 280Wh battery consumes about 0.3 units of electricity (₹2.10 at ₹7/unit). Over a 50 km commute, total electricity cost is under ₹2.50.',
    moneyPageLinks: [
      { anchor: 'electric cycle under 20000', url: '/electric-cycle-under-20000' },
      { anchor: 'Eparv Panther commuter', url: '/electric-cycles/eparv-panther' },
    ],
    siblingPostSlugs: ['electric-cycle-vs-petrol-scooter-cost', 'electric-cycles-explained'],
    sections: [
      {
        heading: 'The Transparent Cost Formula',
        body: 'Cost Per KM = (Battery Wh / 1000 × Electricity Tariff per Unit) / Range in KM. For a 374 Wh battery: (0.374 × ₹7) / 60 km = ₹0.043 per kilometer.',
      },
    ],
    faqs: [
      {
        question: 'How much does my monthly electricity bill increase with an electric cycle?',
        answer:
          'Riding 25 km every day requires roughly 12 to 15 full charges per month, adding only ₹25 to ₹40 to your household monthly electricity bill.',
      },
    ],
  },

  'electric-cycle-vs-petrol-scooter-cost': {
    slug: 'electric-cycle-vs-petrol-scooter-cost',
    url: '/posts/electric-cycle-vs-petrol-scooter-cost',
    title: 'Electric Cycle vs Petrol Scooter Cost Comparison: 3-Year Ownership Analysis',
    isPillar: false,
    primaryKeyword: 'electric cycle vs scooter',
    secondaryKeywords: [
      'electric cycle vs activa cost',
      'petrol bike vs electric cycle savings',
      'electric bicycle roi india',
    ],
    author: 'Aditya Malhotra',
    authorRole: 'Mobility Economics Lead',
    lastReviewedDate: '2026-10-29',
    readTimeMinutes: 7,
    directAnswer:
      'Comparing an electric cycle to a 110cc petrol scooter over 3 years: An electric cycle saves approximately ₹85,000 to ₹1,10,000 in fuel, zero engine oil changes, zero RTO taxes, and zero mandatory third-party insurance renewals.',
    moneyPageLinks: [
      { anchor: 'Eparv electric cycles', url: '/electric-cycles' },
      { anchor: 'electric cycle for delivery', url: '/electric-cycle-for-delivery' },
    ],
    siblingPostSlugs: ['electric-cycle-running-cost-per-km', 'electric-cycle-license-rto-rules-india'],
    sections: [
      {
        heading: 'Fuel Cost Disparity: ₹105/L Petrol vs ₹7/Unit Power',
        body: 'A petrol scooter getting 45 km/L at ₹105/litre costs ₹2.33 per km. An electric cycle costs ₹0.05 per km — a 98% direct reduction in daily mobility fuel expenditure.',
      },
    ],
    faqs: [
      {
        question: 'Can an electric cycle fully replace a petrol scooter for city trips?',
        answer:
          'For individual urban trips under 25 km, yes. E-cycles bypass traffic jams, require zero parking fees, and travel signal-to-signal just as quickly as motorbikes in city gridlock.',
      },
    ],
  },

  'electric-cycle-in-rain-monsoon-safety': {
    slug: 'electric-cycle-in-rain-monsoon-safety',
    url: '/posts/electric-cycle-in-rain-monsoon-safety',
    title: 'Riding an Electric Cycle in Indian Rain & Monsoons: Waterproofing & Safety Rules',
    isPillar: false,
    primaryKeyword: 'electric cycle in rain',
    secondaryKeywords: [
      'can we ride electric cycle in rain',
      'monsoon waterproof electric bicycle',
      'e-cycle water damage protection',
    ],
    author: 'Eparv Testing Lab',
    authorRole: 'Waterproofing Engineering',
    lastReviewedDate: '2026-10-26',
    readTimeMinutes: 6,
    directAnswer:
      'Yes, you can safely ride quality electric cycles in the rain. Eparv electric cycles feature IP65 water-sealed wiring harnesses, weather-isolated BLDC hub motors, and sealed battery enclosures. Never submerge the hub motor or bottom bracket in deep standing floodwater.',
    moneyPageLinks: [
      { anchor: 'Eparv Visakka all-weather MTB', url: '/electric-cycles/eparv-visakka' },
      { anchor: 'Eparv Satya rugged cycle', url: '/electric-cycles/eparv-satya' },
    ],
    siblingPostSlugs: ['e-cycle-battery-care-basics', 'electric-cycles-explained'],
    sections: [
      {
        heading: 'IP65 Weather Resistance Explained',
        body: 'Ingress Protection (IP65) certifies that electrical enclosures prevent dust ingress and resist low-pressure water jets from any direction, protecting against heavy monsoon downpours.',
      },
    ],
    faqs: [
      {
        question: 'Will I get an electric shock if it rains while riding?',
        answer:
          'No. 36V DC systems are classified as extra-low voltage and are fully insulated with water-sealed quick-disconnect couplings.',
      },
    ],
  },

  'electric-cycle-for-delivery-business-guide': {
    slug: 'electric-cycle-for-delivery-business-guide',
    url: '/posts/electric-cycle-for-delivery-business-guide',
    title: 'How Electric Cycles Revolutionize Food & Grocery Delivery Fleets in India',
    isPillar: false,
    primaryKeyword: 'electric cycle for delivery business',
    secondaryKeywords: [
      'zomato swiggy electric cycle guide',
      'commercial e-cycle fleet roi',
      'hyperlocal delivery electric bicycle',
    ],
    author: 'Commercial Logistics Group',
    authorRole: 'Fleet Strategy Lead',
    lastReviewedDate: '2026-10-28',
    readTimeMinutes: 8,
    directAnswer:
      'Hyper-local delivery fleets switching from petrol two-wheelers to electric cycles save over ₹4,500 per rider every month in fuel, eliminate driving license hiring bottlenecks, and reduce delivery downtime with 10-second battery swaps.',
    moneyPageLinks: [
      { anchor: 'Eparv delivery electric cycles', url: '/electric-cycle-for-delivery' },
      { anchor: 'bulk fleet proposals', url: '/bulk-orders' },
    ],
    siblingPostSlugs: ['electric-cycle-vs-petrol-scooter-cost', 'electric-cycles-explained'],
    sections: [
      {
        heading: 'The Commercial Delivery Math',
        body: 'A food delivery gig rider covering 60 km daily spends ₹4,200 monthly on petrol. On an Eparv Savitri electric cycle, monthly electricity cost is ₹120, boosting rider net take-home earnings by 30%.',
      },
    ],
    faqs: [
      {
        question: 'Can electric cycles carry heavy grocery delivery bags?',
        answer:
          'Yes, purpose-built delivery cycles feature reinforced rear steel carriers rated for 35 kg cargo crates and 140 kg total payload.',
      },
    ],
  },

  'eparv-vs-emotorad-electric-cycle': {
    slug: 'eparv-vs-emotorad-electric-cycle',
    url: '/posts/eparv-vs-emotorad-electric-cycle',
    title: 'Eparv vs eMotorad Electric Cycles: Feature, Motor, Battery & Price Comparison',
    isPillar: false,
    primaryKeyword: 'eparv vs emotorad',
    secondaryKeywords: [
      'emotorad alternative india',
      'best electric cycle brand comparison',
      'eparv panther vs emotorad doodle',
    ],
    author: 'Independent Editorial Review',
    authorRole: 'EV Mobility Analyst',
    lastReviewedDate: '2026-10-29',
    readTimeMinutes: 8,
    directAnswer:
      'Comparing Eparv and eMotorad electric cycles: Both brands offer 250W BLDC hub motors and detachable 36V lithium batteries. Eparv emphasizes indigenous Indian road geometry, sub-₹20,000 entry pricing, and 110 km extended touring range on models like Lahari and Savitri.',
    moneyPageLinks: [
      { anchor: 'Eparv electric cycle lineup', url: '/electric-cycles' },
      { anchor: 'book a free test ride', url: '/book-test-ride' },
    ],
    siblingPostSlugs: ['five-questions-before-buying-an-electric-cycle', 'electric-cycles-explained'],
    sections: [
      {
        heading: 'Like-for-Like Specifications Comparison',
        body: 'Comparing entry-level models: Eparv Panther (₹19,999) delivers 55 km range with 250W BLDC hub motor and dual disc brakes, offering higher accessible value in the sub-20k segment.',
      },
    ],
    faqs: [
      {
        question: 'Which brand offers longer range per single charge?',
        answer:
          'Eparv models like Lahari and Savitri offer extended-capacity packs delivering up to 110 km range in pedal assist.',
      },
    ],
  },
}

export const GUIDE_LIST: GuidePost[] = Object.values(GUIDES)

export function getGuideBySlug(slug: string): GuidePost | undefined {
  const clean = slug.replace(/^\//, '').replace(/^posts\//, '').replace(/^blog\//, '')
  return GUIDES[clean]
}
