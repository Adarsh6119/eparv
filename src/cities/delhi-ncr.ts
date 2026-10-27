import type { CityPageData, StatePageData } from './types'

/**
 * Hand-written data for Delhi city and the Delhi NCR region page. Every
 * field is unique — never reuse sentence structures or phrases.
 */
export const CITIES: CityPageData[] = [
  {
    slug: 'electric-cycle-in-delhi',
    city: 'Delhi',
    state: 'Delhi',
    stateHubSlug: null,
    metaDescription:
      'Buy an electric cycle in Delhi for metro last-mile rides, colony commutes and zero-tailpipe daily travel, with test rides and delivery across the capital.',
    intro: [
      'Delhi is really two cycling cities. Lutyens’ Delhi offers broad, leafy avenues where a thirty-minute ride barely raises a sweat, while the walled lanes around Chandni Chowk and Jama Masjid reward a machine that is narrow, light and easy to nudge through crowds. Between them lie the Ring Road and Outer Ring Road flyovers, feeder bus routes and the stretch that once carried the city’s bus rapid transit experiment — corridors an electric cycle handles without strain.',
      'Daily life here is defined by distance and cost. A metro ride covers the trunk of a journey but rarely the last three kilometres, and every litre of petrol stings more each year. An Eparv electric cycle closes that gap for about what a phone top-up costs in electricity, produces no tailpipe emissions on days when GRAP restrictions tighten, and slots into tight kerbside space at Connaught Place or Lajpat Nagar where a car would circle for twenty minutes. We deliver across the capital, locality by locality.',
      'Start with the numbers: every model in the range, its price, battery capacity, claimed range, charging time and warranty are laid out in the comparison table on this page, so shortlisting happens before you speak to anyone. From there the process is local and physical — a free test ride at your own address, on the colony roads and market loops you actually ride, followed by doorstep delivery with a full walkthrough. For a city that measures everything, the cycle’s running cost is the easiest metric of all: paise per kilometre, month after month.',
    ],
    whyPoints: [
      {
        title: 'The metro’s missing three kilometres',
        body: 'Most Delhi commutes end far from a Yellow Line or Blue Line gate. An e-cycle covers that feeder distance in fifteen minutes, folds into an office corner and needs no parking pass at any station.',
      },
      {
        title: 'Cleaner air starts somewhere',
        body: 'Delhi breathes through its worst months under GRAP advisories. A battery cycle has no exhaust to contribute to the winter haze, so your run to the market or the office adds no smoke to air the whole city is trying to protect.',
      },
      {
        title: 'Parking that actually exists',
        body: 'Between Karol Bagh’s market lanes and Saket’s mall strips, a car slot is scarce and often paid. An e-cycle needs a metre of space and a locked railing, cutting both the daily hunt and the fees that come with it.',
      },
      {
        title: 'Built for working riders',
        body: 'Delivery partners, tutors, shopkeepers and clinic staff move short loops all day across colonies like Janakpuri and Mayur Vihar. Pedal assist keeps those trips quick without a licence, without fuel stops and without petrol receipts.',
      },
    ],
    routes: [
      {
        from: 'Dwarka Sector 21',
        to: 'Janakpuri',
        distance: 'about 9 km one way',
        note: 'A flat run along the Dwarka link road where assist is barely needed, though it earns its keep on hot afternoons.',
      },
      {
        from: 'Mayur Vihar',
        to: 'Connaught Place',
        distance: 'around 14 km one way',
        note: 'Crossing the Nizamuddin bridge and following Ring Road service lanes, selectable assist lets you reach the office without needing a fresh shirt.',
      },
      {
        from: 'Rohini Sector 7',
        to: 'Pitampura',
        distance: 'roughly 6 km one way',
        note: 'Short neighbourhood hops like this are where an e-cycle quietly beats both the metro queue and the auto fare.',
      },
      {
        from: 'Saket',
        to: 'Hauz Khas',
        distance: 'near 5 km one way',
        note: 'Gentle rises along Aurobindo Marg are exactly what the motor is for, and dismounting at the market edge leaves the weekend traffic behind.',
      },
    ],
    localities: [
      'Chandni Chowk',
      'Connaught Place',
      'Lajpat Nagar',
      'Karol Bagh',
      'Dwarka',
      'Rohini',
      'Saket',
      'Vasant Kunj',
      'Mayur Vihar',
      'Pitampura',
      'Model Town',
      'Janakpuri',
    ],
    faqs: [
      {
        question: 'How long does delivery take in Delhi?',
        answer:
          'Once your order and payment are confirmed, we book a delivery slot for your pin code and share the expected dates before dispatch. Most addresses across the city are served within a week of dispatch, though exact timing depends on the model you choose and current stock. If anything holds up the dispatch, our team tells you before the scheduled slot rather than after.',
      },
      {
        question: 'Can I arrange a test ride before buying?',
        answer:
          'Yes. Tell us your area when you enquire and we will coordinate a demo at a time that suits you, whether that is near your home in Model Town or your workplace close to Barakhamba Road. Test rides let you feel the pedal assist, check saddle height and judge range against your real commute instead of relying on specification sheets.',
      },
      {
        question: 'How do I charge the battery in a colony apartment?',
        answer:
          'The battery detaches from the frame, so an ordinary wall socket in your flat, covered parking or ground-floor store room does the job. Charging adds only a small amount to a monthly electricity bill — far less than the petrol it replaces — and most riders in colony apartments simply plug in overnight as part of their routine.',
      },
      {
        question: 'What about service and spare parts in Delhi?',
        answer:
          'Service is handled through scheduled visits and authorised support rather than a single shop you must travel to. Wear items such as brake pads, tyres and tubes are standard sizes available at any cycle market, including the cluster near Karol Bagh, while battery and motor issues go through our warranty process. Maintenance reminders keep the drivetrain honest through the city’s dusty summers.',
      },
      {
        question: 'Which Eparv model should a Delhi commuter shortlist first?',
        answer:
          'For colony-and-metro routines in Dwarka, Rohini or Mayur Vihar, the city-commuter models balance comfort and range best. Riders facing longer cross-town runs — Mayur Vihar to Connaught Place, say — should weight the comparison table toward battery capacity, while flat-dwellers with lift access often prefer the lighter frames. The doorstep test ride is where the shortlist gets settled.',
      },
      {
        question: 'Is riding realistic through Delhi’s winter smog months?',
        answer:
          'Riding in poor AQI is a personal call, and many owners switch to metro-plus-cycle combos or ride early in the day during GRAP weeks. What the e-cycle does guarantee in winter is independence — no cold starts, no fuel-station queues, and a battery that charges overnight regardless of what the air is doing outside.',
      },
    ],
    nearbySlugs: [
      'electric-cycle-in-noida',
      'electric-cycle-in-ghaziabad',
      'electric-cycle-in-greater-noida',
      'electric-cycle-in-delhi-ncr',
    ],
  },
]

export const REGION_PAGES: StatePageData[] = [
  {
    slug: 'electric-cycle-in-delhi-ncr',
    state: 'Delhi NCR',
    metaDescription:
      'Electric cycles for the Delhi NCR: how buying, delivery, test rides and support work across Delhi, Noida, Greater Noida and Ghaziabad, all on one regional page.',
    intro: [
      'The National Capital Region is less a single city than a ring of them: Delhi at the centre, Noida, Greater Noida and Ghaziabad spreading east into Uttar Pradesh, and Gurugram and Faridabad growing south into Haryana. Expressways such as the Noida–Greater Noida route, the Dwarka corridor and the Delhi–Meerut highway have pulled these centres closer, while metro lines stitch office districts like Noida’s Sector 62 or Gurugram’s Udyog Vihar back to residential pockets across state lines.',
      'Inside each of these cities the daily distances are shorter than the map suggests: a ride from a Greater Noida sector to its knowledge park, or from a Ghaziabad colony to Vaishali metro, rarely crosses ten kilometres. That is ideal e-cycle territory. Swapping even a few of those short car and scooter trips for a zero-tailpipe cycle eases the burden on the region’s shared air, and Eparv delivers to riders across the whole NCR footprint with the same buying process in every city.',
      'The practical way in is identical wherever you live in the region: shortlist from the live price-and-spec comparison on any city page, take the free test ride at your own address, and receive the cycle with a doorstep walkthrough. The NCR’s expressway-linked spread means most riders stay within one city for daily trips — but the coverage, pricing and support follow the same rules from Dwarka to Knowledge Park, which is exactly what a regional purchase should feel like.',
    ],
    whyPoints: [
      {
        title: 'Distances built for assist',
        body: 'Trips inside NCR satellite cities tend to be short hops between home sectors, metro stations and office parks. That length sits squarely where pedal assist flatters your effort without ever demanding a mid-route charge.',
      },
      {
        title: 'Air the region shares',
        body: 'Delhi, Noida and Ghaziabad wake to the same winter smog, and GRAP measures treat them as one airshed. Every smoke-free commute you ride within the region removes one more source from that shared problem rather than relocating it.',
      },
      {
        title: 'Metro plus cycle coverage',
        body: 'Rail across the NCR — from the Blue corridor through Noida to the rapid-rail stations along the Ghaziabad stretch of the Delhi–Meerut route — handles the long leg. Pairing a metro pass with an e-cycle covers the whole trip without a second vehicle.',
      },
      {
        title: 'Corporate parks, short shuttles',
        body: 'Office clusters from Noida’s Sector 125 belt to Gurugram’s towers employ thousands who live within cycling distance. An e-cycle turns that last stretch into predictable door-to-door minutes instead of another parking negotiation.',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver across the entire NCR?',
        answer:
          'Yes. Delivery covers Delhi and the satellite cities that surround it, including Noida, Greater Noida and Ghaziabad. Because the region spans more than one state, we confirm your exact location and dispatch timeline when you order rather than promising a single blanket date. Outlying pockets of the NCR are served too, occasionally with an extra day or two of transit.',
      },
      {
        question: 'Can I get a test ride outside Delhi, in the satellite cities?',
        answer:
          'You can. Demos are arranged locally wherever you live or work in the region — a residential sector in Greater Noida, an office campus along the Noida Expressway or a colony in Ghaziabad. Say where you are based when you reach out and we will set the ride on roads you actually use, at a time built around your day.',
      },
      {
        question: 'Which NCR cities have their own pages?',
        answer:
          'Delhi, Noida, Greater Noida and Ghaziabad each have a dedicated page with local routes, localities and FAQs, and Meerut — increasingly tied to the region by the expressway — has one as well. This regional page ties them together. If your town is not listed yet, you can still order; coverage is confirmed for your area when you enquire.',
      },
      {
        question: 'How does delivery work when the order crosses state lines?',
        answer:
          'The process stays the same regardless of which state within the NCR you live in. You order online, we confirm your address and a delivery window, and the cycle arrives with its initial setup done so it is ready to ride. Support after delivery runs through the same channel everywhere in the region, so there is no separate procedure for UP or Haryana addresses.',
      },
      {
        question: 'Is an e-cycle enough for an NCR commute without a second vehicle?',
        answer:
          'For most satellite-city routines, yes — home to office, gym and market in Noida, Greater Noida or Ghaziabad rarely totals more than 12–16 km a day, well inside one charge. For longer cross-region runs, the winning pattern riders adopt is cycle-plus-metro: the cycle covers both ends, the rail corridor covers the middle, and the second vehicle never gets bought.',
      },
      {
        question: 'What does an NCR commute cost on an Eparv per month?',
        answer:
          'A full charge costs under ₹10 and typically covers several days of satellite-city riding, so monthly electricity totals a couple of hundred rupees even with daily use. Add zero parking fees, no insurance creep and servicing that is bicycle-grade, and the annual running cost lands where a month of petrol used to.',
      },
    ],
    linkedCitySlugs: [
      'electric-cycle-in-delhi',
      'electric-cycle-in-noida',
      'electric-cycle-in-greater-noida',
      'electric-cycle-in-ghaziabad',
      'electric-cycle-in-meerut',
    ],
  },
]
