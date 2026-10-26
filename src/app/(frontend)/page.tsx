import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  ArrowRight,
  BatteryCharging,
  ChevronRight,
  Gauge,
  Leaf,
  MapPin,
  Shield,
  Store,
  Timer,
  Wallet,
  Zap,
} from 'lucide-react'

import { Card } from '@/components/Card'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const STATS = [
  { value: '250W', label: 'BLDC Motor Power' },
  { value: '110km', label: 'Max Range (PAS)' },
  { value: '25km/h', label: 'Top Speed' },
  { value: '150kg', label: 'Load Capacity' },
]

const BENEFITS = [
  {
    icon: Wallet,
    title: 'Lower running costs',
    text: 'Charge instead of refuel — daily commutes cost a fraction of petrol vehicles.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Leaf,
    title: 'Zero emissions',
    text: 'Every kilometre on electric power keeps city air cleaner for everyone.',
    gradient: 'from-green-500/20 to-lime-500/20',
  },
  {
    icon: Zap,
    title: 'Effortless riding',
    text: 'Electric assist smooths out headwinds, climbs and long-distance rides.',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: BatteryCharging,
    title: 'Charge anywhere',
    text: 'No special infrastructure — plug into any standard household socket.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Shield,
    title: 'Anti-theft security',
    text: 'Key ignition with anti-theft feature in both battery and bicycle.',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    icon: Timer,
    title: 'Quick charge',
    text: 'Full charge in just 2–3 hours from any standard power outlet.',
    gradient: 'from-rose-500/20 to-pink-500/20',
  },
]

const FAQS = [
  {
    question: 'How do I buy an Eparv electric cycle?',
    answer:
      'Browse the catalogue, then send an enquiry from any product page or visit a verified dealer. Our team will confirm pricing, availability and delivery for your city before anything is finalised.',
  },
  {
    question: 'Can I try a cycle before buying?',
    answer:
      'Yes — book a free test ride from the Book a Test Ride page. Choose the model, your city and a preferred date, and our team will arrange the rest.',
  },
  {
    question: 'Do you deliver to my city?',
    answer:
      'Delivery availability depends on the model and our dealer network. Product pages list eligible delivery locations, and every enquiry confirms availability for your city before purchase.',
  },
  {
    question: 'How do I become an Eparv dealer?',
    answer:
      'Apply through the Become a Dealer page with your business details and planned investment range. Our partnerships team verifies each application before onboarding.',
  },
  {
    question: 'Do you supply fleets or corporate bulk orders?',
    answer:
      'Yes. Use the Bulk Orders page to tell us your organisation, quantity and timeline — we respond with a tailored proposal.',
  },
  {
    question: 'What warranty do Eparv cycles come with?',
    answer:
      'Every Eparv cycle includes a 60-month frame warranty, 24-month motor warranty, and 12-month battery warranty. Controller and charger carry a 6-month warranty.',
  },
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [featured, latestPosts, heroProduct] = await Promise.all([
    payload
      .find({
        collection: 'products',
        depth: 1,
        limit: 4,
        overrideAccess: false,
        draft: false,
        pagination: false,
        where: {
          and: [{ _status: { equals: 'published' } }, { isFeatured: { equals: true } }],
        },
        sort: '-updatedAt',
      })
      .catch(() => null),
    payload
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
      .catch(() => null),
    // Specifically fetch the Visakka product for hero/showcase imagery
    payload
      .find({
        collection: 'products',
        depth: 1,
        limit: 1,
        overrideAccess: false,
        draft: false,
        pagination: false,
        where: {
          and: [
            { _status: { equals: 'published' } },
            { slug: { equals: 'eparv-visakka' } },
          ],
        },
      })
      .catch(() => null),
  ])

  const featuredProducts = featured?.docs ?? []
  const posts = latestPosts?.docs ?? []

  // Use the Visakka product image for hero & showcase sections
  const visakka = heroProduct?.docs?.[0] ?? null
  const visakkaImg = visakka?.featuredImage && typeof visakka.featuredImage === 'object' ? visakka.featuredImage : null
  const heroImages = visakkaImg?.url
    ? [{ url: visakkaImg.url, alt: visakka?.name ?? 'Eparv Electric Cycle', slug: visakka?.slug ?? '' }]
    : featuredProducts
        .map((p) => {
          const img = p.featuredImage && typeof p.featuredImage === 'object' ? p.featuredImage : null
          return img?.url ? { url: img.url, alt: p.name, slug: p.slug } : null
        })
        .filter(Boolean)
        .slice(0, 1)

  return (
    <article className="pb-0">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#061220]">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-energy/10 blur-[100px] animate-pulse [animation-delay:1s]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[80px] animate-pulse [animation-delay:2s]" />
        </div>

        {/* Cycle images floating in background */}
        {heroImages.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-end opacity-[0.12] pointer-events-none" aria-hidden="true">
            <div className="relative w-[70%] h-full max-w-4xl">
              {heroImages[0] && (
                <img
                  src={heroImages[0].url}
                  alt=""
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-auto max-h-[80%] object-contain drop-shadow-2xl"
                />
              )}
            </div>
          </div>
        )}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm">
              <Zap className="size-4 text-energy" aria-hidden="true" />
              <span className="font-medium">Electric Cycles for India</span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              Ride further.{' '}
              <span className="bg-gradient-to-r from-primary via-[#4ec1ef] to-energy bg-clip-text text-transparent">
                Spend less.
              </span>
              <br />
              Emit nothing.
            </h1>

            {/* Subheading */}
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
              Dependable electric cycles for daily commutes, weekend adventures and delivery
              fleets — with a growing dealer network across India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/electric-cycles"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Explore Cycles
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/book-test-ride"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
              >
                Book a Test Ride
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="relative -mt-16 z-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-xl md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 bg-card px-6 py-6 text-center">
                <span className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      {featuredProducts.length > 0 && (
        <section className="container py-20" aria-labelledby="featured-heading">
          <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Our Lineup
              </span>
              <h2 id="featured-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
                Featured Electric Cycles
              </h2>
            </div>
            <Link
              href="/electric-cycles"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View all models
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ═══ ABOUT / WHY ELECTRIC SPLIT ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-card via-card to-primary/5 py-20">
        {/* Decorative circle */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[60px]" aria-hidden="true" />

        <div className="container relative">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Why Go Electric
            </span>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need for the perfect ride
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} aria-hidden="true" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                    <benefit.icon className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT SHOWCASE BANNER ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a1628] via-[#0d2137] to-[#0a1628] py-20">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="container relative">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-energy">
                Built for India
              </span>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                From city streets to mountain trails
              </h2>
              <p className="mb-6 text-lg text-white/60">
                Whether you need a classic roadster for daily commutes or a rugged MTB with
                suspension for off-road adventures — there&apos;s an Eparv for every rider.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  { icon: Gauge, text: '250W BLDC hub motor with 24-month warranty' },
                  { icon: BatteryCharging, text: 'Up to 110 km range with pedal assist' },
                  { icon: Shield, text: 'Anti-theft key ignition system' },
                  { icon: MapPin, text: 'Growing dealer network across India' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                      <item.icon className="size-4 text-primary" aria-hidden="true" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
              <Link
                href="/electric-cycles"
                className="group inline-flex h-11 items-center gap-2 rounded-xl bg-energy px-6 text-sm font-semibold text-[#0a1628] transition-all hover:bg-energy/90 hover:-translate-y-0.5"
              >
                Explore All Models
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            {/* Cycle image showcase */}
            <div className="relative flex items-center justify-center">
              {heroImages[0] && (
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-[40px]" aria-hidden="true" />
                  <img
                    src={heroImages[0].url}
                    alt={heroImages[0].alt || 'Eparv electric cycle'}
                    className="relative w-full max-w-lg drop-shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA CARDS ═══ */}
      <section className="container grid gap-6 py-20 lg:grid-cols-3" aria-label="Next steps">
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
              <Gauge className="size-6 text-primary" aria-hidden="true" />
            </div>
            <h2 className="mb-3 text-xl font-semibold">Not sure which model?</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Compare battery, motor, range and price side by side to find the right cycle for your rides.
            </p>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/electric-cycles">Compare cycles</Link>
            </Button>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-energy/5 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 inline-flex rounded-xl bg-energy/10 p-3">
              <Store className="size-6 text-energy" aria-hidden="true" />
            </div>
            <h2 className="mb-3 text-xl font-semibold">Find a dealer near you</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Verified Eparv dealers offer test rides, service and local delivery across India.
            </p>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/dealers">Dealer directory</Link>
            </Button>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-energy/5 p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
              <Zap className="size-6 text-primary" aria-hidden="true" />
            </div>
            <h2 className="mb-3 text-xl font-semibold">Partner with Eparv</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Join as a dealership or supply cycles to your organisation at scale.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-xl">
                <Link href="/become-a-dealer">Become a dealer</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/bulk-orders">Bulk orders</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-card/50 py-20" aria-labelledby="faq-heading">
        <div className="container">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Support
            </span>
            <h2 id="faq-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary/20"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold transition-colors hover:text-primary [&::-webkit-details-marker]:hidden list-none">
                  {faq.question}
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
                </summary>
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Blog highlights */}
      {posts.length > 0 && (
        <section className="container py-20" aria-labelledby="blog-heading">
          <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Latest Updates
              </span>
              <h2 id="blog-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
                From the Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              All articles <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} doc={post} relationTo="posts" />
            ))}
          </div>
        </section>
      )}

      {/* ═══ CONTACT CTA ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-energy/10 py-20">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" aria-hidden="true" />
        <div className="container relative text-center">
          <div className="mx-auto max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="size-3.5" aria-hidden="true" />
              Get in Touch
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Ready to go electric?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Whether you have questions about a model, pricing, or deliveries — our team is here to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
              >
                Contact Us
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/book-test-ride"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-8 text-sm font-semibold transition-all hover:border-primary/30 hover:shadow-md"
              >
                Book a Test Ride
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
    'Eparv builds dependable electric cycles for daily commutes, weekend rides and delivery fleets across India. Explore models, book a test ride or find a dealer.',
  openGraph: mergeOpenGraph({
    description:
      'Eparv builds dependable electric cycles for daily commutes, weekend rides and delivery fleets across India.',
    title: 'Eparv — Electric Cycles for India',
    url: '/',
  }),
  title: 'Eparv — Electric Cycles for India',
}
