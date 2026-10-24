import type { Metadata } from 'next'
import React from 'react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const PARTNER_POINTS = [
  {
    title: 'Growing category',
    text: 'Electric cycles are an emerging mobility category across Indian cities and towns.',
  },
  {
    title: 'Full support',
    text: 'Dealer partners get onboarding, marketing support and service guidance from the Eparv team.',
  },
  {
    title: 'Flexible investment',
    text: 'Tell us your planned investment range — we shape the partnership around your business.',
  },
]

export default function BecomeADealerPage() {
  return (
    <article className="pb-24 pt-16">
      <div className="container max-w-5xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Become a Dealer' }]} />

        <header className="mb-10">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Become an Eparv dealer
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Apply to stock, sell and service Eparv electric cycles in your city. Our partnerships
            team reviews every application and verifies business details before onboarding.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <h2 className="mb-2 text-xl font-semibold">Dealer application</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Fields marked * are required. We use your details only to process this application.
              </p>
              <LeadForm type="dealer" submitLabel="Submit application" />
            </div>
          </div>

          <aside className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Why partner with Eparv</h2>
            <div className="space-y-4">
              {PARTNER_POINTS.map((point) => (
                <div key={point.title} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="mb-1 font-semibold">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.text}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/become-a-dealer`,
  },
  description:
    'Apply to become a verified Eparv electric cycle dealer — stock, sell and service EV cycles in your city.',
  openGraph: mergeOpenGraph({
    description: 'Apply to become a verified Eparv electric cycle dealer.',
    title: 'Become a Dealer | Eparv',
    url: '/become-a-dealer',
  }),
  title: 'Become a Dealer | Eparv',
}
