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
  Wrench,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FaqBlock } from '@/components/seo'
import { JsonLd } from '@/components/JsonLd'
import { LeadForm } from '@/components/LeadForm'
import { MODEL_LIST } from '@/data/models'
import { getServerSideURL } from '@/utilities/getURL'

/* ───────────────────────── static data ───────────────────────── */

const PRICE_TABLE = [
  {
    model: 'Eparv Savitri',
    slug: 'eparv-savitri',
    image: '/cycles/savitri.png',
    price: '18,999',
    mrp: '21,500',
    pasRange: '110 km',
    throttleRange: '60 km',
    battery: '36V 10.4Ah',
    bestFor: 'Ladies, seniors, shopkeepers',
  },
  {
    model: 'Eparv Panther',
    slug: 'eparv-panther',
    image: '/cycles/panther.png',
    price: '19,999',
    mrp: '21,000',
    pasRange: '55 km',
    throttleRange: '35 km',
    battery: '36V 7.8Ah',
    bestFor: 'Students, office commute',
  },
  {
    model: 'Eparv Satya',
    slug: 'eparv-satya',
    image: '/cycles/satya.png',
    price: '21,000',
    mrp: '22,999',
    pasRange: '55 km',
    throttleRange: '35 km',
    battery: '36V 7.8Ah',
    bestFor: 'Rough roads, outskirts',
  },
  {
    model: 'Eparv Lahari',
    slug: 'eparv-lahari',
    image: '/cycles/lahari.png',
    price: '21,999',
    mrp: '27,999',
    pasRange: '110 km',
    throttleRange: '65 km',
    battery: '36V 10.4Ah',
    bestFor: 'Long distance, delivery',
  },
  {
    model: 'Eparv Visalka',
    slug: 'eparv-visalka',
    image: '/cycles/visakka.png',
    price: '24,999',
    mrp: '26,000',
    pasRange: '60 km',
    throttleRange: '40 km',
    battery: '36V 10.4Ah',
    bestFor: 'Potholes, suspension comfort',
  },
]

const DELIVERY_ZONES = [
  {
    zone: 'South Varanasi (BHU side)',
    localities:
      'Lanka, BHU Campus, Sunderpur, Chitaipur, Kamachha, Durgakund, Assi, Bhelupur, Shivala, Nagwa, Samne Ghat',
  },
  {
    zone: 'Central Varanasi',
    localities:
      'Sigra, Mahmoorganj, Rathyatra, Godowlia, Lahurabir, Maidagin, Chowk, Luxa, Bulanala',
  },
  {
    zone: 'Cantt & North',
    localities:
      'Varanasi Cantt, Orderly Bazaar, Nadesar, Chaukaghat, Pandeypur, Shivpur, Paharia',
  },
  {
    zone: 'East / Sarnath side',
    localities: 'Sarnath, Ashapur, Daulatpur, Sarang Nath area',
  },
  {
    zone: 'West & Outskirts',
    localities: 'Manduadih (Banaras station), Lahartara, Shivdaspur, Babatpur Road, Rohania',
  },
  {
    zone: 'Across the Ganga & nearby',
    localities: 'Ramnagar, Mughalsarai (DDU Nagar), Chandauli – on request',
  },
]

const POPULAR_ROUTES = [
  {
    from: 'Lanka (BHU Gate)',
    to: 'Sigra',
    distance: '≈ 5 km',
    why: 'Main student route – assist mode handles stop-start traffic easily',
  },
  {
    from: 'Varanasi Cantt Station',
    to: 'Godowlia',
    distance: '≈ 5 km',
    why: 'Ride to the edge of the old city, park, and walk the galis',
  },
  {
    from: 'Sigra',
    to: 'Sarnath',
    distance: '≈ 8 km',
    why: 'Smooth, fairly open road – one of the best e-cycle runs in the city',
  },
  {
    from: 'Bhelupur',
    to: 'Varanasi Junction (Cantt)',
    distance: '≈ 7 km',
    why: 'Station trips on your own time, no auto bargaining at dawn',
  },
  {
    from: 'Lanka',
    to: 'Ramnagar',
    distance: '≈ 6 km',
    why: 'Short bridge crossing; Lahari or Visalka for comfort',
  },
  {
    from: 'Pandeypur',
    to: 'BHU',
    distance: '≈ 11 km',
    why: 'Daily 22 km round trip costs paise on any Eparv model',
  },
]

const COST_COMPARISON = [
  { item: 'Cost per km', petrol: '₹2.5 – ₹3', eparv: '₹0.02 – ₹0.04' },
  { item: 'Full tank / full charge', petrol: '₹500+', eparv: '₹2 – ₹3 (about 0.3 unit)' },
  { item: 'Monthly cost (25 km/day)', petrol: '₹1,700 – ₹1,800', eparv: '₹15 – ₹30' },
  { item: 'Licence, RTO, road tax', petrol: 'Required', eparv: 'Not required' },
  { item: 'Insurance', petrol: 'Mandatory', eparv: 'Not mandatory' },
  { item: 'Yearly saving', petrol: '–', eparv: 'Around ₹20,000' },
]

const WARRANTY_TABLE = [
  { component: 'Frame', warranty: '5 years (60 months)' },
  { component: 'Motor', warranty: '24 months' },
  { component: 'Battery', warranty: '12 months' },
]

const COMPANY_TABLE = [
  { label: 'Legal name', value: 'EPARV INGENUITY PRIVATE LIMITED' },
  { label: 'Founder & Managing Director', value: 'Rajendra Kumar Mishra' },
  { label: 'Incorporated', value: '31 March 2021' },
  { label: 'CIN', value: 'U34300DL2021PTC379435' },
  { label: 'GSTIN', value: '07AAGCE4054K1ZJ' },
  {
    label: 'Registered office',
    value: 'B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka, New Delhi – 110078',
  },
  { label: 'Phone / WhatsApp', value: '+91 99689 84030' },
  { label: 'Email', value: 'contact@eparvmotors.com' },
]

const VARANASI_FAQS = [
  {
    question: 'What is the electric cycle price in Varanasi?',
    answer:
      'Eparv electric cycles in Varanasi start at ₹18,999 for the Savitri and go up to ₹24,999 for the Visalka. The Panther is ₹19,999, the Satya ₹21,000 and the long-range Lahari ₹21,999. Final price, delivery and any offers are confirmed when you order.',
  },
  {
    question: 'Which is the best electric cycle in Varanasi?',
    answer:
      'It depends on your use. For students and light city commuting, the Panther is the best value. For long distance or delivery work, the Lahari gives the most range (110 km PAS). For ladies and senior citizens, the Savitri is the most comfortable. For bad roads and potholes, choose the Visalka with front suspension.',
  },
  {
    question: 'Do I need a licence to ride an electric cycle in Varanasi?',
    answer:
      'No. Electric cycles with a motor of 250W or less and a top speed of 25 km/h do not need a driving licence, RTO registration or road tax. All Eparv models meet these limits.',
  },
  {
    question: 'Can I buy an electric cycle online in Varanasi with home delivery?',
    answer:
      'Yes. You can book online or on WhatsApp, and the cycle is delivered to your home in Varanasi about 95% assembled, with a toolkit and a walkthrough of charging and riding modes.',
  },
  {
    question: 'Is there an electric cycle shop in Varanasi where I can see the cycle?',
    answer:
      'You don\'t need to visit a shop. Eparv offers a free doorstep test ride in Varanasi, so you can ride the cycle on your own route before buying. Call +91 99689 84030 to check showroom or dealer availability near you.',
  },
  {
    question: 'Is EMI available on electric cycles in Varanasi?',
    answer:
      'EMI and payment options are discussed with the Eparv team when you confirm your order. Share your model and budget on call or WhatsApp to get the details.',
  },
  {
    question: 'How long does the battery last on one charge?',
    answer:
      'Savitri and Lahari give up to 110 km on pedal assist; Visalka gives up to 60 km; Panther and Satya give up to 55 km. On throttle only, range is 35–65 km depending on the model. Real-world range is usually 70–80% of the tested figure.',
  },
  {
    question: 'How much does it cost to charge an electric cycle?',
    answer:
      'A full charge uses about 0.3 unit of electricity, which costs roughly ₹2–₹3. For 25 km of riding a day, your monthly electricity cost is about ₹15–₹30.',
  },
  {
    question: 'Which electric cycle is best for BHU students?',
    answer:
      'The Eparv Panther (₹19,999) is the most popular choice for students – it is the lightest model at 22 kg, has a key lock and gives up to 55 km on pedal assist, which is more than enough for Lanka–campus–coaching trips.',
  },
  {
    question: 'Which electric cycle is good for ladies in Varanasi?',
    answer:
      'The Eparv Savitri is the best electric cycle for ladies in Varanasi because of its upright seating, strong rear carrier, full mudguards and 110 km range. Ladies who prefer a lighter cycle can choose the Panther.',
  },
  {
    question: 'Can I ride an electric cycle in the rain?',
    answer:
      'Yes. Eparv cycles have an IP65-rated motor and water-sealed wiring, so normal rain is fine. Avoid deep standing water that reaches the motor hub, and dry the cycle after heavy rain.',
  },
  {
    question: 'What warranty do I get on an electric cycle in Varanasi?',
    answer:
      'You get a 5-year warranty on the frame, 24 months on the motor and 12 months on the battery, plus 24–48 hour spare parts dispatch from the factory.',
  },
  {
    question: "Can an electric cycle handle Varanasi's narrow galis?",
    answer:
      'In the old city galis near the ghats, walking is often the only practical option for any vehicle. But on Lanka, Sigra, Bhelupur, Cantt, Pandeypur and the Sarnath road, an e-cycle is one of the fastest ways to get around. Ride to the edge of the old city, lock the cycle and walk the last stretch.',
  },
  {
    question: 'Do you deliver electric cycles in Banaras outskirts like Ramnagar and Mughalsarai?',
    answer:
      'Yes. Ramnagar is covered, and delivery to Mughalsarai (DDU Nagar), Chandauli and other nearby areas can be arranged on request. Call or WhatsApp to confirm your location.',
  },
]

/* ───────────────────────── component ───────────────────────── */

export const VaranasiPageView: React.FC = () => {
  const siteUrl = getServerSideURL()

  /* Product JSON-LD schema for each model */
  const productSchemas = PRICE_TABLE.map((m) => {
    const modelData = MODEL_LIST.find((item) => item.cleanSlug === m.slug || item.slug === m.slug)
    const imagePath = m.image || modelData?.image || `/cycles/${m.slug.replace('eparv-', '')}.png`
    const skuCode = `EPARV-${m.slug.replace('eparv-', '').toUpperCase()}`
    const priceNum = Number(m.price.replace(/,/g, ''))

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: m.model,
      image: [`${siteUrl}${imagePath}`, `${siteUrl}/eparv-og.png`],
      description: `${m.model} electric cycle – ${m.pasRange} pedal-assist range, ${m.throttleRange} throttle range, ${m.battery} battery. Best for: ${m.bestFor}.`,
      sku: skuCode,
      mpn: `EP-${m.slug.replace('eparv-', '').toUpperCase()}`,
      brand: {
        '@type': 'Brand',
        name: 'Eparv',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: priceNum,
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        url: `${siteUrl}/electric-cycles/${m.slug}`,
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'INR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'IN',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 4,
              unitCode: 'DAY',
            },
          },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'IN',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 7,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
      },
    }
  })

  /* Organization JSON-LD */
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EPARV INGENUITY PRIVATE LIMITED',
    url: siteUrl,
    logo: `${siteUrl}/eparv-logo.png`,
    founder: {
      '@type': 'Person',
      name: 'Rajendra Kumar Mishra',
    },
    foundingDate: '2021-03-31',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka',
      addressLocality: 'New Delhi',
      postalCode: '110078',
      addressCountry: 'IN',
    },
    telephone: '+919968984030',
    email: 'contact@eparvmotors.com',
  }

  return (
    <article className="pb-20 pt-16">
      <div className="container max-w-5xl">
        {/* ─── Breadcrumbs ─── */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electric Cycle in India', href: '/electric-cycle-in' },
            { label: 'Uttar Pradesh', href: '/electric-cycle-in-uttar-pradesh' },
            { label: 'Varanasi' },
          ]}
        />

        {/* ─── H1 Header ─── */}
        <header className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <MapPin className="size-3.5 text-energy" />
            <span>Varanasi (वाराणसी) • Uttar Pradesh</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Electric Cycle in Varanasi – Buy Online with Free Test Ride &amp; Home Delivery
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Looking for an electric cycle in Varanasi that can handle the BHU–Lanka rush, the Sigra
            crossing and the long Sarnath road without draining your pocket on petrol? Eparv electric
            cycles are now delivered across Varanasi, from Lanka and Bhelupur to Cantt, Pandeypur and
            Ramnagar on the other bank of the Ganga. You can compare models online, book a free test
            ride at your doorstep, and get the cycle delivered home with a full walkthrough of
            charging and care.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Every Eparv model runs on a 250W BLDC hub motor with a top speed of 25 km/h, so it falls
            in the non-motorised category under India&apos;s CMVR rules. That means no driving
            licence, no RTO registration and no road tax. Prices start at ₹18,999, and a full charge
            costs roughly ₹2 to ₹3 of electricity.
          </p>
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
          <div>
            <span className="inline-block px-2.5 py-1 rounded-full bg-card border border-border text-[11px] font-medium text-foreground">
              Last Updated: November 2026
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
            <span>Quick Answer: Electric Cycle in Varanasi at a Glance</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { q: 'Starting price', a: '₹18,999 (Eparv Savitri)' },
              { q: 'Models available', a: 'Savitri, Panther, Satya, Lahari, Visalka' },
              {
                q: 'Range per charge',
                a: '55 km to 110 km on pedal assist; 35 km to 65 km on throttle only',
              },
              { q: 'Charging', a: '3–4 hours from a normal 5A home socket, detachable battery' },
              { q: 'Licence / RTO', a: 'Not required (250W motor, 25 km/h top speed)' },
              {
                q: 'Home delivery',
                a: 'Yes – Lanka, BHU, Sigra, Cantt, Bhelupur, Sarnath, Ramnagar and more',
              },
              { q: 'Test ride', a: 'Free doorstep test ride, no purchase required' },
              { q: 'Warranty', a: 'Frame 5 years, motor 24 months, battery 12 months' },
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

        {/* ─── Why Electric Cycle in Varanasi Makes Sense ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Why an Electric Cycle in Varanasi Makes So Much Sense
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Banaras is a city of short, busy trips, which is why more families are now searching for
            an{' '}
            <strong className="text-foreground">electric cycle in Banaras</strong> instead of a
            second scooter. Most daily journeys – college, coaching, office, shop, mandi, railway
            station – fall between 3 and 15 km. That is exactly the distance where an electric cycle
            beats every other option on cost, time and convenience.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Navigation,
                title: 'Traffic jams on main roads',
                text: 'Lanka, Rathyatra, Sigra, Maidagin and Lahurabir crossings get choked at peak hours. A lightweight e-cycle slips through where cars and autos get stuck.',
              },
              {
                icon: Fuel,
                title: 'Rising petrol cost',
                text: 'A 100cc scooter costs ₹1,700+ a month in petrol for a 25 km daily commute. The same distance on an Eparv costs about ₹15–₹30 of electricity a month.',
              },
              {
                icon: Sparkles,
                title: 'Festival and pilgrim season',
                text: 'During Sawan, Dev Deepawali, Ganga Mahotsav and big weekend crowds, autos and e-rickshaws become scarce or charge extra. Your own charged cycle leaves when you want.',
              },
              {
                icon: Route,
                title: 'Flat Gangetic terrain',
                text: 'Varanasi is mostly flat, which is ideal for pedal assist. Bridges and flyovers like the Lahartara and Chowkaghat stretch are easy with motor support.',
              },
              {
                icon: Sun,
                title: 'No sweat in summer heat',
                text: 'May–June temperatures in Varanasi cross 44°C. On throttle mode you reach college or office without arriving drenched.',
              },
              {
                icon: Shield,
                title: 'Zero paperwork',
                text: 'No licence or registration means students under 18, homemakers and senior citizens can all ride legally.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <item.icon className="size-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            In short, an <strong className="text-foreground">electric cycle in Varanasi</strong> is
            the cheapest personal vehicle you can own for daily city travel, and it is far easier on
            your body than a regular bicycle.
          </p>
        </section>

        {/* ─── Price Table ─── */}
        <section className="my-12 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              2026 Price List
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Electric Cycle Price in Varanasi
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              Here is the current electric cycle price in Varanasi for the full Eparv lineup. Prices
              shown are ex-showroom; delivery, EMI options and any running offers are confirmed when
              you place the order.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Model</th>
                  <th className="p-3 font-bold text-foreground">Price (₹)</th>
                  <th className="p-3 font-bold text-foreground">MRP (₹)</th>
                  <th className="p-3 font-bold text-foreground">PAS Range</th>
                  <th className="p-3 font-bold text-foreground">Throttle Range</th>
                  <th className="p-3 font-bold text-foreground">Battery</th>
                  <th className="p-3 font-bold text-foreground">Best For</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE.map((row) => (
                  <tr key={row.model} className="border-t border-border/50 hover:bg-muted/20">
                    <td className="p-3 font-semibold text-primary">
                      <Link
                        href={`/electric-cycles/${row.slug}`}
                        className="hover:underline underline-offset-2"
                      >
                        {row.model}
                      </Link>
                    </td>
                    <td className="p-3 font-bold text-foreground">₹{row.price}</td>
                    <td className="p-3 text-muted-foreground line-through">₹{row.mrp}</td>
                    <td className="p-3 text-foreground">{row.pasRange}</td>
                    <td className="p-3 text-foreground">{row.throttleRange}</td>
                    <td className="p-3 text-muted-foreground">{row.battery}</td>
                    <td className="p-3 text-muted-foreground">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Range figures are tested by Eparv in pedal-assist level 1 on flat roads with a 68–72 kg
            rider. Your real range in Varanasi will depend on rider weight, load, tyre pressure and
            how much you use the throttle. As a practical rule, expect 70–80% of the listed figure
            in mixed city riding.
          </p>
        </section>

        {/* ─── Model-by-Model Guide ─── */}
        <section className="my-12 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Best Electric Cycle in Varanasi – Model-by-Model Guide
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            There is no single best electric cycle in Varanasi for everyone. The right model depends
            on your daily distance, the roads you ride and what you carry. Here is an honest
            breakdown to help you pick the right{' '}
            <strong className="text-foreground">electric cycle in Varanasi</strong> for your needs.
          </p>

          {/* Savitri */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">
              1.{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2"
              >
                Eparv Savitri
              </Link>{' '}
              – ₹18,999 (Most Affordable, 110 km Range)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Savitri is a classic Indian roadster with a motor. It has an upright seating posture, a
              heavy steel rear carrier, full mudguards and 28-inch wheels. With a 36V 10.4Ah battery
              it gives up to 110 km on pedal assist and 60 km on throttle, and it charges in about 3
              hours.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Payload: up to 140 kg – the highest in the range
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Weight: 26 kg; frame: 22-inch reinforced tubular steel
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Ideal for:</strong> senior citizens, ladies who
              want a comfortable straight-back ride, shopkeepers and traders in Chowk, Godowlia and
              Vishweshwarganj carrying stock on the carrier
            </p>
          </div>

          {/* Panther */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">
              2.{' '}
              <Link
                href="/electric-cycles/eparv-panther"
                className="text-primary hover:underline underline-offset-2"
              >
                Eparv Panther
              </Link>{' '}
              – ₹19,999 (Lightweight City Commuter)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Panther is the lightest model at 22 kg, with a matte stealth black finish, dual disc
              brakes with electronic motor cut-off and 26-inch alloy rims. It gives 55 km on pedal
              assist and 35 km on throttle with a 3-hour charge.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Payload: up to 110 kg
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Key ignition and battery lock for safe parking outside college or coaching
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Ideal for:</strong> BHU, Kashi Vidyapith and
              Sampurnanand University students, and office commuters doing 10–35 km round trips
            </p>
          </div>

          {/* Satya */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">
              3.{' '}
              <Link
                href="/electric-cycles/eparv-satya"
                className="text-primary hover:underline underline-offset-2"
              >
                Eparv Satya
              </Link>{' '}
              – ₹21,000 (Rugged All-Weather Rider)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Satya is built for broken roads, gravel and semi-urban routes. It has 26 × 2.125-inch
              all-weather tyres, a hi-tensile steel frame, dual disc brakes and an anti-theft key
              lock. Range is 55 km on pedal assist and 35 km on throttle.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Payload: up to 115 kg; weight: 25 kg
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Ideal for:</strong> riders coming in daily from
              Shivpur, Babatpur road, Chunar road, Rohania and village link roads around Varanasi
            </p>
          </div>

          {/* Lahari */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">
              4.{' '}
              <Link
                href="/electric-cycles/eparv-lahari"
                className="text-primary hover:underline underline-offset-2"
              >
                Eparv Lahari
              </Link>{' '}
              – ₹21,999 (Longest Range: 110 km PAS / 65 km Throttle)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lahari is the touring model with a 36V 10.4Ah battery, front suspension, comfort
              touring saddle and 27.5-inch wheels. It delivers up to 110 km in pedal assist and 65
              km on pure throttle, so most daily riders charge it only two or three times a week.
              Charging takes about 4 hours.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Payload: up to 125 kg; weight: 25 kg; peak torque: 40 Nm
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Ideal for:</strong> Zomato, Swiggy and parcel
              delivery riders, and people commuting between Varanasi and Mughalsarai (DDU Nagar),
              Ramnagar or Chandauli
            </p>
          </div>

          {/* Visalka */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground">
              5.{' '}
              <Link
                href="/electric-cycles/eparv-visalka"
                className="text-primary hover:underline underline-offset-2"
              >
                Eparv Visalka
              </Link>{' '}
              – ₹24,999 (Best for Potholes and Rough Patches)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Visalka is an all-terrain electric MTB with an 80mm front telescopic suspension fork,
              27.5 × 2.35-inch knobby tyres, ventilated dual disc brakes and the highest peak torque
              in the range (42 Nm). It gives 60 km on pedal assist and 40 km on throttle.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Payload: up to 120 kg; weight: 24 kg
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Ideal for:</strong> riders facing dug-up roads,
              speed breakers and waterlogged lanes, and young riders who also want weekend rides
              along the Sarnath and Ramnagar side
            </p>
          </div>
        </section>

        {/* ─── For Ladies and Students ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Electric Cycle for Ladies and Students in Varanasi
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Users className="size-5 text-primary" />
                For Students (BHU, Kashi Vidyapith, Sampurnanand, Coaching Hubs)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lanka, Sunderpur, Kamachha, Durgakund and Bhelupur are full of hostel and PG
                students who travel 4–8 km a day to campus and coaching. An{' '}
                <Link
                  href="/electric-cycle-for-students"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  electric cycle for students
                </Link>{' '}
                in Varanasi solves three problems at once: no daily auto fare, no licence needed, and
                no sweat in the afternoon heat. Recommended:{' '}
                <Link
                  href="/electric-cycles/eparv-panther"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Eparv Panther
                </Link>{' '}
                (light, easy to carry up hostel stairs) or{' '}
                <Link
                  href="/electric-cycles/eparv-satya"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Satya
                </Link>{' '}
                (tough frame, key lock).
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Users className="size-5 text-primary" />
                For Ladies and Homemakers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For school drops, market trips to Godowlia or Lahurabir, and office commutes, the
                most important things are an easy step-over, upright posture, a carrier for bags and
                simple controls. An electric cycle for ladies in Varanasi should also be light enough
                to park without effort. Recommended:{' '}
                <Link
                  href="/electric-cycles/eparv-savitri"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Eparv Savitri
                </Link>{' '}
                for comfort and carrying capacity, or{' '}
                <Link
                  href="/electric-cycles/eparv-panther"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Panther
                </Link>{' '}
                for a lighter ride.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Users className="size-5 text-primary" />
                For Senior Citizens
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Morning walks to Assi Ghat, temple visits, bank and pension work – Savitri&apos;s
                upright position and low-effort throttle mode make these trips easy on the knees and
                back.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Store className="size-5 text-primary" />
                For Shopkeepers, Silk Traders and Delivery Riders
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Banaras silk and saree traders moving between Madanpura, Lohta, Chowk and courier
                points, and delivery partners covering 60–80 km a day, save the most money.
                Recommended:{' '}
                <Link
                  href="/electric-cycles/eparv-lahari"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Lahari
                </Link>{' '}
                for maximum range,{' '}
                <Link
                  href="/electric-cycles/eparv-savitri"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Savitri
                </Link>{' '}
                for heavy carrier load.
              </p>
            </div>
          </div>
        </section>

        {/* ─── How to Buy Online ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            How to Buy Electric Cycle Online in Varanasi
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You don&apos;t need to search for an{' '}
            <strong className="text-foreground">electric cycle shop in Varanasi</strong> and spend
            half a day comparing models. You can{' '}
            <strong className="text-foreground">buy electric cycle online in Varanasi</strong> in
            four simple steps:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Shortlist your model',
                text: (
                  <>
                    Compare range, price and features in the table above or on the{' '}
                    <Link
                      href="/electric-cycles"
                      className="text-primary hover:underline underline-offset-2"
                    >
                      Electric Cycles
                    </Link>{' '}
                    page.
                  </>
                ),
              },
              {
                step: '02',
                title: 'Book a free test ride',
                text: 'Fill in the form on this page with your name, phone number and preferred time. The team arranges a 20-minute ride at your home in Varanasi, on the roads you actually use.',
              },
              {
                step: '03',
                title: 'Confirm your order',
                text: 'Lock the model, colour and delivery date. EMI and payment options are discussed at this stage.',
              },
              {
                step: '04',
                title: 'Get home delivery',
                text: 'Your cycle arrives about 95% pre-assembled with a toolkit. Setup takes around 10 minutes, and you get a walkthrough of charging, riding modes and basic care.',
              },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                  {s.step}
                </div>
                <h3 className="font-bold text-sm text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Prefer talking to someone? Call or WhatsApp{' '}
            <a
              href="tel:+919968984030"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              +91 99689 84030
            </a>{' '}
            for model advice, price confirmation and delivery timelines for Varanasi.
          </p>
        </section>

        {/* ─── Home Delivery Areas ─── */}
        <section className="my-12 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Delivery Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Electric Cycle Home Delivery in Varanasi – Areas We Cover
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Electric cycle home delivery in Varanasi is available across the city. If your area is
              not listed, call us – delivery to the rest of Varanasi is arranged on request. Your
              electric cycle in Varanasi is delivered within a few working days of order confirmation.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground whitespace-nowrap">Zone</th>
                  <th className="p-3 font-bold text-foreground">Localities</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY_ZONES.map((zone) => (
                  <tr key={zone.zone} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground whitespace-nowrap align-top">
                      {zone.zone}
                    </td>
                    <td className="p-3 text-muted-foreground">{zone.localities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Popular Routes ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Popular Daily Routes for an Electric Cycle in Varanasi
          </h2>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">From</th>
                  <th className="p-3 font-bold text-foreground">To</th>
                  <th className="p-3 font-bold text-foreground whitespace-nowrap">Distance</th>
                  <th className="p-3 font-bold text-foreground">Why it works on an e-cycle</th>
                </tr>
              </thead>
              <tbody>
                {POPULAR_ROUTES.map((route) => (
                  <tr key={route.from + route.to} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                      {route.from}
                    </td>
                    <td className="p-3 text-foreground whitespace-nowrap">{route.to}</td>
                    <td className="p-3 text-primary font-bold whitespace-nowrap">
                      {route.distance}
                    </td>
                    <td className="p-3 text-muted-foreground">{route.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Distances are approximate road distances and will vary with your exact start point.
          </p>
        </section>

        {/* ─── Cost Comparison ─── */}
        <section className="my-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Cost Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Running Cost: Electric Cycle vs Petrol Scooter in Varanasi
            </h2>
            <p className="text-sm text-muted-foreground">
              This is where an electric cycle in Varanasi pays for itself. The calculation below uses
              Eparv&apos;s published battery sizes and ₹7 per unit electricity.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Item</th>
                  <th className="p-3 font-bold text-rose-500">Petrol Scooter (100cc)</th>
                  <th className="p-3 font-bold text-primary">Eparv Electric Cycle</th>
                </tr>
              </thead>
              <tbody>
                {COST_COMPARISON.map((row) => (
                  <tr key={row.item} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground">{row.item}</td>
                    <td className="p-3 text-rose-500">{row.petrol}</td>
                    <td className="p-3 text-primary font-semibold">{row.eparv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            With yearly savings of around ₹20,000, most riders recover the full price of the cycle
            in roughly 12–14 months of daily use. After that, the savings are pure profit.
          </p>
        </section>

        {/* ─── EMI Section ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <IndianRupee className="size-5 text-primary" />
            Electric Cycle on EMI in Varanasi
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Want to spread the cost?{' '}
            <strong className="text-foreground">Electric cycle EMI in Varanasi</strong> can be
            arranged when you confirm your order. Share your preferred model and budget with the team
            on call or WhatsApp, and they will explain the available EMI and payment options, the
            down payment and the monthly amount before you commit. Since the cycle saves ₹1,500+ a
            month on petrol, the EMI is often covered by the fuel you no longer buy. This makes an
            electric cycle in Varanasi affordable even on a student or first-job budget.
          </p>
        </section>

        {/* ─── Licence and Rules ─── */}
        <section className="my-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Licence and Rules for Riding an Electric Cycle in Varanasi
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Under the Central Motor Vehicle Rules, an electric bicycle with a motor of 250W or less
            and a top speed of 25 km/h or less is not treated as a motor vehicle. Every Eparv model
            is built within these limits, so:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 ml-1">
            {[
              'No driving licence is needed',
              'No RTO registration or number plate is needed',
              'No road tax is payable',
              'Insurance is not mandatory (though recommended for theft protection)',
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                {rule}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Safety tip:</strong> Even though a helmet is not
            legally required, we strongly recommend wearing one, especially on busy roads like GT
            Road, Lahartara and the Ring Road.{' '}
            <Link
              href="/posts/electric-cycle-license-rto-rules-india"
              className="text-primary hover:underline underline-offset-2 font-medium"
            >
              Read the full licence and rules guide →
            </Link>
          </p>
        </section>

        {/* ─── Charging, Power Cuts and Monsoon Care ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Charging, Power Cuts and Monsoon Care in Varanasi
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Plug className="size-5 text-primary" />
                Charging at Home
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every Eparv cycle has a detachable, key-locked lithium battery. Take it out, carry it
                to your room, and plug it into any normal 5A socket. A full charge takes 3–4 hours
                depending on the model. There is no need for a special charging point, which makes it
                perfect for flats, hostels and PGs in Lanka, Sigra and Mahmoorganj.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Lightbulb className="size-5 text-primary" />
                Power Cuts
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Because the battery charges in a few hours and a full charge lasts several days of
                normal riding, occasional power cuts rarely matter. Charge it at night or whenever
                your home has power. The 110 km models (Savitri and Lahari) can go two to three days
                between charges for most riders.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Droplets className="size-5 text-primary" />
                Monsoon and Waterlogging
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Low-lying stretches around Sigra, Lahurabir, Maidagin and parts of Lanka often fill
                with water during heavy rain. Eparv cycles use an IP65-rated hub motor and
                water-sealed wiring, so normal rain and splashes are fine. Still, avoid riding through
                deep standing water that reaches the motor hub, and wipe the cycle dry after a heavy
                downpour.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Battery className="size-5 text-primary" />
                Battery Care Tips
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2 ml-1">
                {[
                  "Don't leave the battery fully drained for days – recharge it once it drops near 20%",
                  'Keep the battery out of direct afternoon sun when parked during summer',
                  'Use only the original Eparv charger',
                  'If you are not riding for a few weeks, store the battery at around 50–60% charge',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Warranty and After-Sales ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Warranty and After-Sales Service in Varanasi
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every electric cycle in Varanasi sold by Eparv comes with direct factory warranty:
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Component</th>
                  <th className="p-3 font-bold text-foreground">Warranty</th>
                </tr>
              </thead>
              <tbody>
                {WARRANTY_TABLE.map((row) => (
                  <tr key={row.component} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground">{row.component}</td>
                    <td className="p-3 text-muted-foreground">{row.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If anything goes wrong with your electric cycle in Varanasi, genuine spare parts are
            dispatched from the factory within 24–48 hours, and technical support is available on
            phone and WhatsApp. Because the BLDC hub motor is brushless, it needs almost no routine
            maintenance – just regular tyre pressure checks, brake adjustment and chain lubrication,
            the same as any normal cycle.
          </p>
        </section>

        {/* ─── Buyer's Checklist ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            How to Choose the Best Electric Cycle in Varanasi – Buyer&apos;s Checklist
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you buy from us or from any other{' '}
            <strong className="text-foreground">electric cycle shop in Varanasi</strong>, check
            these points before you pay:
          </p>
          <ul className="text-sm text-muted-foreground space-y-3">
            {[
              {
                label: 'Motor power and speed',
                text: 'It should be 250W or less and limited to 25 km/h. Anything above that legally needs registration and a licence.',
              },
              {
                label: 'Real range, not just the brochure figure',
                text: 'Ask for both the pedal-assist range and the throttle-only range. Most people use throttle more than they expect.',
              },
              {
                label: 'Battery capacity in Wh',
                text: 'Multiply voltage by amp-hours (36V × 10.4Ah = 374 Wh). Higher Wh means more range.',
              },
              {
                label: 'Detachable battery',
                text: 'Essential if you live in a flat, hostel or PG without ground-floor charging.',
              },
              {
                label: 'Brakes',
                text: "Dual disc brakes with motor cut-off are much safer in Varanasi's sudden-stop traffic.",
              },
              {
                label: 'Warranty in writing',
                text: 'Separate warranty for frame, motor and battery, clearly stated.',
              },
              {
                label: 'Spare parts and service',
                text: 'Ask how quickly parts reach Varanasi and who handles repairs.',
              },
              {
                label: 'Test ride',
                text: 'Never buy without riding it on your actual route first.',
              },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-foreground">{item.label}:</strong> {item.text}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Why Trust Eparv ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Why Varanasi Riders Can Trust Eparv
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eparv electric cycles are designed and sold by EPARV INGENUITY PRIVATE LIMITED, a
            registered Indian company founded on 31 March 2021 by Rajendra Kumar Mishra. The company
            is headquartered in Dwarka, New Delhi, and supplies electric cycles across Delhi NCR,
            Uttar Pradesh, Bihar and Madhya Pradesh.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Company Detail</th>
                  <th className="p-3 font-bold text-foreground">Information</th>
                </tr>
              </thead>
              <tbody>
                {COMPANY_TABLE.map((row) => (
                  <tr key={row.label} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="p-3 text-muted-foreground">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              {
                icon: Gauge,
                title: 'Transparent specs',
                text: 'Every model page lists motor torque, battery Wh, tested range conditions, weight and payload – no hidden numbers.',
              },
              {
                icon: Sparkles,
                title: 'Honest range testing',
                text: 'Range is tested with a 68–72 kg rider in pedal-assist level 1 on flat roads, and the test conditions are published with each model.',
              },
              {
                icon: ShieldCheck,
                title: 'Built for Indian roads',
                text: 'Reinforced frames, IP65 motor, sealed wiring and Grade-A lithium cells with smart BMS protection against overheating, overcharge and short circuit.',
              },
              {
                icon: Truck,
                title: 'Try before you buy',
                text: 'Free doorstep test ride with no purchase obligation.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <item.icon className="size-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Hindi Section ─── */}
        <section className="my-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            बनारस में इलेक्ट्रिक साइकिल – हिंदी में जानकारी
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            अगर आप बनारस में इलेक्ट्रिक साइकिल खरीदना चाहते हैं, तो Eparv के मॉडल ₹18,999 से शुरू
            होते हैं। इनमें 250W मोटर है और टॉप स्पीड 25 km/h है, इसलिए ड्राइविंग लाइसेंस या RTO
            रजिस्ट्रेशन की ज़रूरत नहीं होती। बैटरी निकालकर घर के किसी भी नॉर्मल 5A सॉकेट से 3–4
            घंटे में चार्ज हो जाती है, और एक बार फुल चार्ज का खर्च सिर्फ़ ₹2–₹3 आता है।
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            लंका, BHU, सिगरा, कैंट, भेलूपुर, पांडेयपुर, सारनाथ और रामनगर समेत पूरे वाराणसी में
            होम डिलीवरी और फ्री टेस्ट राइड उपलब्ध है। स्टूडेंट्स के लिए Panther, महिलाओं और
            बुज़ुर्गों के लिए Savitri, और लंबी दूरी या डिलीवरी के काम के लिए Lahari सबसे अच्छा
            विकल्प है। ज़्यादा जानकारी के लिए{' '}
            <a
              href="tel:+919968984030"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              +91 99689 84030
            </a>{' '}
            पर कॉल या WhatsApp करें।
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
                Electric Cycle Models Available in Varanasi
              </h2>
            </div>
            <Link
              href="/electric-cycles"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Specs Comparison</span>
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
                      alt={`${model.name} electric cycle in Varanasi`}
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
          heading="Frequently Asked Questions – Electric Cycle in Varanasi"
          subheading="Common questions from riders and buyers in Varanasi regarding price, models, test rides, RTO rules, charging and home delivery."
          faqs={VARANASI_FAQS}
          id="varanasi-faq"
        />

        {/* ─── CTA: Book Test Ride ─── */}
        <section className="my-12 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 via-card to-energy/10 p-6 sm:p-8 text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Book Your Free Test Ride for an Electric Cycle in Varanasi
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Ready to stop paying for petrol and autos? Fill in the form below with your name, phone
              number and preferred time, and we will bring an Eparv electric cycle to your doorstep
              anywhere in Varanasi – Lanka, Sigra, Cantt, Bhelupur, Pandeypur, Sarnath or Ramnagar.
              Ride it on your own route, ask every question, and buy only if you are happy.
            </p>
          </div>

          <div className="max-w-xl mx-auto text-left bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-md">
            <LeadForm
              type="test-ride"
              defaultCity="Varanasi"
              submitLabel="Book Free Test Ride in Varanasi"
              products={[
                { slug: 'eparv-savitri', name: 'Eparv Savitri (₹18,999)' },
                { slug: 'eparv-panther', name: 'Eparv Panther (₹19,999)' },
                { slug: 'eparv-satya', name: 'Eparv Satya (₹21,000)' },
                { slug: 'eparv-lahari', name: 'Eparv Lahari (₹21,999)' },
                { slug: 'eparv-visalka', name: 'Eparv Visalka (₹24,999)' },
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
            Explore Related Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              {
                title: 'Electric Cycles in Uttar Pradesh',
                url: '/electric-cycle-in-uttar-pradesh',
                cat: 'location',
                desc: 'Explore all cities and dealerships across Uttar Pradesh',
              },
              {
                title: 'Electric Cycle for Students',
                url: '/electric-cycle-for-students',
                cat: 'intent',
                desc: 'Best electric cycles for college students in India',
              },
              {
                title: 'Electric Cycle Under ₹20,000',
                url: '/electric-cycle-under-20000',
                cat: 'intent',
                desc: 'Affordable daily commuter models',
              },
              {
                title: 'Licence & RTO Rules for Electric Cycles',
                url: '/posts/electric-cycle-license-rto-rules-india',
                cat: 'guide',
                desc: 'CMVR rules & legal guidelines for electric cycles in India',
              },
              {
                title: 'Electric Cycle Running Cost per KM',
                url: '/posts/electric-cycle-running-cost-per-km',
                cat: 'guide',
                desc: 'Complete cost comparison with petrol vehicles',
              },
              {
                title: 'Electric Cycle Under ₹25,000',
                url: '/electric-cycle-under-25000',
                cat: 'intent',
                desc: 'Long range & suspension priority picks',
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
      <JsonLd data={orgSchema} />
    </article>
  )
}
