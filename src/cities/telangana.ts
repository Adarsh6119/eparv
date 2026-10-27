import type { CityPageData } from './types'

/**
 * Hand-written city data for Telangana. Every field is unique per city —
 * never reuse sentence structures or phrases between entries.
 */
export const CITIES: CityPageData[] = [
  {
    slug: 'electric-cycle-in-hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    stateHubSlug: null,
    metaDescription:
      'Electric cycle in Hyderabad for the IT corridor, old city and Secunderabad — see prices, specs, delivery areas and book a free test ride near you.',
    intro: [
      'Hyderabad stretches from the Charminar lanes of the old city to the glass towers of HITEC City, and the two halves commute in completely different ways. In the west — Madhapur, Gachibowli, Kondapur, the Financial District — tech professionals cover 4–9 km between metro stations, offices and gated communities, exactly the range where an electric cycle is fastest door to door. In the old city, where four-wheelers barely move at rush hour, a cycle often beats everything on pure pace. An Eparv serves both worlds from one overnight charge.',
      'The city’s cycling credentials are already established: the Hyderabad Bicycle Club runs some of the country’s biggest weekend rides, and the long, flat stretches along the Musi and the Necklace Road loop make riding a genuine pleasure. What the e-cycle adds is practicality — pedal assist absorbs the kbypass climbs and the pre-monsoon humidity, a full charge costs under ₹10, and charging happens beside your desk in any HITEC City tower or flat in Kukatpally.',
      'Cost is the quiet argument that closes most decisions here. A daily Secunderabad-to-Madhapur round trip on a petrol two-wheeler burns fuel, parking money and patience; on an Eparv it draws from a battery that charged while you slept, with servicing limited to chain and brake basics any local cycle shop handles. Delivery covers the whole city — from LB Nagar to Kondapur — and a test ride can be booked at your own gate before you commit to anything.',
    ],
    whyPoints: [
      {
        title: 'IT-corridor last mile',
        body: 'Between HITEC City, Gachibowli and the Financial District, the 2–5 km gaps that autos and cabs overcharge for are the e-cycle’s home ground — door to door in minutes.',
      },
      {
        title: 'Old-city access',
        body: 'Around Charminar, Laad Bazaar and the Mandal Basthi lanes, traffic crawls and parking vanishes — a narrow, silent cycle reaches shutters cars cannot.',
      },
      {
        title: 'Cycling city, upgraded',
        body: 'Hyderabad already rides — Necklace Road loops and club centuries prove it. Electric assist simply extends that habit to errands and workdays, not just weekends.',
      },
      {
        title: 'Metro multiplier',
        body: 'Ride to the Blue or Red Line, carry nothing, park free — the cycle covers the first and last kilometres that the metro can never build tracks for.',
      },
      {
        title: 'Heat handled by assist',
        body: 'Telangana summers end casual pedalling; the motor carrying most of the effort is what turns a March-to-June rider into a year-round commuter.',
      },
    ],
    routes: [
      {
        from: 'HITEC City / Cyber Towers',
        to: 'Gachibowli (Financial District)',
        distance: '≈ 7 km one way',
        note: 'The tech spine — steady assist pace down the ORR service road, arriving without a fresh-shirt problem.',
      },
      {
        from: 'Madhapur',
        to: 'Kondapur',
        distance: '≈ 4 km one way',
        note: 'Neighbourhood hops between hostels, offices and gyms where cabs cost more than a week of charging.',
      },
      {
        from: 'Secunderabad (Paradise)',
        to: 'Begumpet',
        distance: '≈ 5 km one way',
        note: 'Commercial-belt errands on flat roads — the battery barely registers the round trip.',
      },
      {
        from: 'Dilsukhnagar',
        to: 'LB Nagar',
        distance: '≈ 5 km one way',
        note: 'Eastern-corridor commutes with metro-station connections, free of fuel and parking costs.',
      },
    ],
    localities: [
      'HITEC City',
      'Madhapur',
      'Gachibowli',
      'Kondapur',
      'Financial District',
      'Banjara Hills',
      'Jubilee Hills',
      'Kukatpally',
      'Ameerpet',
      'Begumpet',
      'Secunderabad',
      'Dilsukhnagar',
      'LB Nagar',
      'Charminar / Old City',
      'Mehdipatnam',
      'Uppal',
    ],
    faqs: [
      {
        question: 'How quickly is an Eparv delivered in Hyderabad?',
        answer:
          'Orders across the western IT corridor, Secunderabad, the central localities and the old city are typically delivered within a few working days of confirmation. The cycle arrives largely assembled, and the handover includes a walkthrough of the battery, brakes and assist levels so you can ride the same evening.',
      },
      {
        question: 'Can I book a test ride near HITEC City or Gachibowli?',
        answer:
          'Yes — submit the form and a slot is arranged at your address, whether that is a tower in Madhapur, a villa in Gachibowli or a home near Charminar. Riding your actual commute route first is the only honest way to judge range, comfort and the assist levels you will actually use.',
      },
      {
        question: 'How does charging work in Hyderabad apartments and gated communities?',
        answer:
          'The battery detaches from the frame in seconds and charges from any ordinary wall socket — beside a desk in a HITEC City office, in a Kukatpally flat or a society parking room. A full charge takes a few hours, costs under ₹10, and covers days of typical city commuting.',
      },
      {
        question: 'Is the cycle practical in the old city’s narrow lanes?',
        answer:
          'That is where it is most practical. Around Charminar, Laad Bazaar and Gulzar Houz, cars queue and autos squeeze; a cycle glides through, parks against a wall, and carries shopping or stock the final hundreds of metres that no vehicle manages.',
      },
      {
        question: 'What servicing and spare support exists in Hyderabad?',
        answer:
          'Mechanical wear — brakes, tyres, chain — is standard bicycle territory that any good cycle shop in the city services. The battery, motor and controller are warranty-backed and supported directly by Eparv, so electrical questions never depend on hunting for a specialist.',
      },
      {
        question: 'Will the e-cycle survive Hyderabad summers and the monsoon?',
        answer:
          'Summer is what the assist is for — the motor carries the load so a midday ride stays manageable. In the monsoon, sealed electronics handle rain splash as long as components are not submerged, and the city’s worst waterlogged patches are the same ones every rider already routes around.',
      },
    ],
    nearbySlugs: [],
  },
]
