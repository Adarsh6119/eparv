import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  ArrowRight,
  BatteryCharging,
  Leaf,
  Store,
  Wallet,
  Zap,
} from 'lucide-react'

import { Card } from '@/components/Card'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const BENEFITS = [
  {
    icon: Wallet,
    title: 'Lower running costs',
    text: 'Charge instead of refuel — daily commutes cost a fraction of petrol vehicles.',
  },
  {
    icon: Leaf,
    title: 'Zero tailpipe emissions',
    text: 'Every kilometre ridden on electric power keeps city air cleaner.',
  },
  {
    icon: Zap,
    title: 'Effortless riding',
    text: 'Electric assist smooths out headwinds, climbs and long rides.',
  },
  {
    icon: BatteryCharging,
    title: 'Charge anywhere',
    text: 'No special infrastructure — charge from a standard household socket.',
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
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [featured, latestPosts] = await Promise.all([
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
  ])

  const featuredProducts = featured?.docs ?? []
  const posts = latestPosts?.docs ?? []
  const firstCompareSlug = featuredProducts[0]?.slug

  return (
    <article className="pb-24">
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="container flex flex-col items-center gap-6 py-20 text-center md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
            <Zap className="size-4 text-primary" aria-hidden="true" />
            Electric cycles for India
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Ride further. Spend less. Emit nothing.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Eparv builds dependable electric cycles for daily commutes, weekend rides and delivery
            fleets — with a growing dealer network across India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/electric-cycles">
                Explore cycles <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/book-test-ride">Book a test ride</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This storefront is in development — product data shown is clearly marked demo content
            until officially verified.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-16" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="mb-8 text-2xl font-semibold md:text-3xl">
          Why ride electric?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="rounded-lg border border-border bg-card p-6">
              <benefit.icon className="mb-4 size-8 text-primary" aria-hidden="true" />
              <h3 className="mb-2 font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section className="container py-8" aria-labelledby="featured-heading">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="featured-heading" className="text-2xl font-semibold md:text-3xl">
              Featured electric cycles
            </h2>
            <Link
              href="/electric-cycles"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {featuredProducts.some((product) => product.isDemoData) && (
            <p className="mt-4 text-xs text-muted-foreground">
              Products marked “demo data” show placeholder specifications and prices for development
              purposes.
            </p>
          )}
        </section>
      )}

      {/* Comparison + dealer CTA */}
      <section className="container grid gap-6 py-16 lg:grid-cols-3" aria-label="Next steps">
        <div className="rounded-lg border border-border bg-card p-8 lg:col-span-1">
          <h2 className="mb-3 text-xl font-semibold">Not sure which model fits?</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Compare battery, motor, range and price side by side to find the right cycle for your
            rides.
          </p>
          <Button asChild variant="outline">
            <Link href={firstCompareSlug ? `/compare/${firstCompareSlug}` : '/electric-cycles'}>
              Compare cycles
            </Link>
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card p-8">
          <Store className="mb-4 size-8 text-primary" aria-hidden="true" />
          <h2 className="mb-3 text-xl font-semibold">Find a dealer near you</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Verified Eparv dealers offer test rides, service and local delivery.
          </p>
          <Button asChild variant="outline">
            <Link href="/dealers">Dealer directory</Link>
          </Button>
        </div>
        <div className="rounded-lg border border-primary/40 bg-primary/5 p-8">
          <Zap className="mb-4 size-8 text-primary" aria-hidden="true" />
          <h2 className="mb-3 text-xl font-semibold">Partner with Eparv</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Join as a dealership or supply cycles to your organisation at scale.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/become-a-dealer">Become a dealer</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/bulk-orders">Bulk orders</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-8" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="mb-8 text-2xl font-semibold md:text-3xl">
          Frequently asked questions
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group rounded-lg border border-border bg-card p-6">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Blog highlights */}
      {posts.length > 0 && (
        <section className="container py-16" aria-labelledby="blog-heading">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="blog-heading" className="text-2xl font-semibold md:text-3xl">
              From the blog
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              All articles <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} doc={post} relationTo="posts" />
            ))}
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="container py-8">
        <div className="rounded-lg border border-border bg-card p-8 text-center md:p-12">
          <h2 className="mb-3 text-2xl font-semibold md:text-3xl">Still have questions?</h2>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
            Send us a message — we respond to every enquiry about cycles, dealerships and bulk
            orders.
          </p>
          <Button asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
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
