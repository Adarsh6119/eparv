import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Dealer } from '@/payload-types'

type Args = {
  searchParams: Promise<{
    state?: string
  }>
}

export default async function DealersPage({ searchParams }: Args) {
  const { state } = await searchParams
  const payload = await getPayload({ config: configPromise })

  // overrideAccess: false — the dealers read access rule means the public
  // only ever sees verified + publicly listed dealerships.
  const result = await payload.find({
    collection: 'dealers',
    depth: 0,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    sort: 'businessName',
    where: state
      ? { and: [{ applicationStatus: { equals: 'verified' } }, { publicListing: { equals: true } }, { state: { equals: state } }] }
      : undefined,
  })

  const dealers = result.docs
  const anyDemo = dealers.some((dealer) => dealer.isDemoData)

  // Group by state for easy scanning.
  const byState = new Map<string, Dealer[]>()
  for (const dealer of dealers) {
    const key = dealer.state ?? 'Other'
    byState.set(key, [...(byState.get(key) ?? []), dealer])
  }
  const states = Array.from(byState.keys()).sort()

  return (
    <article className="pb-24 pt-16">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dealers' }]} />

        <header className="mb-8">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Eparv dealer directory
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Verified Eparv dealers offer test rides, local delivery and service. Contact a dealer
            directly or <Link href="/become-a-dealer" className="text-primary hover:underline">apply to become one</Link>.
          </p>
        </header>

        {dealers.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              {state
                ? `No verified dealers listed in ${state} yet.`
                : 'No verified dealers listed yet — the network is growing.'}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              You can still{' '}
              <Link href="/book-test-ride" className="text-primary hover:underline">
                book a test ride
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>{' '}
              directly.
            </p>
          </div>
        ) : (
          <>
            {states.length > 1 && (
              <nav aria-label="Filter by state" className="mb-8 flex flex-wrap gap-2">
                <Link
                  href="/dealers"
                  className={`rounded-full border px-4 py-1.5 text-sm ${!state ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/50'}`}
                >
                  All states
                </Link>
                {states.map((name) => (
                  <Link
                    key={name}
                    href={`/dealers?state=${encodeURIComponent(name)}`}
                    className={`rounded-full border px-4 py-1.5 text-sm ${state === name ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/50'}`}
                  >
                    {name}
                  </Link>
                ))}
              </nav>
            )}

            {anyDemo && (
              <p className="mb-6 text-xs text-muted-foreground">
                Dealerships marked “demo data” are placeholder entries for development — not real
                businesses.
              </p>
            )}

            {states.map((stateName) => (
              <section key={stateName} className="mb-10" aria-labelledby={`state-${stateName}`}>
                <h2 id={`state-${stateName}`} className="mb-4 text-xl font-semibold">
                  {stateName}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {(byState.get(stateName) ?? []).map((dealer) => (
                    <div key={dealer.id} className="rounded-lg border border-border bg-card p-6">
                      <h3 className="mb-1 font-semibold">
                        <Link
                          href={`/dealers/${dealer.slug}`}
                          className="hover:text-primary hover:underline"
                        >
                          {dealer.businessName}
                        </Link>
                      </h3>
                      <p className="mb-2 text-sm text-muted-foreground">
                        {dealer.city}
                        {dealer.state ? `, ${dealer.state}` : ''}
                        {dealer.isDemoData && (
                          <span className="ml-2 text-xs">(demo data)</span>
                        )}
                      </p>
                      {dealer.address && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{dealer.address}</p>
                      )}
                      <Link
                        href={`/dealers/${dealer.slug}`}
                        className="mt-3 inline-block text-sm text-primary hover:underline"
                      >
                        View dealership →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/dealers`,
  },
  description:
    'Find verified Eparv electric cycle dealers across India — test rides, local delivery and service.',
  openGraph: mergeOpenGraph({
    description: 'Find verified Eparv electric cycle dealers across India.',
    title: 'Dealer Directory | Eparv',
    url: '/dealers',
  }),
  title: 'Dealer Directory | Eparv',
}
