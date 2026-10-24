import type { Metadata } from 'next'
import Link from 'next/link'
import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DemoNotice } from '@/components/DemoNotice'
import { JsonLd } from '@/components/JsonLd'
import { LeadForm } from '@/components/LeadForm'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const AVAILABILITY_LABELS: Record<string, string> = {
  'in-stock': 'In stock',
  'pre-order': 'Pre-order',
  'out-of-stock': 'Out of stock',
  discontinued: 'Discontinued',
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return products.docs?.map(({ slug }) => ({ slug })) ?? []
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/electric-cycles/${decodedSlug}`

  const product = await queryProductBySlug({ slug: decodedSlug })

  if (!product) {
    return <PayloadRedirects url={url} />
  }

  const {
    name,
    tagline,
    shortDescription,
    description,
    featuredImage,
    gallery,
    price,
    promotionalPrice,
    availability,
    isDemoData,
    category,
    meta,
  } = product

  const specs: { label: string; value: string }[] = []
  if (product.batteryCapacity) specs.push({ label: 'Battery capacity', value: product.batteryCapacity })
  if (product.motorPower) specs.push({ label: 'Motor power', value: product.motorPower })
  if (typeof product.claimedRangeKm === 'number')
    specs.push({ label: 'Claimed range', value: `${product.claimedRangeKm} km` })
  if (typeof product.chargingTimeHours === 'number')
    specs.push({ label: 'Charging time', value: `${product.chargingTimeHours} hours` })
  if (typeof product.topSpeedKmh === 'number')
    specs.push({ label: 'Maximum speed', value: `${product.topSpeedKmh} km/h` })
  if (typeof product.weightKg === 'number') specs.push({ label: 'Weight', value: `${product.weightKg} kg` })
  if (typeof product.warrantyMonths === 'number')
    specs.push({ label: 'Warranty', value: `${product.warrantyMonths} months` })
  for (const extra of product.additionalSpecifications ?? []) {
    if (extra.label && extra.value) {
      specs.push({ label: extra.label, value: extra.value })
    }
  }

  const deliveryLocations = product.deliveryLocations ?? []
  const hasPromo = typeof promotionalPrice === 'number' && promotionalPrice > 0
  const image =
    featuredImage && typeof featuredImage === 'object' ? featuredImage : null

  return (
    <article className="pb-24 pt-16">
      <PayloadRedirects disableNotFound url={url} />

      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electric Cycles', href: '/electric-cycles' },
            { label: name },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
              {image ? (
                <Media resource={image} size="50vw" priority />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Image coming soon
                </div>
              )}
            </div>
            {gallery && gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.slice(0, 8).map((item, index) => {
                  const galleryImage =
                    item.image && typeof item.image === 'object' ? item.image : null
                  return (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted"
                    >
                      {galleryImage ? (
                        <Media resource={galleryImage} size="10vw" alt={item.altText ?? undefined} />
                      ) : null}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {availability && (
                <span className="rounded-full border border-border bg-card px-3 py-1 text-xs">
                  {AVAILABILITY_LABELS[availability] ?? availability}
                </span>
              )}
              <span className="text-xs uppercase tracking-wide text-muted-foreground">{category}</span>
            </div>
            <h1 className="mb-2 text-3xl font-semibold tracking-tight md:text-4xl">{name}</h1>
            {tagline && <p className="mb-4 text-lg text-muted-foreground">{tagline}</p>}

            {isDemoData && <DemoNotice className="mb-4" />}

            {typeof price === 'number' && (
              <div className="mb-4 flex items-baseline gap-3">
                <span
                  className={`text-2xl font-semibold ${hasPromo ? 'line-through text-muted-foreground' : ''}`}
                >
                  {inr.format(price)}
                </span>
                {hasPromo && typeof promotionalPrice === 'number' && (
                  <span className="text-2xl font-semibold text-primary">
                    {inr.format(promotionalPrice)}
                  </span>
                )}
                {isDemoData && <span className="text-sm text-muted-foreground">(demo price)</span>}
              </div>
            )}

            {shortDescription && <p className="mb-6 text-muted-foreground">{shortDescription}</p>}

            <div className="mb-6 flex flex-wrap gap-3">
              <a
                href="#enquire"
                className="inline-flex h-11 items-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Enquire now
              </a>
              <Link
                href={`/book-test-ride?product=${product.slug}`}
                className="inline-flex h-11 items-center rounded-md border border-input bg-background px-8 text-sm font-medium hover:bg-accent"
              >
                Book a test ride
              </Link>
            </div>

            {deliveryLocations.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-4">
                <h2 className="mb-2 text-sm font-semibold">Eligible delivery locations</h2>
                <p className="text-sm text-muted-foreground">
                  {deliveryLocations.map((loc) => `${loc.city}, ${loc.state}`).join(' · ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        {specs.length > 0 && (
          <section className="mt-12" aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="mb-4 text-2xl font-semibold">
              Specifications
            </h2>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={spec.label} className={index % 2 === 0 ? 'bg-card' : 'bg-background'}>
                      <th scope="row" className="w-1/3 px-4 py-3 text-left font-medium">
                        {spec.label}
                      </th>
                      <td className="px-4 py-3">
                        {spec.value}
                        {isDemoData && (
                          <span className="ml-2 text-xs text-muted-foreground">(demo)</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isDemoData && (
              <p className="mt-2 text-xs text-muted-foreground">
                All specifications are unverified demo values until officially confirmed.
              </p>
            )}
          </section>
        )}

        {/* Description */}
        {description && (
          <section className="mt-12" aria-labelledby="description-heading">
            <h2 id="description-heading" className="mb-4 text-2xl font-semibold">
              About this cycle
            </h2>
            <RichText
              className="prose max-w-none"
              data={description}
              enableGutter={false}
            />
          </section>
        )}

        {/* Enquiry form */}
        <section id="enquire" className="mt-12 scroll-mt-24" aria-labelledby="enquire-heading">
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 id="enquire-heading" className="mb-2 text-2xl font-semibold">
              Enquire about the {name}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Share your city and contact details — our team confirms pricing, availability and
              delivery for your location.
            </p>
            <LeadForm
              type="retail"
              products={[{ slug: product.slug, name }]}
              defaultProductSlug={product.slug}
              submitLabel="Send enquiry"
            />
          </div>
        </section>
      </div>

      {/* Structured data: name/description/image only. Offers, ratings and
          availability are intentionally omitted while data is demo/unverified. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          ...(tagline ? { description: tagline } : {}),
          ...(shortDescription ? { disambiguatingDescription: shortDescription } : {}),
          category: category ?? undefined,
          ...(image?.url ? { image: `${getServerSideURL()}${image.url}` } : {}),
          ...(meta?.description ? { description: meta.description } : {}),
          ...(!isDemoData && typeof price === 'number'
            ? {
                offers: {
                  '@type': 'Offer',
                  price,
                  priceCurrency: 'INR',
                  url: `${getServerSideURL()}${url}`,
                  ...(availability && availability !== 'discontinued'
                    ? { availability: `https://schema.org/${availability === 'in-stock' ? 'InStock' : availability === 'pre-order' ? 'PreOrder' : 'OutOfStock'}` }
                    : {}),
                },
              }
            : {}),
        }}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const product = await queryProductBySlug({ slug: decodedSlug })

  if (!product) {
    // Let the page component handle redirects/404 — return minimal metadata.
    return { title: 'Product not found | Eparv' }
  }

  const title = product.meta?.title ? `${product.meta.title} | Eparv` : `${product.name} | Eparv`
  const description = product.meta?.description ?? product.shortDescription ?? undefined
  const base = getServerSideURL()
  const canonical = `${base}/electric-cycles/${product.slug}`
  const ogImage =
    product.meta?.image && typeof product.meta.image === 'object' && 'url' in product.meta.image
      ? product.meta.image
      : null

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: mergeOpenGraph({
      title,
      description: description ?? '',
      url: `/electric-cycles/${product.slug}`,
      images: ogImage?.url
        ? [{ url: `${base}${ogImage.url}` }]
        : product.featuredImage && typeof product.featuredImage === 'object' && product.featuredImage.url
          ? [{ url: `${base}${product.featuredImage.url}` }]
          : undefined,
    }),
  }
}
