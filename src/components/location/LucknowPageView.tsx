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
  Quote,
  Route,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
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
    bestFor: 'Outskirts, rough roads',
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
    zone: 'East Lucknow (Gomti Nagar side)',
    localities:
      'Gomti Nagar, Vibhuti Khand, Gomti Nagar Extension, Chinhat, Matiyari, Faizabad Road, Indira Nagar, Patrakarpuram',
  },
  {
    zone: 'Central Lucknow',
    localities:
      'Hazratganj, Kaiserbagh, Lalbagh, Hussainganj, Narhi, Sapru Marg, Charbagh, Nishatganj',
  },
  {
    zone: 'North Lucknow',
    localities:
      'Aliganj, Kapoorthala, Mahanagar, Jankipuram, Vikas Nagar, Kursi Road, Sitapur Road, Daliganj',
  },
  {
    zone: 'Old Lucknow',
    localities: 'Aminabad, Chowk, Nakhas, Thakurganj, Saadatganj, Rajajipuram, Dubagga',
  },
  {
    zone: 'South Lucknow',
    localities:
      'Alambagh, Aashiana, LDA Colony (Kanpur Road), Krishna Nagar, Sarojini Nagar, Amausi, Telibagh',
  },
  {
    zone: 'New townships & outskirts',
    localities:
      'Sushant Golf City, Vrindavan Yojana, Raebareli Road, SGPGI area, Bakshi Ka Talab – on request',
  },
]

const POPULAR_ROUTES = [
  {
    from: 'Gomti Nagar (Vibhuti Khand)',
    to: 'Hazratganj',
    distance: '≈ 8 km',
    why: 'Straight office run; arrive fresh even in May heat',
  },
  {
    from: 'Charbagh Station',
    to: 'Hazratganj',
    distance: '≈ 4 km',
    why: 'Short station trips without auto bargaining',
  },
  {
    from: 'Aliganj',
    to: 'Lucknow University',
    distance: '≈ 5 km',
    why: 'Classic student route – barely touches the battery',
  },
  {
    from: 'Alambagh',
    to: 'SGPGI',
    distance: '≈ 12 km',
    why: 'Long hospital and campus run at a cost of paise',
  },
  {
    from: 'Chinhat',
    to: 'Hazratganj',
    distance: '≈ 11 km',
    why: 'Cross-city commute that is costly on petrol, cheap on charge',
  },
  {
    from: 'Jankipuram',
    to: 'Kapoorthala',
    distance: '≈ 5 km',
    why: 'Coaching and market trips in the north Lucknow belt',
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

const LUCKNOW_FAQS = [
  {
    question: 'What is the electric cycle price in Lucknow?',
    answer:
      'Eparv electric cycles in Lucknow start at ₹18,999 for the Savitri and go up to ₹24,999 for the Visalka. The Panther is ₹19,999, the Satya ₹21,000 and the long-range Lahari ₹21,999. Final price, delivery and any offers are confirmed when you order.',
  },
  {
    question: 'Which is the best electric cycle in Lucknow?',
    answer:
      'It depends on your use. For students and light city commuting, the Panther is the best value. For long distance or delivery work, the Lahari gives the most range (110 km PAS). For ladies and senior citizens, the Savitri is the most comfortable. For bad roads and potholes, choose the Visalka with front suspension.',
  },
  {
    question: 'Do I need a licence to ride an electric cycle in Lucknow?',
    answer:
      'No. Electric cycles with a motor of 250W or less and a top speed of 25 km/h do not need a driving licence, RTO registration or road tax. All Eparv models meet these limits.',
  },
  {
    question: 'Can I buy an electric cycle online in Lucknow with home delivery?',
    answer:
      'Yes. You can book online or on WhatsApp, and the cycle is delivered to your home in Lucknow about 95% assembled, with a toolkit and a walkthrough of charging and riding modes.',
  },
  {
    question: 'Is there an electric cycle shop in Lucknow where I can see the cycle?',
    answer:
      'You don\'t need to visit a shop. Eparv offers a free doorstep test ride in Lucknow, so you can ride the cycle on your own route before buying. Call +91 99689 84030 to check showroom or dealer availability near you.',
  },
  {
    question: 'Is EMI available on electric cycles in Lucknow?',
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
    question: 'Which electric cycle is best for Lucknow University and coaching students?',
    answer:
      'The Eparv Panther (₹19,999) is the most popular choice for students – it is the lightest model at 22 kg, has a key lock and gives up to 55 km on pedal assist, which easily covers Aliganj–campus–Kapoorthala coaching trips.',
  },
  {
    question: 'Which electric cycle is good for ladies in Lucknow?',
    answer:
      'The Eparv Savitri is the best electric cycle for ladies in Lucknow because of its upright seating, strong rear carrier, full mudguards and 110 km range. Ladies who prefer a lighter cycle can choose the Panther.',
  },
  {
    question: 'Can I ride an electric cycle in the rain?',
    answer:
      'Yes. Eparv cycles have an IP65-rated motor and water-sealed wiring, so normal rain is fine. Avoid deep standing water that reaches the motor hub, and dry the cycle after heavy rain.',
  },
  {
    question: 'What warranty do I get on an electric cycle in Lucknow?',
    answer:
      'You get a 5-year warranty on the frame, 24 months on the motor and 12 months on the battery, plus 24–48 hour spare parts dispatch from the factory.',
  },
  {
    question: 'Can I ride an electric cycle on Shaheed Path or the Ring Road?',
    answer:
      'Yes, electric cycles are allowed on city roads, but stay on the extreme left, use the service lane where available, wear a helmet and use lights after dark. These are fast roads, so keep to the 25 km/h limit and ride defensively.',
  },
  {
    question: 'Do you deliver to Sushant Golf City, Vrindavan Yojana and Bakshi Ka Talab?',
    answer:
      'Yes. Delivery to new townships and outskirts like Sushant Golf City, Vrindavan Yojana, Raebareli Road and Bakshi Ka Talab can be arranged on request. Call or WhatsApp to confirm your location.',
  },
]

/* ───────────────────────── component ───────────────────────── */

export const LucknowPageView: React.FC = () => {
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

  /* Review schema for customer testimonial */
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: 'Eparv Savitri Electric Cycle',
      brand: { '@type': 'Brand', name: 'Eparv' },
    },
    author: {
      '@type': 'Person',
      name: 'Dr. Manisha Verma',
      jobTitle: 'Assistant Professor / University Faculty',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    reviewBody:
      'I wanted a reliable electric cycle for university commutes and local grocery runs. Savitri’s upright posture is very comfortable for daily riding, and the heavy-duty rear carrier easily carries books and shopping bags. Full charge takes just 2.5 hours.',
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
            { label: 'Lucknow' },
          ]}
        />

        {/* ─── H1 Header ─── */}
        <header className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <MapPin className="size-3.5 text-energy" />
            <span>Lucknow (लखनऊ) • Uttar Pradesh</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Electric Cycle in Lucknow – Buy Online with Free Test Ride &amp; Home Delivery
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Looking for an electric cycle in Lucknow that makes the Gomti Nagar–Hazratganj commute
            effortless, handles the long Shaheed Path stretches and cuts your petrol bill to almost
            zero? Eparv electric cycles are delivered across Lucknow, from Gomti Nagar, Indira Nagar
            and Aliganj to Alambagh, Aashiana, Jankipuram and Chinhat. Compare models online, take a
            free test ride at your doorstep, and get the cycle delivered home with a full walkthrough
            of charging and care.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Every Eparv model uses a 250W BLDC hub motor with a top speed of 25 km/h, which places it
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
            <span>Quick Answer: Electric Cycle in Lucknow at a Glance</span>
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
                a: 'Yes – Gomti Nagar, Hazratganj, Indira Nagar, Aliganj, Alambagh, Jankipuram and more',
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

        {/* ─── Why Electric Cycle in Lucknow Makes Sense ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Why an Electric Cycle in Lucknow Makes So Much Sense
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Lucknow has grown fast. New areas like Gomti Nagar Extension, Sushant Golf City, Vrindavan
            Yojana and Jankipuram sit 10–20 km from the old city, while most offices, colleges and
            markets are still in Hazratganj, Kaiserbagh, Aminabad and Chowk. That makes daily travel
            long and expensive, which is exactly why more families are now choosing an{' '}
            <strong className="text-foreground">electric cycle in Lakhnau</strong> over a second
            scooter.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Route,
                title: 'Wide, flat roads',
                text: 'Shaheed Path, Kanpur Road, Faizabad Road, Sitapur Road and the Gomti Riverfront stretch are wide and level – perfect for pedal assist and long daily rides.',
              },
              {
                icon: Navigation,
                title: 'Traffic at key crossings',
                text: 'Charbagh, Polytechnic Chauraha, Hazratganj, Kapoorthala and Munshipulia jam up at peak hours. A light e-cycle moves through where cars stand still.',
              },
              {
                icon: Fuel,
                title: 'Petrol cost',
                text: 'A 100cc scooter costs ₹1,700+ a month in petrol for a 25 km daily commute. The same distance on an Eparv costs about ₹15–₹30 of electricity.',
              },
              {
                icon: Store,
                title: 'Parking in old Lucknow',
                text: 'In Aminabad, Chowk, Nakhas and Lalbagh, finding parking for a car or scooter is a daily fight. A cycle parks next to your shop or at the market edge.',
              },
              {
                icon: Sun,
                title: 'Summer heat',
                text: 'Lucknow crosses 44–45°C in May and June. On throttle mode you reach office or college without being drenched in sweat.',
              },
              {
                icon: Shield,
                title: 'No paperwork',
                text: 'No licence or registration, so school students, homemakers and senior citizens can all ride legally.',
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
            Put simply, an <strong className="text-foreground">electric cycle in Lucknow</strong> is
            the cheapest personal vehicle you can run for daily city travel, and far less tiring than
            a regular bicycle.
          </p>
        </section>

        {/* ─── Price Table ─── */}
        <section className="my-12 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              2026 Price List
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Electric Cycle Price in Lucknow
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              Here is the current electric cycle price in Lucknow for the complete Eparv lineup.
              Prices are ex-showroom; delivery, EMI options and running offers are confirmed when you
              place your order.
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
            Eparv tests range in pedal-assist level 1 on flat roads with a 68–72 kg rider. Real range
            depends on rider weight, load, tyre pressure and how much you use the throttle; expect
            about 70–80% of the listed figure in mixed city riding. Even then, any electric cycle in
            Lucknow from this lineup covers a full day of normal commuting on one charge.
          </p>
        </section>

        {/* ─── Model-by-Model Guide ─── */}
        <section className="my-12 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Best Electric Cycle in Lucknow – Model-by-Model Guide
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            There is no single best electric cycle in Lucknow for everyone. The right model depends
            on your daily distance, your roads and what you carry. Here is an honest breakdown to
            help you choose the right{' '}
            <strong className="text-foreground">electric cycle in Lucknow</strong> for your
            routine.
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
              Savitri is a classic Indian roadster with a motor: upright seating, a heavy steel rear
              carrier, full mudguards and 28-inch wheels. Its 36V 10.4Ah battery gives up to 110 km on
              pedal assist and 60 km on throttle, with a 3-hour charge.
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
              want a straight-back ride, and traders in Aminabad, Yahiyaganj, Chowk and Naka Hindola
              carrying goods on the carrier
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
              assist and 35 km on throttle, charging in 3 hours.
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
              <strong className="text-foreground">Ideal for:</strong> Lucknow University, KGMU and
              AKTU students, coaching students in Kapoorthala and Aliganj, and office commuters doing
              10–35 km round trips
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
              Satya is built for broken roads, gravel and semi-urban routes, with 26 × 2.125-inch
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
              Bakshi Ka Talab, Mohanlalganj, Kakori, Malihabad road and village link roads around
              Lucknow
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
              touring saddle and 27.5-inch wheels. It delivers up to 110 km on pedal assist and 65
              km on throttle, so most riders charge it only two or three times a week. Charging
              takes about 4 hours.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Payload: up to 125 kg; weight: 25 kg; peak torque: 40 Nm
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Ideal for:</strong> Zomato, Swiggy, Blinkit and
              parcel delivery riders, and long commuters from Sushant Golf City, Vrindavan Yojana or
              Gomti Nagar Extension to Hazratganj and Charbagh
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
              metro and drainage work zones and speed breakers, and young riders who enjoy weekend
              rides along the Gomti Riverfront and Kukrail side
            </p>
          </div>
        </section>

        {/* ─── Customer Review / Testimonial ─── */}
        <section className="my-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span>What a Lucknow Rider Says</span>
          </div>

          <blockquote className="relative text-sm sm:text-base text-foreground italic leading-relaxed pl-6 border-l-2 border-primary">
            &ldquo;I wanted a reliable electric cycle for university commutes and local grocery runs.
            Savitri&apos;s upright posture is very comfortable for daily riding, and the heavy-duty
            rear carrier easily carries books and shopping bags. Full charge takes just 2.5
            hours.&rdquo;
          </blockquote>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
            <div>
              <strong className="text-foreground">Dr. Manisha Verma</strong> — Gomti Nagar,
              Lucknow
              <span className="block text-[11px] text-primary font-medium mt-0.5">
                Verified Eparv Savitri Owner
              </span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
          </div>
        </section>

        {/* ─── For Ladies and Students ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Electric Cycle for Ladies and Students in Lucknow
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Users className="size-5 text-primary" />
                For Students (Lucknow University, KGMU, AKTU, Integral, Amity, BBAU)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Students living in PGs and hostels in Aliganj, Kapoorthala, Hasanganj, Daliganj,
                Indira Nagar and Gomti Nagar travel 4–12 km a day to campus and coaching. An{' '}
                <Link
                  href="/electric-cycle-for-students"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  electric cycle for students
                </Link>{' '}
                in Lucknow means no daily auto or e-rickshaw fare, no licence needed and no sweat in
                the afternoon heat. Recommended:{' '}
                <Link
                  href="/electric-cycles/eparv-panther"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Eparv Panther
                </Link>{' '}
                (light, easy to carry up PG stairs) or{' '}
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
                For Ladies and Working Women
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                School drops, shopping at Hazratganj, Bhootnath Market, Kapoorthala or Patrakarpuram,
                and daily office commutes need an easy step-over, upright posture, a carrier for bags
                and simple controls. An electric cycle for ladies in Lucknow should also be light
                enough to park and manoeuvre easily. Recommended:{' '}
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
                Morning walks at Janeshwar Mishra Park or Ambedkar Park, temple visits, bank and
                pension work – Savitri&apos;s upright position and low-effort throttle mode keep these
                trips easy on the knees and back.{' '}
                <Link
                  href="/electric-cycle-for-senior-citizens"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Explore electric cycles for senior citizens →
                </Link>
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Store className="size-5 text-primary" />
                For Shopkeepers, Chikankari Traders and Delivery Riders
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Chikankari and garment traders moving between Chowk, Aminabad, Nakhas and courier
                points, and delivery partners riding 60–80 km a day, save the most money.
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
                for heavy carrier load.{' '}
                <Link
                  href="/electric-cycle-for-delivery"
                  className="text-primary hover:underline underline-offset-2 font-medium"
                >
                  Explore electric cycles for delivery →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ─── How to Buy Online ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            How to Buy Electric Cycle Online in Lucknow
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You don&apos;t have to hunt for an{' '}
            <strong className="text-foreground">electric cycle shop in Lucknow</strong> and spend a
            full Sunday comparing models. You can{' '}
            <strong className="text-foreground">buy electric cycle online in Lucknow</strong> in
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
                text: 'Fill in the form on this page with your name, phone number and preferred time. The team arranges a 20-minute ride at your home or office in Lucknow, on the roads you actually use.',
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
            Prefer to talk? Call or WhatsApp{' '}
            <a
              href="tel:+919968984030"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              +91 99689 84030
            </a>{' '}
            for model advice, price confirmation and delivery timelines for Lucknow.
          </p>
        </section>

        {/* ─── Home Delivery Areas ─── */}
        <section className="my-12 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Delivery Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Electric Cycle Home Delivery in Lucknow – Areas We Cover
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Electric cycle home delivery in Lucknow is available across the city. If your area is
              not listed, call us – delivery to the rest of Lucknow is arranged on request. Your
              electric cycle in Lucknow usually reaches you within a few working days of order
              confirmation.
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
            Popular Daily Routes for an Electric Cycle in Lucknow
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
              Running Cost: Electric Cycle vs Petrol Scooter in Lucknow
            </h2>
            <p className="text-sm text-muted-foreground">
              This is where an electric cycle in Lucknow pays for itself. The calculation below uses
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
            With yearly savings of around ₹20,000, most riders recover the full price of the cycle in
            roughly 12–14 months of daily use. Riders commuting from Gomti Nagar Extension or Sushant
            Golf City save even more because their daily distance is longer.
          </p>
        </section>

        {/* ─── EMI Section ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <IndianRupee className="size-5 text-primary" />
            Electric Cycle on EMI in Lucknow
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Want to spread the cost?{' '}
            <strong className="text-foreground">Electric cycle EMI in Lucknow</strong> can be
            arranged when you confirm your order. Share your preferred model and budget with the team
            on call or WhatsApp, and they will explain the available EMI and payment options, the
            down payment and the monthly amount before you commit. Since the cycle saves ₹1,500+ a
            month on petrol, the EMI is often covered by the fuel you no longer buy. That makes an
            electric cycle in Lucknow affordable even on a student or first-job budget.
          </p>
        </section>

        {/* ─── Licence and Rules ─── */}
        <section className="my-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Licence and Rules for Riding an Electric Cycle in Lucknow
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
            <strong className="text-foreground">Safety tip:</strong> A helmet is not legally
            required, but we strongly recommend one, especially on fast roads like Shaheed Path,
            Kanpur Road, Faizabad Road and the Outer Ring Road.{' '}
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
            Charging, Power Cuts and Monsoon Care in Lucknow
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Plug className="size-5 text-primary" />
                Charging at Home
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every Eparv cycle has a detachable, key-locked lithium battery. Take it out, carry it
                to your flat, and plug it into any normal 5A socket. A full charge takes 3–4 hours
                depending on the model. There is no need for a special charging point or wiring
                change, which suits Gomti Nagar apartments, Aliganj builder floors, old Lucknow houses
                and student PGs alike.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Lightbulb className="size-5 text-primary" />
                Power Cuts
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A full charge takes only a few hours and lasts several days of normal riding, so
                occasional power cuts rarely affect your electric cycle in Lucknow. Charge at night or
                whenever your home has power. The 110 km models (Savitri and Lahari) can go two to
                three days between charges for most riders.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Droplets className="size-5 text-primary" />
                Monsoon and Waterlogging
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                During heavy July–August rain, low-lying roads and underpasses in parts of the city
                can fill with water quickly. Eparv cycles use an IP65-rated hub motor and water-sealed
                wiring, so normal rain and splashes are fine. Avoid riding through deep standing water
                that reaches the motor hub, and wipe the cycle dry after a heavy downpour.
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
            Warranty and After-Sales Service in Lucknow
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every electric cycle in Lucknow sold by Eparv comes with direct factory warranty:
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
            If anything goes wrong, genuine spare parts are dispatched from the factory within 24–48
            hours, and technical support is available on phone and WhatsApp. The BLDC hub motor is
            brushless and needs almost no routine maintenance – just regular tyre pressure checks,
            brake adjustment and chain lubrication, the same as any normal cycle.
          </p>
        </section>

        {/* ─── Buyer's Checklist ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            How to Choose the Best Electric Cycle in Lucknow – Buyer&apos;s Checklist
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you buy from us or from any other{' '}
            <strong className="text-foreground">electric cycle shop in Lucknow</strong>, check
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
                text: 'Essential if you live in a flat, PG or upper floor without ground-floor charging.',
              },
              {
                label: 'Brakes',
                text: "Dual disc brakes with motor cut-off are much safer in Lucknow's fast, stop-start traffic.",
              },
              {
                label: 'Warranty in writing',
                text: 'Separate warranty for frame, motor and battery, clearly stated.',
              },
              {
                label: 'Spare parts and service',
                text: 'Ask how quickly parts reach Lucknow and who handles repairs.',
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
            Why Lucknow Riders Can Trust Eparv
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
            लखनऊ में इलेक्ट्रिक साइकिल – हिंदी में जानकारी
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            अगर आप लखनऊ में इलेक्ट्रिक साइकिल खरीदना चाहते हैं, तो Eparv के मॉडल ₹18,999 से शुरू
            होते हैं। इनमें 250W मोटर है और टॉप स्पीड 25 km/h है, इसलिए ड्राइविंग लाइसेंस या RTO
            रजिस्ट्रेशन की ज़रूरत नहीं होती। बैटरी निकालकर घर के किसी भी नॉर्मल 5A सॉकेट से 3–4
            घंटे में चार्ज हो जाती है, और एक बार फुल चार्ज का खर्च सिर्फ़ ₹2–₹3 आता है।
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            गोमती नगर, हज़रतगंज, इंदिरा नगर, अलीगंज, आलमबाग, आशियाना, जानकीपुरम और चिनहट समेत पूरे
            लखनऊ में होम डिलीवरी और फ्री टेस्ट राइड उपलब्ध है। स्टूडेंट्स के लिए Panther, महिलाओं और
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
                Electric Cycle Models Available in Lucknow
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
                      alt={`${model.name} electric cycle in Lucknow`}
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
          heading="Frequently Asked Questions – Electric Cycle in Lucknow"
          subheading="Common questions from riders and buyers in Lucknow regarding price, models, test rides, RTO rules, charging, Shaheed Path riding and home delivery."
          faqs={LUCKNOW_FAQS}
          id="lucknow-faq"
        />

        {/* ─── CTA: Book Test Ride ─── */}
        <section className="my-12 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 via-card to-energy/10 p-6 sm:p-8 text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Book Your Free Test Ride for an Electric Cycle in Lucknow
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Ready to stop paying for petrol and autos? Fill in the form below with your name, phone
              number and preferred time, and we will bring an Eparv electric cycle to your doorstep
              anywhere in Lucknow – Gomti Nagar, Hazratganj, Indira Nagar, Aliganj, Alambagh,
              Jankipuram or Chinhat. Ride it on your own route, ask every question, and buy only if
              you are happy.
            </p>
          </div>

          <div className="max-w-xl mx-auto text-left bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-md">
            <LeadForm
              type="test-ride"
              defaultCity="Lucknow"
              submitLabel="Book Free Test Ride in Lucknow"
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
                title: 'Electric Cycle in Kanpur',
                url: '/electric-cycle-in-kanpur',
                cat: 'location',
                desc: 'Delivery, test rides and prices in nearby Kanpur',
              },
              {
                title: 'Electric Cycle in Varanasi',
                url: '/electric-cycle-in-varanasi',
                cat: 'location',
                desc: 'Doorstep test ride & delivery across Varanasi',
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
              {
                title: 'Electric Cycle Running Cost per KM',
                url: '/posts/electric-cycle-running-cost-per-km',
                cat: 'guide',
                desc: 'Complete cost comparison with petrol vehicles',
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
      <JsonLd data={reviewSchema} />
    </article>
  )
}
