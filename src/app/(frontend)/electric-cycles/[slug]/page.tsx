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

const FALLBACK_PRODUCTS: Record<string, Partial<Product> & { imageUrl?: string }> = {
  panther: {
    name: 'Eparv Panther',
    slug: 'eparv-panther',
    category: 'city-commuter',
    tagline: 'Stealth urban performance with lightweight agility',
    shortDescription:
      'EPARV Panther is a 26T matte stealth black electric bicycle with a 250W BLDC hub motor, dual disc brakes with motor cut-off, and a removable 36V quick-charge battery.',
    price: 21000,
    promotionalPrice: 19999,
    availability: 'in-stock',
    batteryCapacity: '36V, 10Ah Lithium-ion',
    motorPower: '250W BLDC hub motor',
    claimedRangeKm: 55,
    chargingTimeHours: 2,
    topSpeedKmh: 25,
    weightKg: 21,
    warrantyMonths: 60,
    imageUrl: '/cycles/panther.png',
    additionalSpecifications: [
      { id: 'p1', label: 'Frame', value: 'Lightweight Alloy / Hi-Tensile Steel' },
      { id: 'p2', label: 'Brakes', value: 'Mechanical Dual Disc Brakes with Motor Cut-off' },
      { id: 'p3', label: 'Suspension', value: 'Rigid Aerodynamic Alloy Fork' },
      { id: 'p4', label: 'Tyres', value: '26 × 2.10 Urban Low-Rolling Resistance' },
      { id: 'p5', label: 'Display', value: 'Smart LED Display with 3-Mode PAS' },
      { id: 'p6', label: 'Security', value: 'Anti-Theft Key Ignition & Battery Lock' },
    ],
  },
  visakka: {
    name: 'Eparv Visakka',
    slug: 'eparv-visakka',
    category: 'off-road',
    tagline: 'Built to dominate every terrain with high-tensile power',
    shortDescription:
      'EPARV Visakka is an all-terrain electric MTB featuring front suspension, high-tensile frame, 250W BLDC hub motor, and mechanical dual disc brakes.',
    price: 26000,
    promotionalPrice: 24999,
    availability: 'in-stock',
    batteryCapacity: '36V, 12Ah Detachable Li-ion',
    motorPower: '250W High-Torque BLDC',
    claimedRangeKm: 60,
    chargingTimeHours: 3,
    topSpeedKmh: 25,
    weightKg: 23,
    warrantyMonths: 60,
    imageUrl: '/cycles/visakka.png',
    additionalSpecifications: [
      { id: 'v1', label: 'Frame', value: '18.5-inch Heavy-Duty MTB Hi-Tensile' },
      { id: 'v2', label: 'Fork', value: '80mm Travel Front Suspension Fork' },
      { id: 'v3', label: 'Brakes', value: 'Mechanical Dual Disc Brakes with Auto Cut-off' },
      { id: 'v4', label: 'Tyres', value: '27.5 × 2.10 Knobby All-Terrain' },
      { id: 'v5', label: 'Pedal Assist', value: '5-Level Intelligent Cadence Sensor' },
    ],
  },
  lahari: {
    name: 'Eparv Lahari',
    slug: 'eparv-lahari',
    category: 'city-commuter',
    tagline: 'Unstoppable 110 km ultra long-distance touring and adventure',
    shortDescription:
      'EPARV Lahari is built for long-distance touring with an extended 110 km range, front suspension, comfort saddle, and 250W high-efficiency BLDC motor.',
    price: 27999,
    promotionalPrice: 21999,
    availability: 'in-stock',
    batteryCapacity: '36V, 15.6Ah Extended Capacity Li-ion',
    motorPower: '250W High-Efficiency BLDC',
    claimedRangeKm: 110,
    chargingTimeHours: 3,
    topSpeedKmh: 25,
    weightKg: 24,
    warrantyMonths: 60,
    imageUrl: '/cycles/lahari.png',
    additionalSpecifications: [
      { id: 'l1', label: 'Frame', value: 'Ergonomic Long-Distance Touring Geometry' },
      { id: 'l2', label: 'Fork', value: 'Damped Front Suspension Fork' },
      { id: 'l3', label: 'Brakes', value: 'Dual Disc Brakes' },
      { id: 'l4', label: 'Saddle', value: 'Comfort Touring Foam Cushion' },
      { id: 'l5', label: 'Range (PAS)', value: 'Up to 110 km on Single Charge' },
    ],
  },
  savitri: {
    name: 'Eparv Savitri',
    slug: 'eparv-savitri',
    category: 'city-commuter',
    tagline: 'The classic Indian commuter, electrified with long range',
    shortDescription:
      'EPARV Savitri is a classic city roadster with a 22-inch frame, 250W BLDC hub motor, heavy-duty rear carrier, steel mudguards, and 110 km range.',
    price: 21500,
    promotionalPrice: 18999,
    availability: 'in-stock',
    batteryCapacity: '36V, 10.4Ah Li-ion Pack',
    motorPower: '250W BLDC hub motor',
    claimedRangeKm: 110,
    chargingTimeHours: 3,
    topSpeedKmh: 25,
    weightKg: 26,
    warrantyMonths: 60,
    imageUrl: '/cycles/savitri.png',
    additionalSpecifications: [
      { id: 's1', label: 'Frame', value: '22-inch Heavy-Duty Traditional Roadster' },
      { id: 's2', label: 'Carrier', value: 'Reinforced Steel Rear Carrier Rack' },
      { id: 's3', label: 'Mudguards', value: 'Full Wrap Steel Mudguards' },
      { id: 's4', label: 'Brakes', value: 'Dual High-Friction Brakes' },
      { id: 's5', label: 'Posture', value: 'Relaxed Upright Comfort Seating' },
    ],
  },
  satya: {
    name: 'Eparv Satya',
    slug: 'eparv-satya',
    category: 'off-road',
    tagline: 'Rugged all-weather trail MTB built for tough Indian roads',
    shortDescription:
      'EPARV Satya is a 26T heavy-duty electric bicycle designed for rough roads and trails with a 250W BLDC hub motor, dual disc brakes, and anti-theft key lock.',
    price: 22999,
    promotionalPrice: 21000,
    availability: 'in-stock',
    batteryCapacity: '36V, 7.8Ah Li-ion NMC',
    motorPower: '250W BLDC hub motor',
    claimedRangeKm: 55,
    chargingTimeHours: 2,
    topSpeedKmh: 25,
    weightKg: 25,
    warrantyMonths: 60,
    imageUrl: '/cycles/satya.png',
    additionalSpecifications: [
      { id: 'st1', label: 'Frame', value: 'Lightweight Hi-Tensile Steel 26T' },
      { id: 'st2', label: 'Fork', value: 'Rigid Heavy-Duty MTB Fork' },
      { id: 'st3', label: 'Brakes', value: 'Mechanical Dual Disc Brakes' },
      { id: 'st4', label: 'Colour', value: 'Metallic Magenta' },
      { id: 'st5', label: 'Ignition', value: 'Key Ignition with Anti-Theft Feature' },
    ],
  },
}

function getFallbackProduct(slug: string): Product | null {
  const s = slug.toLowerCase()
  let key = ''
  if (s.includes('panther')) key = 'panther'
  else if (s.includes('visak')) key = 'visakka'
  else if (s.includes('lahari')) key = 'lahari'
  else if (s.includes('savitri')) key = 'savitri'
  else if (s.includes('satya')) key = 'satya'

  if (!key || !FALLBACK_PRODUCTS[key]) return null

  const data = FALLBACK_PRODUCTS[key]
  return {
    id: `fallback-${key}`,
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _status: 'published',
    isDemoData: false,
    ...data,
  } as unknown as Product
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Support slug variations: with or without '-electric-bike', 'visakka' vs 'visalka', etc.
  const variants = new Set<string>([slug])
  if (slug.endsWith('-electric-bike')) {
    variants.add(slug.replace(/-electric-bike$/, ''))
  } else {
    variants.add(`${slug}-electric-bike`)
  }

  if (slug.includes('visak')) {
    variants.add('eparv-visakka')
    variants.add('eparv-visakka-electric-bike')
    variants.add('eparv-visalka')
    variants.add('eparv-visalka-electric-bike')
  } else if (slug.includes('panther')) {
    variants.add('eparv-panther')
    variants.add('eparv-panther-electric-bike')
  } else if (slug.includes('lahari')) {
    variants.add('eparv-lahari')
    variants.add('eparv-lahari-electric-bike')
  } else if (slug.includes('savitri')) {
    variants.add('eparv-savitri')
    variants.add('eparv-savitri-electric-bike')
  } else if (slug.includes('satya')) {
    variants.add('eparv-satya')
    variants.add('eparv-satya-electric-bike')
  }

  const result = await payload.find({
    collection: 'products',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      or: Array.from(variants).map((v) => ({
        slug: { equals: v },
      })),
    },
  }).catch(() => null)

  const found = result?.docs?.[0]
  if (found) {
    return found
  }

  // Graceful fallback to official model specifications if not found in database
  return getFallbackProduct(slug)
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
  }).catch(() => null)

  const officialSlugs = [
    'eparv-panther',
    'eparv-visakka',
    'eparv-lahari',
    'eparv-savitri',
    'eparv-satya',
  ]

  const dbSlugs =
    products?.docs
      ?.map(({ slug }) => slug)
      .filter((s): s is string => Boolean(s) && !s.endsWith('-electric-bike') && s !== 'smoke-test-cycle') ?? []
  const allSlugs = Array.from(new Set([...officialSlugs, ...dbSlugs]))

  return allSlugs.map((slug) => ({ slug }))
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

  const imageUrl = (product as { imageUrl?: string | null }).imageUrl ?? null

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

  const fallbackCycleImage =
    decodedSlug.includes('visak') ? '/cycles/visakka.png' :
    decodedSlug.includes('panther') ? '/cycles/panther.png' :
    decodedSlug.includes('lahari') ? '/cycles/lahari.png' :
    decodedSlug.includes('savitri') ? '/cycles/savitri.png' :
    decodedSlug.includes('satya') ? '/cycles/satya.png' : null

  const image =
    featuredImage && typeof featuredImage === 'object' ? featuredImage : null
  const imageUrlValue =
    (featuredImage && typeof featuredImage === 'object' && featuredImage.url) ||
    imageUrl ||
    fallbackCycleImage ||
    null

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
                <Media resource={image} size="50vw" priority imgClassName="object-contain" />
              ) : imageUrlValue ? (
                <img
                  src={imageUrlValue}
                  alt={name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Image coming soon
                </div>
              )}
            </div>
            {gallery && gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.slice(0, 8).map((item: any, index: number) => {
                  const galleryImage =
                    item.image && typeof item.image === 'object' ? item.image : null
                  return (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted"
                    >
                      {galleryImage ? (
                        <Media resource={galleryImage} size="10vw" alt={item.altText ?? undefined} imgClassName="object-contain" />
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
                href={`/book-test-ride?model=${product.slug}`}
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
          ...(imageUrlValue ? { image: `${getServerSideURL()}${imageUrlValue}` } : {}),
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
