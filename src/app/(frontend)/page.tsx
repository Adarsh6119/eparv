import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  ArrowRight,
  ChevronRight,
  Gauge,
  MapPin,
  Shield,
  Sparkles,
  Store,
  Zap,
} from 'lucide-react'

import { Card } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { HeroShowcase } from '@/components/home/HeroShowcase'
import { TrustBadges } from '@/components/home/TrustBadges'
import { CycleLineup } from '@/components/home/CycleLineup'
import { SavingsCalculator } from '@/components/home/SavingsCalculator'
import { RidingModes } from '@/components/home/RidingModes'
import { TechAnatomy } from '@/components/home/TechAnatomy'
import { OwnershipJourney } from '@/components/home/OwnershipJourney'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { TestRideBanner } from '@/components/home/TestRideBanner'

const FAQS = [
  {
    question: 'How do I buy an Eparv electric cycle?',
    answer:
      'Browse our catalogue online, compare models, and send an enquiry directly from any product page or book a free test ride. Our customer support team confirms pricing, custom accessories, and doorstep delivery for your city before anything is finalized.',
  },
  {
    question: 'Do I need a driving license or RTO registration to ride an Eparv cycle?',
    answer:
      'No! Eparv electric cycles comply with the Central Motor Vehicles Rules (CMVR) for low-speed electric bicycles (under 250W power and maximum speed capped at 25 km/h). No driving license, road tax, or RTO registration is required by Indian law.',
  },
  {
    question: 'How long does the battery take to charge, and where do I charge it?',
    answer:
      'Every Eparv cycle comes with a portable, key-detachable Lithium-ion battery. You can unlock the battery and charge it inside your home, apartment, or office using any standard 5A wall socket in just 2 to 3 hours.',
  },
  {
    question: 'Can I try an Eparv cycle before making a purchase?',
    answer:
      'Yes, absolutely! We offer free 20-minute test rides. Simply visit our "Book a Test Ride" page, pick your preferred model and city, and our authorized team will schedule a slot either at your doorstep or nearest dealership.',
  },
  {
    question: 'What warranty and after-sales service does Eparv provide?',
    answer:
      'Every cycle is backed by a 60-month (5-year) frame warranty, a 24-month BLDC motor warranty, and a 12-month battery warranty. We have over 150 verified dealer and service centers across India for maintenance and spare parts.',
  },
  {
    question: 'How does the cycle arrive, and is assembly difficult?',
    answer:
      'Your cycle is delivered 95% pre-assembled in a reinforced carton. All major components including motor, wiring, brakes, and rear wheel are factory-installed. You only need to attach the pedals and align the handlebar using the complimentary toolkit provided.',
  },
  {
    question: 'How do I become an authorized Eparv dealer or franchise partner?',
    answer:
      'Visit our Become a Dealer page and fill out your business profile, city, and planned investment scale. Our partnerships team verifies applications within 48 hours and provides showroom branding, demo units, and technician training.',
  },
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const latestPosts = await payload
    .find({
      collection: 'posts',
      depth: 1,
      limit: 3,
      overrideAccess: false,
      draft: false,
      pagination: false,
      where: {
        _status: { equals: 'published' },
      },
      sort: '-publishedAt',
    })
    .catch(() => null)

  const posts = latestPosts?.docs ?? []

  return (
    <article className="pb-0 overflow-x-hidden">
      {/* 1. HERO SHOWCASE WITH MODEL SWITCHER (100% REAL CYCLE PHOTOS) */}
      <HeroShowcase />

      {/* 2. STATS & TRUST PILLARS BAR */}
      <TrustBadges />

      {/* 3. UNIFIED ELECTRIC CYCLE LINEUP (REAL PHOTOS + FILTERS + COMPARISON TOGGLE) */}
      <CycleLineup />

      {/* 4. INTERACTIVE FUEL SAVINGS CALCULATOR */}
      <SavingsCalculator />

      {/* 5. 4-IN-1 INTELLIGENT RIDING MODES */}
      <RidingModes />

      {/* 6. TECHNOLOGY & ANATOMY DEEP DIVE */}
      <TechAnatomy />

      {/* 7. 4-STEP EFFORTLESS OWNERSHIP JOURNEY */}
      <OwnershipJourney />

      {/* 8. TEST RIDE & CITY ACTION BANNER */}
      <TestRideBanner />

      {/* 9. SOCIAL PROOF & CUSTOMER REVIEWS */}
      <TestimonialsSection />

      {/* 10. PARTNERSHIP & NEXT STEPS CTA CARDS */}
      <section className="container grid gap-6 py-20 lg:grid-cols-3" aria-label="Next steps">
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
              <Gauge className="size-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Explore All Models</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Compare motor power, battery capacity, range, and pricing side-by-side to find the right cycle for your daily commute.
            </p>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/electric-cycles">Open Model Catalogue</Link>
            </Button>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-energy/10 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 inline-flex rounded-xl bg-energy/10 p-3">
              <Store className="size-6 text-energy" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Find a Dealer Near You</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              150+ verified Eparv dealerships offer walk-in test rides, instant delivery, genuine accessories, and servicing.
            </p>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/dealers">Explore Dealer Directory</Link>
            </Button>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-energy/5 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
              <Zap className="size-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Partner with Eparv</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Expand your showroom with India&apos;s fast-growing EV brand or procure electric fleet cycles for commercial deliveries.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-xl bg-primary text-white hover:bg-primary/90">
                <Link href="/become-a-dealer">Become a Dealer</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/bulk-orders">Bulk Fleet Orders</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-card/40 py-20 border-t border-border" aria-labelledby="faq-heading">
        <div className="container">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-primary">
              Got Questions? We Have Answers
            </span>
            <h2 id="faq-heading" className="text-3xl font-extrabold tracking-tight md:text-4xl text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need to know about charging, warranty, range, and legal compliance.
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-3.5">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary/40 shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden list-none">
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
                </summary>
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. BLOG & EV GUIDES HIGHLIGHTS */}
      {posts.length > 0 && (
        <section className="container py-20 border-t border-border" aria-labelledby="blog-heading">
          <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-primary">
                Guides & News
              </span>
              <h2 id="blog-heading" className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                Electric Mobility Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              <span>View all articles</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} doc={post} relationTo="posts" />
            ))}
          </div>
        </section>
      )}

      {/* 13. FINAL CONTACT CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-card to-energy/15 py-24 border-t border-border">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="container relative text-center">
          <div className="mx-auto max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Zap className="size-3.5 text-energy" aria-hidden="true" />
              <span>Switch to Zero Emission Riding</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Ready to Upgrade Your Daily Commute?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Join thousands of Indian riders saving lakhs on petrol, skipping traffic jams, and breathing cleaner air. Book your free test ride today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <Link
                href="/book-test-ride"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Book a Free Test Ride</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/electric-cycles"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-8 text-sm font-bold text-foreground transition-all hover:border-primary/40 hover:bg-muted"
              >
                <span>Explore All Cycles</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Contact Support</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export const metadata: Metadata = {
  description:
    'Eparv builds dependable electric cycles for daily commutes, weekend rides and delivery fleets across India. 250W BLDC motor, 110km range, 5-year frame warranty. Book a test ride today.',
  openGraph: mergeOpenGraph({
    description:
      'Eparv builds dependable electric cycles for daily commutes, weekend rides and delivery fleets across India. 250W BLDC motor, up to 110km range.',
    title: 'Eparv — Next-Gen Electric Cycles for India',
    url: '/',
  }),
  title: 'Eparv — Next-Gen Electric Cycles for India',
}
