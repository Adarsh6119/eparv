import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductCard } from '@/components/ProductCard'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const PAGE_SIZE = 12

const CATEGORIES = [
  { value: '', label: 'All cycles' },
  { value: 'city-commuter', label: 'City Commuter' },
  { value: 'foldable', label: 'Foldable' },
  { value: 'off-road', label: 'Off-Road / MTB' },
  { value: 'cargo', label: 'Cargo / Utility' },
  { value: 'kids', label: 'Kids' },
]

type Args = {
  searchParams: Promise<{
    category?: string
    page?: string
  }>
}

export default async function CataloguePage({ searchParams }: Args) {
  const { category, page } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const pageNumber = Math.max(1, Number(page) || 1)
  const activeCategory = CATEGORIES.some((c) => c.value === category) ? category : undefined

  const result = await payload.find({
    collection: 'products',
    depth: 1,
    limit: PAGE_SIZE,
    page: pageNumber,
    overrideAccess: false,
    draft: false,
    sort: '-updatedAt',
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(activeCategory ? [{ category: { equals: activeCategory } }] : []),
      ],
    },
  })

  const products = result.docs
  const totalPages = result.totalPages ?? 1
  const hasAnyDemo = products.some((product) => product.isDemoData)

  return (
    <article className="pb-24 pt-16">
      <div className="container">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Electric Cycles' }]}
        />

        <header className="mb-8">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Electric cycles
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Every Eparv model with battery, motor and range details. Send an enquiry from any
            product page to check pricing and delivery for your city.
          </p>
        </header>

        {/* Category filter */}
        <nav aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((option) => {
            const isActive = option.value === (activeCategory ?? '')
            const href = option.value
              ? `/electric-cycles?category=${option.value}`
              : '/electric-cycles'
            return (
              <Link
                key={option.value || 'all'}
                href={href}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:border-primary/50',
                )}
              >
                {option.label}
              </Link>
            )
          })}
        </nav>

        {products.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground">
            No cycles published in this category yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {hasAnyDemo && (
          <p className="mt-4 text-xs text-muted-foreground">
            Products marked “demo data” show placeholder specifications and prices for development
            purposes.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Catalogue pages"
            className="mt-10 flex items-center justify-center gap-2"
          >
            {pageNumber > 1 && (
              <Link
                href={`/electric-cycles?page=${pageNumber - 1}${activeCategory ? `&category=${activeCategory}` : ''}`}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary/50"
              >
                Previous
              </Link>
            )}
            <span className="px-2 text-sm text-muted-foreground">
              Page {pageNumber} of {totalPages}
            </span>
            {pageNumber < totalPages && (
              <Link
                href={`/electric-cycles?page=${pageNumber + 1}${activeCategory ? `&category=${activeCategory}` : ''}`}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary/50"
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/electric-cycles`,
  },
  description:
    'Browse every Eparv electric cycle — city commuters, foldable, off-road, cargo and kids models with battery, motor and range details.',
  openGraph: mergeOpenGraph({
    description:
      'Browse every Eparv electric cycle with battery, motor and range details.',
    title: 'Electric Cycles | Eparv',
    url: '/electric-cycles',
  }),
  title: 'Electric Cycles | Eparv',
}
