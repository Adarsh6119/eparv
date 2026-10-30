export interface IntentFaq {
  question: string
  answer: string
}

export interface IntentHubData {
  slug: string
  url: string
  title: string
  h1: string
  primaryKeyword: string
  secondaryKeywords: string[]
  directAnswer: string
  priceFilterMax?: number
  personaCriteria: { title: string; desc: string }[]
  personaMaths: {
    heading: string
    formula: string
    example: string
    monthlySavings: string
  }
  faqs: IntentFaq[]
  relatedGuideSlug: string
  targetCities: string[]
}

export const INTENT_HUBS: Record<string, IntentHubData> = {
  'under-20000': {
    slug: 'electric-cycle-under-20000',
    url: '/electric-cycle-under-20000',
    title: 'Electric Cycle Under 20000 in India: Models, Range & Specs | Eparv',
    h1: 'Electric Cycle Under 20000: Best Affordable EV Cycles',
    primaryKeyword: 'electric cycle under 20000',
    secondaryKeywords: [
      'cheapest electric cycle in india',
      '20000 ke andar electric cycle',
      'सस्ती इलेक्ट्रिक साइकिल',
    ],
    directAnswer:
      'Looking for an electric cycle under ₹20,000 in India? Eparv offers high-torque 250W BLDC commuter models equipped with 36V quick-charge lithium batteries, offering 55–110 km range in pedal assist. Full factory warranty, dual brakes, and zero RTO paperwork included.',
    priceFilterMax: 20000,
    personaCriteria: [
      {
        title: 'Real Lithium Battery (Not Heavy Lead-Acid)',
        desc: 'Ensure the cycle uses high energy density lithium-ion cells with 800–1000 cycle lifespan rather than obsolete 15 kg lead-acid blocks.',
      },
      {
        title: 'True 250W BLDC Motor',
        desc: 'Check for a brushless hub motor that delivers 35+ Nm torque for climbing flyovers without pedaling strain.',
      },
      {
        title: 'Detachable Battery Pack',
        desc: 'Enables safe charging inside your home or office with a key lock to prevent theft.',
      },
    ],
    personaMaths: {
      heading: 'Daily Commute Cost vs Bus/Metro',
      formula: '0.28 kWh per full charge × ₹7/unit = ₹1.96 per 55 km commute (~₹0.04/km)',
      example: 'A rider doing 20 km daily spends ₹25 monthly on electricity vs ₹800–₹1,200 on public transport or ₹2,200 on petrol.',
      monthlySavings: '₹1,500 – ₹2,200 per month',
    },
    faqs: [
      {
        question: 'Which is the best electric cycle under 20000 in India?',
        answer:
          'Eparv Panther (₹19,999) and Eparv Savitri (₹18,999) both qualify under the ₹20,000 threshold, providing 250W hub motors, detachable lithium batteries, and 55–110 km range.',
      },
      {
        question: 'Kya 20000 ke andar electric cycle ke liye license chahiye?',
        answer:
          'Nahi. Indian CMVR guidelines ke mutabiq 250W power aur 25 km/h top speed wali electric cycles non-motorized vehicle category me aati hain, isliye kisi driving license ya RTO registration ki zaroorat nahi hoti.',
      },
      {
        question: 'How long does a 20000 electric cycle battery last?',
        answer:
          'Quality lithium-ion packs typically last 800 to 1,200 charge cycles, representing 3 to 4 years of daily commute use before capacity drops below 80%.',
      },
      {
        question: 'Can I ride an e-cycle under 20k without pedaling?',
        answer:
          'Yes. Models equipped with a full throttle mode allow you to ride purely on motor power up to 25 km/h without pedaling.',
      },
      {
        question: 'What is the warranty coverage on budget models?',
        answer:
          'Eparv provides a 5-year frame warranty, 24 months on the BLDC hub motor, and 12 months on the lithium battery pack.',
      },
      {
        question: 'Can the battery be charged from a normal home socket?',
        answer:
          'Yes, the detachable battery charges using any standard 5A household wall socket in approximately 2 to 3 hours.',
      },
    ],
    relatedGuideSlug: 'electric-cycle-running-cost-per-km',
    targetCities: ['delhi', 'patna', 'kanpur'],
  },

  'under-25000': {
    slug: 'electric-cycle-under-25000',
    url: '/electric-cycle-under-25000',
    title: 'Electric Cycle Under 25000: Best Priority Picks by Range & Terrain | Eparv',
    h1: 'Best Electric Cycle Under 25000 in India',
    primaryKeyword: 'electric cycle under 25000',
    secondaryKeywords: [
      'best electric cycle under 25000',
      '25000 me electric cycle',
      'बैटरी वाली साइकिल कीमत',
    ],
    directAnswer:
      'Under ₹25,000, riders gain access to advanced front suspension forks, up to 110 km extended touring range, dual disc brakes, and reinforced trail alloy frames. Compare Eparv’s models under 25k ranked by your primary riding priority: range, comfort, or rough terrain.',
    priceFilterMax: 25000,
    personaCriteria: [
      {
        title: 'Priority 1: Long Range Touring (110 km)',
        desc: 'Select high-capacity 10.4Ah battery packs for 110 km range like the Eparv Lahari or Savitri.',
      },
      {
        title: 'Priority 2: Rough Terrain & Pothole Absorption',
        desc: 'Look for telescopic suspension forks and knobby all-terrain tyres like the Eparv Visakka (₹24,999).',
      },
      {
        title: 'Priority 3: Fast City Commute & Agile Weight',
        desc: 'Choose lightweight rigid alloy forks and low-drag urban tyres for quick city sprints like the Panther (₹19,999).',
      },
    ],
    personaMaths: {
      heading: 'Payback Timeline vs 110cc Petrol Scooter',
      formula: 'Scooter: 50 km/day × ₹2.50/km = ₹3,750/month. E-Cycle: 50 km/day × ₹0.05/km = ₹75/month.',
      example: 'Monthly net savings of ₹3,675 means a ₹24,999 investment breaks even in less than 7 months.',
      monthlySavings: '₹3,500 – ₹4,000 per month',
    },
    faqs: [
      {
        question: 'What is the main advantage of an electric cycle under 25000 vs 20000?',
        answer:
          'Under 25k models add telescopic front suspension for rough roads, larger 10.4Ah battery capacities for 100+ km range, and dual mechanical disc brakes for superior stopping control.',
      },
      {
        question: 'Which model under 25000 is best for off-road trails?',
        answer:
          'The Eparv Visakka (₹24,999) is specifically engineered for trails with 80mm front suspension travel, 27.5-inch knobby tyres, and reinforced hardtail geometry.',
      },
      {
        question: '25000 me electric cycle kitne kilometer chalti hai ek charge me?',
        answer:
          'Eparv models like Lahari and Savitri 10.4Ah battery ke saath pedal-assist mode me 110 km tak chalti hain, aur pure throttle mode me lagbhag 60-65 km range deti hain.',
      },
      {
        question: 'Is front suspension necessary for city commuting?',
        answer:
          'If your commute includes speed bumps, potholes, or unpaved sections, front suspension significantly reduces wrist and back fatigue over daily 15+ km rides.',
      },
      {
        question: 'Does the battery degrade in Indian summer heat?',
        answer:
          'Eparv battery packs feature intelligent BMS thermal monitoring to prevent charging when temperatures exceed safe cell thresholds, safeguarding long-term lifespan.',
      },
      {
        question: 'How do I claim warranty if I purchase online?',
        answer:
          'Warranty claims are honored through our nationwide verified dealer network and direct factory courier dispatch for plug-and-play spares within 24 to 48 hours.',
      },
    ],
    relatedGuideSlug: 'electric-cycle-real-range-pas-vs-throttle',
    targetCities: ['delhi', 'lucknow', 'indore'],
  },

  'for-delivery': {
    slug: 'electric-cycle-for-delivery',
    url: '/electric-cycle-for-delivery',
    title: 'Electric Cycle for Delivery: Commercial Fleet ROI & Heavy Carrier Specs | Eparv',
    h1: 'Heavy-Duty Electric Cycles for Delivery Businesses & Gig Riders',
    primaryKeyword: 'electric cycle for delivery',
    secondaryKeywords: [
      'delivery boy electric cycle',
      'heavy duty electric cycle with carrier',
      'bulk electric cycle',
    ],
    directAnswer:
      'Purpose-built electric delivery cycles designed for Zomato, Swiggy, Blinkit, and courier fleet riders. Featuring heavy-duty reinforced steel rear racks (140 kg total payload), 110 km ultra-long range, and dual disc brakes. Cuts monthly fuel spend from ₹5,000+ to under ₹150.',
    personaCriteria: [
      {
        title: 'Reinforced Rear Steel Carrier',
        desc: 'Integrated steel frame rack supporting up to 35 kg cargo crates and delivery bags without chassis flex.',
      },
      {
        title: 'Long 100+ km Range for Double Shifts',
        desc: 'Ensures lunch and dinner delivery shifts can be executed without taking the cycle offline for recharging.',
      },
      {
        title: 'Zero RTO & Zero Commercial Permit Costs',
        desc: 'Classified under CMVR low-speed rules, eliminating commercial road taxes, registration delays, and permit fees.',
      },
    ],
    personaMaths: {
      heading: 'Delivery Gig Worker Monthly Income Increase',
      formula: 'Petrol spend saved: ₹180/day × 26 days = ₹4,680. Battery charging electricity: ₹6/day × 26 = ₹156.',
      example: 'Delivery rider net take-home pay increases by ₹4,524 every single month by switching from a petrol bike.',
      monthlySavings: '₹4,500+ per month in direct profit',
    },
    faqs: [
      {
        question: 'Which Eparv model is best suited for food and grocery delivery?',
        answer:
          'The Eparv Savitri (₹18,999) with its reinforced heavy carrier and 110 km range, and the Eparv Lahari (₹21,999) for long-distance deliveries are the top commercial picks.',
      },
      {
        question: 'How much weight can the delivery carrier safely carry?',
        answer:
          'The reinforced rear carrier accommodates up to 35 kg of cargo, with the entire cycle rated for a 140 kg total payload including the rider.',
      },
      {
        question: 'Do commercial fleet operators get bulk volume pricing?',
        answer:
          'Yes, businesses ordering 5 or more units for campus, corporate, or delivery fleets receive customized B2B fleet discounts and spare parts kits via our Bulk Orders desk.',
      },
      {
        question: 'Can the battery be swapped quickly between shifts?',
        answer:
          'Yes, the battery unlocks with a key in under 10 seconds, allowing delivery operations to swap pre-charged backup batteries for continuous 24/7 uptime.',
      },
      {
        question: 'Are delivery riders required to carry commercial driving licenses?',
        answer:
          'No commercial driving license is required for 250W electric cycles under Indian law, broadening the available hiring pool for delivery companies.',
      },
      {
        question: 'How durable are the tyres for all-day delivery use?',
        answer:
          'Our cycles feature puncture-resistant heavy-ply tyres and double-wall alloy rims built to withstand curbs, broken tarmac, and heavy cargo loads.',
      },
    ],
    relatedGuideSlug: 'electric-cycle-for-delivery-business-guide',
    targetCities: ['delhi', 'noida', 'lucknow', 'patna'],
  },

  'for-students': {
    slug: 'electric-cycle-for-students',
    url: '/electric-cycle-for-students',
    title: 'Electric Cycle for Students: Affordable, No License & Anti-Theft Lock | Eparv',
    h1: 'Best Electric Cycle for College & Coaching Students',
    primaryKeyword: 'electric cycle for students',
    secondaryKeywords: [
      'electric cycle for college',
      'student ke liye electric cycle',
      'electric cycle without license',
    ],
    directAnswer:
      'The ideal electric cycle for students attending college, coaching centers, and daily tuition classes. Zero driving license required, 55 km range, anti-theft key ignition lock, lightweight design, and ₹0.05/km running cost so students never have to ask parents for petrol money.',
    personaCriteria: [
      {
        title: 'Zero License Requirement (100% Legal for 16+)',
        desc: 'Non-motorized vehicle classification means students can ride legally to school and college without waiting for a driving license.',
      },
      {
        title: 'Anti-Theft Key Lock & Detachable Pack',
        desc: 'Key ignition prevents unauthorized starting, and the detachable battery can be stored safely inside classrooms or hostels.',
      },
      {
        title: 'Pocket Money Running Cost',
        desc: 'A full charge costs just ₹2–₹3, allowing students to travel all week on spare change.',
      },
    ],
    personaMaths: {
      heading: 'Student Commute Budget Savings',
      formula: 'Auto/E-Rickshaw: ₹40/day × 25 days = ₹1,000/month. Eparv Cycle: ₹2/charge × 10 charges = ₹20/month.',
      example: 'Saves students ₹980 every month compared to shared autos, while eliminating waiting times and crowded travel.',
      monthlySavings: '₹1,000+ saved per month',
    },
    faqs: [
      {
        question: 'Kya college student bina driving license ke electric cycle chala sakte hain?',
        answer:
          'Haan! 250W BLDC motor aur 25 km/h speed wali electric cycle ke liye Central Motor Vehicle Rules (CMVR) ke tehat kisi driving license ya RTO registration ki zaroorat nahi hoti.',
      },
      {
        question: 'Which model is recommended for college campus commutes?',
        answer:
          'The Eparv Panther (₹19,999) with its stealth matte black finish, lightweight frame, and 55 km range is the most popular student choice.',
      },
      {
        question: 'How do students protect the cycle from theft on campus?',
        answer:
          'Eparv cycles feature an anti-theft key ignition system, key-locking battery mechanism, and standard frame locking mountings.',
      },
      {
        question: 'Can the battery be charged in a college hostel room?',
        answer:
          'Yes, the battery detaches in seconds and plugs into any standard 5A hostel or bedroom wall socket.',
      },
      {
        question: 'Can two students ride together on the cycle?',
        answer:
          'While models like the Savitri feature a heavy-duty rear rack, electric cycles are designed and legally certified as single-rider micro-mobility vehicles for maximum safety.',
      },
      {
        question: 'How long does a student test ride take to arrange?',
        answer:
          'Free test rides can be booked online in under 2 minutes, and our team coordinates a slot at your doorstep or nearest experience center.',
      },
    ],
    relatedGuideSlug: 'electric-cycle-license-rto-rules-india',
    targetCities: ['delhi', 'varanasi', 'prayagraj', 'patna'],
  },

  'for-senior-citizens': {
    slug: 'electric-cycle-for-senior-citizens',
    url: '/electric-cycle-for-senior-citizens',
    title: 'Electric Cycle for Senior Citizens: Upright Comfort & Easy Throttle | Eparv',
    h1: 'Comfortable Electric Cycles for Senior Citizens & Elders',
    primaryKeyword: 'electric cycle for senior citizens',
    secondaryKeywords: [
      'electric cycle for elderly',
      'bujurgo ke liye electric cycle',
      'upright comfort electric bicycle',
    ],
    directAnswer:
      'Engineered for seniors and active elders seeking health, independence, and gentle exercise without knee strain. Featuring relaxed upright handlebars, easy-twist throttle assist for zero-pedal cruising, cushioned saddle, and electronic motor-cutoff disc brakes for instant safe stops.',
    personaCriteria: [
      {
        title: 'Zero Knee Strain with Electric Throttle',
        desc: 'Twist-and-go throttle lets seniors glide across flyovers and headwinds without any knee or joint strain.',
      },
      {
        title: 'Upright Ergonomic Posture',
        desc: 'High handlebar sweep eliminates lower back bending, providing clear 360-degree road visibility.',
      },
      {
        title: 'Electronic Motor Cut-off Brakes',
        desc: 'Engaging either brake lever cuts motor power instantly, preventing unintended acceleration during emergency stops.',
      },
    ],
    personaMaths: {
      heading: 'Senior Mobility Independence',
      formula: 'Eliminates dependence on cabs or family rides for daily temple visits, park walks, groceries, and medical checkups.',
      example: 'Riders enjoy gentle cardio health benefits when pedaling, with instant electric backup whenever tired.',
      monthlySavings: 'Priceless independence + ₹2,000 monthly travel savings',
    },
    faqs: [
      {
        question: 'Is an electric cycle safe for senior citizens over 60?',
        answer:
          'Yes, highly safe. The maximum speed is governed at a gentle 25 km/h, and dual brakes with electronic motor cut-off ensure that motor power ceases immediately when brake levers are touched.',
      },
      {
        question: 'Can senior citizens ride without pedaling if they get tired?',
        answer:
          'Absolutely. All Eparv models feature a full electric throttle mode, allowing the rider to cruise smoothly using pure motor power without moving the pedals.',
      },
      {
        question: 'Which model provides the most comfortable upright seating for seniors?',
        answer:
          'The Eparv Savitri (₹18,999) features classic upright roadster geometry with a swept-back handlebar and wide cushioned saddle that keeps the spine straight.',
      },
      {
        question: 'How heavy is the battery to carry for charging?',
        answer:
          'The detachable lithium-ion battery weighs approximately 2.5 to 3.0 kg and comes with an ergonomic handle for easy indoor carrying.',
      },
      {
        question: 'Does the cycle require kick-starting or complex gears?',
        answer:
          'No kick-starting or complex clutch systems. Simply turn the ignition key on, twist the throttle, and the cycle glides forward smoothly.',
      },
      {
        question: 'Is maintenance simple for elderly owners?',
        answer:
          'Because there is no petrol engine, oil, or spark plug, maintenance is essentially identical to a standard bicycle: basic tyre pressure checks and occasional chain lubrication.',
      },
    ],
    relatedGuideSlug: 'five-questions-before-buying-an-electric-cycle',
    targetCities: ['delhi', 'lucknow', 'bhopal', 'indore'],
  },
}

export const INTENT_LIST: IntentHubData[] = Object.values(INTENT_HUBS)

export function getIntentBySlug(slug: string): IntentHubData | undefined {
  const clean = slug.replace(/^\//, '').replace(/^electric-cycle-/, '')
  return INTENT_HUBS[clean] || INTENT_LIST.find((i) => i.slug === slug || i.slug === `electric-cycle-${slug}`)
}
