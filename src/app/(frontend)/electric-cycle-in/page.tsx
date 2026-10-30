import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  ShieldCheck,
  Store,
  Truck,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DirectAnswer, FaqBlock, RelatedLinks } from '@/components/seo'
import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { CITIES, STATE_HUBS, isCityIndexable, isStateHubIndexable } from '@/data/cities'
import { MODEL_LIST } from '@/data/models'

export const metadata: Metadata = {
  title: 'Electric Cycle in India: State Showrooms, City Prices & Delivery | Eparv',
  description:
    'Find authorized Eparv electric cycle showrooms, city-wise prices, free doorstep test rides, and fast delivery across Delhi-NCR, Uttar Pradesh, Bihar, and Madhya Pradesh.',
  alternates: {
    canonical: `${getServerSideURL()}/electric-cycle-in`,
  },
  openGraph: mergeOpenGraph({
    title: 'Electric Cycle in India: Showrooms, City Prices & Delivery | Eparv',
    description:
      'Explore Eparv electric cycles across major Indian cities with direct-to-consumer pricing, verified dealers, and 3-5 day home delivery.',
    url: `${getServerSideURL()}/electric-cycle-in`,
  }),
}

export default function LocationHubPage() {
  const stateHubsList = Object.values(STATE_HUBS)

  const directAnswerText =
    'Eparv delivers high-performance electric cycles across 25 major cities in Delhi-NCR, Uttar Pradesh, Bihar, and Madhya Pradesh. Starting at ₹18,999, all cycles feature 250W BLDC hub motors, removable lithium batteries, up to 110 km range, and 3–5 day doorstep delivery with 5-year frame warranty.'

  const faqs = [
    {
      question: 'Which states does Eparv currently deliver electric cycles to?',
      answer:
        'Eparv has dedicated distribution networks across Delhi-NCR, Uttar Pradesh, Bihar, and Madhya Pradesh, covering 25 primary urban centers with fast 3–5 day delivery and direct regional customer service.',
    },
    {
      question: 'How do I test ride an Eparv electric cycle in my city?',
      answer:
        'You can book a free test ride online by selecting your nearest city. Our local team will coordinate a test ride slot either at an authorized dealer showroom or directly at your doorstep.',
    },
    {
      question: 'Do I need RTO registration or a license anywhere in India?',
      answer:
        'No. Under Central Motor Vehicles Rules (CMVR), electric cycles with 250W motors and maximum speed capped at 25 km/h do not require driving licenses, RTO registration, or road tax in any Indian state.',
    },
    {
      question: 'How are electric cycles shipped safely to my city?',
      answer:
        'Every Eparv cycle is shipped 95% pre-assembled in reinforced triple-wall export cartons with custom foam inserts. You simply attach the handlebars and pedals using the complimentary multi-tool toolkit included.',
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
        name: 'Electric Cycle in India',
        item: `${getServerSideURL()}/electric-cycle-in`,
      },
    ],
  }

  const relatedLinks = [
    {
      title: 'Official Electric Cycle Lineup',
      url: '/electric-cycles',
      category: 'model' as const,
      description: 'Explore all 5 models with full technical specifications and comparison',
    },
    {
      title: 'Electric Cycle Under ₹20,000',
      url: '/electric-cycle-under-20000',
      category: 'intent' as const,
      description: 'Best budget-friendly electric cycles for everyday urban commuting',
    },
    {
      title: 'Electric Cycle Under ₹25,000',
      url: '/electric-cycle-under-25000',
      category: 'intent' as const,
      description: 'High-torque trail MTBs and 110 km long-distance electric cycles',
    },
    {
      title: 'Book a Free Test Ride',
      url: '/book-test-ride',
      category: 'intent' as const,
      description: 'Experience instant electric torque in your city with no obligation',
    },
  ]

  return (
    <article className="pb-20 pt-16">
      <div className="container max-w-5xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electric Cycle in India' },
          ]}
        />

        {/* Hero Header */}
        <header className="mb-6 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <MapPin className="size-3.5 text-energy" />
            <span>Pan-India Coverage • 4 State Hubs • 25 Cities</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Electric Cycle in India: State Showrooms, City Prices & Delivery
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Choose your state or city to see local on-road pricing, calculate petrol vs EV savings, book free test rides, and view nearest authorized dealers.
          </p>
        </header>

        {/* Direct Answer Block */}
        <DirectAnswer text={directAnswerText} className="my-8" />

        {/* State Hubs Grid */}
        <section className="my-12 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Regional Hubs</div>
              <h2 className="text-2xl font-bold text-foreground">
                State Distribution & Dealer Hubs
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {stateHubsList.map((hub) => {
              const cities = hub.cities.map((c) => CITIES[c]).filter(Boolean)
              return (
                <div
                  key={hub.slug}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        <Building2 className="size-3.5" /> {hub.displayName}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold">
                        {cities.length} Cities
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground">
                      Electric Cycles in {hub.displayName}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Complete delivery coverage across {cities.map((c) => c.displayName).slice(0, 4).join(', ')} and surrounding regions.
                    </p>

                    {/* City Links in Hub */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/electric-cycle-in/${city.slug}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                          <MapPin className="size-3 text-primary" />
                          <span>{city.displayName}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Doorstep Delivery 3–5 Days</span>
                    <Link
                      href={`/electric-cycle-in/${hub.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      Explore State Hub <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 25 Cities Alphabetical Index */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">City Directory</div>
            <h2 className="text-2xl font-bold text-foreground">
              All 25 Serviceable Cities
            </h2>
            <p className="text-xs text-muted-foreground">
              Direct delivery, local support, and verified petrol vs EV calculations for every major city
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.values(CITIES).map((city) => (
              <Link
                key={city.slug}
                href={`/electric-cycle-in/${city.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border/80 bg-background/60 p-3 hover:border-primary hover:bg-card transition-all"
              >
                <div>
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {city.displayName}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{city.displayNameHi}</div>
                </div>
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <FaqBlock
          heading="Frequently Asked Questions About Pan-India Availability"
          subheading="Answers regarding delivery, state road transport regulations, warranty claims, and showroom visits."
          faqs={faqs}
          id="pan-india-faq"
        />

        {/* Related Links */}
        <RelatedLinks
          heading="Find By Price, Purpose or Model"
          subheading="Browse specialized electric cycles curated for budget, delivery riders, or students."
          links={relatedLinks}
        />
      </div>

      <JsonLd data={breadcrumbsSchema} />
    </article>
  )
}
