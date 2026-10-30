import type { Metadata } from 'next'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { MODEL_LIST, getModelBySlug } from '@/data/models'

type Args = {
  searchParams: Promise<{
    model?: string
    product?: string // legacy support
    city?: string
  }>
}

export default async function BookTestRidePage({ searchParams }: Args) {
  const { model, product, city } = await searchParams
  const requestedModelSlug = model || product

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

  const dbProducts = (result?.docs ?? []).map((doc) => ({ slug: doc.slug, name: doc.name }))

  // Ensure all 5 official models are available in the dropdown
  const modelOptions = MODEL_LIST.map((m) => ({
    slug: m.slug,
    name: m.name,
  }))

  const combinedProducts = Array.from(
    new Map(
      [...modelOptions, ...dbProducts].map((p) => [p.slug.replace(/-electric-bike$/, ''), p]),
    ).values(),
  )

  const resolvedModel = requestedModelSlug ? getModelBySlug(requestedModelSlug) : undefined
  const defaultProductSlug = resolvedModel?.slug || requestedModelSlug

  return (
    <article className="pb-24 pt-16">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Book a Test Ride' }]} />

        <header className="mb-10">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Book a free test ride
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Experience the instant torque, whisper-quiet motor, and ergonomic comfort of an Eparv
            electric cycle. Choose your model, preferred date, and city for doorstep or dealer test
            rides.
          </p>
        </header>

        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <LeadForm
            type="test-ride"
            products={combinedProducts}
            defaultProductSlug={defaultProductSlug}
            defaultCity={city}
            submitLabel="Request free test ride"
          />
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ searchParams }: Args): Promise<Metadata> {
  const { model, product } = await searchParams
  const hasFilterParams = Boolean(model || product)

  return {
    alternates: {
      canonical: `${getServerSideURL()}/book-test-ride`,
    },
    robots: hasFilterParams
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    description:
      'Book a free Eparv electric cycle test ride — choose your model, city and preferred date.',
    openGraph: mergeOpenGraph({
      description: 'Book a free Eparv electric cycle test ride.',
      title: 'Book a Test Ride | Eparv',
      url: '/book-test-ride',
    }),
    title: 'Book a Test Ride | Eparv',
  }
}
