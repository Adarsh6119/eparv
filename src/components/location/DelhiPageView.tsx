'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Clock,
  Droplets,
  Fuel,
  Gauge,
  HelpCircle,
  IndianRupee,
  Info,
  Lightbulb,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  PhoneCall,
  Plug,
  Route,
  Shield,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  TrendingDown,
  Truck,
  Users,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FaqBlock } from '@/components/seo'
import { JsonLd } from '@/components/JsonLd'
import { LeadForm } from '@/components/LeadForm'
import { MODEL_LIST } from '@/data/models'

/* ───────────────────────── static data ───────────────────────── */

const PRICE_TABLE = [
  {
    model: 'Eparv Savitri',
    slug: 'eparv-savitri',
    offerPrice: '18,999',
    mrp: '21,500',
    maxRange: '40 km (up to 110 km PAS)',
    motor: '250W BLDC',
    battery: '36V, 10.4Ah Li-ion',
    bestFor: 'Budget buyers, heavy carrier, relaxed upright ride',
  },
  {
    model: 'Eparv Panther',
    slug: 'eparv-panther',
    offerPrice: '19,999',
    mrp: '21,000',
    maxRange: '55 km PAS (35 km throttle)',
    motor: '250W BLDC Hub',
    battery: '36V, 7.8Ah Li-ion',
    bestFor: 'Students, coaching runs, lightweight agile commute (22 kg)',
  },
  {
    model: 'Eparv Satya',
    slug: 'eparv-satya',
    offerPrice: '21,000',
    mrp: '22,999',
    maxRange: '55 km (highest single-pack range)',
    motor: '250W BLDC hub',
    battery: '36V, 6.6Ah / 7.8Ah Li-ion NMC',
    bestFor: 'Rugged daily commute, dual disc brakes, trail tyres',
  },
  {
    model: 'Eparv Visalka',
    slug: 'eparv-visalka',
    offerPrice: '24,999',
    mrp: '26,000',
    maxRange: '40–60 km',
    motor: '250W',
    battery: '36V, 7.8Ah Li-ion',
    bestFor: 'Rough roads, speed breakers, front suspension fork',
  },
  {
    model: 'Eparv Lahari',
    slug: 'eparv-lahari',
    offerPrice: '25,999',
    mrp: '27,999',
    maxRange: 'Up to 110 km (PAS mode)',
    motor: '250W (with 350W high-torque option)',
    battery: '36V, 10.4Ah Li-ion',
    bestFor: 'Long routes (25+ km), comfort touring saddle, delivery shifts',
  },
]

const BUYER_MATRIX = [
  {
    need: 'Lowest budget & daily errands',
    model: 'Eparv Savitri',
    price: '₹18,999',
    why: 'Entry price, sturdy rear carrier, full mudguards and relaxed upright seating posture.',
  },
  {
    need: 'Daily office & college commute',
    model: 'Eparv Satya',
    price: '₹21,000',
    why: '55 km max range, dual mechanical disc brakes with electronic cut-off, and all-weather trail tyres.',
  },
  {
    need: 'Broken roads, flyovers & potholes',
    model: 'Eparv Visalka',
    price: '₹24,999',
    why: 'Front suspension fork absorbs Delhi flyover expansion joints and colony speed breakers with ease.',
  },
  {
    need: '25+ km long route / cross-NCR',
    model: 'Eparv Lahari',
    price: '₹25,999',
    why: 'Up to 110 km range in PAS mode, comfort touring saddle and multi-capacity battery configurations.',
  },
  {
    need: 'Ladies & senior citizens',
    model: 'Eparv Savitri',
    price: '₹18,999',
    why: 'Upright posture, low-strain ergonomics, full protective mudguards and comfortable load balance.',
  },
  {
    need: 'College students & coaching',
    model: 'Eparv Panther / Satya',
    price: '₹19,999 / ₹21,000',
    why: '₹0.05/km running cost, key ignition lock and detachable battery for safe hostel or classroom charging.',
  },
  {
    need: 'Delivery riders & commercial work',
    model: 'Eparv Lahari / Satya',
    price: '₹25,999 / ₹21,000',
    why: 'Extended battery life, reinforced chassis payload capacity and rapid 2–3 hour top-up charging.',
  },
]

const DELHI_ZONES = [
  {
    zone: 'West Delhi',
    areas: 'Dwarka, Janakpuri, Uttam Nagar, Vikaspuri, Tilak Nagar, Rajouri Garden, Paschim Vihar, Najafgarh',
    tag: 'Wide sector roads & Metro corridors',
    desc: 'Wide sector roads and nearby Blue & Magenta line metro stations make Dwarka and Janakpuri ideal for an electric cycle. Harshit Kapoor, a student commuting from Janakpuri to Dwarka, highlights that the key ignition and battery lock provide peace of mind when parked outside coaching centres or campus gates. In dense areas like Uttam Nagar and Vikaspuri, a cycle effortlessly avoids neighbourhood gridlock and costly parking fees.',
  },
  {
    zone: 'North Delhi',
    areas: 'Rohini, Pitampura, Model Town, Narela, Burari, Kamla Nagar, GTB Nagar',
    tag: 'Coaching clusters & DDA sectors',
    desc: 'In expansive sectors across Rohini and Pitampura, markets, schools and metro stations sit in the 2–6 km sweet spot for electric cycling. For students in Kamla Nagar, GTB Nagar and Delhi University North Campus, an electric cycle is substantially cheaper and faster than waiting for autos or hailing cabs, cutting daily commute expenses by over 85%.',
  },
  {
    zone: 'East Delhi',
    areas: 'Laxmi Nagar, Mayur Vihar, Preet Vihar, Shahdara, Dilshad Garden, Patparganj, Vivek Vihar',
    tag: 'Dense lanes & Last-mile Metro connections',
    desc: 'Across the Yamuna, narrow streets, dense commerce and paid parking make a slim e-cycle effortless to manoeuvre. For last-mile trips to Blue, Pink and Red line metro stations, an electric cycle handles 3–5 km feeder runs smoothly without causing the rider to break a sweat before office hours.',
  },
  {
    zone: 'South Delhi',
    areas: 'Saket, Lajpat Nagar, Malviya Nagar, Hauz Khas, Kalkaji, Nehru Place, Greater Kailash',
    tag: 'Flyovers, Ring Road & Corporate hubs',
    desc: 'With multiple flyovers, underpasses and major commercial clusters, South Delhi routes benefit heavily from front suspension models like the Visalka or Lahari, absorbing expansion joints, speed breakers and uneven tarmac.',
  },
  {
    zone: 'Central Delhi',
    areas: 'Karol Bagh, Connaught Place, Paharganj, Rajinder Nagar',
    tag: 'High density & Door-to-door access',
    desc: 'In tight market lanes and bustling commercial hubs, an e-cycle takes you directly to the shop or office doorway, while the detachable battery can be plugged in inside any shop or chamber from a standard 5A socket.',
  },
  {
    zone: 'NCR Inter-City',
    areas: 'Noida, Greater Noida, Gurugram, Ghaziabad, Faridabad',
    tag: 'Cross-border commutes',
    desc: 'Longer cross-city routes such as Sector 62 Noida to Central Delhi or DLF Cyber City to Dwarka are easily conquered using the long-range Lahari (up to 110 km PAS) or Satya, bypassing interstate toll lines and traffic snarls.',
  },
]

const DELHI_FAQS = [
  {
    question: 'What is the price of an electric cycle in Delhi?',
    answer:
      'Eparv’s electric cycle price in Delhi ranges from ₹18,999 (Savitri) to ₹25,999 (Lahari). The Panther is offered at ₹19,999, the Satya at ₹21,000, and the Visalka trail model at ₹24,999. These represent current official website offer prices; please confirm final accessories and offers with the team before ordering.',
  },
  {
    question: 'Which is the best electric cycle in Delhi?',
    answer:
      'The best electric cycle in Delhi depends on your individual commute: the Savitri suits budget buyers and cargo carrier needs, the Satya is balanced for daily office and college travel, the Visalka excels over broken roads and speed breakers with front suspension, and the Lahari is optimal for long distances up to 110 km. A free 20-minute test ride on your actual route helps you decide.',
  },
  {
    question: 'Do I need a licence, registration or helmet to ride an electric cycle in Delhi?',
    answer:
      'No driving licence, road tax, or RTO registration is required. Eparv electric cycles comply strictly with CMVR (Central Motor Vehicles Rules) low-speed norms (250W motor power and 25 km/h maximum assisted speed). While not legally mandated for low-speed cycles, wearing an ISI-certified helmet and using headlights at night is strongly advised.',
  },
  {
    question: 'How do I buy an electric cycle online in Delhi?',
    answer:
      'Ordering online takes 4 simple steps: 1) Pick your model from the online catalogue, 2) Book a free doorstep test ride, 3) Submit an enquiry to confirm price, colour and delivery date with the team, and 4) Receive factory-direct doorstep delivery with 95% pre-assembly (only pedals and handlebar need a quick 10-minute setup).',
  },
  {
    question: 'Is home delivery available for electric cycles in Delhi?',
    answer:
      'Yes, Eparv provides doorstep delivery across all pin codes in Delhi and NCR. Cycles are dispatched in heavy-duty 7-ply cartons with a complete toolkit included. The motor, controller, battery harness, brakes and wheels are factory pre-fitted and inspected before dispatch.',
  },
  {
    question: 'Can I buy an electric cycle on EMI in Delhi?',
    answer:
      'Eparv does not publish any fixed or automated finance scheme directly on the website. For easy instalment options, credit card EMIs, or NBFC partner schemes, call or WhatsApp +91 99689 84030 to speak directly with the team. Always verify interest rates, processing fees and total repayment terms in writing.',
  },
  {
    question: 'Where is an electric cycle shop or showroom in Delhi?',
    answer:
      'Eparv’s official corporate office and demo showroom is located at B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka, New Delhi – 110078. You can also view authorized dealer points in the dealer directory or arrange a free doorstep test ride directly to your home address.',
  },
  {
    question: 'Which electric cycle is good for ladies in Delhi?',
    answer:
      'The Eparv Savitri is the most practical choice for women: it features an upright riding posture, relaxed handlebar sweep, full mudguards and a sturdy rear carrier for shopping bags or daily essentials. You can choose pedal assist or twist throttle, and take a free doorstep test ride to verify seat height and frame comfort.',
  },
  {
    question: 'Which electric cycle is good for students in Delhi?',
    answer:
      'For college and university students (Delhi University, IP University, IIT Delhi, Jamia, etc.), the Savitri (₹18,999), Panther (₹19,999) or Satya (₹21,000) are recommended. They slash monthly commuting costs down to ₹75, require zero licence or petrol, and feature key locks and detachable batteries that can be safely brought into classrooms or hostel rooms.',
  },
  {
    question: 'How far does an electric cycle go on one charge?',
    answer:
      'Maximum range varies by model and mode: Savitri and Visalka deliver 40–60 km, Satya and Panther deliver up to 55 km, and Lahari achieves up to 110 km in Pedal Assist (PAS) mode. In pure twist-throttle mode, range is typically 35 to 65 km. Real-world range depends on rider weight, terrain and tyre pressure.',
  },
  {
    question: 'How long does charging take and what does it cost in Delhi?',
    answer:
      'A full charge from 0 to 100% takes approximately 2 to 3 hours using the supplied smart charger plugged into a regular 5A household socket. It consumes approximately 0.3 to 0.4 units of electricity, costing roughly ₹3.50 per charge at Delhi domestic power tariffs.',
  },
  {
    question: 'What warranty do I get with an Eparv electric cycle?',
    answer:
      'Eparv provides a 5-year (60-month) structural warranty on the frame, a 2-year (24-month) warranty on the 250W BLDC motor, and a 1-year (12-month) warranty on the lithium-ion battery pack and electronic controller. Always obtain the official warranty card in writing upon delivery.',
  },
  {
    question: 'Can I ride an electric cycle in Delhi rain and waterlogging?',
    answer:
      'Yes. The BLDC hub motor is IP65 water-resistant and all electrical connectors are water-sealed. Electronic brake cut-off instantly halts motor power when brakes are engaged on wet asphalt. However, avoid riding through deep standing water that submerges the bottom bracket or motor axle, and wipe the battery dry after heavy showers.',
  },
  {
    question: 'How much weight can an electric cycle carry?',
    answer:
      'Eparv electric cycles support a payload rating of 110 kg to 140 kg depending on the model, built on high-tensile steel and alloy frames capable of supporting up to 150 kg chassis load. This easily accommodates the rider plus heavy luggage, office bags or delivery packages.',
  },
  {
    question: 'Is an electric cycle in Delhi suitable for delivery riders?',
    answer:
      'Yes. For Swiggy, Zomato, Blinkit, Zepto, Amazon and local courier delivery partners, an electric cycle slashes operating costs from ₹1,700+ monthly in petrol down to ~₹75 in electricity. Higher-capacity models like the Lahari (110 km PAS) or Satya (55 km) are ideal. Bulk fleet bookings are also supported.',
  },
  {
    question: 'Does the cycle run without pedalling?',
    answer:
      'Yes. All Eparv electric cycles feature a full twist-throttle mode that powers the cycle completely without pedalling up to 25 km/h. They also offer multi-level intelligent Pedal Assist (PAS), pure manual cycling, and a walk-assist mode for pushing up steep ramps.',
  },
  {
    question: 'Is there a government subsidy on electric cycles in Delhi?',
    answer:
      'Eparv does not claim or build subsidies into its direct selling prices. EV subsidy policies under the Delhi Electric Vehicle Policy are revised periodically by the Transport Department. Prospective buyers should check current eligibility criteria on the official Delhi EV portal.',
  },
  {
    question: 'How do I get service and spare parts in Delhi?',
    answer:
      'Routine mechanical upkeep (brake pads, cables, tyres, chains) can be handled at any local bicycle workshop across Delhi. For electrical components, Eparv provides technician video assistance, factory-direct warranty coverage, and genuine spare parts dispatch within 24 to 48 hours. Call +91 99689 84030 for service support.',
  },
  {
    question: 'Is the test ride in Delhi really free?',
    answer:
      'Yes, 100% free with zero purchase obligation. You can schedule a 20-minute test ride at your own home or workplace in Delhi to test the pedal assist, brakes, and ergonomics on your daily route before making any decision.',
  },
]

/* ───────────────────────── component ───────────────────────── */

export const DelhiPageView: React.FC = () => {
  /* Product JSON-LD schema for models */
  const productSchemas = PRICE_TABLE.map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: m.model,
    brand: { '@type': 'Brand', name: 'Eparv' },
    description: `${m.model} electric cycle in Delhi – ${m.maxRange} range, ${m.motor} motor, ${m.battery}. Best for: ${m.bestFor}.`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: m.offerPrice.replace(/,/g, ''),
      availability: 'https://schema.org/InStock',
      url: `https://eparvmotors.com/electric-cycles/${m.slug}`,
    },
  }))

  /* Organization / LocalBusiness JSON-LD */
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Store'],
    name: 'Eparv Motors - Electric Cycle in Delhi',
    legalName: 'EPARV INGENUITY PRIVATE LIMITED',
    url: 'https://eparvmotors.com/electric-cycle-in-delhi',
    logo: 'https://eparvmotors.com/logo.png',
    image: 'https://eparvmotors.com/images/eparv-store-delhi.jpg',
    founder: {
      '@type': 'Person',
      name: 'Rajendra Kumar Mishra',
    },
    foundingDate: '2021-03-31',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110078',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.5921',
      longitude: '77.0460',
    },
    telephone: '+919968984030',
    email: 'contact@eparvmotors.com',
    priceRange: '₹18,999 - ₹25,999',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:00',
      },
    ],
  }

  return (
    <article className="pb-20 pt-16">
      <div className="container max-w-5xl">
        {/* ─── Breadcrumbs ─── */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electric Cycle in India', href: '/electric-cycle-in' },
            { label: 'Delhi NCR', href: '/electric-cycle-in-delhi-ncr' },
            { label: 'Delhi' },
          ]}
        />

        {/* ─── H1 Header ─── */}
        <header className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <MapPin className="size-3.5 text-energy" />
            <span>Delhi (दिल्ली) • National Capital Territory (NCT)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Electric Cycle in Delhi – Buy Online, Price, Test Ride &amp; Home Delivery
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Nov 20, 2026</span>
            <span>•</span>
            <span>By @Adarsh (Verified against Eparv Motors official specifications)</span>
            <span>•</span>
            <span className="font-medium text-foreground">Last updated: 20 November 2026</span>
          </div>

          {/* Hindi H2 Subheading variation */}
          <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 tracking-tight">
            दिल्ली में इलेक्ट्रिक साइकिल: कीमत, मॉडल और टेस्ट राइड
          </h2>

          <div className="space-y-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl pt-2">
            <p>
              If you are planning to buy an electric cycle in Delhi, you probably have three
              questions: which model to pick, what it costs, and who will look after it once you have
              bought it. This page answers all three. Eparv Motors electric cycles start at{' '}
              <strong className="text-foreground">₹18,999</strong>, come with a detachable
              lithium-ion battery, and carry a{' '}
              <strong className="text-foreground">5-year (60-month) warranty</strong> on the frame.
              Free test rides and doorstep delivery can be booked across Delhi, and the company&apos;s
              headquarters is in <strong className="text-foreground">Dwarka Sector 12</strong>.
            </p>
            <p className="border-l-2 border-primary/40 pl-3 text-sm italic text-foreground/80">
              दिल्ली में इलेक्ट्रिक साइकिल अब सिर्फ़ शौक नहीं, रोज़ की ज़रूरत बन चुकी है। पेट्रोल ₹100
              प्रति लीटर के आसपास है, ट्रैफ़िक लंबा है और पार्किंग मुश्किल। ऐसे में यह ऑफिस, कॉलेज,
              मार्केट और मेट्रो स्टेशन तक का सफ़र सस्ता और आसान बनाती है।
            </p>
          </div>

          {/* Keywords Banner */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {[
              'buy electric cycle online in Delhi',
              'electric cycle price in Delhi',
              'electric cycle shop in Delhi',
              'electric cycle home delivery Delhi',
              'electric cycle EMI Delhi',
              'best electric cycle in Delhi',
              'electric cycle for ladies Delhi',
              'electric cycle for students Delhi',
              'electric cycle Delhi',
            ].map((kw) => (
              <span
                key={kw}
                className="text-[11px] rounded-md bg-muted/50 border border-border/60 px-2 py-0.5 text-muted-foreground"
              >
                #{kw}
              </span>
            ))}
          </div>
        </header>

        {/* ─── EEAT Reviewer Box ─── */}
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground my-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
              RKM
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Reviewed by Rajendra Kumar Mishra
              </p>
              <p className="text-[11px] text-muted-foreground">
                Founder &amp; Managing Director, EPARV INGENUITY PRIVATE LIMITED
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2.5 py-1 rounded-full bg-card border border-border text-[11px] font-medium text-foreground">
              Research by @Adarsh • 20 Nov 2026
            </span>
          </div>
        </div>

        {/* ─── Quick Answer: At a Glance ─── */}
        <section
          aria-label="Quick answer"
          className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-5 sm:p-6 shadow-sm my-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            <Sparkles className="size-3.5 text-energy" />
            <span>Electric Cycle in Delhi: Information at a Glance</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                q: 'Price range',
                a: '₹18,999 to ₹25,999 (Savitri ₹18,999, Panther ₹19,999, Satya ₹21,000, Visalka ₹24,999, Lahari ₹25,999)',
              },
              {
                q: 'Running cost in Delhi',
                a: '₹0.05 per km (~₹3.50 for full charge; ~₹75/month for 500 km commute)',
              },
              {
                q: 'Motor specification',
                a: '250W BLDC Hub Motor with electronic brake cut-off, top speed 25 km/h',
              },
              {
                q: 'Battery & charging',
                a: 'Detachable 36V Li-ion NMC pack, charges in 2–3 hours from any 5A wall socket',
              },
              {
                q: 'Range on single charge',
                a: 'Up to 110 km in Pedal Assist (PAS) mode, 35 km to 65 km in throttle mode',
              },
              {
                q: 'Licence & registration',
                a: 'Zero driving licence, road tax, or RTO registration needed under CMVR norms',
              },
              {
                q: 'Doorstep test ride',
                a: '100% free 20-minute test ride on your own commute route in Delhi',
              },
              {
                q: 'Home delivery Delhi',
                a: 'Factory-direct delivery across all Delhi pin codes in heavy-duty box with toolkit',
              },
              {
                q: 'Official warranty',
                a: '60 months (5 years) on frame, 24 months on motor, 12 months on battery',
              },
              {
                q: 'Delhi showroom & office',
                a: 'B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka, New Delhi – 110078',
              },
            ].map((item) => (
              <div
                key={item.q}
                className="flex items-start gap-2 rounded-xl border border-border/50 bg-card p-3"
              >
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-foreground">{item.q}:</span>{' '}
                  <span className="text-xs text-muted-foreground">{item.a}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Three Big Benefits ─── */}
        <section className="my-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Key Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Why Choose an Electric Cycle in Delhi? Three Big Benefits
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Commuting in the National Capital presents distinct challenges: petrol hovering around
              ₹100/litre, traffic congestion at flyover bottlenecks, and severe parking scarcity. An
              electric cycle directly solves these pain points.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="rounded-xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="size-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <TrendingDown className="size-5" />
                </div>
                <h3 className="font-bold text-base text-foreground">1. Very Low Running Cost</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  According to Eparv&apos;s savings estimator, covering 500 km a month on a petrol
                  scooter costs about ₹1,732, while the electricity bill for an electric cycle is
                  about ₹75. Eparv quotes an ultra-low running cost of <strong>₹0.05 per km</strong> and
                  around ₹3.50 of electricity for a full charge, saving ~₹19,884 annually.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg">
                Payback in ~14 months against petrol scooter costs
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="size-5" />
                </div>
                <h3 className="font-bold text-base text-foreground">2. Time Saved in Traffic</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Saurabh Srivastava, a verified rider from Dwarka Sector 11, reported on
                  Eparv&apos;s site that his 14 km daily commute from Dwarka to Aerocity, which took
                  45–50 minutes in peak car/bus traffic, now takes about 25 minutes. Colony cuts,
                  service lanes and cycle-friendly corridors consistently beat gridlock.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-primary bg-primary/5 p-2 rounded-lg">
                Bypasses bottleneck flyovers &amp; colony choke-points
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="size-9 rounded-lg bg-energy/10 flex items-center justify-center text-energy">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="font-bold text-base text-foreground">3. Simple Ownership</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Eparv cycles remain strictly within CMVR low-speed limits (motor under 250W, top
                  speed 25 km/h), so no driving licence, road tax, pollution check or RTO
                  registration is needed. The detachable battery means you can charge in your home
                  or office from a normal 5A socket in 2–3 hours, even on the 3rd floor.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-energy bg-energy/5 p-2 rounded-lg">
                Zero RTO paperwork • Plug into any standard 5A socket
              </div>
            </div>
          </div>
        </section>

        {/* ─── Honest Suitability Note ─── */}
        <section className="my-10 rounded-2xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Info className="size-4 shrink-0" />
            <span>Honest Evaluation: When an Electric Cycle in Delhi Works Well, and When It Does Not</span>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Here is an honest note first: an electric cycle in Delhi is not right for every trip.
            Eparv cycles top out at 25 km/h and carry a payload of roughly 110–140 kg (on a 150 kg
            chassis rating), so if you need to ride more than 40 km in a single stretch or use access-controlled
            expressways, this is not the right vehicle.
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">
            For a daily commute of <strong>5 to 25 km</strong>, the last-mile feeder to a metro station,
            local market and colony runs, or movement inside an educational campus or residential society,
            an electric cycle in Delhi is one of the cheapest, fastest and most practical mobility options
            available. If you currently spend heavily on scooter petrol, the switch can pay for itself within
            months; Eparv&apos;s estimator demonstrates a payback period of approximately 14 months.
          </p>
        </section>

        {/* ─── Price List Table ─── */}
        <section className="my-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              2026 Price &amp; Specification Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Electric Cycle Price in Delhi: Eparv Models and Specifications
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The price of an electric cycle in Delhi across Eparv’s models ranges from ₹18,999 to
              ₹25,999. The prices below are the offer prices shown on Eparv’s official website, with
              the MRP listed separately. Please confirm the final price and accessories with the team
              before ordering, as offers can change.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-muted/50 border-b border-border text-foreground font-semibold">
                <tr>
                  <th className="p-3 sm:p-4">Model</th>
                  <th className="p-3 sm:p-4">Offer Price</th>
                  <th className="p-3 sm:p-4">MRP</th>
                  <th className="p-3 sm:p-4">Max Range</th>
                  <th className="p-3 sm:p-4">Motor</th>
                  <th className="p-3 sm:p-4">Battery</th>
                  <th className="p-3 sm:p-4">Best For</th>
                  <th className="p-3 sm:p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                {PRICE_TABLE.map((row) => (
                  <tr key={row.model} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-foreground whitespace-nowrap">
                      {row.model}
                    </td>
                    <td className="p-3 sm:p-4 font-extrabold text-primary whitespace-nowrap">
                      ₹{row.offerPrice}
                    </td>
                    <td className="p-3 sm:p-4 line-through text-muted-foreground/70 whitespace-nowrap">
                      ₹{row.mrp}
                    </td>
                    <td className="p-3 sm:p-4 whitespace-nowrap">{row.maxRange}</td>
                    <td className="p-3 sm:p-4 whitespace-nowrap">{row.motor}</td>
                    <td className="p-3 sm:p-4 whitespace-nowrap">{row.battery}</td>
                    <td className="p-3 sm:p-4 min-w-[200px]">{row.bestFor}</td>
                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <Link
                        href={`/electric-cycles/${row.slug}`}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">
            * Range changes with rider weight, riding mode (throttle or pedal assist), road condition and
            wind. Treat the &quot;max range&quot; column as an upper figure, not a guarantee.
          </p>
        </section>

        {/* ─── Model Spotlights ─── */}
        <section className="my-12 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Detailed Lineup Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Deep Dive: Which Eparv Electric Cycle Suits Your Delhi Route?
            </h2>
          </div>

          <div className="space-y-6">
            {/* Savitri */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Entry &amp; Utility Commuter
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Eparv Savitri: The Lowest-Priced Model (From ₹18,999)
                  </h3>
                </div>
                <span className="text-sm font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  ₹18,999 (MRP ₹21,500)
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you want an electric cycle in Delhi at the lowest budget, start with the Savitri. At
                ₹18,999 it comes with a 250W BLDC motor, a heavy-duty welded rear carrier, full metal
                mudguards and a relaxed upright riding posture. The carrier easily holds college books,
                groceries, or shop inventory, and the upright seating keeps your posture comfortable on
                longer colony rides. It is the most practical entry model for market errands, daily
                commutes and residential society use.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  250W BLDC Motor
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Up to 110 km PAS / 40 km throttle
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Heavy Rear Carrier
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Upright Comfort Posture
                </span>
              </div>
            </div>

            {/* Satya */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Everyday Commuter
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Eparv Satya: Everyday Office and College Commute (₹21,000)
                  </h3>
                </div>
                <span className="text-sm font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  ₹21,000 (MRP ₹22,999)
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Satya costs ₹21,000 (MRP ₹22,999) and offers the most balanced everyday range at 55 km.
                It features a 250W BLDC hub motor, a 36V detachable Li-ion NMC battery (with 6.6Ah or 7.8Ah
                options), dual mechanical disc brakes and knobby trail tyres. Top speed is 25 km/h and a
                full charge takes just 2–3 hours. Vikramaditya Chauhan, a rider from Gurugram, praised the
                electronic motor cut-off upon braking and the responsive support team on Eparv’s site.
                For anyone seeking a reliable, balanced workhorse for Delhi traffic, the Satya is an ideal pick.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  55 km Single-Pack Range
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Dual Disc Brakes with Cut-off
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Knobby Trail Tyres
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Detachable NMC Battery
                </span>
              </div>
            </div>

            {/* Visalka */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Front Suspension Trail Model
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Eparv Visalka: For Rough Roads, Flyovers and Speed Breakers (₹24,999)
                  </h3>
                </div>
                <span className="text-sm font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  ₹24,999 (MRP ₹26,000)
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Visalka (₹24,999, MRP ₹26,000) is shown as the Best Seller trail model on Eparv’s
                website. It is equipped with a responsive front suspension fork, dual disc brakes, a 250W
                motor, and key ignition with a secure battery lock. On uneven roads, expansion joints on
                Outer Ring Road flyovers, and steep speed breakers, the front suspension takes the sting
                out of the ride. If your route has patchy pavement or you enjoy weekend rides in Sanjay Van
                and DDA parks, the Visalka is worth serious consideration.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Front Suspension Fork
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Key Ignition with Lock
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Dual Disc Brakes
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  All-Terrain MTB Frame
                </span>
              </div>
            </div>

            {/* Lahari */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Long-Range Touring &amp; Delivery
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Eparv Lahari: The Long-Range Model (₹25,999)
                  </h3>
                </div>
                <span className="text-sm font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  ₹25,999 (MRP ₹27,999)
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Lahari costs ₹25,999 (MRP ₹27,999) and is engineered as Eparv’s longest-range model,
                achieving up to 110 km in PAS (pedal assist) mode. It features an ergonomic comfort touring
                saddle, front suspension, and modular battery options. Ankit Mehra from Sector 62, Noida,
                who commutes approximately 32 km round trip between Noida and Central Delhi, notes that a
                single charge lasts roughly three days on pedal assist. <em>(Editorial note: While some
                product listings reference high-torque 350W motor variants, the street-legal CMVR version
                runs at 250W. Confirm your exact motor wattage preference when booking).</em>
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Up to 110 km PAS Range
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Ergonomic Touring Saddle
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Front Suspension
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Ideal for Cross-NCR Travel
                </span>
              </div>
            </div>

            {/* Panther */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Lightweight Urban Agility
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Eparv Panther: Lightweight Commute for Students &amp; Young Professionals (₹19,999)
                  </h3>
                </div>
                <span className="text-sm font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  ₹19,999 (MRP ₹21,000)
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At just 22 kg, the Panther is Eparv’s lightest urban machine. With stealth matte styling,
                quick-release components, 55 km PAS range and 25 km/h top speed, it gives young riders and
                students an agile bicycle that is easy to carry upstairs into flats or metro elevator banks.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Ultra-light 22 kg Frame
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  55 km PAS Range
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Stealth Urban Geometry
                </span>
                <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                  Quick-Charge Li-ion
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Buyer Matrix Table ─── */}
        <section className="my-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Decision Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Best Electric Cycle in Delhi: Which One Is Right for You?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The best electric cycle in Delhi is not a single universal model; it depends on your
              route, budget and daily cargo needs. The table below helps you match your requirement
              directly to the right model.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-muted/50 border-b border-border text-foreground font-semibold">
                <tr>
                  <th className="p-3 sm:p-4">Your Need</th>
                  <th className="p-3 sm:p-4">Suggested Model</th>
                  <th className="p-3 sm:p-4">Offer Price</th>
                  <th className="p-3 sm:p-4">Why This Model Fits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                {BUYER_MATRIX.map((item) => (
                  <tr key={item.need} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-foreground">{item.need}</td>
                    <td className="p-3 sm:p-4 font-extrabold text-primary whitespace-nowrap">
                      {item.model}
                    </td>
                    <td className="p-3 sm:p-4 font-semibold text-foreground whitespace-nowrap">
                      {item.price}
                    </td>
                    <td className="p-3 sm:p-4">{item.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── 5 Things to Check ─── */}
        <section className="my-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            5 Things to Check Before Buying an Electric Cycle in Delhi
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {[
              {
                num: '1',
                title: 'A Detachable Battery',
                desc: 'Essential for colony apartments and office charging from any standard 5A socket without bringing the cycle indoors.',
              },
              {
                num: '2',
                title: 'Brakes & Motor Cut-Off',
                desc: 'Dual disc brakes with electronic brake sensor cut-off ensure power cuts immediately when braking in stop-and-go Delhi traffic.',
              },
              {
                num: '3',
                title: 'Real Warranty Terms',
                desc: 'Demand transparent splits: Eparv provides 60 months on the frame, 24 months on the motor, and 12 months on the battery pack.',
              },
              {
                num: '4',
                title: 'Service & Spare Parts Access',
                desc: 'Ensure spare parts (throttles, displays, brake pads) ship in 24–48 hours, and local cycle shops can handle mechanical tune-ups.',
              },
              {
                num: '5',
                title: 'A 20-Minute Real Route Test Ride',
                desc: 'Always test on your actual commute—tackling flyovers and colony bumps—before committing your money.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="size-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {item.num}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Delhi Neighbourhood Guide ─── */}
        <section className="my-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Area-by-Area Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Electric Cycle Across Delhi: From Dwarka to Laxmi Nagar
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Eparv’s headquarters is situated in Dwarka Sector 12, and free test ride requests can be
              scheduled across all zones of Delhi. Here is how an electric cycle performs in different
              parts of the capital:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DELHI_ZONES.map((zone) => (
              <div
                key={zone.zone}
                className="rounded-xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    <MapPin className="size-3 text-energy" />
                    <span>{zone.zone}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{zone.tag}</h3>
                  <p className="text-[11px] font-semibold text-primary/90">{zone.areas}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{zone.desc}</p>
                </div>
                <div className="pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                  Doorstep test ride available in this zone
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── How to Buy Online & Home Delivery ─── */}
        <section className="my-12 grid sm:grid-cols-2 gap-6">
          {/* 4 Steps */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Order Process
              </span>
              <h2 className="text-xl font-bold text-foreground">
                Buy Electric Cycle Online in Delhi: 4 Simple Steps
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              {[
                {
                  step: 'Step 1: Pick a Model',
                  text: 'Compare range, motor, battery capacity and prices in the online catalogue.',
                },
                {
                  step: 'Step 2: Book a Free Test Ride',
                  text: 'A 20-minute ride is arranged at your doorstep or nearby dealer point with no obligation to buy.',
                },
                {
                  step: 'Step 3: Send an Enquiry',
                  text: 'The Eparv team confirms offer price, optional accessories and delivery dates before anything is finalised.',
                },
                {
                  step: 'Step 4: Delivery and Setup',
                  text: 'The cycle arrives ~95% pre-assembled; simply straighten the handlebar and thread the pedals (takes ~10 minutes).',
                },
              ].map((s) => (
                <div key={s.step} className="rounded-lg bg-muted/30 p-3 space-y-1">
                  <div className="font-bold text-foreground">{s.step}</div>
                  <div className="text-muted-foreground text-xs">{s.text}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">
              Tip: Keep your pin code, preferred model and expected delivery date handy when speaking to the team.
            </p>
          </div>

          {/* Home Delivery Details */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Doorstep Dispatch
                </span>
                <h2 className="text-xl font-bold text-foreground">
                  Electric Cycle Home Delivery Delhi: How It Reaches Your Door
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                For electric cycle home delivery in Delhi, Eparv offers factory-direct doorstep
                dispatch. The cycle comes in a heavy-duty carton with an Allen key and pedal spanner
                toolkit included. Motor, wiring, controller, brakes and rear wheel are factory pre-fitted
                and road-tested.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                With direct home delivery, you get an electric cycle delivered straight to your residence
                or office without showroom markups, while anyone wishing to inspect the machine first can
                take advantage of our 100% free doorstep test ride.
              </p>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-3 text-xs text-primary font-semibold flex items-center gap-2">
              <Truck className="size-4 shrink-0" />
              <span>Doorstep delivery available across all Delhi pin codes</span>
            </div>
          </div>
        </section>

        {/* ─── Showroom & Shop in Delhi ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Showroom &amp; Office
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Electric Cycle Shop in Delhi: Showroom and Dealer Network
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you are looking for an authorized electric cycle shop or wish to meet the team directly,
              here are the official corporate and showroom credentials:
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-1.5">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                <span>Head Office &amp; Demo Room</span>
              </div>
              <p className="text-muted-foreground">
                B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka, New Delhi – 110078
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-1.5">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Phone className="size-4 text-primary" />
                <span>Phone &amp; WhatsApp</span>
              </div>
              <p className="text-muted-foreground">
                <a href="tel:+919968984030" className="hover:underline text-foreground font-semibold">
                  +91 99689 84030
                </a>
              </p>
              <p className="text-[11px] text-muted-foreground">Mon–Sat, 9:30 AM to 7:00 PM</p>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-1.5">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Store className="size-4 text-primary" />
                <span>Dealer Opportunities</span>
              </div>
              <p className="text-muted-foreground">
                Showroom branding, demo units &amp; technician training.
              </p>
              <Link href="/dealers" className="text-[11px] font-bold text-primary hover:underline">
                Visit Dealer Directory →
              </Link>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Please call before visiting to confirm team availability and demo model inventory.
          </p>
        </section>

        {/* ─── EMI & Finance ─── */}
        <section className="my-10 rounded-2xl border border-border bg-muted/20 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <IndianRupee className="size-4" />
            <span>Electric Cycle EMI Delhi: The Honest Answer on Finance</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Transparent Policy on Finance &amp; Installments
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Many buyers enquire about buying an electric cycle in Delhi on EMI, so we believe in complete
            clarity: Eparv’s official website does not currently publish an automatic or fixed EMI loan
            scheme. Therefore, this page does not quote misleading bank tie-ups or low-interest marketing
            gimmicks.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To explore available credit card EMI options, easy payment arrangements, or third-party NBFC
            support, call or WhatsApp{' '}
            <a href="tel:+919968984030" className="font-semibold text-primary hover:underline">
              +91 99689 84030
            </a>{' '}
            directly. Never enter into an installment plan without receiving the interest rate, processing
            fee and total repayment cost in writing.
          </p>
        </section>

        {/* ─── Ladies & Students ─── */}
        <section className="my-12 grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Users className="size-5" />
              <h3 className="text-lg font-bold text-foreground">Electric Cycle for Ladies in Delhi</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              For women searching for an electric cycle for ladies in Delhi, the{' '}
              <strong className="text-foreground">Savitri</strong> is a very practical choice: a relaxed
              upright posture, full protective mudguards, and a heavy rear carrier cater to colony market
              runs, school drop-offs and short office trips. You can effortlessly switch between pedal
              assist and twist throttle, and take a free doorstep test ride to check step-over height and
              balance before ordering.
            </p>
            <Link
              href="/electric-cycle-for-women"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Women&apos;s E-Cycles</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Zap className="size-5" />
              <h3 className="text-lg font-bold text-foreground">Electric Cycle for Students in Delhi</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              An electric cycle for students cuts daily expenditure on autos, metro feeders and bike
              petrol down to ~paise per km. No driving licence or registration is required, but wearing an
              ISI helmet and using headlights at night is essential. The lightweight Panther (22 kg) and
              Savitri are top picks; key ignition and detachable batteries keep the cycle safe outside
              lecture halls and coaching centers.
            </p>
            <Link
              href="/electric-cycle-for-students"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Student Guide</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </section>

        {/* ─── Weather, Heat, Rain, Pollution ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Weather &amp; Environmental Resilience
          </span>
          <h2 className="text-2xl font-bold text-foreground">
            Riding an Electric Cycle in Delhi Heat, Rain and Winter Pollution
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Delhi’s 45°C summer heatwaves, sudden monsoon downpours and winter smog are a rigorous test
            for any vehicle. Here is how Eparv engineering handles these conditions:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                <Sun className="size-4" />
                <span>Summer Heat (45°C)</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Electric motor assist takes the strain off your body, letting you reach office presentable
                without the exhaustion of an acoustic bicycle. Charge the detachable battery indoors away
                from direct sunlight.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                <Droplets className="size-4" />
                <span>Monsoon Waterlogging</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The BLDC hub motor is IP65 water-resistant and all harness cables are rubber-sealed.
                Motor cut-off stops power as soon as brakes are applied on slippery tarmac. Avoid riding
                through deep water that covers the motor hub.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <Wind className="size-4" />
                <span>Pollution &amp; GRAP</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                An electric cycle produces zero tailpipe emissions, meaning your commute contributes
                nothing to Delhi’s winter smog or GRAP alerts. On severe AQI days, wear an N95 mask or
                opt for shorter feeder routes.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Running Cost Savings ─── */}
        <section className="my-12 rounded-2xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 p-6 sm:p-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Fuel vs Electricity
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Running Cost: What an Electric Cycle in Delhi Really Saves
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eparv’s savings estimator demonstrates clear economics: for a 500 km monthly commute, a petrol
            scooter costs approximately <strong>₹1,732</strong> in fuel, while an Eparv electric cycle
            requires just <strong>₹75</strong> of domestic electricity.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-xs text-muted-foreground">Petrol Scooter / Mo</div>
              <div className="text-lg sm:text-xl font-extrabold text-red-500 mt-1">₹1,732</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-xs text-muted-foreground">Eparv E-Cycle / Mo</div>
              <div className="text-lg sm:text-xl font-extrabold text-emerald-500 mt-1">₹75</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-xs text-muted-foreground">Monthly Net Savings</div>
              <div className="text-lg sm:text-xl font-extrabold text-primary mt-1">₹1,657</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-xs text-muted-foreground">Annual Net Savings</div>
              <div className="text-lg sm:text-xl font-extrabold text-primary mt-1">₹19,884</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            * Estimates based on 500 km/mo, ₹100/litre petrol (35 km/l real city mileage), and ₹7/unit
            domestic power tariff. Actual results vary with rider weight, speed and throttle usage.
          </p>
        </section>

        {/* ─── Corporate Trust & Credibility Table ─── */}
        <section className="my-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Corporate Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Why Trust Eparv Motors: Company, Warranty and Support
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Buying an electric cycle in Delhi is a decision of roughly ₹20,000–₹25,000, so it matters
              who you are buying from. Below are the verified details Eparv has published on its official
              website:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-muted/20">
                  <td className="p-3 sm:p-4 font-bold text-foreground w-1/3">Company Name</td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    EPARV INGENUITY PRIVATE LIMITED (Brand: Eparv)
                  </td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Founded</td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    31 March 2021, by Rajendra Kumar Mishra
                  </td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 sm:p-4 font-bold text-foreground">CIN</td>
                  <td className="p-3 sm:p-4 font-mono text-muted-foreground">U34300DL2021PTC379435</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 sm:p-4 font-bold text-foreground">GSTIN</td>
                  <td className="p-3 sm:p-4 font-mono text-muted-foreground">07AAGCE4054K1ZJ</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Corporate Office</td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka, New Delhi – 110078
                  </td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Official Helpline</td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    +91 99689 84030 (Phone &amp; WhatsApp) • contact@eparvmotors.com
                  </td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Warranty Coverage</td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    Frame: 60 months (5 years) • BLDC Motor: 24 months • Battery: 12 months
                  </td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Statutory Compliance</td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    CMVR Low-Speed Norms: Motor &lt; 250W, Max Speed 25 km/h (No RTO/Licence needed)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Real Riders & Feedback ─── */}
        <section className="my-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Real User Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Our Experience: Real Riders on Real Delhi NCR Roads
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              According to Eparv&apos;s records, over 100+ electric cycles are running on Indian roads,
              with strong rider communities in Dwarka, Janakpuri, Noida, Gurugram, Lucknow, Patna and
              Indore. Here is what Delhi NCR riders share about daily traffic, brake cut-off and support:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: 'Saurabh Srivastava',
                area: 'Dwarka Sector 11',
                route: 'Dwarka to Aerocity (14 km)',
                feedback:
                  'Commute time slashed from 45–50 min in car traffic down to 25 min by e-cycle. Bypassing bottleneck flyovers saved both time and fuel.',
              },
              {
                name: 'Vikramaditya Chauhan',
                area: 'Gurugram',
                route: 'Everyday Commuter (Satya)',
                feedback:
                  'Praised the instant electronic motor cut-off when engaging brakes in tight traffic, and the responsive customer support team.',
              },
              {
                name: 'Ankit Mehra',
                area: 'Sector 62, Noida',
                route: 'Noida to Central Delhi (32 km)',
                feedback:
                  'Riding the Lahari on pedal assist gives around 3 full days of commuting on a single charge without fatigue.',
              },
              {
                name: 'Harshit Kapoor',
                area: 'Janakpuri',
                route: 'Student Commute to Dwarka',
                feedback:
                  'Key ignition and battery lock give complete peace of mind when parking outside campus gates and coaching centres.',
              },
            ].map((rev) => (
              <div
                key={rev.name}
                className="rounded-xl border border-border bg-card p-4 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-foreground">{rev.name}</div>
                  <div className="text-[11px] font-medium text-primary">{rev.area}</div>
                  <div className="text-[10px] text-muted-foreground italic">{rev.route}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    &quot;{rev.feedback}&quot;
                  </p>
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold pt-2 border-t border-border/40">
                  Verified Rider Feedback
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Warranty & Editorial Transparency ─── */}
        <section className="my-12 grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">Warranty &amp; After-Sales Support</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Eparv backs every electric cycle with a 5-year frame warranty, 2-year BLDC motor
              warranty, and 1-year battery warranty. Nationwide doorstep delivery, video technician
              guidance, and factory-direct genuine spare parts dispatch within 24–48 hours ensure you are
              never stranded. For service assistance, call{' '}
              <a href="tel:+919968984030" className="text-primary font-semibold hover:underline">
                +91 99689 84030
              </a>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">Editorial Transparency Notice</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Range, running cost and savings figures on this page are derived from Eparv’s official
              technical specifications and calculator. Real-world range varies with rider weight, assist
              level, tyre pressure and ambient temperature. Our goal is to provide honest, verifiable data
              so you can test and confirm performance for yourself before buying.
            </p>
          </div>
        </section>

        {/* ─── Safe Riding & Battery Care Basics ─── */}
        <section className="my-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Safe Riding and Battery Care Basics for Delhi Riders
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[
              {
                title: 'Helmet & Night Visibility',
                text: 'Wear an ISI helmet regardless of licence exemptions, and keep front LED lights and rear reflectors on after sunset.',
              },
              {
                title: 'Weekly Brake & Tyre Check',
                text: 'Inspect brake pads and maintain recommended tyre pressure (35–40 PSI) weekly to preserve range and stopping power.',
              },
              {
                title: 'Original Charger Only',
                text: 'Always charge using the supplied auto-cutoff charger. Never leave the battery in a locked car under hot summer sun.',
              },
              {
                title: 'Partial Storage Rule',
                text: 'Avoid running the pack to 0%. If storing for more than 2 weeks, keep the battery around 50–70% charge in a cool, dry room.',
              },
              {
                title: 'Wet Weather Precaution',
                text: 'Brake early on wet tarmac, as disc brakes take an extra meter to grip when moist. Wipe the frame and battery dock dry after rain.',
              },
              {
                title: '20-Minute Free Test Ride',
                text: 'Test fit, handlebar reach and pedal assist modes on your actual route to find your most comfortable setup.',
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-border bg-card p-4 space-y-1.5"
              >
                <div className="font-bold text-sm text-foreground">{tip.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Summary Section ─── */}
        <section className="my-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Electric Cycle in Delhi: Summary
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you want to buy an electric cycle in Delhi, Eparv’s models are available from{' '}
            <strong className="text-foreground">₹18,999 to ₹25,999</strong>. All models come equipped
            with a 250W BLDC hub motor, a top speed limit of 25 km/h, and a detachable lithium-ion battery.
            Free test rides and doorstep delivery are provided across all areas of Delhi including Dwarka,
            Janakpuri, Rohini, Pitampura, Laxmi Nagar, Mayur Vihar, Saket, and Karol Bagh. No driving
            licence or RTO registration is required under CMVR rules. Every cycle is backed by a 5-year frame
            warranty, 24 months on the motor, and 12 months on the battery.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Call or WhatsApp{' '}
            <a
              href="tel:+919968984030"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              +91 99689 84030
            </a>{' '}
            to schedule your free test ride slot today.
          </p>
        </section>

        {/* ─── All Models Gallery ─── */}
        <section className="my-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Official Lineup
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Electric Cycle Models Available in Delhi
              </h2>
            </div>
            <Link
              href="/electric-cycles"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Lineup Comparison</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODEL_LIST.map((model) => (
              <div
                key={model.id}
                className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-muted/30 p-4 flex items-center justify-center">
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {model.badge}
                    </span>
                    <span className="absolute top-3 right-3 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-card border border-border">
                      ₹{model.priceSelling?.toLocaleString('en-IN')}
                    </span>
                    <img
                      src={model.image}
                      alt={`${model.name} electric cycle in Delhi`}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {model.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{model.tagline}</p>
                    <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground border-t border-border/50">
                      <div>
                        PAS Range:{' '}
                        <strong className="text-foreground">{model.rangePasKm} km</strong>
                      </div>
                      <div>
                        Top Speed:{' '}
                        <strong className="text-foreground">{model.topSpeedKmh} km/h</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0 space-y-2">
                  <Link
                    href={`/electric-cycles/${model.slug}`}
                    className="w-full inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary/90 transition-all"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ Block ─── */}
        <FaqBlock
          heading="Frequently Asked Questions – Electric Cycle in Delhi"
          subheading="Common questions about buying, pricing, test rides, charging, EMI, and servicing an electric cycle in Delhi."
          faqs={DELHI_FAQS}
          id="delhi-faq"
        />

        {/* ─── CTA: Book Test Ride ─── */}
        <section className="my-12 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 via-card to-energy/10 p-6 sm:p-8 text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Book Your Free Electric Cycle in Delhi Test Ride Today
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Choosing an electric cycle in Delhi should not be hard: look at the models, ride on your
              own daily route, and then decide. Book a free 20-minute test ride brought straight to your
              door anywhere in Delhi or NCR with zero purchase obligation.
            </p>
          </div>

          <div className="max-w-xl mx-auto text-left bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-md">
            <LeadForm
              type="test-ride"
              defaultCity="Delhi"
              submitLabel="Book Free Test Ride in Delhi"
              products={[
                { slug: 'eparv-savitri', name: 'Eparv Savitri (₹18,999)' },
                { slug: 'eparv-panther', name: 'Eparv Panther (₹19,999)' },
                { slug: 'eparv-satya', name: 'Eparv Satya (₹21,000)' },
                { slug: 'eparv-visalka', name: 'Eparv Visalka (₹24,999)' },
                { slug: 'eparv-lahari', name: 'Eparv Lahari (₹25,999)' },
              ]}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="tel:+919968984030"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-xs sm:text-sm font-bold text-white hover:bg-primary/90 transition-all"
            >
              <Phone className="size-4" />
              Call / WhatsApp: +91 99689 84030
            </a>
            <a
              href="mailto:contact@eparvmotors.com"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted/30 transition-all"
            >
              Email: contact@eparvmotors.com
            </a>
          </div>
        </section>

        {/* ─── Internal Links ─── */}
        <section className="my-12 pt-8 border-t border-border/60">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-4">
            Explore Related Guides &amp; Regional Hubs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              {
                title: 'Electric Cycles in Delhi NCR',
                url: '/electric-cycle-in-delhi-ncr',
                cat: 'region',
                desc: 'Explore Delhi, Noida, Gurgaon, Ghaziabad & Faridabad network',
              },
              {
                title: 'Electric Cycle in Noida',
                url: '/electric-cycle-in-noida',
                cat: 'location',
                desc: 'Delivery, test rides and prices in Noida',
              },
              {
                title: 'Electric Cycle in Gurugram',
                url: '/electric-cycle-in-gurugram',
                cat: 'location',
                desc: 'Cyber City, Golf Course Rd & Sohna Road e-cycle guides',
              },
              {
                title: 'Electric Cycle in Lucknow',
                url: '/electric-cycle-in-lucknow',
                cat: 'location',
                desc: 'Gomti Nagar, Hazratganj & Aliganj delivery guides',
              },
              {
                title: 'Electric Cycle in Varanasi',
                url: '/electric-cycle-in-varanasi',
                cat: 'location',
                desc: 'Doorstep test ride & delivery across Varanasi',
              },
              {
                title: 'Electric Cycle in Prayagraj',
                url: '/electric-cycle-in-prayagraj',
                cat: 'location',
                desc: 'Civil Lines, Naini & Kareli test ride and price guide',
              },
              {
                title: 'Electric Cycle for Students',
                url: '/electric-cycle-for-students',
                cat: 'intent',
                desc: 'Best electric cycles for college and university students',
              },
              {
                title: 'Electric Cycle for Women',
                url: '/electric-cycle-for-women',
                cat: 'intent',
                desc: 'Upright, low-effort electric cycles for women and seniors',
              },
              {
                title: 'Licence & RTO Rules for Electric Cycles',
                url: '/posts/electric-cycle-license-rto-rules-india',
                cat: 'guide',
                desc: 'CMVR rules & legal guidelines for electric cycles in India',
              },
            ].map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    <MapPin className="size-3 text-energy" />
                    <span>{link.cat}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {link.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 pt-0.5">{link.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-end text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="size-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ─── JSON-LD Schemas ─── */}
      {productSchemas.map((schema, idx) => (
        <JsonLd key={idx} data={schema} />
      ))}
      <JsonLd data={localBusinessSchema} />
    </article>
  )
}
