import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  Battery,
  Calendar,
  CheckCircle2,
  Gauge,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CycleLineup } from '@/components/home/CycleLineup'
import { TrustBadges } from '@/components/home/TrustBadges'
import { TestRideBanner } from '@/components/home/TestRideBanner'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type Args = {
  searchParams: Promise<{
    category?: string
    page?: string
  }>
}

export default async function CataloguePage({ searchParams }: Args) {
  const { category } = await searchParams

  const mappedCategory =
    category === 'off-road'
      ? 'trail'
      : category === 'city-commuter'
      ? 'city-commute'
      : category === 'cargo'
      ? 'city-commute'
      : 'all'

  return (
    <article className="pb-16">
      {/* Top Breadcrumb Bar */}
      <div className="bg-muted/30 border-b border-border/40 py-3">
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Electric Cycles' }]}
          />
        </div>
      </div>

      {/* Main Unified Electric Cycle Lineup */}
      <CycleLineup
        id="electric-cycle-catalogue"
        badgeText="Official 2026 Eparv Lineup"
        title="Explore All Electric Cycles"
        subtitle="100% proper electric cycles engineered with 250W high-torque hub motors, smart BMS detachable lithium batteries, and reinforced frames. Compare specs or choose the model that fits your ride."
        initialFilter={mappedCategory as any}
      />

      {/* Trust Pillars */}
      <TrustBadges />

      {/* Test Ride & Dealer Locator Banner */}
      <TestRideBanner />
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/electric-cycles`,
  },
  description:
    'Browse all Eparv electric cycles — Panther, Visakka, Lahari, Savitri, and Satya with high-torque 250W BLDC hub motors, long-range lithium batteries, and dual disc brakes.',
  openGraph: mergeOpenGraph({
    description:
      'Browse every Eparv electric cycle with battery, motor and range details. Compare models side-by-side.',
    title: 'Electric Cycles Lineup & Comparison | Eparv',
    url: '/electric-cycles',
  }),
  title: 'Electric Cycles Lineup & Comparison | Eparv',
}
