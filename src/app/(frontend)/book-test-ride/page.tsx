import type { Metadata } from 'next'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type Args = {
  searchParams: Promise<{
    product?: string
    city?: string
  }>
}

export default async function BookTestRidePage({ searchParams }: Args) {
  const { product, city } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const result = await payload
    .find({
      collection: 'products',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      draft: false,
      pagination: false,
      sort: 'name',
      where: {
        _status: { equals: 'published' },
      },
      select: {
        slug: true,
        name: true,
      },
    })
    .catch(() => null)

  const products = (result?.docs ?? []).map((doc) => ({ slug: doc.slug, name: doc.name }))
  const defaultProduct = products.some((p) => p.slug === product) ? product : undefined

  return (
    <article className="pb-24 pt-16">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Book a Test Ride' }]} />

        <header className="mb-10">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Book a free test ride
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Choose the model you’d like to ride, your city and a preferred date. Our team or the
            nearest verified dealer will confirm the appointment.
          </p>
        </header>

        {products.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground">
            Test rides open as soon as our first models are published. Check back shortly.
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <LeadForm
              type="test-ride"
              products={products}
              defaultProductSlug={defaultProduct}
              defaultCity={city}
              submitLabel="Request test ride"
            />
          </div>
        )}
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/book-test-ride`,
  },
  description:
    'Book a free Eparv electric cycle test ride — choose your model, city and preferred time.',
  openGraph: mergeOpenGraph({
    description: 'Book a free Eparv electric cycle test ride.',
    title: 'Book a Test Ride | Eparv',
    url: '/book-test-ride',
  }),
  title: 'Book a Test Ride | Eparv',
}
