import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import {
  ArrowRight,
  Battery,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Gauge,
  HelpCircle,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TableProperties,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { LeadForm } from '@/components/LeadForm'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { DirectAnswer, FaqBlock, RelatedLinks, SpecTable } from '@/components/seo'
import type { Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import {
  EPARV_MODELS,
  MODEL_LIST,
  getModelBySlug,
  type EparvModel,
} from '@/data/models'
import { MODEL_LINK_GRAPH, getRelatedLinksForModel } from '@/data/linkGraph'

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const officialSlugs = [
    'eparv-panther',
    'eparv-visakka',
    'eparv-lahari',
    'eparv-savitri',
    'eparv-satya',
  ]

  try {
    const payload = await getPayload({ config: configPromise })
    const products = await payload.find({
      collection: 'products',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
    })

    const dbSlugs =
      products?.docs
        ?.map(({ slug }) => slug)
        .filter((s): s is string => Boolean(s) && !s.endsWith('-electric-bike') && s !== 'smoke-test-cycle') ?? []
    const allSlugs = Array.from(new Set([...officialSlugs, ...dbSlugs]))
    return allSlugs.map((slug) => ({ slug }))
  } catch (e) {
    return officialSlugs.map((slug) => ({ slug }))
  }
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const typedModel = getModelBySlug(decodedSlug)
  const base = getServerSideURL()

  if (typedModel) {
    const canonical = `${base}/electric-cycles/${typedModel.cleanSlug}`
    const title = `${typedModel.name} Electric Cycle: Price, Specs & Range | Eparv`
    const description = `Buy ${typedModel.name} Electric Cycle in India. Starting at ₹${typedModel.priceSelling?.toLocaleString('en-IN')}. ${typedModel.motorPowerW}W BLDC motor, ${typedModel.rangePasKm} km range, detachable lithium battery, and 5-year frame warranty.`

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: mergeOpenGraph({
        title,
        description,
        url: canonical,
        images: [{ url: `${base}${typedModel.image}` }],
      }),
    }
  }

  // Fallback to Payload Product
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'products',
      limit: 1,
      where: { slug: { equals: decodedSlug } },
    })
    const doc = result.docs?.[0]
    if (doc) {
      const title = doc.meta?.title ? `${doc.meta.title} | Eparv` : `${doc.name} | Eparv`
      const description = doc.meta?.description ?? doc.shortDescription ?? undefined
      return {
        title,
        description,
        alternates: {
          canonical: `${base}/electric-cycles/${doc.slug}`,
        },
      }
    }
  } catch (e) {
    // ignore
  }

  return { title: 'Electric Cycle Not Found | Eparv' }
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const typedModel = getModelBySlug(decodedSlug)
  const url = `/electric-cycles/${decodedSlug}`

  // If matched to official typed model, render the authoritative 10-section layout
  if (typedModel) {
    const directAnswer = `${typedModel.name} Electric Cycle is priced at ₹${typedModel.priceSelling?.toLocaleString('en-IN')} (MRP ₹${typedModel.priceMrp?.toLocaleString('en-IN')}), featuring a ${typedModel.motorPowerW}W BLDC hub motor and a ${typedModel.batteryVoltageV}V ${typedModel.batteryCapacityAh}Ah (${typedModel.batteryCapacityWh} Wh) detachable lithium battery. It delivers up to ${typedModel.rangePasKm} km in pedal assist and ${typedModel.rangeThrottleKm} km on throttle, engineered for ${typedModel.tagline.toLowerCase()}.`

    // Running cost calculations
    // Battery Wh to kWh
    const batteryKwh = (typedModel.batteryCapacityWh ?? 360) / 1000
    const electricityRate = 7.0 // ₹7.00 per unit benchmark
    const costPerFullCharge = (batteryKwh * electricityRate).toFixed(2)
    const pasRange = typedModel.rangePasKm ?? 55
    const costPerKm = (Number(costPerFullCharge) / pasRange).toFixed(2)
    const dailyCommuteKm = 25
    const monthlyCostEparv = (Number(costPerKm) * dailyCommuteKm * 30).toFixed(0)
    // Petrol scooter benchmark: 45 km/L @ 106.5 = ~2.37/km
    const monthlyCostPetrol = ((106.5 / 45) * dailyCommuteKm * 30).toFixed(0)
    const monthlySavings = (Number(monthlyCostPetrol) - Number(monthlyCostEparv)).toLocaleString('en-IN')

    // Sibling models for comparison
    const siblingSlugs = MODEL_LINK_GRAPH[typedModel.id]?.siblings ?? []
    const siblingModels = siblingSlugs.map((s) => EPARV_MODELS[s]).filter(Boolean)

    // FAQs for model
    const faqs = [
      {
        question: `What is the real-world range of ${typedModel.name}?`,
        answer: `${typedModel.name} delivers up to ${typedModel.rangePasKm} km per charge on Pedal Assist (PAS) and up to ${typedModel.rangeThrottleKm} km on Pure Throttle mode. Real range may vary slightly depending on rider payload, tyre pressure, and road slope (${typedModel.rangeTestNote}).`,
      },
      {
        question: `How do I charge the battery of ${typedModel.name}?`,
        answer: `The ${typedModel.batteryVoltageV}V ${typedModel.batteryCapacityAh}Ah lithium-ion battery pack is key-secured and fully detachable. You can remove it and plug it into any standard 5A household 220V wall socket. A full recharge takes just ${typedModel.chargeTimeHours} hours.`,
      },
      {
        question: `What is the maximum rider weight or payload capacity?`,
        answer: `${typedModel.name} is engineered with a reinforced high-tensile frame designed to safely support a maximum payload of ${typedModel.payloadKg} kg.`,
      },
      {
        question: `Can I ride ${typedModel.name} in the rain and waterlogged roads?`,
        answer: `Yes. All core electronic components, including the ${typedModel.motorPowerW}W BLDC hub motor, battery casing, and wiring harness, are water-resistant for heavy monsoon riding. Avoid submerging the motor hub in standing deep flood waters.`,
      },
      {
        question: `What is the warranty coverage for ${typedModel.name}?`,
        answer: `Eparv provides a ${typedModel.warrantyFrameMonths}-month (5-year) frame warranty, a ${typedModel.warrantyMotorMonths}-month (2-year) motor warranty, and a ${typedModel.warrantyBatteryMonths}-month (1-year) replacement warranty on the lithium battery pack.`,
      },
      {
        question: `Can I get a doorstep test ride of ${typedModel.name}?`,
        answer: `Yes, you can schedule a free doorstep test ride. Our regional coordinator will arrange a test ride slot at your doorstep or nearest authorized showroom in your city.`,
      },
    ]

    const relatedLinks = getRelatedLinksForModel(typedModel.id)

    // Schemas
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${typedModel.name} Electric Cycle`,
      image: `${getServerSideURL()}${typedModel.image}`,
      description: typedModel.shortDescription,
      brand: {
        '@type': 'Brand',
        name: 'Eparv',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: typedModel.priceSelling,
        availability: 'https://schema.org/InStock',
        url: `${getServerSideURL()}/electric-cycles/${typedModel.cleanSlug}`,
        priceValidUntil: '2026-12-31',
      },
    }

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
        {
          '@type': 'ListItem',
          position: 3,
          name: typedModel.name,
          item: `${getServerSideURL()}/electric-cycles/${typedModel.cleanSlug}`,
        },
      ],
    }

    return (
      <article className="pb-24 pt-16">
        <PayloadRedirects disableNotFound url={url} />

        <div className="container max-w-5xl">
          {/* 1. Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Electric Cycles', href: '/electric-cycles' },
              { label: typedModel.name },
            ]}
          />

          {/* 2. Model Header & Gallery Grid */}
          <div className="grid gap-10 lg:grid-cols-2 my-8">
            {/* Image Showcase */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-muted flex items-center justify-center p-4">
                <img
                  src={typedModel.image}
                  alt={`${typedModel.name} Electric Cycle`}
                  className="w-full h-full object-contain max-h-[380px] drop-shadow-lg transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary">
                  {typedModel.badge}
                </span>
              </div>
            </div>

            {/* Title, Pricing & Highlights */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    In Stock & Ready to Ship
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {typedModel.category}
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {typedModel.name} Electric Cycle
                </h1>
                <p className="mt-1 text-base text-muted-foreground">{typedModel.tagline}</p>

                {/* Price Block */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-foreground">
                    ₹{typedModel.priceSelling?.toLocaleString('en-IN')}
                  </span>
                  {typedModel.priceMrp && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{typedModel.priceMrp.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Save ₹{((typedModel.priceMrp ?? 0) - (typedModel.priceSelling ?? 0)).toLocaleString('en-IN')}
                  </span>
                </div>

                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  {typedModel.shortDescription}
                </p>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 gap-2 mt-5 text-xs">
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-[10px] text-muted-foreground font-semibold">PAS Range</div>
                    <div className="font-bold text-foreground">{typedModel.rangePasKm} km per charge</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-[10px] text-muted-foreground font-semibold">Throttle Range</div>
                    <div className="font-bold text-foreground">{typedModel.rangeThrottleKm} km per charge</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-[10px] text-muted-foreground font-semibold">Motor Power</div>
                    <div className="font-bold text-foreground">{typedModel.motorPowerW}W BLDC Hub</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-[10px] text-muted-foreground font-semibold">Charging Time</div>
                    <div className="font-bold text-foreground">{typedModel.chargeTimeHours} Hours (5A Socket)</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="#enquire"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Enquire Now
                </a>
                <Link
                  href={`/book-test-ride?model=${typedModel.cleanSlug}`}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-input bg-background px-8 text-sm font-bold text-foreground hover:bg-accent transition-colors"
                >
                  Book a Free Test Ride
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Direct Answer Block */}
          <DirectAnswer text={directAnswer} className="my-10" />

          {/* 4. Complete Technical Spec Table */}
          <section className="my-14 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Technical Specs</div>
              <h2 className="text-2xl font-bold text-foreground">
                {typedModel.name} Specifications
              </h2>
            </div>
            <SpecTable model={typedModel} />
          </section>

          {/* 5. Who Should Buy / Who Should Not Buy */}
          <section className="my-14 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Is the {typedModel.name} Right For You?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Who Should Buy */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                  <ThumbsUp className="size-4" />
                  <span>Who Should Buy This Cycle</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {typedModel.whoShouldBuy.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Should Not Buy */}
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-400 text-sm">
                  <ThumbsDown className="size-4" />
                  <span>Who Should Consider Other Models</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {typedModel.whoShouldNotBuy.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ShieldAlert className="size-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Running Cost Block */}
          <section className="my-14 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background p-6 sm:p-8 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Calculator className="size-3.5" />
              <span>Electricity vs Petrol Maths</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Running Cost: Less Than ₹{costPerKm} Per Kilometer
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Formula: Battery ({typedModel.batteryCapacityWh} Wh = {batteryKwh.toFixed(3)} kWh) × Electricity (₹7.00/unit) ÷ Range ({pasRange} km) = ₹{costPerKm}/km
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="text-[11px] text-muted-foreground">Full Charge Cost</div>
                <div className="text-2xl font-extrabold text-foreground mt-1">₹{costPerFullCharge}</div>
                <div className="text-[10px] text-muted-foreground mt-1">0.3 units electricity</div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="text-[11px] text-muted-foreground">Monthly E-Cycle Cost (25 km/day)</div>
                <div className="text-2xl font-extrabold text-foreground mt-1">₹{monthlyCostEparv}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Negligible power bill impact</div>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Monthly Petrol Savings</div>
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  ₹{monthlySavings}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">Compared to 100cc petrol scooter</div>
              </div>
            </div>
          </section>

          {/* 7. Compare vs 2 Sibling Models */}
          {siblingModels.length > 0 && (
            <section className="my-14 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary">Family Comparison</div>
                <h2 className="text-2xl font-bold text-foreground">
                  Compare {typedModel.name} With Sibling Models
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-4 font-bold">Model</th>
                      <th className="py-3 px-4 font-bold">Selling Price</th>
                      <th className="py-3 px-4 font-bold">Motor</th>
                      <th className="py-3 px-4 font-bold">PAS Range</th>
                      <th className="py-3 px-4 font-bold">Suspension</th>
                      <th className="py-3 px-4 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-primary/5 font-semibold">
                      <td className="py-3 px-4 text-foreground">{typedModel.name} (Current)</td>
                      <td className="py-3 px-4 text-foreground">₹{typedModel.priceSelling?.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4 text-muted-foreground">{typedModel.motorPowerW}W</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400">{typedModel.rangePasKm} km</td>
                      <td className="py-3 px-4 text-muted-foreground">{typedModel.fork ?? 'Rigid'}</td>
                      <td className="py-3 px-4 text-xs text-primary font-bold">Viewing Now</td>
                    </tr>
                    {siblingModels.map((sib) => (
                      <tr key={sib.cleanSlug} className="hover:bg-muted/30">
                        <td className="py-3 px-4 font-medium text-foreground">{sib.name}</td>
                        <td className="py-3 px-4 text-foreground">₹{sib.priceSelling?.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-4 text-muted-foreground">{sib.motorPowerW}W</td>
                        <td className="py-3 px-4 text-muted-foreground">{sib.rangePasKm} km</td>
                        <td className="py-3 px-4 text-muted-foreground">{sib.fork ?? 'Rigid'}</td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/electric-cycles/${sib.cleanSlug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                          >
                            <span>Compare</span>
                            <ArrowRight className="size-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 8. FAQ Block */}
          <FaqBlock
            heading={`Frequently Asked Questions About ${typedModel.name}`}
            subheading="Clear answers regarding range testing, battery life, rain protection, and warranty coverage."
            faqs={faqs}
            id="model-faq"
          />

          {/* 9. Enquiry Form & Test Ride CTA */}
          <section id="enquire" className="my-14 scroll-mt-24">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Enquire or Book Test Ride for {typedModel.name}
              </h2>
              <p className="mb-6 text-xs text-muted-foreground">
                Enter your city and phone number — our authorized regional distributor will confirm instant on-road delivery, test-ride slots, and warranty registration.
              </p>
              <LeadForm
                type="retail"
                products={[{ slug: typedModel.cleanSlug, name: typedModel.name }]}
                defaultProductSlug={typedModel.cleanSlug}
                submitLabel="Send Official Enquiry"
              />
            </div>
          </section>

          {/* 10. Related Internal Links */}
          <RelatedLinks
            heading={`Related Guides, Categories & Cities for ${typedModel.name}`}
            subheading="Explore buyer intent guides, state hubs, or read battery care tips."
            links={relatedLinks}
          />
        </div>

        <JsonLd data={productSchema} />
        <JsonLd data={breadcrumbsSchema} />
      </article>
    )
  }

  // Fallback to Payload CMS Product if not a standard model
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'products',
      limit: 1,
      where: { slug: { equals: decodedSlug } },
    })

    const product = result.docs?.[0]
    if (product) {
      return (
        <article className="pb-24 pt-16">
          <PayloadRedirects disableNotFound url={url} />
          <div className="container max-w-5xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Electric Cycles', href: '/electric-cycles' },
                { label: product.name },
              ]}
            />
            <div className="mt-8">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              {product.shortDescription && <p className="mt-2 text-muted-foreground">{product.shortDescription}</p>}
            </div>
          </div>
        </article>
      )
    }
  } catch (e) {
    // ignore
  }

  notFound()
}
