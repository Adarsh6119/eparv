import Link from 'next/link'
import React from 'react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { SeoFaqSection } from '@/components/SeoFaq'
import { citiesForStatePage, otherStatePages } from '@/cities'
import type { StatePageData } from '@/cities/types'

/**
 * The hub template served for state (`/electric-cycle-in-uttar-pradesh`,
 * `-bihar`, `-madhya-pradesh`) and region (`/electric-cycle-in-delhi-ncr`)
 * URLs. It links down to every covered city page and across to the other
 * hubs, giving the city pages a proper parent in the site structure.
 */
export const StateLanding: React.FC<{ data: StatePageData }> = async ({ data }) => {
  const cities = citiesForStatePage(data)
  const otherHubs = otherStatePages(data)

  return (
    <article className="pb-24 pt-16">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: data.state }]} />

        <header className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
              Electric cycles · {data.state}
            </p>
            <h1 className="mb-5 text-3xl font-semibold tracking-tight md:text-4xl">
              Electric Cycles in {data.state}
            </h1>
            {data.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mb-4 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="rounded-2xl border bg-card p-5 shadow-sm lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {data.state} at a glance
            </p>
            <dl className="mb-4 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">City guides</dt>
                <dd className="font-semibold">{cities.length}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Free test rides</dt>
                <dd className="font-semibold">Every city</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Licence needed</dt>
                <dd className="font-semibold">None</dd>
              </div>
            </dl>
            <a
              href="#test-ride"
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a test ride in {data.state}
            </a>
          </aside>
        </header>

        <section aria-labelledby="state-why-heading" className="mt-16">
          <h2 id="state-why-heading" className="mb-6 text-2xl font-semibold tracking-tight">
            Why electric cycles work across {data.state}
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

        <section aria-labelledby="cities-heading" className="mt-16">
          <h2 id="cities-heading" className="mb-2 text-2xl font-semibold tracking-tight">
            City guides in {data.state}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Each guide covers the city’s real commute corridors, delivery neighbourhoods, charging
            and servicing answers, and a doorstep test ride.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <h3 className="mb-1 font-medium group-hover:text-primary">
                  Electric Cycle in {city.city}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {city.localities.length} delivery areas · {city.routes.length} local routes ·
                  FAQs
                </p>
              </Link>
            ))}
            {cities.length === 0 && (
              <p className="text-sm text-muted-foreground">
                City guides for {data.state} are being added — enquire directly for coverage.
              </p>
            )}
          </div>
        </section>

        <section id="test-ride" aria-labelledby="state-lead-heading" className="mt-16">
          <div className="rounded-xl border bg-muted/30 p-6 md:p-10">
            <h2 id="state-lead-heading" className="mb-2 text-2xl font-semibold tracking-tight">
              Book a test ride in {data.state}
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
              Tell us where you are in {data.state} and the Eparv team will arrange a test ride at
              your address, with the delivery timeline for your town confirmed upfront.
            </p>
            <LeadForm type="test-ride" submitLabel={`Request test ride in ${data.state}`} />
          </div>
        </section>

        <SeoFaqSection faqs={data.faqs} title={`${data.state} electric cycles — FAQs`} />

        {otherHubs.length > 0 && (
          <nav aria-labelledby="other-hubs-heading" className="mt-16">
            <h2 id="other-hubs-heading" className="mb-4 text-xl font-semibold tracking-tight">
              Electric cycles in other regions
            </h2>
            <ul className="flex flex-wrap gap-2">
              {otherHubs.map((hub) => (
                <li key={hub.slug}>
                  <Link
                    href={`/${hub.slug}`}
                    className="inline-flex rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:bg-muted"
                  >
                    Electric cycles in {hub.state}
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
