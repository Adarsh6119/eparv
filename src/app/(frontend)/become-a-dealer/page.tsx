import type { Metadata } from 'next'
import React from 'react'
import { Building2, MessageCircle, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadForm } from '@/components/LeadForm'
import { DealerBenefits } from '@/components/dealers/DealerBenefits'
import { DealerTiers } from '@/components/dealers/DealerTiers'
import { DealerOnboarding } from '@/components/dealers/DealerOnboarding'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { COMPANY_DETAILS } from '@/data/company'

export default function BecomeADealerPage() {
  return (
    <article className="pb-24 pt-16">
      <div className="container max-w-6xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Become a Dealer' }]} />

        {/* Hero Section */}
        <header className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-4">
            <Sparkles className="size-4 text-energy" />
            <span>Pan-India Franchise Expansion</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Partner with Eparv:{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              Authorized Dealership Opportunity
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Join India&apos;s fastest-growing electric cycle network. Stock, showcase, and retail high-torque 250W electric cycles with complete pin-code territory protection, turnkey showroom branding, technician training, and direct website lead routing.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-500" /> Pin-Code Exclusivity
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="size-4 text-primary" /> Turnkey Store Branding
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-energy" /> 100% Website Lead Pass-through
            </span>
          </div>
        </header>

        {/* Core Dealer Benefits */}
        <DealerBenefits />

        {/* Investment Tiers & Stocking Models */}
        <DealerTiers />

        {/* Onboarding Timeline & FAQs */}
        <DealerOnboarding />

        {/* Dealer Application Form Section */}
        <section id="apply" className="my-16 scroll-mt-24 max-w-3xl mx-auto">
          <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-10 shadow-xl">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Confidential Application</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                Apply for an Eparv Dealership
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Fill out the application below. Our partnerships team verifies every business profile and evaluates local territory availability within 48 hours.
              </p>
            </div>

            <LeadForm type="dealer" submitLabel="Submit Dealer Application" />

            {/* Direct Phone / WhatsApp Support */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs font-bold text-foreground">Have questions before applying?</p>
                <p className="text-[11px] text-muted-foreground">Talk directly to our franchise expansion desk.</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={COMPANY_DETAILS.contact.phoneTel}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <PhoneCall className="size-3.5 text-primary" />
                  <span>Call {COMPANY_DETAILS.contact.phoneFormatted}</span>
                </a>
                <a
                  href={`https://wa.me/91${COMPANY_DETAILS.contact.phone}?text=${encodeURIComponent(
                    'Hello Eparv Franchise Team, I am interested in discussing dealership opportunities in my city.',
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 text-xs font-bold shadow-sm transition-colors"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${getServerSideURL()}/become-a-dealer`,
  },
  description:
    'Apply to become an authorized Eparv electric cycle dealer. Explore franchise investment tiers, pin-code exclusivity, showroom branding support, and profit margins.',
  openGraph: mergeOpenGraph({
    description:
      'Apply to become an authorized Eparv electric cycle dealer. Explore franchise investment tiers, pin-code exclusivity, showroom branding support, and profit margins.',
    title: 'Become a Dealer | Eparv Electric Cycles',
    url: `${getServerSideURL()}/become-a-dealer`,
  }),
  title: 'Become an Authorized Dealer | Eparv Electric Cycles',
}
