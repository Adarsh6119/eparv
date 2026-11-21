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
    battery: '36V, 10.4Ah',
    weight: '26 kg',
    payload: '140 kg',
    chargeTime: '3 hours',
    bestFor: 'Ladies, seniors, shopkeepers, advocates',
  },
  {
    model: 'Eparv Panther',
    slug: 'eparv-panther',
    image: '/cycles/panther.png',
    price: '19,999',
    mrp: '21,000',
    pasRange: '55 km',
    throttleRange: '35 km',
    battery: '36V, 7.8Ah',
    weight: '22 kg',
    payload: '110 kg',
    chargeTime: '3 hours',
    bestFor: 'Students, coaching, office commute',
  },
  {
    model: 'Eparv Satya',
    slug: 'eparv-satya',
    image: '/cycles/satya.png',
    price: '21,000',
    mrp: '22,999',
    pasRange: '55 km',
    throttleRange: '35 km',
    battery: '36V, 7.8Ah',
    weight: '25 kg',
    payload: '115 kg',
    chargeTime: '2–3 hours',
    bestFor: 'Outskirts, rough roads, rugged daily riding',
  },
  {
    model: 'Eparv Lahari',
    slug: 'eparv-lahari',
    image: '/cycles/lahari.png',
    price: '21,999',
    mrp: '27,999',
    pasRange: '110 km',
    throttleRange: '65 km',
    battery: '36V, 10.4Ah',
    weight: '25 kg',
    payload: '125 kg',
    chargeTime: '4 hours',
    bestFor: 'Long distance, delivery, touring, cross-river',
  },
  {
    model: 'Eparv Visalka',
    slug: 'eparv-visalka',
    image: '/cycles/visakka.png',
    price: '24,999',
    mrp: '26,000',
    pasRange: '60 km',
    throttleRange: '40 km',
    battery: '36V, 10.4Ah',
    weight: '24 kg',
    payload: '120 kg',
    chargeTime: '4 hours',
    bestFor: 'Potholes, speed breakers, suspension comfort',
  },
]

const POPULAR_ROUTES = [
  {
    from: 'Civil Lines',
    to: 'Allahabad University',
    distance: 'about 4 km',
    why: 'The shortest academic route, door to gate, and quicker than even a motorised vehicle',
  },
  {
    from: 'Kareli',
    to: 'High Court / Civil Lines',
    distance: 'about 6 km',
    why: 'No parking tension near the court, file bundles and bags carry comfortably',
  },
  {
    from: 'Naini',
    to: 'Civil Lines',
    distance: 'about 9 km',
    why: 'Assist on the Yamuna bridge, economy on the flat road',
  },
  {
    from: 'George Town',
    to: 'MNNIT / Jhunsi side',
    distance: 'about 7 km',
    why: 'Quiet roads, good for first-time riders',
  },
]

const DELIVERY_AREAS = [
  'Civil Lines',
  'Allahabad University area',
  'George Town',
  'Ashok Nagar',
  'Kareli',
  'Naini',
  'Jhunsi',
  'Bhardwaj Ashram area',
  'Muthiganj',
  'Katra',
  'Chowk',
  'Tagore Town',
]

const ON_REQUEST_AREAS = [
  'Lukerganj',
  'Alopibagh',
  'Teliyarganj',
  'Daraganj',
  'Baghambari',
  'Shivkuti',
  'Phaphamau',
  'Jhalwa',
]

const COST_COMPARISON = [
  { item: 'Cost per km', petrol: '₹2.5 – ₹3', eparv: '₹0.02 – ₹0.04' },
  { item: 'Full tank / full charge', petrol: '₹500+', eparv: '₹2 – ₹3 (about 0.3 units)' },
  { item: 'Monthly cost (25 km/day)', petrol: '₹1,700 – ₹1,800', eparv: '₹15 – ₹30' },
  { item: 'Licence, RTO, road tax', petrol: 'Required', eparv: 'Not required' },
  { item: 'Insurance', petrol: 'Mandatory', eparv: 'Not mandatory' },
  { item: 'Yearly saving', petrol: '–', eparv: 'Around ₹20,000' },
]

const WARRANTY_TABLE = [
  { component: 'Frame', warranty: '5 years (60 months)' },
  { component: 'BLDC Hub Motor', warranty: '24 months' },
  { component: 'Lithium Battery', warranty: '12 months' },
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

const PRAYAGRAJ_FAQS = [
  {
    question: 'How much does an electric cycle cost in Prayagraj?',
    answer:
      'Eparv’s electric cycles are priced from ₹18,999 (Savitri) to ₹24,999 (Visalka). The Panther is listed at ₹19,999, the Satya at ₹21,000 and the Lahari at ₹21,999. Prices are national, meaning no separate charge is stated for Prayagraj. Confirm the final amount and offers with the team before ordering.',
  },
  {
    question: 'Do I need a licence or registration to ride an electric cycle?',
    answer:
      'No. Eparv’s cycles fall in the low-speed category with a 250W motor and 25 km/h top speed, for which, according to the company, no driving licence, RTO registration, road tax or insurance is needed. It is a good idea to check the latest rules once.',
  },
  {
    question: 'How far does an electric cycle go on one charge?',
    answer:
      'It depends on the model. The Panther and Satya give 55 km on pedal assist, the Visalka 60 km, and the Savitri and Lahari up to 110 km. In throttle mode the range is lower, that is, 35 to 65 km. These figures are based on a test on a flat road with a 70 kg rider, so the actual range may differ slightly.',
  },
  {
    question: 'How long does charging take and how much does the electricity cost?',
    answer:
      'Depending on the model it takes 2 to 4 hours, and it is done from a normal 5A wall socket. According to Eparv, one full charge uses about 0.3 units of electricity, that is, between ₹2 and ₹3 at ₹7 per unit.',
  },
  {
    question: 'Is home delivery of electric cycles available in Prayagraj?',
    answer:
      'Yes. Home delivery and test rides are listed for Civil Lines, George Town, Kareli, Katra, Tagore Town, Naini, Jhunsi and several other areas. Delivery generally takes a few working days, and the exact time is told when you confirm the order.',
  },
  {
    question: 'Can I take a test ride on an electric cycle before buying?',
    answer:
      'Yes. Eparv offers a free doorstep test ride with no obligation to purchase. You can send a request by choosing Prayagraj on the website’s Book a Test Ride page, or WhatsApp +91 99689 84030.',
  },
  {
    question: 'How is EMI available for an electric cycle in Prayagraj?',
    answer:
      'According to the website, EMI options are discussed with the team when you confirm the order. Information on interest rate, tenure and charges is not published on the site, so get the total amount, processing fee and all terms in writing.',
  },
  {
    question: 'Which is the best electric cycle in Prayagraj?',
    answer:
      'It depends on your need. The Savitri suits long range and a carrier, the Panther suits lightweight and student commutes, the Visalka suits bad roads, the Lahari suits long shifts or touring, and the Satya suits a budget rugged option. It is best to decide through a test ride.',
  },
  {
    question: 'Which model is suitable as an electric cycle for ladies in Prayagraj?',
    answer:
      'The Savitri’s upright posture, mudguards and carrier make it practical for household work, and the Panther is the lightest (22 kg). The Savitri’s frame is not step-through, so be sure to check seat height and ease of getting on and off during the test ride.',
  },
  {
    question: 'What is right as an electric cycle for students in Prayagraj?',
    answer:
      'Eparv recommends the Panther (₹19,999, 22 kg) or the Savitri (₹18,999) for students. With a key lock and a detachable battery, the battery can be kept safe in a hostel or classroom.',
  },
  {
    question: 'How much warranty is there on the battery and motor?',
    answer:
      'A warranty of 5 years on the frame, 24 months on the BLDC motor and 12 months on the battery is stated. Ask for the detailed warranty terms in writing before purchase.',
  },
  {
    question: 'Can I ride an electric cycle in the rain?',
    answer:
      'According to Eparv, the wiring and motor casing are weather-sealed, and the motor’s power is cut as soon as you apply the brake. Even so, do not ride in deep waterlogging, and protect the battery from water.',
  },
  {
    question: 'What is the maximum weight capacity of the cycle?',
    answer:
      'The Savitri can handle a payload of up to 140 kg, the Lahari 125 kg, the Visalka 120 kg, the Satya 115 kg and the Panther 110 kg. This includes the weight of both rider and luggage.',
  },
  {
    question: 'Where will service or repair be done?',
    answer:
      'Normal parts like brakes, tyres and chain can be repaired at local cycle shops in Prayagraj. Battery, motor and controller issues are handled through Eparv’s warranty process, and spare parts are sent within 24 to 48 hours.',
  },
  {
    question: 'Is an electric cycle useful during the Mela or Kumbh?',
    answer:
      'According to Eparv, yes, because no petrol is needed during restrictions and the cycle can reach the edge of the restricted zone. Even so, follow the instructions of the police or the Mela administration.',
  },
  {
    question: 'Is there a showroom for electric cycles in Prayagraj?',
    answer:
      'No separate Prayagraj showroom address is listed on the website. Eparv provides test rides and delivery at your home. If you want to visit a showroom, see the Dealers page or ask the team about an authorised dealer.',
  },
]

/* ───────────────────────── component ───────────────────────── */

export const PrayagrajPageView: React.FC = () => {
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
            { label: 'Prayagraj' },
          ]}
        />

        {/* ─── H1 Header ─── */}
        <header className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <MapPin className="size-3.5 text-energy" />
            <span>Prayagraj (प्रयागराज) • Uttar Pradesh</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Electric Cycle in Prayagraj – Price, Best Models, EMI and Free Home Delivery
          </h1>

          <p className="text-xs text-muted-foreground italic">
            The information on this page is based on the product and city pages of Eparv’s official
            website (eparvmotors.com). Last updated: 20 November 2026. Prices and offers may change,
            so please confirm with the team before ordering.
          </p>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            If you travel around Prayagraj every day – from Civil Lines to the University, from
            Kareli to the High Court, or from Naini into the city – you know the cost of petrol,
            the traffic and the parking trouble well. An{' '}
            <strong className="text-foreground">electric cycle in Prayagraj</strong> is an option
            that makes these daily trips of 4 to 9 km cheaper, easier and licence-free. This page
            puts everything in one place: price, specifications, accurate information about EMI, home
            delivery areas and the complete free test ride process for Eparv’s 5 models, so you can
            pick the right cycle without confusion.
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
              Last Updated: 20 November 2026
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
            <span>Electric Cycle in Prayagraj: Information at a Glance</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                q: 'Price range',
                a: '₹18,999 to ₹24,999, depending on the model (see price list below)',
              },
              {
                q: 'Models available',
                a: 'Eparv Savitri, Panther, Satya, Lahari and Visalka',
              },
              {
                q: 'Motor',
                a: '250W BLDC hub motor in all models, top speed 25 km/h',
              },
              {
                q: 'Range',
                a: '55 km to 110 km in pedal assist mode (35 km to 65 km on throttle)',
              },
              {
                q: 'Licence and registration',
                a: 'No RTO registration, road tax or driving licence needed under CMVR',
              },
              {
                q: 'Home delivery Prayagraj',
                a: 'Listed for 12 areas including Civil Lines, Naini, Kareli & Katra, and on request across city',
              },
              {
                q: 'Test ride',
                a: 'Free doorstep test ride, on your own daily route',
              },
              {
                q: 'Warranty',
                a: '5 years on frame, 24 months on motor, 12 months on battery',
              },
              {
                q: 'Helpline',
                a: '+91 99689 84030 (Mon–Sat, 9:30 AM to 7:00 PM)',
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

        {/* ─── Why an Electric Cycle in Prayagraj ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Why an Electric Cycle in Prayagraj? According to the City’s Needs
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Prayagraj is a city of institutions. The High Court, Allahabad University, MNNIT,
            board offices and coaching centres are part of everyday life here. The distance between
            them is often 4 to 9 km – too far to walk, and too short to bother taking out a car or
            bike. At exactly this distance, an{' '}
            <strong className="text-foreground">electric cycle in Prayagraj</strong> becomes the
            cheapest and most practical machine.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Store,
                title: 'City of institutions',
                text: 'High Court, Allahabad University, MNNIT, board offices and Katra coaching are 4 to 9 km apart — too long to walk, too short for cars. An e-cycle fits this bracket perfectly.',
              },
              {
                icon: Sun,
                title: 'Summer heat (May & June)',
                text: 'Reaching class or chambers on a normal cycle can be exhausting in 44°C+ heat. Motor assist carries the load so you arrive with far less sweat.',
              },
              {
                icon: Route,
                title: 'Flat terrain & bridge assist',
                text: 'Prayagraj’s terrain is mostly flat, using battery sparingly. On cross-Yamuna trips (Naini to Civil Lines), the assist handles the bridge incline with ease.',
              },
              {
                icon: Navigation,
                title: 'Mela & Kumbh vehicle restrictions',
                text: 'During Magh Mela or Kumbh vehicle bans, a charged electric cycle reaches the edge of restricted zones, parks anywhere, and avoids petrol pump queues.',
              },
              {
                icon: Fuel,
                title: 'Eliminates petrol expenses',
                text: 'A 100cc scooter costs ₹1,700+ a month in petrol for a 25 km commute, whereas an Eparv e-cycle runs for just ₹15 to ₹30 of electricity a month.',
              },
              {
                icon: Shield,
                title: 'Zero licence & registration',
                text: '250W power and 25 km/h top speed place Eparv cycles in the non-motorised category — school students, lawyers, homemakers and seniors ride legally without paperwork.',
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
            For this reason, an <strong className="text-foreground">electric cycle in Prayagraj</strong> is
            becoming not just a hobby but a daily necessity.
          </p>
        </section>

        {/* ─── Price Table ─── */}
        <section className="my-12 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Model-Wise Rate List
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Electric Cycle Price in Prayagraj
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              The rates below are the selling prices listed on Eparv’s website. These prices are
              national, meaning the same model costs the same in Prayagraj, Lucknow or Noida. The
              team confirms the final on-road amount, offers and delivery date when you confirm the
              order.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Model</th>
                  <th className="p-3 font-bold text-foreground">Price (MRP)</th>
                  <th className="p-3 font-bold text-foreground">Battery</th>
                  <th className="p-3 font-bold text-foreground">Range (PAS / Throttle)</th>
                  <th className="p-3 font-bold text-foreground">Weight</th>
                  <th className="p-3 font-bold text-foreground">Max Payload</th>
                  <th className="p-3 font-bold text-foreground">Full Charge</th>
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
                    <td className="p-3 font-bold text-foreground">
                      ₹{row.price}{' '}
                      <span className="text-muted-foreground line-through font-normal">
                        (₹{row.mrp})
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground">{row.battery}</td>
                    <td className="p-3 text-foreground font-medium">
                      {row.pasRange} / {row.throttleRange}
                    </td>
                    <td className="p-3 text-muted-foreground">{row.weight}</td>
                    <td className="p-3 text-foreground">{row.payload}</td>
                    <td className="p-3 text-muted-foreground">{row.chargeTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground italic">
            <p>
              <strong>How to read the table:</strong> PAS means pedal assist mode, in which the motor
              supports your pedalling. In throttle mode you ride using only the twist grip without
              pedalling, and the range is lower. So if you want a long range, riding in PAS mode is
              the best choice.
            </p>
            <p>
              <strong>What you get with the price:</strong> Every Eparv cycle comes with a 250W BLDC
              hub motor, a detachable lithium battery, dual disc brakes with motor cut-off and a
              governed speed of 25 km/h. The cycle arrives about 95% pre-assembled with a toolkit, so
              you only need to straighten the handlebar and fit the pedals (about a 10-minute setup).
            </p>
          </div>
        </section>

        {/* ─── Best Electric Cycle in Prayagraj: Model Guide ─── */}
        <section className="my-12 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Best Electric Cycle in Prayagraj: Which Cycle for Whom
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The <strong className="text-foreground">best electric cycle in Prayagraj</strong> is not
            a single model; it depends on your daily need. Below, a model is suggested for each type
            of Prayagraj rider based on the &ldquo;who it&apos;s for&rdquo; points on Eparv&apos;s
            product pages:
          </p>

          {/* Students */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="size-5 text-primary" />
              Electric Cycle for Students in Prayagraj: For University, Coaching and Tuition
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you go to Allahabad University, the coaching centres in Katra or tuition classes in
              Civil Lines, the{' '}
              <Link
                href="/electric-cycles/eparv-panther"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Panther
              </Link>{' '}
              is a good option. It is the lightest cycle in the lineup (22 kg), priced at ₹19,999,
              and gives up to 55 km of PAS range. With a key ignition lock and a detachable battery,
              you can keep the battery safe in your hostel room or classroom. The{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Savitri
              </Link>{' '}
              is also among the models recommended for students, because at ₹18,999 it is the
              lowest-priced cycle and gives up to 110 km of PAS range.
            </p>
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Eparv’s own calculation:</strong> At ₹40 a day on
              a shared auto, you spend about ₹1,000 a month, whereas charging the cycle adds only a
              few rupees to your monthly bill. On this basis, the monthly saving for students is
              stated to be around ₹980.{' '}
              <Link
                href="/electric-cycle-for-students"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                View electric cycles for students →
              </Link>
            </div>
          </div>

          {/* Ladies */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="size-5 text-primary" />
              Electric Cycle for Ladies in Prayagraj: Put Comfort and Control First
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When choosing a cycle for ladies, three things matter: seat height, the weight of the
              cycle and the sitting posture. The{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Savitri&apos;s
              </Link>{' '}
              upright, relaxed riding posture, full mudguards and rear carrier make it practical for
              women doing household errands, market trips, or going to school or office. The{' '}
              <Link
                href="/electric-cycles/eparv-panther"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Panther
              </Link>{' '}
              (22 kg) is the lightest, so it is easy to handle and take up stairs or through a gate.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">One important point:</strong> The Savitri has a
              traditional 22-inch tubular steel frame, not a step-through one. So, before buying,
              adjust the seat height during the free doorstep test ride and check whether getting on
              and off is comfortable for you.
            </p>
          </div>

          {/* Advocates & Office */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Store className="size-5 text-primary" />
              For Advocates, Office-Goers and Kareli–High Court Commuters
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The daily ~6 km route from Kareli to the High Court or Civil Lines is ideal for an
              electric cycle. Parking stress is low, and the Savitri&apos;s rear carrier comfortably
              holds a file bundle and a laptop bag. According to Eparv, a full week of cycle costs for
              court visits is even less than a single auto fare. For people who ride in long formal
              clothes, throttle mode is handy, as the cycle moves without pedalling.
            </p>
          </div>

          {/* Shopkeepers & Delivery */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Truck className="size-5 text-primary" />
              Shopkeepers, Delivery Riders and Small Traders
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you carry goods around market areas like Katra, Chowk or Muthiganj, the{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Savitri
              </Link>{' '}
              (140 kg payload, heavy rear carrier) or the{' '}
              <Link
                href="/electric-cycles/eparv-lahari"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Lahari
              </Link>{' '}
              (110 km PAS range) will be better. The Lahari&apos;s bigger battery is built for long
              shifts. Keep the company&apos;s payload limits in mind.{' '}
              <Link
                href="/electric-cycle-for-delivery"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                View delivery electric cycles →
              </Link>
            </p>
          </div>

          {/* Senior Citizens */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="size-5 text-primary" />
              Elders and Senior Citizens
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Eparv has suggested the{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Savitri
              </Link>{' '}
              for senior citizens and family riders, because it has an upright sitting posture that
              puts less strain on the back. It runs comfortably on the small roads of older
              neighbourhoods like George Town, Tagore Town and Ashok Nagar.{' '}
              <Link
                href="/electric-cycle-for-senior-citizens"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                View electric cycles for seniors →
              </Link>
            </p>
          </div>

          {/* Broken roads & Weekend */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Wrench className="size-5 text-primary" />
              For Broken Roads and Weekend Riding
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If your route has many potholes, speed breakers or rough patches, the{' '}
              <Link
                href="/electric-cycles/eparv-visalka"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Visalka
              </Link>{' '}
              has a front suspension fork with 80 mm of travel and 27.5-inch all-terrain tyres. The{' '}
              <Link
                href="/electric-cycles/eparv-satya"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Satya
              </Link>{' '}
              has a heavy-duty frame and is a rugged option on a budget. Both also come with a key
              ignition lock.
            </p>
          </div>
        </section>

        {/* ─── Popular Routes Table ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Electric Cycle in Prayagraj’s Neighbourhoods: Real Everyday Routes
          </h2>
          <p className="text-sm text-muted-foreground">
            Eparv’s Prayagraj city guide lists 4 popular commute routes. Looking at them, you can get
            an idea of how well your own route suits an electric cycle:
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Route</th>
                  <th className="p-3 font-bold text-foreground whitespace-nowrap">Distance (One Way)</th>
                  <th className="p-3 font-bold text-foreground">Why It Works</th>
                </tr>
              </thead>
              <tbody>
                {POPULAR_ROUTES.map((route) => (
                  <tr key={route.from + route.to} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                      {route.from} to {route.to}
                    </td>
                    <td className="p-3 text-primary font-bold whitespace-nowrap">
                      {route.distance}
                    </td>
                    <td className="p-3 text-muted-foreground">{route.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Delivery Areas ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Home Delivery Areas for Electric Cycles in Prayagraj
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eparv’s website lists these 12 areas of Prayagraj for home delivery and test rides:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DELIVERY_AREAS.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 p-3 rounded-xl border border-border bg-card text-xs font-semibold text-foreground"
              >
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-2 text-xs text-muted-foreground">
            <p>
              <strong className="text-foreground">Rest of the city on request:</strong> If you live
              in another colony such as {ON_REQUEST_AREAS.join(', ')}, confirm your pin code and
              delivery timeline with the team before ordering. The delivery window is confirmed before
              payment.
            </p>
            <p>
              <strong className="text-foreground">A neighbourhood-wise way of thinking:</strong> Civil
              Lines and the Allahabad University area have wide, clean roads where a light cycle like
              the Panther does well. In the narrow lanes of Katra, Chowk and Muthiganj, the Savitri’s
              upright seating and mudguards come in handy. Riders heading towards Naini and Jhunsi
              should consider the larger-battery Lahari or Savitri for the bridge crossing. On uneven
              patches around Kareli and Bhardwaj Ashram, the Visalka’s suspension helps.
            </p>
          </div>
        </section>

        {/* ─── Buy Online 4 Steps ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Buy an Electric Cycle Online in Prayagraj: The Complete Ordering Process
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Buying an electric cycle in Prayagraj online is simple and convenient:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Choose a model',
                text: 'Shortlist 1 or 2 models from the table above according to your needs, or see the Electric Cycles page on the website.',
              },
              {
                step: '02',
                title: 'Book a free test ride',
                text: 'Submit a request on this page with your name, phone number and Prayagraj. The team comes to your address on your actual daily route.',
              },
              {
                step: '03',
                title: 'Confirm the order',
                text: 'Confirm the model, colour availability, delivery date and EMI options with the team.',
              },
              {
                step: '04',
                title: 'Delivery at home',
                text: 'The cycle arrives about 95% assembled. The team completes assembly, battery check and gives a demo of charging and daily care.',
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
            For Prayagraj, the website gives the delivery time as &ldquo;a few working days&rdquo;.
            Call or WhatsApp{' '}
            <a
              href="tel:+919968984030"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              +91 99689 84030
            </a>{' '}
            for model advice and delivery timelines.
          </p>
        </section>

        {/* ─── Showroom vs Online Shop ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Store className="size-5 text-primary" />
            Electric Cycle Shop in Prayagraj: Showroom or Online?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Many people first search for &ldquo;electric cycle shop in Prayagraj&rdquo; so that they
            can hold the cycle in their hands once. Eparv handles this differently: the company gives a{' '}
            <strong className="text-foreground">free test ride at your home</strong> – in other
            words, the &ldquo;shop&rdquo; comes to your doorstep.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you want to see it in a showroom, check Eparv’s{' '}
            <Link
              href="/dealers"
              className="text-primary hover:underline underline-offset-2 font-medium"
            >
              Dealers page
            </Link>{' '}
            or call/WhatsApp +91 99689 84030 to ask whether there is an authorised dealer near you.
            Always confirm the shop is an authorised dealer to ensure you get a valid factory warranty
            bill.
          </p>
        </section>

        {/* ─── Running Cost Comparison ─── */}
        <section className="my-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Running Cost &amp; Savings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Running Cost: How Much an Electric Cycle in Prayagraj Saves
            </h2>
            <p className="text-sm text-muted-foreground">
              Eparv’s product pages give a running-cost formula: battery kWh × electricity rate (₹7 per
              unit) ÷ range.
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

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              • <strong>Eparv Savitri and Lahari:</strong> about ₹0.02 per km. One full charge costs
              about ₹2.62.
            </p>
            <p>
              • <strong>Eparv Panther, Satya and Visalka:</strong> about ₹0.04 per km. A full charge
              costs between ₹1.97 and ₹2.62.
            </p>
            <p>
              • Riding 25 km a day, the monthly electricity cost is about ₹15 to ₹30. Website
              estimate: a monthly saving of about ₹1,745 to ₹1,760 compared with a 100cc petrol scooter
              (~₹20,000/year).
            </p>
            <p className="italic">
              *A clear word about range: 110 km range is tested at pedal assist level 1, on flat paved
              road, with a rider of 68 to 70 kg. In throttle mode the range is lower – up to 60 km on
              the Savitri and 65 km on the Lahari.
            </p>
          </div>
        </section>

        {/* ─── EMI Section ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <IndianRupee className="size-5 text-primary" />
            Electric Cycle EMI in Prayagraj: What Information Is Reliable
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This section is especially for students and new lawyers who are thinking of buying an
            electric cycle in Prayagraj in instalments. EMI options are discussed with the team when
            you confirm the order.
          </p>
          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-2 text-xs text-muted-foreground">
            <strong className="text-foreground">Before taking EMI, be sure to ask these 6 things:</strong>
            <ul className="list-disc list-inside space-y-1">
              <li>How much the down payment will be</li>
              <li>How many months the tenure will be</li>
              <li>What the interest rate and processing fee are</li>
              <li>What the total amount will be (price + interest + charges)</li>
              <li>Which bank or finance company it is</li>
              <li>What charges apply for late payment or foreclosure</li>
            </ul>
          </div>
        </section>

        {/* ─── Licence, Registration and Legal Matters ─── */}
        <section className="my-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Licence, Registration and Legal Matters
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eparv’s electric cycles are built within the limits of 250W power and 25 km/h top speed,
            in line with the low-speed e-cycle category under the Central Motor Vehicles Rules.
            According to the company:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 ml-1">
            {[
              'No driving licence is needed',
              'No RTO registration or number plate is needed',
              'No road tax is payable',
              'Insurance is not mandatory (though recommended for personal safety)',
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                {rule}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Safety tip:</strong> For safety, always wear a
            helmet and pay attention to lights and reflectors at night, especially on fast stretches
            like Naini bridge and GT Road.{' '}
            <Link
              href="/posts/electric-cycle-license-rto-rules-india"
              className="text-primary hover:underline underline-offset-2 font-medium"
            >
              Read the full licence &amp; CMVR rules guide →
            </Link>
          </p>
        </section>

        {/* ─── Caring for Weather ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Caring for Your Electric Cycle in Prayagraj’s Weather
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <Sun className="size-5 text-amber-500" />
              <h3 className="font-bold text-sm text-foreground">Summer (May–June)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Do not leave the battery standing in the sun or charge it in a hot place. The battery
                is detachable, so take it to your home or office and charge indoors from a 5A socket
                in 2 to 4 hours.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <Droplets className="size-5 text-blue-500" />
              <h3 className="font-bold text-sm text-foreground">Monsoon &amp; Waterlogging</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Wiring and motor casing are weather-sealed (IP65 claim). Even so, do not ride in deep
                waterlogging where water can reach the motor hub or battery. Wipe dry after rain.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <Navigation className="size-5 text-primary" />
              <h3 className="font-bold text-sm text-foreground">Mela Days</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Keep the charge full and carry your own lock in crowded places. Electric cycles easily
                reach the edge of vehicle-restricted festival zones.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <Battery className="size-5 text-emerald-500" />
              <h3 className="font-bold text-sm text-foreground">Battery Life Care</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The battery is rated for more than 1,000 charge cycles. Do not let the battery drain
                completely (charge near 20%), and keep it at 50% charge if storing for a long time.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Warranty & Service ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Warranty, Service and Spare Parts
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When buying an electric cycle in Prayagraj, trust in the warranty and service matters
            most:
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
            Mechanical parts like brakes, tyres and chains can be repaired at local cycle shops in
            Prayagraj. Electrical issues (battery, motor, controller) go through Eparv’s warranty
            process, with genuine spare parts dispatched within 24 to 48 hours and video assistance
            provided for technicians.
          </p>
        </section>

        {/* ─── 7 Things Checklist ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Check These 7 Things Before Buying
          </h2>
          <ul className="text-sm text-muted-foreground space-y-2.5">
            {[
              'Measure the total distance of your daily route (round trip) and choose a model with 30 to 40% more range than that.',
              'Do not go by website brochure range alone; ride the cycle on your own route during the free test ride.',
              'Check that the seat height, handlebar posture and weight are comfortable for you.',
              'Check where it will be charged — ensure the detachable battery can be taken indoors and charged safely.',
              'Make sure the warranty and invoice carry the correct company name (EPARV INGENUITY PRIVATE LIMITED, GSTIN 07AAGCE4054K1ZJ) and model.',
              'Get all EMI charges (down payment, interest, processing fee, total amount) in writing.',
              'Take the seller’s helpline number (+91 99689 84030) and the support process in advance.',
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Why Trust Eparv ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            About Eparv: Company Information
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eparv is an Indian brand run by EPARV INGENUITY PRIVATE LIMITED. The company was founded
            on 31 March 2021 by Rajendra Kumar Mishra, who is the Founder and Managing Director. The
            company’s registered office is in Dwarka, New Delhi.
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
                icon: ShieldCheck,
                title: '40-Point Factory Inspection',
                text: 'Every cycle goes through a 40-point factory inspection: battery cell test, frame stress test, waterproofing test and brake cut-off check before dispatch.',
              },
              {
                icon: Battery,
                title: 'Smart BMS Battery Management',
                text: 'High-grade lithium cells with a Battery Management System (BMS) that protects against overvoltage, short circuit and deep discharge.',
              },
              {
                icon: Route,
                title: '25+ Cities Distribution Network',
                text: 'Distribution and service network spans 25 cities across Delhi NCR, Uttar Pradesh, Bihar and Madhya Pradesh, with Prayagraj as an active hub.',
              },
              {
                icon: Truck,
                title: 'Doorstep Free Test Ride',
                text: 'Try before you buy with a doorstep test ride in Prayagraj with zero purchase obligation.',
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

        {/* ─── Summary Section ─── */}
        <section className="my-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Electric Cycle in Prayagraj: Summary
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you want to buy an electric cycle in Prayagraj, Eparv’s 5 models are available from
            ₹18,999 to ₹24,999. All come with a 250W BLDC motor, a speed limit of 25 km/h and a
            detachable lithium battery. Free test rides and delivery at home are available in areas
            such as Civil Lines, Naini, Kareli, Katra, George Town and Jhunsi. No licence or RTO
            registration is stated to be needed to ride. A 5-year warranty is given on the frame, 24
            months on the motor and 12 months on the battery. Before buying an electric cycle in
            Prayagraj, be sure to take a test ride, and get the price, EMI and delivery date
            confirmed by the team.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Call or WhatsApp{' '}
            <a
              href="tel:+919968984030"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              +91 99689 84030
            </a>{' '}
            to book your free test ride slot.
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
                Electric Cycle Models Available in Prayagraj
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
                      alt={`${model.name} electric cycle in Prayagraj`}
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
          heading="Frequently Asked Questions – Electric Cycle in Prayagraj"
          subheading="Common questions about buying, riding, charging, EMI, and servicing an electric cycle in Prayagraj."
          faqs={PRAYAGRAJ_FAQS}
          id="prayagraj-faq"
        />

        {/* ─── CTA: Book Test Ride ─── */}
        <section className="my-12 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 via-card to-energy/10 p-6 sm:p-8 text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Book Your Free Test Ride for an Electric Cycle in Prayagraj
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              If you have been looking for an electric cycle in Prayagraj and have not yet been able
              to pick the right model, first book a free test ride. Riding the cycle for 20 minutes on
              your daily route tells you more than any table or review can. We bring the cycle to your
              doorstep anywhere in Prayagraj – Civil Lines, Naini, Kareli, Katra, George Town, Jhunsi,
              Ashok Nagar or Chowk.
            </p>
          </div>

          <div className="max-w-xl mx-auto text-left bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-md">
            <LeadForm
              type="test-ride"
              defaultCity="Prayagraj"
              submitLabel="Book Free Test Ride in Prayagraj"
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
                title: 'Electric Cycle in Varanasi',
                url: '/electric-cycle-in-varanasi',
                cat: 'location',
                desc: 'Doorstep test ride & delivery across Varanasi',
              },
              {
                title: 'Electric Cycle in Lucknow',
                url: '/electric-cycle-in-lucknow',
                cat: 'location',
                desc: 'Gomti Nagar, Hazratganj & Aliganj delivery guides',
              },
              {
                title: 'Electric Cycle in Kanpur',
                url: '/electric-cycle-in-kanpur',
                cat: 'location',
                desc: 'Delivery, test rides and prices in nearby Kanpur',
              },
              {
                title: 'Electric Cycle for Students',
                url: '/electric-cycle-for-students',
                cat: 'intent',
                desc: 'Best electric cycles for college and university students',
              },
              {
                title: 'Electric Cycle for Senior Citizens',
                url: '/electric-cycle-for-senior-citizens',
                cat: 'intent',
                desc: 'Upright, low-effort electric cycles for seniors',
              },
              {
                title: 'Electric Cycle for Delivery',
                url: '/electric-cycle-for-delivery',
                cat: 'intent',
                desc: 'High range commercial e-cycles for delivery partners',
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
