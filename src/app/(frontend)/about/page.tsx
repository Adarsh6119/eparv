import type { Metadata } from 'next'
import React from 'react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutStory } from '@/components/about/AboutStory'
import { AboutStats } from '@/components/about/AboutStats'
import { AboutInnovations } from '@/components/about/AboutInnovations'
import { AboutLineup } from '@/components/about/AboutLineup'
import { AboutValues } from '@/components/about/AboutValues'
import { AboutCta } from '@/components/about/AboutCta'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default function AboutPage() {
  return (
    <article className="pb-12">
      {/* Top Breadcrumb Bar */}
      <div className="bg-muted/30 border-b border-border/40 py-3">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
        </div>
      </div>

      {/* Hero: Engineering Clean Urban Freedom */}
      <AboutHero />

      {/* Origin Story, Mission & Vision */}
      <AboutStory />

      {/* Impact Numbers & Metrics */}
      <AboutStats />

      {/* Engineering Innovations & Technical Advantage */}
      <AboutInnovations />

      {/* Complete Cycle Lineup Showcase */}
      <AboutLineup />

      {/* Core Principles & 40-Point Quality Inspection */}
      <AboutValues />

      {/* Action CTAs for Riders, Dealers & Fleets */}
      <AboutCta />
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/about`,
  },
  description:
    'Learn about Eparv Ingenuity — pioneering India’s electric cycle revolution with indigenous high-torque 250W BLDC hub motors, smart BMS lithium batteries, and tough frames built for Indian roads.',
  openGraph: mergeOpenGraph({
    description:
      'Pioneering clean, effortless urban mobility in India. Explore Eparv’s story, engineering principles, and mission to empower 100,000+ daily commuters.',
    title: 'About Us | Eparv Electric Cycles',
    url: '/about',
  }),
  title: 'About Us | Eparv Electric Cycles',
}
