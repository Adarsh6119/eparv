import type { Metadata } from 'next'
import React from 'react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const BULK_POINTS = [
  {
    title: 'Last-mile delivery fleets',
    text: 'Electric cycles keep per-kilometre costs low for delivery and courier operations.',
  },
  {
    title: 'Campuses & institutions',
    text: 'Reliable low-maintenance mobility for large campuses, resorts and industrial estates.',
  },
  {
    title: 'Employee programs',
    text: 'Offer sustainable commute benefits to your team with fleet-scale pricing.',
  },
]

export default function BulkOrdersPage() {
  return (
    <article className="pb-24 pt-16">
      <div className="container max-w-5xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Bulk Orders' }]} />

        <header className="mb-10">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Corporate & bulk orders
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Supplying electric cycles for delivery fleets, campuses and employee programs. Tell us
            your requirements and we respond with a tailored proposal.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <h2 className="mb-2 text-xl font-semibold">Bulk enquiry</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Fields marked * are required. Quantity is an estimate — exact numbers are confirmed
                later.
              </p>
              <LeadForm type="bulk-order" submitLabel="Send bulk enquiry" />
            </div>
          </div>

          <aside className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Who bulk orders suit</h2>
            <div className="space-y-4">
              {BULK_POINTS.map((point) => (
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
    canonical: `${getServerSideURL()}/bulk-orders`,
  },
  description:
    'Eparv corporate and bulk orders — electric cycle fleets for delivery, campuses and employee programs.',
  openGraph: mergeOpenGraph({
    description: 'Eparv corporate and bulk electric cycle orders.',
    title: 'Bulk Orders | Eparv',
    url: '/bulk-orders',
  }),
  title: 'Bulk Orders | Eparv',
}
