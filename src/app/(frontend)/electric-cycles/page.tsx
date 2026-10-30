import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Compass,
  Gauge,
  HelpCircle,
  MapPin,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CycleLineup } from '@/components/home/CycleLineup'
import { TrustBadges } from '@/components/home/TrustBadges'
import { TestRideBanner } from '@/components/home/TestRideBanner'
import { FaqBlock, RelatedLinks } from '@/components/seo'
import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { EPARV_MODELS, MODEL_LIST } from '@/data/models'
import { STATE_HUBS } from '@/data/cities'
import { INTENT_HUBS } from '@/data/intents'

type Args = {
  searchParams: Promise<{
    category?: string
    page?: string
  }>
}

export default async function CataloguePage({ searchParams }: Args) {
  const { category } = await searchParams

  const mappedCategory =
    category === 'off-road'
      ? 'trail'
      : category === 'city-commuter'
      ? 'city-commute'
      : category === 'cargo'
      ? 'city-commute'
      : 'all'

  const models = Object.values(EPARV_MODELS)
  const stateHubsList = Object.values(STATE_HUBS)
  const intentHubsList = Object.values(INTENT_HUBS)

  const faqs = [
    {
      question: 'What is the price range of Eparv electric cycles in India?',
      answer:
        'Eparv electric cycles start at ₹18,999 for the Eparv Savitri commuter and range up to ₹24,999 for the Eparv Visakka trail MTB. All models include GST, battery charger, factory warranty, and complimentary home delivery.',
    },
    {
      question: 'Do I need a driving license or RTO registration to ride an Eparv electric cycle?',
      answer:
        'No. Under Central Motor Vehicles Rules (CMVR), electric cycles with 250W motors and maximum speed capped at 25 km/h are classified as non-motorized bicycles. They require zero driving license, road tax, or RTO registration.',
    },
    {
      question: 'What is the real-world battery range on a single charge?',
      answer:
        'Eparv cycles deliver between 55 km and 110 km per charge on Pedal Assist (PAS), and 40 km to 75 km on Pure Throttle mode, depending on the model, rider weight, and route elevation.',
    },
    {
      question: 'How long does it take to charge the battery and what does it cost?',
      answer:
        'Our smart BMS lithium-ion batteries recharge fully in 2 to 3 hours using any standard 5A household wall socket. A full charge consumes approximately 0.28 to 0.40 units of electricity, costing less than ₹2.50 per charge.',
    },
    {
      question: 'Can the battery be removed for charging in an apartment?',
      answer:
        'Yes. Every Eparv model features a key-secured detachable lithium-ion battery. You simply unlock it, carry it indoors, and charge it on your desk or room socket just like a laptop.',
    },
    {
      question: 'Are Eparv electric cycles safe to ride in Indian monsoons and rain?',
      answer:
        'Yes. All core electrical components, including the 250W BLDC hub motor, sealed controller, and battery casing, are engineered for rain and splash protection. High-water wading where the motor hub is submerged should be avoided.',
    },
    {
      question: 'What warranty is offered on Eparv electric cycles?',
      answer:
        'Eparv provides a 5-year warranty on the frame chassis, 24-month warranty on the 250W BLDC hub motor, and 12-month replacement warranty on the lithium battery pack.',
    },
    {
      question: 'How does doorstep delivery and assembly work?',
      answer:
        'Cycles arrive 95% pre-assembled in reinforced export cartons. You only need to attach the handlebars and pedals using the complimentary multi-tool toolkit included. Full video instructions and telephone assistance are provided.',
    },
  ]

  const breadcrumbsSchema = {
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
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Eparv Electric Cycles Lineup & Price List',
    description:
      'Official lineup of 250W BLDC electric cycles with removable lithium batteries and 55-110 km range.',
    numberOfItems: models.length,
    itemListElement: models.map((model, index) => ({
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

  return (
    <article className="pb-16">
      {/* Top Breadcrumb Bar */}
      <div className="bg-muted/30 border-b border-border/40 py-3">
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Electric Cycles' }]}
          />
        </div>
      </div>

      {/* Editorial Header Section */}
      <section className="container pt-10 pb-6 max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
          <Sparkles className="size-3.5 text-energy" />
          <span>Official 2026 Product Hub • 5 Verified Models</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Eparv Electric Cycles: Price List & Comparison
        </h1>

        <div className="mt-4 text-base text-muted-foreground leading-relaxed sm:text-lg space-y-3">
          <p>
            Welcome to the official 2026 Eparv electric cycle lineup. Engineered specifically for Indian urban traffic, daily office commutes, and weekend trail exploration, every Eparv e-cycle combines a high-torque 250W brushless DC (BLDC) hub motor with a key-detachable smart BMS lithium-ion battery pack.
          </p>
          <p>
            With running costs under ₹0.05 per kilometer, our cycles deliver between 55 km and 110 km of real-world pedal assist range on a single 3-hour charge from any standard domestic wall socket. Compliant with Central Motor Vehicles Rules (CMVR), all models require zero driving license, road tax, or RTO registration. Explore our five models below or compare technical specifications side by side.
          </p>
        </div>
      </section>

      {/* Main Unified Electric Cycle Lineup */}
      <CycleLineup
        id="electric-cycle-catalogue"
        badgeText="Official 2026 Eparv Lineup"
        title="Explore All Electric Cycles"
        subtitle="Choose the model that matches your commute distance, riding posture, and terrain preference."
        initialFilter={mappedCategory as any}
      />

      {/* Real Full 5-Model Comparison Table */}
      <section className="container my-16 max-w-6xl">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <TableProperties className="size-4" /> Technical Comparison
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Side-by-Side Model Specifications
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              All specs verified under standard rider benchmark (70 kg rider, flat paved road)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-foreground">
                  <th className="py-3 px-4 font-bold">Specification</th>
                  {models.map((m) => (
                    <th key={m.cleanSlug} className="py-3 px-4 font-bold text-center">
                      <Link
                        href={`/electric-cycles/${m.cleanSlug}`}
                        className="text-primary hover:underline"
                      >
                        {m.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">Selling Price</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center font-bold text-foreground">
                      ₹{m.priceSelling?.toLocaleString('en-IN') ?? 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">Motor Power</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center text-muted-foreground">
                      {m.motorPowerW}W BLDC
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">Battery Capacity</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center text-muted-foreground">
                      {m.batteryVoltageV}V, {m.batteryCapacityAh}Ah ({m.batteryCapacityWh} Wh)
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">PAS Range</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                      Up to {m.rangePasKm} km
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">Pure Throttle Range</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center text-muted-foreground">
                      Up to {m.rangeThrottleKm} km
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">Kerb Weight</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center text-muted-foreground">
                      {m.weightKg} kg
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">Max Payload</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center text-muted-foreground">
                      {m.payloadKg} kg
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">Suspension / Fork</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center text-muted-foreground">
                      {m.fork ?? 'Rigid Aerodynamic Alloy'}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">Best For</td>
                  {models.map((m) => (
                    <td key={m.cleanSlug} className="py-3 px-4 text-center text-xs text-muted-foreground">
                      {m.positioning === 'commuter'
                        ? 'Urban Office Commute'
                        : m.positioning === 'trail-mtb'
                        ? 'Off-Road & Rough Trails'
                        : m.positioning === 'cruiser'
                        ? 'Long-Distance Touring'
                        : m.positioning === 'roadster'
                        ? 'Upright Heavy Utility'
                        : 'Everyday Versatility'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* "Find Your Cycle" Block linking 5 Intent Hubs */}
      <section className="container my-14 max-w-6xl">
        <div className="space-y-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">Buyer Intent</div>
            <h2 className="text-2xl font-bold text-foreground">
              Find Your Electric Cycle by Need & Budget
            </h2>
            <p className="text-xs text-muted-foreground">
              Specialized buyer guides curated for price points, commercial delivery, and rider ergonomics
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {intentHubsList.map((intent) => (
              <Link
                key={intent.slug}
                href={intent.url}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">Buyer Guide</div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {intent.h1}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {intent.directAnswer}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-primary font-bold">
                  <span>Explore Guide</span>
                  <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* "Where We Deliver" Block linking 4 State Hubs */}
      <section className="container my-14 max-w-6xl">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Doorstep Coverage</div>
              <h2 className="text-2xl font-bold text-foreground">
                Where We Deliver Across India
              </h2>
            </div>
            <Link
              href="/electric-cycle-in"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              View All 25 Cities <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stateHubsList.map((hub) => (
              <Link
                key={hub.slug}
                href={`/electric-cycle-in/${hub.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-border bg-background p-4 hover:border-primary transition-all"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
                    <MapPin className="size-3 text-energy" />
                    <span>{hub.cities.length} Cities</span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {hub.displayName}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Direct showrooms, door-to-door shipping & test rides
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-bold text-primary flex items-center gap-1">
                  <span>View State Hub</span>
                  <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <TrustBadges />

      {/* Comprehensive FAQ Section */}
      <section className="container my-14 max-w-4xl">
        <FaqBlock
          heading="Frequently Asked Questions About Eparv Electric Cycles"
          subheading="Everything you need to know about charging, legal rules, battery maintenance, and warranty."
          faqs={faqs}
          id="product-hub-faq"
        />
      </section>

      {/* Test Ride & Dealer Locator Banner */}
      <TestRideBanner />

      <JsonLd data={breadcrumbsSchema} />
      <JsonLd data={itemListSchema} />
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Eparv Electric Cycles: Price List & Comparison | Official Store',
  description:
    'Compare all 5 Eparv electric cycles — Panther, Visakka, Lahari, Savitri, and Satya. Starting at ₹18,999 with 250W motors, smart BMS lithium batteries, up to 110 km range, and zero RTO license needed.',
  alternates: {
    canonical: `${getServerSideURL()}/electric-cycles`,
  },
  openGraph: mergeOpenGraph({
    title: 'Eparv Electric Cycles: Price List & Comparison',
    description:
      'Compare prices, motor torque, battery watt-hours, and real-world range across the official Eparv electric bicycle lineup.',
    url: `${getServerSideURL()}/electric-cycles`,
  }),
}
