import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Battery,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Fuel,
  Gauge,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingDown,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DirectAnswer, FaqBlock, RelatedLinks } from '@/components/seo'
import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'
import { MODEL_LIST } from '@/data/models'
import { STATE_HUBS, type CityData } from '@/data/cities'
import { getCityKeywords } from '@/data/keywords'

interface CityPageViewProps {
  city: CityData
}

export const CityPageView: React.FC<CityPageViewProps> = ({ city }) => {
  const stateHub = STATE_HUBS[city.stateHub]
  const keywords = getCityKeywords(city.slug, city.displayName, city.displayNameHi)

  // Use verified local rates or standard regional benchmark
  const petrolPrice = city.petrolPricePerLitre ?? 106.5
  const electricityRate = city.electricityRatePerUnit ?? 7.0
  const deliveryDays = city.deliveryTimeDays ?? '3 to 5 business days'
  const petrolDate = city.petrolPriceDate ?? 'October 2026'

  // Cost per KM calculation
  // Petrol bike: 45 km/L @ 106.5 = ~2.37/km
  const petrolCostPerKm = (petrolPrice / 45).toFixed(2)
  // Eparv cycle: 0.28 kWh per 55 km @ 7/unit = ~0.04/km
  const eparvCostPerKm = ((0.28 * electricityRate) / 55).toFixed(2)
  const monthlyPetrolSpend = (Number(petrolCostPerKm) * 25 * 30).toFixed(0) // 25 km/day
  const monthlyEparvSpend = (Number(eparvCostPerKm) * 25 * 30).toFixed(0)
  const monthlySavings = (Number(monthlyPetrolSpend) - Number(monthlyEparvSpend)).toLocaleString('en-IN')

  const defaultUseCases = [
    {
      title: `${city.displayName} Daily Office & Work Commute`,
      description: `Bypass peak hour congestion on major ${city.displayName} arterials. Arrive sweat-free with instant 250W pedal assist while spending less than ₹2 per daily commute.`,
    },
    {
      title: 'College & Coaching Classes',
      description: `Ideal for students travelling to campuses and study hubs across ${city.displayName}. Zero driving license required, anti-theft key lock, and easily detachable battery for indoor charging.`,
    },
    {
      title: 'Local Errands & Family Utility',
      description: `Complete neighborhood grocery runs, market trips, and leisure rides across ${city.displayName} with effortless parking and zero fuel expenses.`,
    },
  ]

  const useCases = city.localUseCases.length >= 3 ? city.localUseCases : defaultUseCases

  const defaultFaqs = [
    {
      question: `${city.displayName} me electric cycle ki price kitni hai?`,
      answer: `Eparv electric cycles ${city.displayName} me ₹18,999 (Eparv Savitri) se start hoti hain aur ₹24,999 (Eparv Visakka) tak aati hain. Sabhi models me detachable lithium battery aur factory warranty shamil hai.`,
    },
    {
      question: `Kya ${city.displayName} me electric cycle ke liye license ya RTO registration chahiye?`,
      answer: `Nahi. Indian CMVR guidelines ke mutabiq 250W motor aur 25 km/h speed wali electric cycle ke liye ${city.displayName} me kisi driving license ya RTO number plate ki zaroorat nahi hoti.`,
    },
    {
      question: `How long does delivery take to ${city.displayName}?`,
      answer: `Delivery to ${city.displayName} pin-codes typically takes ${deliveryDays}. Cycles arrive 95% pre-assembled in reinforced cartons with complimentary tools included.`,
    },
    {
      question: `Can I get a doorstep test ride in ${city.displayName}?`,
      answer: `Yes, you can book a free test ride online. Our regional coordinator will arrange a test ride slot at your doorstep or nearest authorized showroom in ${city.displayName}.`,
    },
  ]

  const faqs = city.localFaq.length >= 2 ? city.localFaq : defaultFaqs

  const localBusinessSchema = city.dealers.map((dealer) => ({
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: dealer.businessName,
    url: `${getServerSideURL()}/dealers/${dealer.slug}`,
    telephone: dealer.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dealer.address,
      addressLocality: dealer.city,
      addressRegion: dealer.state,
      postalCode: dealer.pincode,
      addressCountry: 'IN',
    },
    priceRange: '₹18,999 - ₹24,999',
  }))

  const relatedLinks = [
    {
      title: `Electric Cycles in ${stateHub.displayName}`,
      url: `/electric-cycle-in/${stateHub.slug}`,
      category: 'location' as const,
      description: `Explore all cities and dealerships across ${stateHub.displayName}`,
    },
    {
      title: 'Electric Cycle Under ₹20,000',
      url: '/electric-cycle-under-20000',
      category: 'intent' as const,
      description: 'Affordable daily commuter models',
    },
    {
      title: 'Electric Cycle Under ₹25,000',
      url: '/electric-cycle-under-25000',
      category: 'intent' as const,
      description: 'Long range & suspension priority picks',
    },
    {
      title: 'Do Electric Cycles Need a License in India?',
      url: '/posts/electric-cycle-license-rto-rules-india',
      category: 'guide' as const,
      description: 'CMVR rules & legal guidelines',
    },
    ...city.nearby.slice(0, 2).map((nSlug) => ({
      title: `Electric Cycles in ${nSlug.charAt(0).toUpperCase() + nSlug.slice(1)}`,
      url: `/electric-cycle-in/${nSlug}`,
      category: 'location' as const,
      description: `Delivery & test rides in nearby ${nSlug}`,
    })),
  ]

  return (
    <article className="pb-20 pt-16">
      <div className="container max-w-5xl">
        {/* 1. Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electric Cycle in India', href: '/electric-cycle-in' },
            { label: stateHub.displayName, href: `/electric-cycle-in/${stateHub.slug}` },
            { label: city.displayName },
          ]}
        />

        {/* 2. Header */}
        <header className="mb-6 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <MapPin className="size-3.5 text-energy" />
            <span>{city.displayName} ({city.displayNameHi}) • {stateHub.displayName}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Electric Cycle in {city.displayName}: Price, Dealers & Free Test Ride
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Looking for an electric bicycle in {city.displayName}? Explore Eparv’s 250W high-torque
            models starting at ₹18,999. Enjoy 55–110 km range per charge, zero petrol expenses,
            and doorstep delivery across {city.displayName}.
          </p>
        </header>

        {/* 3. Direct Answer Block */}
        <DirectAnswer
          heading={`Eparv in ${city.displayName} at a Glance`}
          text={`In ${city.displayName}, Eparv electric cycles start at ₹18,999 with 55 to 110 km range. Powered by 250W BLDC hub motors and detachable 36V lithium-ion battery packs, our cycles require zero RTO registration or driving license. Confirmed doorstep delivery to ${city.displayName} is ${deliveryDays}.`}
          keyPoints={[
            `Starting Price: ₹18,999 with full warranty`,
            `Delivery to ${city.displayName}: ${deliveryDays}`,
            `Running Cost: ₹0.04 to ₹0.06 per km`,
            `Zero RTO registration / driving license required`,
          ]}
        />

        {/* 4. Verified Dealer or Delivery Assurance Block */}
        <section className="my-10 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                <Store className="size-5 text-primary" />
                <span>Authorized Showrooms & Delivery in {city.displayName}</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {city.dealers.length > 0
                  ? `Verified authorized dealer partners located in ${city.displayName}.`
                  : `Direct factory dispatched delivery with certified video assembly support in ${city.displayName}.`}
              </p>
            </div>

            <Link
              href={`/book-test-ride?city=${encodeURIComponent(city.displayName)}`}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-xs sm:text-sm font-bold text-white hover:bg-primary/90 transition-all shrink-0"
            >
              <Calendar className="size-4" />
              <span>Book Test Ride in {city.displayName}</span>
            </Link>
          </div>

          {city.dealers.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {city.dealers.map((dealer) => (
                <div key={dealer.id} className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
                  <h3 className="font-bold text-base text-foreground">{dealer.businessName}</h3>
                  <p className="text-xs text-muted-foreground">{dealer.address}</p>
                  <div className="text-xs font-semibold text-primary flex items-center gap-2">
                    <PhoneCall className="size-3.5" />
                    <a href={`tel:${dealer.phone}`}>{dealer.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                <Clock className="size-4 text-energy" />
                <h4 className="font-bold text-foreground">Delivery Timeline</h4>
                <p className="text-muted-foreground">{deliveryDays} to any pin-code in {city.displayName}.</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <h4 className="font-bold text-foreground">Pre-Assembled Box</h4>
                <p className="text-muted-foreground">Delivered 95% assembled with complimentary toolset.</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                <ShieldCheck className="size-4 text-primary" />
                <h4 className="font-bold text-foreground">Factory Warranty</h4>
                <p className="text-muted-foreground">Pan-India doorstep parts replacement within 24–48 hrs.</p>
              </div>
            </div>
          )}
        </section>

        {/* 5. Petrol vs Eparv Savings in THIS City */}
        <section className="my-10 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Local Economic Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Petrol Scooter vs Eparv Electric Cycle in {city.displayName}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Based on {city.displayName} petrol rate of ₹{petrolPrice}/L ({petrolDate}) and domestic
              power tariff of ₹{electricityRate}/unit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-500">
                <Fuel className="size-4" />
                <span>110cc Petrol Scooter</span>
              </div>
              <div className="text-2xl font-black text-foreground">₹{petrolCostPerKm} <span className="text-xs font-normal text-muted-foreground">/ km</span></div>
              <p className="text-xs text-muted-foreground">Monthly fuel: ~₹{monthlyPetrolSpend} (at 25 km/day)</p>
            </div>

            <div className="rounded-2xl border-2 border-primary bg-card p-5 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <Zap className="size-4 text-energy" />
                <span>Eparv Electric Cycle</span>
              </div>
              <div className="text-2xl font-black text-primary">₹{eparvCostPerKm} <span className="text-xs font-normal text-muted-foreground">/ km</span></div>
              <p className="text-xs text-muted-foreground">Monthly charging: ~₹{monthlyEparvSpend} (at 25 km/day)</p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <TrendingDown className="size-4" />
                <span>Monthly Net Savings</span>
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{monthlySavings}</div>
              <p className="text-xs text-muted-foreground">Recovers full cycle cost in 5 to 7 months.</p>
            </div>
          </div>
        </section>

        {/* 6. Models Available in This City */}
        <section className="my-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Official Lineup</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Electric Cycle Models Available in {city.displayName}
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
                      alt={model.name}
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
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {model.tagline}
                    </p>
                    <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground border-t border-border/50">
                      <div>PAS Range: <strong className="text-foreground">{model.rangePasKm} km</strong></div>
                      <div>Top Speed: <strong className="text-foreground">{model.topSpeedKmh} km/h</strong></div>
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

        {/* 7. Local Use Cases in THIS City */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Why Commuters in {city.displayName} Choose Eparv
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <div key={i} className="space-y-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-base text-foreground">{uc.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Local FAQ Block with FAQPage JSON-LD */}
        <FaqBlock
          heading={`Frequently Asked Questions in ${city.displayName}`}
          subheading={`Common questions from riders and buyers in ${city.displayName} regarding price, test rides, RTO rules, and charging.`}
          faqs={faqs}
          id="city-faq"
        />

        {/* 9. Contextual Internal Links Graph */}
        <RelatedLinks
          heading={`Explore Nearby Cities & Regional Hubs`}
          subheading={`Fast delivery and service coverage across ${stateHub.displayName} and neighboring cities.`}
          links={relatedLinks}
        />
      </div>

      {/* Local Business JSON-LD schemas for verified dealers */}
      {localBusinessSchema.map((schema, idx) => (
        <JsonLd key={idx} data={schema} />
      ))}
    </article>
  )
}
