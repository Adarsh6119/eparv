import sharp from 'sharp'
import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, RequiredDataFromCollectionSlug } from 'payload'

import { plainTextToLexical } from '@/services/csvImport'

/**
 * Eparv demo data seeder.
 *
 * Everything created here is explicitly flagged as demo data
 * (isDemoData: true on products and dealers, demo notes in content) so
 * unverified specifications, prices and dealership details are never
 * presented as real. Replace by editing the records in the admin panel.
 */

const CLEARABLE_COLLECTIONS: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'products',
  'dealers',
]

const CLEARABLE_GLOBALS: GlobalSlug[] = ['header', 'footer']

const buildPlaceholderPng = async (colorA: string, colorB: string, variant: number): Promise<Buffer> => {
  // Abstract geometric placeholder — no text, no fake product photography.
  const circle = (cx: number, cy: number, r: number, opacity: number) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" opacity="${opacity}" />`

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colorA}" />
        <stop offset="100%" stop-color="${colorB}" />
      </linearGradient>
    </defs>
    <rect width="1200" height="900" fill="url(#g)" />
    ${circle(300 + variant * 90, 620 - variant * 60, 260, 0.08)}
    ${circle(880 - variant * 70, 300 + variant * 40, 180, 0.1)}
    ${circle(600, 450, 90, 0.14)}
    <path d="M640 250 L520 470 L620 470 L560 660 L740 420 L640 420 L700 250 Z" fill="#ffffff" opacity="0.18" />
  </svg>`

  return sharp(Buffer.from(svg)).png().toBuffer()
}

const uploadImage = async (
  payload: Payload,
  buffer: Buffer,
  name: string,
  alt: string,
): Promise<number> => {
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: 'image/png',
      name,
      size: buffer.length,
    },
  })
  return doc.id
}

const DEMO_TAG = 'Demo data — placeholder content pending verified information.'

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding Eparv demo data...')

  await clearCollections(payload, req)

  // ── Images ───────────────────────────────────────────────────────────────
  payload.logger.info('— Generating placeholder images...')
  const palettes: [string, string][] = [
    ['#0f766e', '#134e4a'],
    ['#0e7490', '#164e63'],
    ['#4d7c0f', '#365314'],
  ]

  const imageIds: number[] = []
  for (let i = 0; i < palettes.length; i++) {
    try {
      const png = await buildPlaceholderPng(palettes[i][0], palettes[i][1], i)
      imageIds.push(
        await uploadImage(payload, png, `eparv-placeholder-${i + 1}.png`, 'Eparv placeholder image (demo)'),
      )
    } catch {
      // Media upload failed (no storage adapter on Vercel) — continue without image
      imageIds.push(null as unknown as number)
    }
  }

  // ── Products ─────────────────────────────────────────────────────────────
  payload.logger.info('— Creating demo products...')
  const productDefs = [
    {
      name: 'Eparv Sparx City',
      slug: 'eparv-sparx-city',
      category: 'city-commuter' as const,
      tagline: 'Lightweight daily commuter for city rides',
      shortDescription:
        'A compact electric city cycle for daily commutes. Demo record — specifications and price are placeholders pending verification.',
      price: 42999,
      isFeatured: true,
      specs: { batteryCapacity: '36V 7.5Ah (demo)', motorPower: '250W BLDC (demo)', claimedRangeKm: 45, chargingTimeHours: 4, topSpeedKmh: 25, weightKg: 22, warrantyMonths: 12 },
      description:
        '## Eparv Sparx City (demo record)\n\nThe Sparx City is positioned as an everyday commuter electric cycle for stop-and-go city traffic. This is a demo product record: battery capacity, motor power, range and price shown here are placeholders used for development and design review.\n\nOnce verified specifications are available, this section will carry the full product story, real test results and buying information.',
    },
    {
      name: 'Eparv FoldGo',
      slug: 'eparv-foldgo',
      category: 'foldable' as const,
      tagline: 'Folds flat for metro rides and boot storage',
      shortDescription:
        'Folding electric cycle for multi-modal commutes. Demo record — specifications and price are placeholders pending verification.',
      price: 52499,
      isFeatured: true,
      specs: { batteryCapacity: '36V 10Ah (demo)', motorPower: '250W BLDC (demo)', claimedRangeKm: 55, chargingTimeHours: 5, topSpeedKmh: 25, weightKg: 19, warrantyMonths: 12 },
      description:
        '## Eparv FoldGo (demo record)\n\nA folding frame designed to combine electric riding with metro and car boot transport. All specifications in this record are demo placeholders until officially verified.',
    },
    {
      name: 'Eparv TrailRider',
      slug: 'eparv-trailrider',
      category: 'off-road' as const,
      tagline: 'Built for trails, fireroads and weekend adventures',
      shortDescription:
        'Off-road electric cycle for weekend trails. Demo record — specifications and price are placeholders pending verification.',
      price: 64999,
      isFeatured: false,
      specs: { batteryCapacity: '48V 12.5Ah (demo)', motorPower: '350W BLDC (demo)', claimedRangeKm: 60, chargingTimeHours: 6, topSpeedKmh: 25, weightKg: 26, warrantyMonths: 18 },
      description:
        '## Eparv TrailRider (demo record)\n\nA hardtail platform for trails and fireroads. This record is demo data — all figures are placeholders pending verification.',
    },
    {
      name: 'Eparv LoadHauler',
      slug: 'eparv-loadhauler',
      category: 'cargo' as const,
      tagline: 'Utility platform for deliveries and loads',
      shortDescription:
        'Cargo electric cycle for delivery use. Demo record — specifications and price are placeholders pending verification.',
      price: 58999,
      isFeatured: false,
      specs: { batteryCapacity: '48V 15Ah (demo)', motorPower: '350W BLDC (demo)', claimedRangeKm: 65, chargingTimeHours: 6, topSpeedKmh: 25, weightKg: 32, warrantyMonths: 12 },
      description:
        '## Eparv LoadHauler (demo record)\n\nA long-tail cargo platform aimed at delivery fleets. Demo record — specifications and price are placeholders pending verification.',
    },
  ]

  const productIds: Record<string, number> = {}
  for (let i = 0; i < productDefs.length; i++) {
    const def = productDefs[i]
    const data: any = {
      name: def.name,
      slug: def.slug,
      category: def.category,
      tagline: def.tagline,
      shortDescription: def.shortDescription,
      description: plainTextToLexical(def.description),
      price: def.price,
      availability: 'in-stock',
      ...def.specs,
      additionalSpecifications: [{ label: 'Data status', value: DEMO_TAG }],
      deliveryLocations: [
        { city: 'New Delhi', state: 'Delhi' },
        { city: 'Mumbai', state: 'Maharashtra' },
        { city: 'Bengaluru', state: 'Karnataka' },
      ],
      isFeatured: def.isFeatured,
      isDemoData: true,
      _status: 'published',
    }
    if (imageIds[i] != null) {
      data.featuredImage = imageIds[i]
    }
    const doc = await payload.create({
      collection: 'products',
      data,
    })
    productIds[def.name] = doc.id
  }

  // ── Dealers ──────────────────────────────────────────────────────────────
  payload.logger.info('— Creating demo dealers...')
  const dealerDefs: RequiredDataFromCollectionSlug<'dealers'>[] = [
    {
      businessName: 'Eparv Mobility Delhi',
      slug: 'eparv-mobility-delhi',
      contactPerson: 'Demo Contact',
      address: 'Demo address, Lajpat Nagar, New Delhi 110024 (placeholder)',
      city: 'New Delhi',
      state: 'Delhi',
      applicationStatus: 'verified' as const,
      publicListing: true,
      about: 'Demo dealership record for layout and workflow testing. Not a real business.',
      serviceableLocations: [
        { city: 'New Delhi', state: 'Delhi' },
        { city: 'Gurugram', state: 'Haryana' },
      ],
    },
    {
      businessName: 'Eparv Cycles Mumbai',
      slug: 'eparv-cycles-mumbai',
      contactPerson: 'Demo Contact',
      address: 'Demo address, Andheri West, Mumbai 400058 (placeholder)',
      city: 'Mumbai',
      state: 'Maharashtra',
      applicationStatus: 'verified' as const,
      publicListing: true,
      about: 'Demo dealership record for layout and workflow testing. Not a real business.',
      serviceableLocations: [
        { city: 'Mumbai', state: 'Maharashtra' },
        { city: 'Thane', state: 'Maharashtra' },
      ],
    },
    {
      businessName: 'GreenRide Motors Pune',
      slug: 'greenride-motors-pune',
      contactPerson: 'Demo Contact',
      address: 'Demo address, Kothrud, Pune 411038 (placeholder)',
      city: 'Pune',
      state: 'Maharashtra',
      applicationStatus: 'pending' as const,
      publicListing: false,
      about: 'Demo pending application — visible to staff only, never publicly listed.',
      serviceableLocations: [{ city: 'Pune', state: 'Maharashtra' }],
    },
  ]

  for (const def of dealerDefs) {
    await payload.create({
      collection: 'dealers',
      data: {
        ...def,
        isDemoData: true,
      },
    })
  }

  // ── Blog categories & posts ──────────────────────────────────────────────
  payload.logger.info('— Creating blog content...')
  const categoryNames = ['Buying Guides', 'Maintenance', 'Basics']
  const categoryIds: Record<string, number> = {}
  for (const name of categoryNames) {
    const doc = await payload.create({
      collection: 'categories',
      data: { title: name, slug: name.toLowerCase().replace(/\s+/g, '-') },
    })
    categoryIds[name] = doc.id
  }

  const postDefs = [
    {
      title: 'Electric cycles explained: what to know before your first ride',
      slug: 'electric-cycles-explained',
      category: 'Basics',
      heroImage: imageIds[4],
      content:
        '## What is an electric cycle?\n\nAn electric cycle (also called an e-cycle or electric bicycle) pairs a normal bicycle frame with a battery, an electric motor and a controller. The motor assists your pedalling, which makes headwinds, climbs and long distances far less tiring.\n\n## How the assist works\n\nOn most e-cycles the motor activates when you pedal. Depending on the model you can usually choose how much assistance you get, from a light push to full support. Many models also let you ride without pedal input at low speeds — check what each model offers before buying.\n\n## What to check before buying\n\nConsider the battery capacity, motor power, claimed range, charging time, weight and warranty. Just as importantly, take a test ride: fit, comfort and ride feel matter as much as the numbers on paper.\n\n## Where Eparv fits in\n\nEparv is building a range of electric cycles for Indian riders along with a verified dealer network. Explore the current line-up, book a test ride, and speak to our team about what suits your daily route.',
    },
    {
      title: 'Five questions to ask when buying an electric cycle',
      slug: 'five-questions-before-buying-an-electric-cycle',
      category: 'Buying Guides',
      heroImage: imageIds[5],
      content:
        '## 1. What will I use it for?\n\nCity commuting, weekend rides, trail use or carrying cargo — the use case decides frame style, battery size and motor power. A commuter rarely needs the same set-up as a delivery rider.\n\n## 2. What is the realistic range?\n\nClaimed range figures assume ideal conditions. Real-world range depends on rider weight, terrain, assist level and traffic. Ask the seller what to expect on routes like yours.\n\n## 3. How and where do I charge it?\n\nMost e-cycles charge from a normal household socket, and removable batteries make charging at a desk or home easier than carrying the whole cycle upstairs.\n\n## 4. What service and warranty do I get?\n\nBatteries are the most expensive component. Compare warranty terms on battery, motor and frame, and confirm which local dealer will service the cycle.\n\n## 5. Can I try it first?\n\nAlways take a test ride if you can. Book one with Eparv or a verified dealer and bring your usual route questions — our team will help you choose the right model.',
    },
    {
      title: 'Caring for your e-cycle battery: the basics',
      slug: 'e-cycle-battery-care-basics',
      category: 'Maintenance',
      heroImage: imageIds[6],
      content:
        '## Charge sensibly\n\nUse the charger that came with your cycle and avoid leaving the battery fully charged or fully drained for long periods. Many riders follow a simple habit: charge after rides and unplug once full.\n\n## Store it right\n\nIf you will not ride for weeks, store the battery around half charge in a cool, dry place away from direct sunlight. Extreme heat and cold both reduce battery life.\n\n## Keep contacts clean and dry\n\nWipe the battery terminals and frame contacts occasionally, and follow the manufacturer guidance on riding in heavy rain.\n\n## Watch for warning signs\n\nUnusual heat, swelling or a sudden drop in range all warrant a service visit. Address issues early — a battery inspection is quick compared to a replacement.\n\n## Service regularly\n\nJust like any cycle, e-cycles benefit from periodic checks of brakes, tyres and drivetrain. Verified Eparv dealers can service what they sell.',
    },
  ]

  for (const def of postDefs) {
    const data: any = {
      title: def.title,
      slug: def.slug,
      content: plainTextToLexical(def.content),
      categories: [categoryIds[def.category]],
      meta: {
        title: def.title,
        description: def.title,
      },
      _status: 'published',
    }
    if (def.heroImage != null) {
      data.heroImage = def.heroImage
    }
    await payload.create({
      collection: 'posts',
      data,
    })
  }

  // ── Legal pages ──────────────────────────────────────────────────────────
  payload.logger.info('— Creating legal pages...')
  const legalPage = (title: string, slug: string, intro: string, sections: [string, string][]) => ({
    title,
    slug,
    pageType: 'legal' as const,
    layout: [
      {
        blockType: 'content' as const,
        columns: [
          {
            size: 'full' as const,
            richText: plainTextToLexical(
              `${intro}\n\n${sections.map(([heading, text]) => `## ${heading}\n\n${text}`).join('\n\n')}\n\n## About this page\n\nThis template text was generated during development. It must be reviewed and replaced with the official policy before the site goes live.`,
            ),
          },
        ],
      },
    ],
    hero: { type: 'lowImpact' as const, richText: plainTextToLexical(`## ${title}`) },
    _status: 'published' as const,
  })

  await payload.create({
    collection: 'pages',
    data: legalPage(
      'Privacy Policy',
      'privacy-policy',
      'This policy explains how Eparv handles personal information submitted through this website.',
      [
        ['Information we collect', 'When you submit an enquiry, test-ride request, dealer application or bulk order, we collect the details you provide — typically your name, phone number, email, city and the content of your message. We also record technical details such as the page you came from and campaign tags (UTM parameters) so we understand which content helps riders.'],
        ['How we use it', 'We use your information to respond to your enquiry, arrange test rides, process dealer applications and prepare bulk-order proposals. If you opt in, we may also send occasional updates about new models and offers.'],
        ['Sharing', 'We share your information only with the Eparv team members and verified dealers needed to serve your request. We never sell personal data.'],
        ['Retention and your rights', 'Enquiry records are kept while they remain commercially relevant. You may request access to, correction of, or deletion of your data by contacting us through the contact page.'],
      ],
    ),
  })

  await payload.create({
    collection: 'pages',
    data: legalPage(
      'Terms of Use',
      'terms',
      'These terms govern your use of the Eparv website.',
      [
        ['Use of the site', 'You may browse this site and submit genuine enquiries. Automated scraping, spam submissions and misuse of the forms are not permitted.'],
        ['Product information', 'Product specifications, prices and availability shown on this website may change. Records marked as demo data are placeholders and are not offers.'],
        ['Enquiries and orders', 'Submitting an enquiry or application does not create a contract. Purchases, where offered, are confirmed separately with final pricing, taxes and delivery terms.'],
        ['Liability', 'The website content is provided for information. Eparv is not liable for decisions made solely on the basis of website content without confirmation from our team.'],
      ],
    ),
  })

  // ── City & state landing pages ───────────────────────────────────────────
  payload.logger.info('— Creating location landing pages...')
  const locationPage = (
    title: string,
    slug: string,
    pageType: 'city' | 'state',
    location: { city?: string; state: string },
    body: string,
    faqs: { question: string; answer: string }[],
  ) => ({
    title,
    slug,
    pageType,
    ...location,
    relatedProducts: Object.values(productIds),
    layout: [
      {
        blockType: 'content' as const,
        columns: [
          {
            size: 'full' as const,
            richText: plainTextToLexical(body),
          },
        ],
      },
    ],
    hero: { type: 'lowImpact' as const, richText: plainTextToLexical(`## ${title}`) },
    faqs,
    meta: {
      title,
      description: `Eparv electric cycles in ${location.city ?? location.state} — models, test rides, dealer information and delivery availability.`,
    },
    _status: 'published' as const,
  })

  await payload.create({
    collection: 'pages',
    data: locationPage(
      'Electric Cycles in Delhi',
      'electric-cycle-in-delhi',
      'city',
      { city: 'New Delhi', state: 'Delhi' },
      '## Riding an electric cycle in Delhi\n\nDelhi riders face long signal-to-signal commutes, tight parking and rising fuel costs. An electric cycle fits well: daily running costs stay low, parking is effortless, and pedal assist takes the sting out of headwinds on open stretches.\n\n## Buying in Delhi\n\nDelivery availability and pricing for Delhi are confirmed per model — send an enquiry from any product page with your city, and the Eparv team confirms exactly what applies to your PIN code.\n\n## Test rides in Delhi\n\nBook a free test ride and choose a date that suits you. Where a verified dealer covers your area, the ride can often be arranged closer to home.',
      [
        { question: 'Do you deliver electric cycles in Delhi?', answer: 'Delivery in Delhi depends on the model and current stock. Send an enquiry with your area and PIN code — the team confirms delivery options before you commit to anything.' },
        { question: 'Can I test ride before buying?', answer: 'Yes. Use the Book a Test Ride page, pick your model and a preferred date, and we arrange the rest.' },
        { question: 'Is there an Eparv dealer in Delhi?', answer: 'The dealer network is growing. Check the dealer directory for the current verified list for Delhi.' },
      ],
    ),
  })

  await payload.create({
    collection: 'pages',
    data: locationPage(
      'Electric Cycles in Mumbai',
      'electric-cycle-in-mumbai',
      'city',
      { city: 'Mumbai', state: 'Maharashtra' },
      '## Riding an electric cycle in Mumbai\n\nMumbai commutes mix crowded local trains, slow buses and expensive cabs. An electric cycle suits the mid-distance gaps: foldable models pair with train rides for multi-modal commutes, while commuters ride direct on flatter routes.\n\n## Monsoon note\n\nLike any bicycle, e-cycles need care in heavy rain. Follow the battery and controller care guidance on each model page, and ask our team about monsoon usage when you enquire.\n\n## Buying in Mumbai\n\nSend an enquiry with your area and the team confirms pricing, delivery and current availability for Mumbai.',
      [
        { question: 'Which Eparv model suits Mumbai commutes?', answer: 'It depends on your route. Foldable models work well with train commutes; city commuters suit direct rides. Tell us your daily route in the enquiry and we will recommend.' },
        { question: 'Do you deliver electric cycles in Mumbai?', answer: 'Delivery depends on model and stock. Enquire with your area and PIN code for confirmation.' },
        { question: 'Can I test ride in Mumbai?', answer: 'Yes — book a free test ride online and pick a date that works for you.' },
      ],
    ),
  })

  await payload.create({
    collection: 'pages',
    data: locationPage(
      'Electric Cycles in Bengaluru',
      'electric-cycle-in-bengaluru',
      'city',
      { city: 'Bengaluru', state: 'Karnataka' },
      "## Riding an electric cycle in Bengaluru\n\nBengaluru has one of India's strongest cycling cultures, with dedicated cycling groups and improving infrastructure. The city's gentle gradients are ideal for pedal assist, and an e-cycle turns a long commute into a practical daily option.\n\n## Buying in Bengaluru\n\nSend an enquiry with your area and the Eparv team confirms model availability, pricing and delivery for your location.\n\n## Test rides in Bengaluru\n\nBook a free test ride — choose the model you want to try and a convenient date.",
      [
        { question: 'Do you deliver electric cycles in Bengaluru?', answer: 'Delivery in Bengaluru depends on the model and stock. Enquire with your area for a confirmed answer.' },
        { question: 'Are there group rides or events?', answer: 'As the community grows we plan rides and events. Watch the blog for announcements.' },
        { question: 'Can I test ride before buying?', answer: 'Yes — book online from the Book a Test Ride page.' },
      ],
    ),
  })

  await payload.create({
    collection: 'pages',
    data: locationPage(
      'Electric Cycles in Maharashtra',
      'electric-cycles-in-maharashtra',
      'state',
      { state: 'Maharashtra' },
      '## Electric cycles across Maharashtra\n\nFrom Mumbai\'s dense commutes to Pune\'s student routes and the wider cities of Nagpur, Nashik and Aurangabad, riders across Maharashtra are switching to electric cycles for affordable daily mobility.\n\n## Coverage in Maharashtra\n\nEparv serves the state through a growing network of verified dealers and direct delivery. Availability differs by city and model — send an enquiry with your city and the team confirms what applies.\n\n## Dealers in Maharashtra\n\nSee the dealer directory for currently verified Eparv dealers in Maharashtra, or apply to become one.',
      [
        { question: 'Which cities in Maharashtra do you serve?', answer: 'Coverage grows with our dealer network. Enquire with your city for current availability.' },
        { question: 'How do I become an Eparv dealer in Maharashtra?', answer: 'Apply through the Become a Dealer page with your business details and investment range.' },
      ],
    ),
  })

  // ── Header & Footer navigation ───────────────────────────────────────────
  payload.logger.info('— Setting navigation...')
  const navLink = (label: string, url: string) => ({
    link: { type: 'custom' as const, newTab: false, url, label },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        navLink('Electric Cycles', '/electric-cycles'),
        navLink('Dealers', '/dealers'),
        navLink('Book a Test Ride', '/book-test-ride'),
        navLink('Become a Dealer', '/become-a-dealer'),
        navLink('Blog', '/blog'),
        navLink('Contact', '/contact'),
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: [
        navLink('Privacy Policy', '/privacy-policy'),
        navLink('Terms', '/terms'),
        navLink('Bulk Orders', '/bulk-orders'),
        navLink('Contact', '/contact'),
      ],
    },
  })

  payload.logger.info('Eparv demo data seeded successfully.')
}

const clearCollections = async (payload: Payload, req: PayloadRequest): Promise<void> => {
  await Promise.all(
    CLEARABLE_GLOBALS.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: { navItems: [] },
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )

  await Promise.all(
    CLEARABLE_COLLECTIONS.map((collection) =>
      payload.db.deleteMany({ collection, req, where: {} }),
    ),
  )

  await Promise.all(
    CLEARABLE_COLLECTIONS.filter((collection) => Boolean(payload.collections[collection].config.versions)).map(
      (collection) => payload.db.deleteVersions({ collection, req, where: {} }),
    ),
  )
}
