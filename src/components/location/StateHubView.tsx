import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Battery,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Gauge,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DirectAnswer, FaqBlock, RelatedLinks } from '@/components/seo'
import { getServerSideURL } from '@/utilities/getURL'
import { MODEL_LIST } from '@/data/models'
import { CITIES, STATE_HUBS, type StateHub, type City } from '@/data/cities'

interface StateHubViewProps {
  hub: StateHub
}

export const StateHubView: React.FC<StateHubViewProps> = ({ hub }) => {
  const hubCities = hub.cities.map((citySlug: string) => CITIES[citySlug]).filter(Boolean)
  const otherHubs = Object.values(STATE_HUBS).filter((h) => h.slug !== hub.slug)

  const directAnswerText = `Eparv electric cycles are available across ${hub.displayName} with factory-direct pricing from ₹18,999 to ₹24,999. Commuters enjoy 55–110 km range, 250W BLDC hub motors, and removable smart BMS lithium batteries with guaranteed 3–5 day delivery and authorized dealer network in ${hubCities.map((c: City) => c.displayName).slice(0, 4).join(', ')}.`

  const faqs = [
    {
      question: `What is the price of electric cycles in ${hub.displayName}?`,
      answer: `In ${hub.displayName}, Eparv electric cycles are priced from ₹18,999 for the Eparv Savitri commuter up to ₹24,999 for the Eparv Visakka trail MTB. All models include GST, battery charger, and factory warranty.`,
    },
    {
      question: `Is driving license or RTO registration needed for electric cycles in ${hub.displayName}?`,
      answer: `No. Under CMVR (Central Motor Vehicles Rules), electric cycles equipped with 250W motors and speed capped at 25 km/h are exempted from RTO registration, road tax, and driving license requirements across all districts of ${hub.displayName}.`,
    },
    {
      question: `How are electric cycles delivered to cities in ${hub.displayName}?`,
      answer: `Cycles are shipped 95% pre-assembled in heavy-duty triple-wall corrugated cartons directly to your doorstep in ${hub.displayName} within 3 to 5 business days. Quick assembly tools and an instruction guide are included.`,
    },
    {
      question: `What warranty coverage is provided in ${hub.displayName}?`,
      answer: `Eparv provides a 5-year frame warranty, 24-month motor warranty, and 12-month battery warranty backed by direct replacement support and authorized service centres across ${hub.displayName}.`,
    },
    {
      question: `Can I charge an Eparv cycle at home or office in ${hub.displayName}?`,
      answer: `Yes. All Eparv electric cycles feature a quick-release detachable lithium-ion battery. You can unlock the pack with your key and plug it into any standard 5A domestic 220V wall socket anywhere. Full charge takes just 2 to 3 hours.`,
    },
  ]

  const relatedLinks = [
    {
      title: 'Electric Cycle Under ₹20,000',
      url: '/electric-cycle-under-20000',
      category: 'intent' as const,
      description: 'Affordable college & daily commuting models',
    },
    {
      title: 'Electric Cycle Under ₹25,000',
      url: '/electric-cycle-under-25000',
      category: 'intent' as const,
      description: 'Front suspension and 110 km long-range electric cycles',
    },
    {
      title: 'Electric Cycle for Delivery Riders',
      url: '/electric-cycle-for-delivery',
      category: 'intent' as const,
      description: 'Heavy payload carriers saving ₹3,000+ monthly on petrol',
    },
    {
      title: 'Electric Cycle Laws & RTO Rules in India',
      url: '/posts/electric-cycle-license-rto-rules-india',
      category: 'guide' as const,
      description: 'Legal guidelines and 250W CMVR vehicle exemptions',
    },
    ...otherHubs.map((other) => ({
      title: `Electric Cycles in ${other.displayName}`,
      url: `/electric-cycle-in/${other.slug}`,
      category: 'location' as const,
      description: `State dealerships and city delivery in ${other.displayName}`,
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
            { label: hub.displayName },
          ]}
        />

        {/* 2. Header */}
        <header className="mb-6 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Building2 className="size-3.5 text-energy" />
            <span>State Distribution Hub • {hub.cities.length} Major Cities</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Electric Cycle in {hub.displayName}: Prices, Cities & Showrooms
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Complete buyer guide to Eparv electric cycles across {hub.displayName}. Explore city delivery times, verified dealer outlets, and verified local pricing.
          </p>
        </header>

        {/* 3. Direct Answer Block */}
        <DirectAnswer text={directAnswerText} className="my-8" />

        {/* 4. Cities in this State Hub Grid */}
        <section className="my-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Service Coverage</div>
              <h2 className="text-2xl font-bold text-foreground">
                Cities We Serve in {hub.displayName}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Select your city for verified local petrol vs EV savings and showroom addresses
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hubCities.map((city: City) => (
              <Link
                key={city.slug}
                href={`/electric-cycle-in/${city.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {city.displayNameHi}
                    </span>
                    {city.dealers.length > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <Store className="size-3" /> Showroom Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                        <Clock className="size-3" /> Doorstep Delivery
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {city.displayName}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {city.dealers.length > 0
                      ? `${city.dealers[0].businessName} • Test ride available`
                      : `Standard delivery: ${city.deliveryTimeDays ?? '3 to 5 business days'}`}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">
                    From ₹18,999
                  </span>
                  <span className="inline-flex items-center gap-1 text-primary font-bold group-hover:translate-x-1 transition-transform">
                    View City Guide <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. 5 Models Overview */}
        <section className="my-14 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">Product Lineup</div>
            <h2 className="text-2xl font-bold text-foreground">
              Available Eparv Models in {hub.displayName}
            </h2>
            <p className="text-xs text-muted-foreground">
              All models are dispatched with free assembly tools and complete documentation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODEL_LIST.map((model) => (
              <div
                key={model.slug}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      {model.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      In Stock
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{model.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{model.tagline}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="rounded-lg bg-muted/50 p-2">
                      <div className="text-[10px] text-muted-foreground">Range (PAS)</div>
                      <div className="font-bold text-foreground">{model.rangePasKm} km</div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <div className="text-[10px] text-muted-foreground">Motor</div>
                      <div className="font-bold text-foreground">{model.motorPowerW}W BLDC</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Starting from</div>
                    <div className="text-base font-extrabold text-foreground">
                      ₹{model.priceSelling?.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <Link
                    href={`/electric-cycles/${model.cleanSlug}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    View Model
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ */}
        <FaqBlock
          heading={`Frequently Asked Questions: ${hub.displayName}`}
          subheading={`Essential answers regarding pricing, delivery timelines, and warranty for riders across ${hub.displayName}.`}
          faqs={faqs}
          id="state-faq"
        />

        {/* 7. Related Links */}
        <RelatedLinks
          heading="Other Regions & Intent Hubs"
          subheading="Compare models by budget or browse other states across India."
          links={relatedLinks}
        />
      </div>
    </article>
  )
}
