import type { Metadata } from 'next'
import Link from 'next/link'
import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DemoNotice } from '@/components/DemoNotice'
import { JsonLd } from '@/components/JsonLd'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Dealer } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const queryDealerBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  // overrideAccess: false — unverified or unlisted dealers 404 for the public.
  const result = await payload.find({
    collection: 'dealers',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export default async function DealerPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const dealer = await queryDealerBySlug({ slug: decodedSlug })

  if (!dealer) {
    return <PayloadRedirects url={`/dealers/${decodedSlug}`} />
  }

  const { businessName, contactPerson, city, state, address, openingHours, about, serviceableLocations, geoCoordinates, isDemoData } =
    dealer

  const hasGeo =
    geoCoordinates &&
    typeof geoCoordinates.latitude === 'number' &&
    typeof geoCoordinates.longitude === 'number'

  const mapUrl = hasGeo
    ? `https://www.google.com/maps?q=${geoCoordinates!.latitude},${geoCoordinates!.longitude}`
    : null

  return (
    <article className="pb-24 pt-16">
      <div className="container max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dealers', href: '/dealers' },
            { label: businessName },
          ]}
        />

        <header className="mb-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {businessName}
          </h1>
          <p className="text-muted-foreground">
            Verified Eparv dealer
            {city ? ` · ${city}` : ''}
            {state ? `, ${state}` : ''}
            {isDemoData && <span className="ml-2 text-xs">(demo data)</span>}
          </p>
        </header>

        {isDemoData && <DemoNotice className="mb-6" />}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 font-semibold">Showroom</h2>
            {address && <p className="whitespace-pre-line text-sm text-muted-foreground">{address}</p>}
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-primary hover:underline"
              >
                Open in Google Maps →
              </a>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 font-semibold">Visiting & service</h2>
            {openingHours ? (
              <p className="mb-2 text-sm text-muted-foreground">{openingHours}</p>
            ) : (
              <p className="mb-2 text-sm text-muted-foreground">
                Opening hours available on request.
              </p>
            )}
            {contactPerson && (
              <p className="text-sm text-muted-foreground">Contact: {contactPerson}</p>
            )}
          </div>
        </div>

        {about && (
          <section className="mt-6 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 font-semibold">About this dealership</h2>
            <p className="whitespace-pre-line text-sm text-muted-foreground">{about}</p>
          </section>
        )}

        {serviceableLocations && serviceableLocations.length > 0 && (
          <section className="mt-6 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 font-semibold">Serviceable locations</h2>
            <p className="text-sm text-muted-foreground">
              {serviceableLocations.map((loc) => `${loc.city}, ${loc.state}`).join(' · ')}
            </p>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/book-test-ride${city ? `?city=${encodeURIComponent(city)}` : ''}`}
            className="inline-flex h-11 items-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Book a test ride{city ? ` in ${city}` : ''}
          </Link>
          <Link
            href="/electric-cycles"
            className="inline-flex h-11 items-center rounded-md border border-input bg-background px-8 text-sm font-medium hover:bg-accent"
          >
            Browse cycles
          </Link>
        </div>
      </div>

      {/* LocalBusiness structured data only for fully verified, non-demo
          dealers with a complete address — never fabricated. */}
      {!isDemoData && address && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: businessName,
            address: {
              '@type': 'PostalAddress',
              streetAddress: address,
              addressLocality: city ?? undefined,
              addressRegion: state ?? undefined,
              addressCountry: 'IN',
            },
            ...(hasGeo
              ? {
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: geoCoordinates!.latitude,
                    longitude: geoCoordinates!.longitude,
                  },
                }
              : {}),
          }}
        />
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const dealer = await queryDealerBySlug({ slug: decodedSlug })

  if (!dealer) {
    return { title: 'Dealer not found | Eparv' }
  }

  const title = dealer.meta?.title
    ? `${dealer.meta.title} | Eparv`
    : `${dealer.businessName}${dealer.city ? `, ${dealer.city}` : ''} | Eparv Dealers`
  const description =
    dealer.meta?.description ??
    `Verified Eparv electric cycle dealer${dealer.city ? ` in ${dealer.city}` : ''}${dealer.state ? `, ${dealer.state}` : ''} — test rides, delivery and service.`

  return {
    title,
    description,
    alternates: {
      canonical: `${getServerSideURL()}/dealers/${dealer.slug}`,
    },
    openGraph: mergeOpenGraph({
      title,
      description,
      url: `/dealers/${dealer.slug}`,
    }),
  }
}
