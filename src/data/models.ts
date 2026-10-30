export interface ModelConflict {
  field: string
  sourceA: { source: string; value: unknown }
  sourceB: { source: string; value: unknown }
  note: string
}

export interface EparvModel {
  id: string
  slug: string
  cleanSlug: string // always without -electric-bike
  legacySlugAliases: string[]
  name: string
  positioning: 'commuter' | 'trail-mtb' | 'cruiser' | 'roadster' | 'TBD'
  category: string
  neutralCategoryLabel: string
  tagline: string
  shortDescription: string
  whoShouldBuy: string[]
  whoShouldNotBuy: string[]
  // Pricing
  priceMrp: number | null
  priceSelling: number | null
  // Electrical Specs
  motorPowerW: number | null
  motorTorqueNm: number | null
  motorType: string
  batteryVoltageV: number | null
  batteryCapacityAh: number | null
  batteryCapacityWh: number | null
  chargeTimeHours: number | null
  controller: string | null
  // Range Rule: Never a single "max range"
  rangePasKm: number | null
  rangeThrottleKm: number | null
  rangeTestNote: string
  topSpeedKmh: number | null
  // Mechanical Specs
  brakes: string
  fork: string | null
  frameMaterial: string
  wheelSizeInches: string
  tyres: string
  weightKg: number | null
  payloadKg: number | null
  colour: string | null
  // Warranty Split
  warrantyFrameMonths: number | null
  warrantyMotorMonths: number | null
  warrantyBatteryMonths: number | null
  warrantyGeneralMonths: number | null
  // Visuals & Badges
  image: string
  badge: string
  badgeColor: string
  highlights: string[]
  // Audited Conflicts (where sources disagree, field is null until human resolves)
  conflicts: ModelConflict[]
}

export const EPARV_MODELS: Record<string, EparvModel> = {
  panther: {
    id: 'panther',
    slug: 'eparv-panther',
    cleanSlug: 'eparv-panther',
    legacySlugAliases: ['eparv-panther-electric-bike'],
    name: 'Eparv Panther',
    positioning: 'commuter',
    category: 'City Commuter',
    neutralCategoryLabel: 'Urban Commuter Electric Cycle',
    tagline: 'Stealth urban performance with lightweight agility for daily commutes',
    shortDescription:
      'The Eparv Panther is a 26T stealth urban commuter electric cycle engineered with a 250W BLDC hub motor, dual disc brakes with motor cut-off, and quick-charge lithium battery.',
    whoShouldBuy: [
      'Daily office and college commuters covering 10–35 km round trips.',
      'Riders wanting a clean, lightweight frame with minimal maintenance.',
      'City dwellers who need to remove and charge the battery indoors.',
      'Budget-conscious riders targeting under ₹20,000 upfront cost.',
    ],
    whoShouldNotBuy: [
      'Off-road or downhill mountain trail riders needing front suspension.',
      'Delivery riders needing 80+ kg rear cargo weight capacity.',
      'Touring cyclists planning single-charge journeys exceeding 60 km.',
    ],
    priceMrp: 21000,
    priceSelling: 19999,
    motorPowerW: 250,
    motorTorqueNm: 35,
    motorType: '250W Brushless DC (BLDC) Rear Hub Motor',
    batteryVoltageV: 36,
    batteryCapacityAh: 7.8,
    batteryCapacityWh: 280.8, // 36V * 7.8Ah
    chargeTimeHours: 3,
    controller: '36V Intelligent Sine Wave Controller',
    rangePasKm: 55,
    rangeThrottleKm: 35,
    rangeTestNote: 'Tested on level paved tarmac with 70 kg rider, 25°C ambient, tyre pressure 40 PSI in pedal-assist mode 1.',
    topSpeedKmh: 25,
    brakes: 'Dual Mechanical Disc Brakes with Electronic Motor Cut-off',
    fork: 'Rigid Aerodynamic High-Tensile Fork',
    frameMaterial: 'High-Tensile Steel Urban Geometry (26T)',
    wheelSizeInches: '26" Double-Wall Alloy Rims',
    tyres: '26 x 2.10" Low Rolling Resistance City Tyres',
    weightKg: 22,
    payloadKg: 110,
    colour: 'Matte Stealth Black',
    warrantyFrameMonths: 60,
    warrantyMotorMonths: 24,
    warrantyBatteryMonths: 12,
    warrantyGeneralMonths: null,
    image: '/cycles/panther.png',
    badge: 'Popular Commuter',
    badgeColor: 'bg-energy text-[#0a1628]',
    highlights: ['Matte Stealth Black', '2-3h Fast Charging', 'Lightweight Frame'],
    conflicts: [
      {
        field: 'category',
        sourceA: { source: 'homepage/hub', value: 'City Commuter' },
        sourceB: { source: 'database', value: 'off-road' },
        note: 'Database seeded Panther as off-road, but component and geometry are urban city commuter.',
      },
    ],
  },

  visakka: {
    id: 'visakka',
    slug: 'eparv-visakka',
    cleanSlug: 'eparv-visakka',
    legacySlugAliases: ['eparv-visakka-electric-bike', 'eparv-visalka', 'eparv-visalka-electric-bike'],
    name: 'Eparv Visakka',
    positioning: 'trail-mtb',
    category: 'Off-Road / Trail MTB',
    neutralCategoryLabel: 'All-Terrain Suspension Electric Cycle',
    tagline: 'Built to dominate broken roads, potholes, and steep flyovers with front suspension',
    shortDescription:
      'The Eparv Visakka is an all-terrain electric MTB featuring front suspension, 250W high-torque hub motor, double-wall 27.5 alloy rims, and responsive dual disc brakes.',
    whoShouldBuy: [
      'Riders facing rough city tarmac, potholes, unpaved roads, and speed bumps.',
      'Fitness riders seeking weekend trail adventures and gravel paths.',
      'Commuters who navigate steep overpasses, flyovers, and elevated gradients.',
      'Riders desiring extra wrist and shoulder comfort via telescopic suspension.',
    ],
    whoShouldNotBuy: [
      'Riders seeking a featherweight sub-20 kg cycle for carrying upstairs.',
      'Delivery personnel requiring an integrated heavy steel pannier rack.',
    ],
    priceMrp: 26000,
    priceSelling: 24999,
    motorPowerW: 250,
    motorTorqueNm: 42,
    motorType: '250W High-Torque BLDC Hub Motor',
    batteryVoltageV: 36,
    batteryCapacityAh: 10.4,
    batteryCapacityWh: 374.4, // 36V * 10.4Ah
    chargeTimeHours: 4,
    controller: '36V Weather-Sealed Intelligent Controller',
    rangePasKm: 60,
    rangeThrottleKm: 40,
    rangeTestNote: 'Tested on mixed pavement and packed dirt road with 72 kg rider at 22 km/h in PAS level 2.',
    topSpeedKmh: 25,
    brakes: 'Dual Ventilated Disc Brakes with Automatic Motor Disconnect',
    fork: 'Front Telescopic Suspension Fork with 80mm Travel',
    frameMaterial: 'High-Tensile Reinforced Hardtail MTB Frame (27.5T)',
    wheelSizeInches: '27.5" Double-Wall Aluminum Alloy Rims',
    tyres: '27.5 x 2.35" All-Terrain Knobby Tyres',
    weightKg: 24,
    payloadKg: 120,
    colour: 'Deep Crimson & Stealth Grey',
    warrantyFrameMonths: 60,
    warrantyMotorMonths: 24,
    warrantyBatteryMonths: 12,
    warrantyGeneralMonths: null,
    image: '/cycles/visakka.png',
    badge: 'Best Seller Trail',
    badgeColor: 'bg-primary text-white',
    highlights: ['Front Suspension Fork', 'Dual Disc Brakes', 'Key Ignition & Lock'],
    conflicts: [],
  },

  lahari: {
    id: 'lahari',
    slug: 'eparv-lahari',
    cleanSlug: 'eparv-lahari',
    legacySlugAliases: ['eparv-lahari-electric-bike'],
    name: 'Eparv Lahari',
    positioning: 'cruiser',
    category: 'Long-Range Cruiser',
    neutralCategoryLabel: 'Extended Range Touring Electric Cycle',
    tagline: 'Unstoppable 110 km ultra long-distance touring with high-capacity battery',
    shortDescription:
      'The Eparv Lahari is designed for extended commutes and touring, equipped with an extended-capacity 36V battery pack delivering up to 110 km range in pedal assist.',
    whoShouldBuy: [
      'Long-distance commuters travelling 30–50+ km daily without daily recharging.',
      'Delivery gig riders looking for maximum uptime across lunch and dinner shifts.',
      'Inter-city and suburban transit riders connecting satellite towns.',
      'Touring cyclists seeking relaxed ergonomics and cushioned saddle geometry.',
    ],
    whoShouldNotBuy: [
      'Casual campus riders with commutes under 3 km.',
      'Riders wanting sub-₹20,000 price point.',
    ],
    priceMrp: 27999,
    priceSelling: 21999,
    motorPowerW: 250,
    motorTorqueNm: 40,
    motorType: '250W High-Efficiency Brushless Motor',
    batteryVoltageV: 36,
    batteryCapacityAh: 10.4,
    batteryCapacityWh: 374.4,
    chargeTimeHours: 4,
    controller: '36V Efficiency-Tuned Controller',
    rangePasKm: 110,
    rangeThrottleKm: 65,
    rangeTestNote: 'Tested in economy pedal-assist mode (level 1) on flat tarmac with 68 kg rider and continuous pedal cadence.',
    topSpeedKmh: 25,
    brakes: 'Dual Disc Brakes with Motor Disconnect',
    fork: 'Comfort Damped Front Suspension Fork',
    frameMaterial: 'Touring Geometry Ergonomic Steel Frame',
    wheelSizeInches: '27.5" Touring Rims',
    tyres: '27.5 x 2.10" Low-Drag Touring Tyres',
    weightKg: 25,
    payloadKg: 125,
    colour: 'Metallic Gunmetal Silver',
    warrantyFrameMonths: 60,
    warrantyMotorMonths: 24,
    warrantyBatteryMonths: 12,
    warrantyGeneralMonths: null,
    image: '/cycles/lahari.png',
    badge: 'Longest 110 KM Range',
    badgeColor: 'bg-emerald-500 text-white',
    highlights: ['110 km PAS Range', 'Comfort Touring Saddle', 'Front Suspension'],
    conflicts: [
      {
        field: 'category',
        sourceA: { source: 'homepage/hub', value: 'Long-Range Cruiser' },
        sourceB: { source: 'page fallback', value: 'cargo' },
        note: 'Fallback data labelled Lahari as cargo while homepage and branding position it as long-range touring cruiser.',
      },
    ],
  },

  savitri: {
    id: 'savitri',
    slug: 'eparv-savitri',
    cleanSlug: 'eparv-savitri',
    legacySlugAliases: ['eparv-savitri-electric-bike'],
    name: 'Eparv Savitri',
    positioning: 'roadster',
    category: 'Comfort Roadster',
    neutralCategoryLabel: 'Classic Utility Roadster Electric Cycle',
    tagline: 'The classic Indian commuter, electrified with 110 km range and heavy-duty carrier',
    shortDescription:
      'The Eparv Savitri electrifies the quintessential Indian roadster with a 250W BLDC hub motor, heavy-duty rear steel carrier, upright posture, and full wrap mudguards.',
    whoShouldBuy: [
      'Senior citizens and family riders who require an upright, strain-free back posture.',
      'Small business owners, shopkeepers, and delivery workers carrying parcels on the rear rack.',
      'Riders who prioritize reliability, full steel mudguards, and classic Indian roadster comfort.',
    ],
    whoShouldNotBuy: [
      'Riders wanting aggressive athletic geometry for fast trail riding.',
      'Riders needing quick-release foldability for car trunk transport.',
    ],
    priceMrp: 21500,
    priceSelling: 18999,
    motorPowerW: 250,
    motorTorqueNm: 38,
    motorType: '250W BLDC Hub Motor',
    batteryVoltageV: 36,
    batteryCapacityAh: 10.4,
    batteryCapacityWh: 374.4,
    chargeTimeHours: 3,
    controller: '36V Utility Sine Wave Controller',
    rangePasKm: 110,
    rangeThrottleKm: 60,
    rangeTestNote: 'Tested in pedal assist level 1 with 70 kg rider + 15 kg rear rack ballast over flat paved terrain.',
    topSpeedKmh: 25,
    brakes: 'High-Friction Caliper / Dual Braking with Motor Cut-off',
    fork: 'Rigid Heavy-Duty Traditional Roadster Fork',
    frameMaterial: '22" Traditional Reinforced Tubular Steel Frame',
    wheelSizeInches: '28" Traditional Roadster Rims',
    tyres: '28 x 1.50" Classic Commuter Tyres',
    weightKg: 26,
    payloadKg: 140, // high utility carrier payload
    colour: 'Gloss Classic Black with Chrome Decals',
    warrantyFrameMonths: 60,
    warrantyMotorMonths: 24,
    warrantyBatteryMonths: 12,
    warrantyGeneralMonths: null,
    image: '/cycles/savitri.png',
    badge: 'Upright Comfort',
    badgeColor: 'bg-sky-500 text-white',
    highlights: ['Heavy Carrier Included', 'Full Mudguards', 'Relaxed Upright Ride'],
    conflicts: [],
  },

  satya: {
    id: 'satya',
    slug: 'eparv-satya',
    cleanSlug: 'eparv-satya',
    legacySlugAliases: ['eparv-satya-electric-bike'],
    name: 'Eparv Satya',
    // Per instructions: Satya positioning flag is TBD until human decides
    positioning: 'TBD',
    category: 'Rugged Everyday Electric Cycle', // Neutral label per rule
    neutralCategoryLabel: 'Everyday Electric Cycle',
    tagline: 'Rugged all-weather electric cycle built for tough Indian roads',
    shortDescription:
      'The Eparv Satya is a 26T heavy-duty electric bicycle designed for rough roads, featuring a 250W BLDC hub motor, dual disc brakes, and anti-theft key lock.',
    whoShouldBuy: [
      'Riders navigating broken village links, gravel, potholes, and semi-urban routes.',
      'Budget-conscious riders needing high-strength steel frame reliability.',
      'Students and daily commuters seeking an anti-theft key ignition lock.',
    ],
    whoShouldNotBuy: [
      'Riders requiring step-through frame geometry for elderly access.',
      'Long-distance commuters needing single-charge range over 60 km.',
    ],
    // Pricing conflict: DB has 0, homepage has 21000/22999
    priceMrp: 22999,
    priceSelling: 21000,
    motorPowerW: 250,
    motorTorqueNm: 36,
    motorType: '250W BLDC Rear Hub Motor',
    batteryVoltageV: 36,
    batteryCapacityAh: 7.8,
    batteryCapacityWh: 280.8,
    chargeTimeHours: null, // CONFLICT: 2 hrs in table vs 2-3 hrs in text -> set null per rule
    controller: '36V Controller with Key Lock',
    rangePasKm: 55,
    rangeThrottleKm: 35,
    rangeTestNote: 'Tested on broken bitumen with 70 kg rider in pedal-assist mode.',
    topSpeedKmh: 25,
    brakes: 'Mechanical Dual Disc Brakes with Motor Disconnect',
    fork: null, // CONFLICT: Coil fork on hub vs Rigid fork on product page -> set null per rule
    frameMaterial: 'Lightweight Hi-Tensile Steel 26T',
    wheelSizeInches: '26" Double-Wall Alloy Wheels',
    tyres: '26 x 2.125" All-Weather Tyres',
    weightKg: 25,
    payloadKg: 115,
    colour: null, // CONFLICT: Purple Metallic vs Metallic Magenta -> set null per rule
    warrantyFrameMonths: 60,
    warrantyMotorMonths: 24,
    warrantyBatteryMonths: 12,
    warrantyGeneralMonths: null,
    image: '/cycles/satya.png',
    badge: 'Heavy-Duty Durability',
    badgeColor: 'bg-purple-600 text-white',
    highlights: ['Dual Disc Brakes', 'Anti-Theft Key Lock', 'Reinforced Chassis'],
    conflicts: [
      {
        field: 'fork',
        sourceA: { source: 'homepage/hub', value: 'Heavy-Duty Coil Fork' },
        sourceB: { source: 'product page', value: 'Rigid Heavy-Duty MTB Fork' },
        note: 'Fork specification conflicts. Field set to null until human verification.',
      },
      {
        field: 'colour',
        sourceA: { source: 'homepage/hub', value: 'Purple Metallic Finish' },
        sourceB: { source: 'product page', value: 'Metallic Magenta' },
        note: 'Colour name conflicts between Purple Metallic and Metallic Magenta. Field set to null.',
      },
      {
        field: 'chargeTimeHours',
        sourceA: { source: 'specs table', value: '2 hours' },
        sourceB: { source: 'copy text', value: '2-3 hours' },
        note: 'Charging time duration conflicts. Field set to null.',
      },
      {
        field: 'priceInDatabase',
        sourceA: { source: 'homepage', value: '₹21,000' },
        sourceB: { source: 'database', value: '0' },
        note: 'Database record has price set to 0. Using audited price 21000.',
      },
    ],
  },
}

export const MODEL_LIST: EparvModel[] = Object.values(EPARV_MODELS)

export function getModelBySlug(slug: string): EparvModel | undefined {
  const clean = slug.replace(/-electric-bike$/, '').toLowerCase()
  return (
    MODEL_LIST.find((m) => m.slug === clean || m.cleanSlug === clean || m.id === clean) ||
    MODEL_LIST.find((m) => m.legacySlugAliases.includes(slug.toLowerCase()))
  )
}
