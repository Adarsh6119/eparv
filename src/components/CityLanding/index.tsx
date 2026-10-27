import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { Media } from '@/components/Media'
import { ProductCard } from '@/components/ProductCard'
import { SeoFaqSection } from '@/components/SeoFaq'
import { getStatePageBySlug, nearbyCities } from '@/cities'
import type { CityPageData } from '@/cities/types'

type CardProductData = NonNullable<React.ComponentProps<typeof ProductCard>['product']>

/** Card fields plus the spec fields used by the city-page comparison table. */
type SpecProduct = CardProductData & {
  batteryCapacity?: string | null
  motorPower?: string | null
  claimedRangeKm?: number | null
  chargingTimeHours?: number | null
  topSpeedKmh?: number | null
  weightKg?: number | null
  warrantyMonths?: number | null
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const productSelect = {
  slug: true,
  name: true,
  category: true,
  tagline: true,
  shortDescription: true,
  price: true,
  promotionalPrice: true,
  availability: true,
  isDemoData: true,
  featuredImage: true,
  batteryCapacity: true,
  motorPower: true,
  claimedRangeKm: true,
  chargingTimeHours: true,
  topSpeedKmh: true,
  weightKg: true,
  warrantyMonths: true,
} as const

const fmt = {
  price: (p: SpecProduct) =>
    typeof p.promotionalPrice === 'number' && p.promotionalPrice > 0
      ? inr.format(p.promotionalPrice)
      : typeof p.price === 'number'
        ? inr.format(p.price)
        : '—',
  battery: (p: SpecProduct) => p.batteryCapacity || '—',
  range: (p: SpecProduct) => (p.claimedRangeKm ? `${p.claimedRangeKm} km` : '—'),
  charge: (p: SpecProduct) => (p.chargingTimeHours ? `${p.chargingTimeHours} h` : '—'),
  speed: (p: SpecProduct) => (p.topSpeedKmh ? `${p.topSpeedKmh} km/h` : '—'),
  weight: (p: SpecProduct) => (p.weightKg ? `${p.weightKg} kg` : '—'),
  warranty: (p: SpecProduct) => (p.warrantyMonths ? `${p.warrantyMonths} mo` : '—'),
}

/**
 * The full landing-page template served for every `/electric-cycle-in-*` city
 * URL. All copy comes from the hand-written per-city data in `src/cities` —
 * the template adds structure (products, spec comparison, lead form, internal
 * links), never boilerplate sentences, so no two city pages share body copy.
 */
export const CityLanding: React.FC<{ data: CityPageData }> = async ({ data }) => {
  const { city, state, stateHubSlug } = data

  const payload = await getPayload({ config: configPromise })
  const productsResult = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 6,
    overrideAccess: false,
    draft: false,
    sort: '-updatedAt',
    where: {
      _status: { equals: 'published' },
    },
    select: productSelect,
  })
  const products: SpecProduct[] = (productsResult.docs ?? []) as SpecProduct[]
  const productOptions = productsResult.docs.map((product) => ({
    slug: product.slug,
    name: product.name,
  }))
  const hasSpecs = products.some((p) => p.batteryCapacity || p.claimedRangeKm)

  const stateHub = stateHubSlug ? getStatePageBySlug(stateHubSlug) : undefined
  const nearby = nearbyCities(data)
  const showStateCrumb = Boolean(stateHub) || state !== city
  const showExplore = Boolean(stateHub) || nearby.length > 0

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...(showStateCrumb ? [{ label: state, ...(stateHub ? { href: `/${stateHub.slug}` } : {}) }] : []),
    { label: city },
  ]

  return (
    <article className="pb-24 pt-16">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero — two-column: copy on the left, featured model card on the right */}
        <header className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
              Electric cycles · {city}, {state}
            </p>
            <h1 className="mb-5 text-3xl font-semibold tracking-tight md:text-4xl">
              Electric Cycle in {city}
            </h1>
            {data.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mb-4 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#test-ride"
                className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a free test ride in {city}
              </Link>
              <Link
                href="/electric-cycles"
                className="inline-flex h-11 items-center rounded-md border px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                Browse all cycles
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border bg-card p-5 shadow-sm lg:sticky lg:top-24">
            {(() => {
              const featured = products[0]
              const image =
                featured &&
                featured.featuredImage &&
                typeof featured.featuredImage === 'object'
                  ? featured.featuredImage
                  : null
              return (
                <>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Most popular in {state}
                  </p>
                  <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
                    {image ? (
                      <Media resource={image} size="340px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        Eparv electric cycle
                      </div>
                    )}
                  </div>
                  {featured ? (
                    <>
                      <h2 className="text-lg font-semibold">{featured.name}</h2>
                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {featured.tagline ?? featured.shortDescription ?? ''}
                      </p>
                      <div className="mb-4 flex items-baseline justify-between gap-2">
                        <span className="text-xl font-semibold">{fmt.price(featured)}</span>
                        {featured.claimedRangeKm ? (
                          <span className="text-sm text-muted-foreground">
                            up to {featured.claimedRangeKm} km range
                          </span>
                        ) : null}
                      </div>
                      <Link
                        href={`/electric-cycles/${featured.slug}`}
                        className="inline-flex h-10 w-full items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        View {featured.name}
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Browse the full Eparv range delivered to {city}.
                    </p>
                  )}
                </>
              )
            })()}
          </aside>
        </header>

        <ul className="mt-8 grid gap-3 rounded-xl border bg-muted/30 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            `${data.localities.length} delivery areas in ${city}`,
            'Free doorstep test ride',
            'No licence · no registration',
            'Warranty-backed battery & motor',
          ].map((fact) => (
            <li key={fact} className="flex items-center gap-2 font-medium">
              <span aria-hidden="true" className="text-primary">✓</span>
              {fact}
            </li>
          ))}
        </ul>

        {/* Products — placed high so buyers see the range immediately */}
        {products.length > 0 && (
          <section aria-labelledby="models-heading" className="mt-16">
            <h2 id="models-heading" className="mb-2 text-2xl font-semibold tracking-tight">
              Electric cycles available in {city}
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
              Every Eparv model is delivered to {city} — pick one to see full battery, motor and
              range details, or compare the lineup below.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>

            {hasSpecs && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold tracking-tight">
                  {city} price & specification comparison
                </h3>
                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-medium">Model</th>
                        <th scope="col" className="px-4 py-3 font-medium">Price</th>
                        <th scope="col" className="px-4 py-3 font-medium">Battery</th>
                        <th scope="col" className="px-4 py-3 font-medium">Range</th>
                        <th scope="col" className="px-4 py-3 font-medium">Full charge</th>
                        <th scope="col" className="px-4 py-3 font-medium">Top speed</th>
                        <th scope="col" className="px-4 py-3 font-medium">Weight</th>
                        <th scope="col" className="px-4 py-3 font-medium">Warranty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-card">
                      {products.map((product) => (
                        <tr key={product.slug}>
                          <td className="px-4 py-3 font-medium">
                            <Link
                              href={`/electric-cycles/${product.slug}`}
                              className="underline-offset-4 hover:underline"
                            >
                              {product.name}
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">{fmt.price(product)}</td>
                          <td className="px-4 py-3 text-muted-foreground">{fmt.battery(product)}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{fmt.range(product)}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{fmt.charge(product)}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{fmt.speed(product)}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{fmt.weight(product)}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{fmt.warranty(product)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Prices are ex-showroom for {city}; EMI options are confirmed with the team when
                  you order.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Why this city */}
        <section aria-labelledby="why-heading" className="mt-16">
          <h2 id="why-heading" className="mb-6 text-2xl font-semibold tracking-tight">
            Why {city} riders choose Eparv
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.whyPoints.map((point) => (
              <div key={point.title} className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 font-medium">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{point.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Real commute corridors */}
        <section aria-labelledby="routes-heading" className="mt-16">
          <h2 id="routes-heading" className="mb-2 text-2xl font-semibold tracking-tight">
            Popular commute routes in {city}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Real corridors {city} riders cover every day — and why an Eparv fits each one.
          </p>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">From</th>
                  <th scope="col" className="px-4 py-3 font-medium">To</th>
                  <th scope="col" className="px-4 py-3 font-medium">Distance</th>
                  <th scope="col" className="px-4 py-3 font-medium">Why it works on an Eparv</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-card">
                {data.routes.map((route) => (
                  <tr key={`${route.from}-${route.to}`}>
                    <td className="px-4 py-3 font-medium">{route.from}</td>
                    <td className="px-4 py-3">{route.to}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{route.distance}</td>
                    <td className="px-4 py-3 text-muted-foreground">{route.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Delivery localities */}
        <section aria-labelledby="areas-heading" className="mt-16">
          <h2 id="areas-heading" className="mb-2 text-2xl font-semibold tracking-tight">
            Areas we deliver to in {city}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Home delivery and test rides are available across these neighbourhoods — and the rest
            of {city} on request.
          </p>
          <ul className="flex flex-wrap gap-2">
            {data.localities.map((locality) => (
              <li
                key={locality}
                className="rounded-full border bg-muted/40 px-3.5 py-1.5 text-sm text-muted-foreground"
              >
                {locality}
              </li>
            ))}
          </ul>
        </section>

        {/* How ordering works */}
        <section aria-labelledby="how-heading" className="mt-16">
          <h2 id="how-heading" className="mb-6 text-2xl font-semibold tracking-tight">
            How to get your Eparv in {city}
          </h2>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Shortlist a model',
                body: 'Compare the range and prices above, or browse every model on the Electric Cycles page.',
              },
              {
                title: 'Ride it first',
                body: `Book the free doorstep test ride through the form below and try your actual daily route in ${city}.`,
              },
              {
                title: 'Confirm your order',
                body: 'Lock the model, colour availability and delivery date with the Eparv team — EMI options are discussed here.',
              },
              {
                title: 'Delivered to your door',
                body: `The cycle arrives mostly assembled, with a full walkthrough of charging and everyday care suited to ${city}.`,
              },
            ].map((step, index) => (
              <li key={step.title} className="rounded-xl border bg-card p-5">
                <span
                  aria-hidden="true"
                  className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                >
                  {index + 1}
                </span>
                <h3 className="mb-1 font-medium">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Test-ride lead form */}
        <section id="test-ride" aria-labelledby="test-ride-heading" className="mt-16">
          <div className="rounded-xl border bg-muted/30 p-6 md:p-10">
            <h2 id="test-ride-heading" className="mb-2 text-2xl font-semibold tracking-tight">
              Book a free test ride in {city}
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
              Share your details and the Eparv team will arrange a ride at your address in {city} —
              on the routes you actually commute, with pricing and delivery timelines for {state}.
            </p>
            <LeadForm
              type="test-ride"
              products={productOptions}
              defaultCity={city}
              submitLabel={`Request test ride in ${city}`}
            />
          </div>
        </section>

        <SeoFaqSection faqs={data.faqs} title={`${city} electric cycle — FAQs`} />

        {/* Internal links: state hub + nearby cities */}
        {showExplore && (
          <nav aria-labelledby="nearby-heading" className="mt-16">
            <h2 id="nearby-heading" className="mb-2 text-2xl font-semibold tracking-tight">
              Explore electric cycles nearby
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
              Eparv serves riders across {state} and neighbouring cities — every page carries local
              routes, delivery areas and FAQs.
            </p>
            <ul className="flex flex-wrap gap-2">
              {stateHub && (
                <li>
                  <Link
                    href={`/${stateHub.slug}`}
                    className="inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    All of {state}
                  </Link>
                </li>
              )}
              {nearby.map((near) => (
                <li key={near.slug}>
                  <Link
                    href={`/${near.slug}`}
                    className="inline-flex rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:bg-muted"
                  >
                    Electric cycle in {near.city}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  )
}
