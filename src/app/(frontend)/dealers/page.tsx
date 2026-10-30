import type { Metadata } from 'next'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DealerHero } from '@/components/dealers/DealerHero'
import { DealerBenefits } from '@/components/dealers/DealerBenefits'
import { DealerTiers } from '@/components/dealers/DealerTiers'
import { DealerDirectory } from '@/components/dealers/DealerDirectory'
import { DealerOnboarding } from '@/components/dealers/DealerOnboarding'
import { DealerApplicationSection } from '@/components/dealers/DealerApplicationSection'
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
    <article className="pb-12">
      {/* Top Breadcrumb Bar */}
      <div className="bg-muted/30 border-b border-border/40 py-3">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dealers & Franchise' }]} />
        </div>
      </div>

      {/* Hero Showcase with Key Franchise Value Pillars */}
      <DealerHero />

      {/* Demo data notice if any demo entries are loaded in dev */}
      {anyDemo && (
        <div className="container py-2">
          <p className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border inline-block">
            Note: Dealerships marked “demo data” are placeholder entries for development — not real businesses.
          </p>
        </div>
      )}

      {/* Core Business Advantages (Margins, Territory Lock, Turnkey Support) */}
      <DealerBenefits />

      {/* Dealership Investment Tiers & Model Specifications */}
      <DealerTiers />

      {/* Interactive Dealer Directory & Open Territory Finder */}
      <DealerDirectory
        dealers={dealers}
        states={states}
        selectedState={state}
      />

      {/* 4-Step Launch Onboarding Timeline, FAQs, and Direct Expansion Hotline */}
      <DealerOnboarding />

      {/* Lead Application Form Section with Trust Commitments */}
      <DealerApplicationSection />
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/dealers`,
  },
  description:
    'Start an authorized Eparv electric cycle dealership. Earn 25%–35% gross margins, territory exclusivity, turnkey branding, and direct customer leads. Locate authorized dealers or apply today.',
  openGraph: mergeOpenGraph({
    description:
      'Partner with Eparv Electric Cycles: High retail margins, territory lock, turnkey showroom support, and zero royalty. Find existing showrooms or apply now.',
    title: 'Electric Cycle Dealership & Franchise Program | Eparv',
    url: '/dealers',
  }),
  title: 'Electric Cycle Dealership & Franchise Program | Eparv',
}
