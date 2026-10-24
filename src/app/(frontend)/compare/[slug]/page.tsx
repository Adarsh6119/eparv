import type { Metadata } from 'next'
import Link from 'next/link'
import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DemoNotice } from '@/components/DemoNotice'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams: Promise<{
    with?: string
  }>
}

const fetchProducts = cache(async (slugs: string[]) => {
  if (slugs.length === 0) {
    return []
  }
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 10,
    overrideAccess: false,
    draft: false,
    pagination: false,
    where: {
      and: [{ _status: { equals: 'published' } }, { slug: { in: slugs } }],
    },
  })
  // Preserve the requested order.
  return slugs
    .map((slug) => result.docs.find((doc) => doc.slug === slug))
    .filter((doc): doc is Product => Boolean(doc))
})

export default async function ComparePage({ params, searchParams }: Args) {
  const { slug = '' } = await params
  const { with: withParam } = await searchParams
  const decodedSlug = decodeURIComponent(slug)

  const payload = await getPayload({ config: configPromise })

  // Products to compare against: ?with=slug2,slug3 — otherwise the newest
  // published products that are not the base product.
  let compareSlugs = (withParam ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 2)

  let others: Product[] = []
  if (compareSlugs.length === 0) {
    const fallback = await payload.find({
      collection: 'products',
      depth: 0,
      limit: 3,
      overrideAccess: false,
      draft: false,
      pagination: false,
      sort: '-updatedAt',
      where: {
        and: [{ _status: { equals: 'published' } }, { slug: { not_equals: decodedSlug } }],
      },
    })
    others = fallback.docs.slice(0, 2)
    compareSlugs = others.map((doc) => doc.slug)
  }

  const products = await fetchProducts([decodedSlug, ...compareSlugs])

  if (products.length === 0 || products[0].slug !== decodedSlug) {
    return <PayloadRedirects url={`/compare/${decodedSlug}`} />
  }

  const base = products[0]
  const compared = products.slice(1)
  const anyDemo = products.some((product) => product.isDemoData)

  const specRows: { label: string; get: (product: Product) => string }[] = [
    {
      label: 'Price',
      get: (p) =>
        typeof p.price === 'number'
          ? inr.format(typeof p.promotionalPrice === 'number' && p.promotionalPrice > 0 ? p.promotionalPrice : p.price)
          : '—',
    },
    { label: 'Category', get: (p) => p.category ?? '—' },
    { label: 'Battery capacity', get: (p) => p.batteryCapacity ?? '—' },
    { label: 'Motor power', get: (p) => p.motorPower ?? '—' },
    {
      label: 'Claimed range',
      get: (p) => (typeof p.claimedRangeKm === 'number' ? `${p.claimedRangeKm} km` : '—'),
    },
    {
      label: 'Charging time',
      get: (p) =>
        typeof p.chargingTimeHours === 'number' ? `${p.chargingTimeHours} hours` : '—',
    },
    {
      label: 'Maximum speed',
      get: (p) => (typeof p.topSpeedKmh === 'number' ? `${p.topSpeedKmh} km/h` : '—'),
    },
    { label: 'Weight', get: (p) => (typeof p.weightKg === 'number' ? `${p.weightKg} kg` : '—') },
    {
      label: 'Warranty',
      get: (p) => (typeof p.warrantyMonths === 'number' ? `${p.warrantyMonths} months` : '—'),
    },
    { label: 'Availability', get: (p) => p.availability ?? '—' },
  ]

  return (
    <article className="pb-24 pt-16">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electric Cycles', href: '/electric-cycles' },
            { label: `Compare ${base.name}` },
          ]}
        />

        <header className="mb-8">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Compare electric cycles
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            {base.name}
            {compared.length > 0 && ` compared with ${compared.map((p) => p.name).join(' and ')}`}
            . Swap models using the links below the table.
          </p>
        </header>

        {anyDemo && <DemoNotice className="mb-6" />}

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-card">
                <th scope="col" className="px-4 py-4 text-left font-semibold">
                  Specification
                </th>
                {products.map((product) => (
                  <th key={product.id} scope="col" className="px-4 py-4 text-left font-semibold">
                    <Link
                      href={`/electric-cycles/${product.slug}`}
                      className="hover:text-primary hover:underline"
                    >
                      {product.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specRows.map((row, index) => (
                <tr key={row.label} className={index % 2 === 0 ? 'bg-card' : 'bg-background'}>
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    {row.label}
                  </th>
                  {products.map((product) => (
                    <td key={product.id} className="px-4 py-3">
                      {row.get(product)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-card">
                <td className="px-4 py-4" />
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-4">
                    <Link
                      href={`/electric-cycles/${product.slug}#enquire`}
                      className="text-primary hover:underline"
                    >
                      Enquire →
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <CompareSwitcher baseSlug={base.slug} products={products} />
      </div>
    </article>
  )
}

/** Simple server-rendered switcher: links that change ?with= for the compared slots. */
const CompareSwitcher: React.FC<{ baseSlug: string; products: Product[] }> = ({
  baseSlug,
  products,
}) => {
  return (
    <section className="mt-8" aria-label="Change compared models">
      <h2 className="mb-3 text-lg font-semibold">Change compared models</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Compare the {products[0].name} against other models:
      </p>
      <ul className="flex flex-wrap gap-2">
        {products.slice(1).map((product) => (
          <li key={product.id}>
            <Link
              href={`/compare/${product.slug}`}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm hover:border-primary/50"
            >
              Start from {product.name}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/electric-cycles"
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm hover:border-primary/50"
          >
            Browse all cycles
          </Link>
        </li>
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">
        Tip: any product page’s comparison link can be shared directly, e.g.{' '}
        <code>/compare/{baseSlug}?with=other-model</code>
      </p>
    </section>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '' } = await params
  const decodedSlug = decodeURIComponent(slug)
  const products = await fetchProducts([decodedSlug])

  if (products.length === 0) {
    return { title: 'Comparison not found | Eparv' }
  }

  const title = `Compare ${products[0].name} | Eparv`

  return {
    title,
    description: `Compare the ${products[0].name} with other Eparv electric cycles — battery, motor, range, price and more side by side.`,
    alternates: {
      canonical: `${getServerSideURL()}/compare/${decodedSlug}`,
    },
    openGraph: mergeOpenGraph({
      title,
      url: `/compare/${decodedSlug}`,
    }),
  }
}
