import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default function ContactPage() {
  return (
    <article className="pb-24 pt-16">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <header className="mb-10">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">Contact us</h1>
          <p className="max-w-2xl text-muted-foreground">
            Questions about cycles, deliveries, dealerships or bulk orders? Send us a message and
            our team will get back to you.
          </p>
        </header>

        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <LeadForm type="contact" submitLabel="Send message" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5 text-sm">
            <h2 className="mb-1 font-semibold">Test rides</h2>
            <Link href="/book-test-ride" className="text-primary hover:underline">
              Book online →
            </Link>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 text-sm">
            <h2 className="mb-1 font-semibold">Dealerships</h2>
            <Link href="/become-a-dealer" className="text-primary hover:underline">
              Apply here →
            </Link>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 text-sm">
            <h2 className="mb-1 font-semibold">Bulk orders</h2>
            <Link href="/bulk-orders" className="text-primary hover:underline">
              Request a proposal →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/contact`,
  },
  description:
    'Contact the Eparv team about electric cycles, deliveries, dealerships and bulk orders.',
  openGraph: mergeOpenGraph({
    description: 'Contact the Eparv team.',
    title: 'Contact | Eparv',
    url: '/contact',
  }),
  title: 'Contact | Eparv',
}
