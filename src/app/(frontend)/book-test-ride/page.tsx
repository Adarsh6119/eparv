import type { Metadata } from 'next'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { MODEL_LIST, getModelBySlug } from '@/data/models'
import { COMPANY_DETAILS } from '@/data/company'
import { MessageCircle } from 'lucide-react'

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

        {/* WhatsApp Instant Booking Alternative */}
        <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-sm text-foreground flex items-center justify-center sm:justify-start gap-1.5">
              <MessageCircle className="size-4 text-emerald-500" />
              <span>Need Instant Scheduling?</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Chat directly with our ride coordinator on WhatsApp for same-day slots and home visits in your city.
            </p>
          </div>
          <a
            href={`https://wa.me/91${COMPANY_DETAILS.contact.phone}?text=${encodeURIComponent(
              `Hi Eparv, I would like to schedule a free test ride for ${resolvedModel?.name ?? 'an electric cycle'}${city ? ` in ${city}` : ''}.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 shadow-sm transition-colors shrink-0"
          >
            <MessageCircle className="size-4" />
            <span>Book via WhatsApp</span>
          </a>
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
