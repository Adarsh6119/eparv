import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Battery,
  Calculator,
  CheckCircle2,
  Compass,
  Gauge,
  HelpCircle,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DirectAnswer, FaqBlock, RelatedLinks, SpecTable } from '@/components/seo'
import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'
import { MODEL_LIST, type EparvModel } from '@/data/models'
import type { IntentHubData } from '@/data/intents'

interface IntentHubViewProps {
  intent: IntentHubData
}

export const IntentHubView: React.FC<IntentHubViewProps> = ({ intent }) => {
  // Dynamically filter or prioritize models based on intent slug
  let filteredModels: EparvModel[] = []

  if (intent.slug === 'electric-cycle-under-20000') {
    filteredModels = MODEL_LIST.filter((m) => m.priceSelling !== null && m.priceSelling <= 20000)
  } else if (intent.slug === 'electric-cycle-under-25000') {
    filteredModels = MODEL_LIST.filter((m) => m.priceSelling !== null && m.priceSelling <= 25000)
  } else if (intent.slug === 'electric-cycle-for-delivery') {
    // Prioritize high payload, long range, or carrier models
    filteredModels = [
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-lahari')!,
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-savitri')!,
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-satya')!,
    ].filter(Boolean)
  } else if (intent.slug === 'electric-cycle-for-students') {
    filteredModels = [
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-panther')!,
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-savitri')!,
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-visakka')!,
    ].filter(Boolean)
  } else if (intent.slug === 'electric-cycle-for-senior-citizens') {
    filteredModels = [
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-savitri')!,
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-panther')!,
      MODEL_LIST.find((m) => m.cleanSlug === 'eparv-lahari')!,
    ].filter(Boolean)
  } else {
    filteredModels = MODEL_LIST
  }

  // Schema: BreadcrumbList & ItemList of Products
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getServerSideURL(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Electric Cycles',
        item: `${getServerSideURL()}/electric-cycles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: intent.h1,
        item: `${getServerSideURL()}${intent.url}`,
      },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: intent.h1,
    description: intent.directAnswer,
    numberOfItems: filteredModels.length,
    itemListElement: filteredModels.map((model, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: model.name,
        url: `${getServerSideURL()}/electric-cycles/${model.cleanSlug}`,
        description: model.tagline,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: model.priceSelling ?? 19999,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  }

  const relatedLinks = [
    {
      title: 'Compare All Electric Cycles',
      url: '/electric-cycles',
      category: 'model' as const,
      description: 'Side-by-side technical specs of all 5 Eparv models',
    },
    {
      title: 'Electric Cycle Running Cost Calculator',
      url: '/posts/electric-cycle-running-cost-calculator',
      category: 'guide' as const,
      description: 'Calculate your exact daily electricity vs petrol expenses',
    },
    {
      title: 'Electric Cycles in Delhi-NCR',
      url: '/electric-cycle-in/delhi-ncr',
      category: 'location' as const,
      description: 'Showrooms and same-week delivery across Delhi-NCR',
    },
    {
      title: 'Electric Cycles in Uttar Pradesh',
      url: '/electric-cycle-in/uttar-pradesh',
      category: 'location' as const,
      description: 'Lucknow, Kanpur, Varanasi and UP city coverage',
    },
    {
      title: 'Book a Free Doorstep Test Ride',
      url: '/book-test-ride',
      category: 'intent' as const,
      description: 'Try the cycle in your own neighborhood with no commitment',
    },
  ]

  return (
    <article className="pb-20 pt-16">
      <div className="container max-w-5xl">
        {/* Breadcrumb Bar */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electric Cycles', href: '/electric-cycles' },
            { label: intent.h1 },
          ]}
        />

        {/* Header */}
        <header className="mb-6 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-energy" />
            <span>Target Buyer Guide • Verified 2026 Models</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {intent.h1}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Compare specs, calculate real running costs, and explore the best verified models engineered for this category.
          </p>
        </header>

        {/* Direct Answer Block */}
        <DirectAnswer text={intent.directAnswer} className="my-8" />

        {/* Filtered Models Lineup */}
        <section className="my-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Verified Match ({filteredModels.length} Models)
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Recommended Electric Cycles
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Direct factory warranty • Free shipping across 25 target cities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <div
                key={model.slug}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      {model.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3" /> In Stock
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {model.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {model.tagline}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-muted/60 p-2.5">
                      <div className="text-[10px] text-muted-foreground">PAS Range</div>
                      <div className="font-bold text-foreground">{model.rangePasKm} km</div>
                    </div>
                    <div className="rounded-xl bg-muted/60 p-2.5">
                      <div className="text-[10px] text-muted-foreground">Throttle Range</div>
                      <div className="font-bold text-foreground">{model.rangeThrottleKm} km</div>
                    </div>
                    <div className="rounded-xl bg-muted/60 p-2.5">
                      <div className="text-[10px] text-muted-foreground">Motor Power</div>
                      <div className="font-bold text-foreground">{model.motorPowerW}W BLDC</div>
                    </div>
                    <div className="rounded-xl bg-muted/60 p-2.5">
                      <div className="text-[10px] text-muted-foreground">Battery Pack</div>
                      <div className="font-bold text-foreground">
                        {model.batteryCapacityWh ? `${model.batteryCapacityWh} Wh` : `${model.batteryVoltageV}V ${model.batteryCapacityAh}Ah`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-muted-foreground">Direct Selling Price</div>
                    <div className="text-lg font-extrabold text-foreground">
                      ₹{model.priceSelling?.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <Link
                    href={`/electric-cycles/${model.cleanSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Choose / Persona Criteria */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">Buyer Checklist</div>
            <h2 className="text-2xl font-bold text-foreground">
              What to Look For Before Buying
            </h2>
            <p className="text-xs text-muted-foreground">
              Key engineering features that make a real difference in daily ownership
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {intent.personaCriteria.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-base text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Persona Savings Maths */}
        <section className="my-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background p-6 sm:p-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Calculator className="size-3.5" />
            <span>Economic Breakdown</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground">
            {intent.personaMaths.heading}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground font-semibold">Running Cost Formula</div>
                <div className="mt-1 font-mono text-sm text-foreground font-bold">
                  {intent.personaMaths.formula}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground font-semibold">Real Daily Scenario</div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {intent.personaMaths.example}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Estimated Monthly Savings
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground">
                {intent.personaMaths.monthlySavings}
              </div>
              <p className="text-xs text-muted-foreground">
                Compared against petrol scooter fuel, metro tickets, or regular autos.
              </p>
            </div>
          </div>
        </section>

        {/* Intent FAQ Block */}
        <FaqBlock
          heading={`Frequently Asked Questions: ${intent.h1}`}
          subheading="Direct, transparent answers regarding specs, legal rules, battery life, and warranty."
          faqs={intent.faqs}
          id="intent-faq"
        />

        {/* Contextual Links */}
        <RelatedLinks
          heading="Explore Related Guides & Cities"
          subheading="Check delivery coverage or dive deeper into electric cycle specifications."
          links={relatedLinks}
        />
      </div>

      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
    </article>
  )
}
