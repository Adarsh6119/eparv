import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import {
  Building2,
  Calendar,
  Clock,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { LeadForm } from '@/components/LeadForm'
import { COMPANY_DETAILS } from '@/data/company'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default function ContactPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_DETAILS.tradeName,
    legalName: COMPANY_DETAILS.legalName,
    taxID: COMPANY_DETAILS.gstin,
    foundingDate: COMPANY_DETAILS.foundedDate,
    founder: {
      '@type': 'Person',
      name: COMPANY_DETAILS.founder.name,
      jobTitle: COMPANY_DETAILS.founder.role,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${COMPANY_DETAILS.registeredAddress.line1}, ${COMPANY_DETAILS.registeredAddress.line2}`,
      addressLocality: COMPANY_DETAILS.registeredAddress.city,
      addressRegion: COMPANY_DETAILS.registeredAddress.state,
      postalCode: COMPANY_DETAILS.registeredAddress.pincode,
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY_DETAILS.contact.phoneFormatted,
      contactType: 'customer service',
      email: COMPANY_DETAILS.contact.email,
      availableLanguage: ['en', 'hi'],
    },
    url: getServerSideURL(),
  }

  return (
    <article className="pb-24 pt-16">
      <div className="container max-w-4xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <header className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Building2 className="size-3.5 text-energy" />
            <span>Official Corporate Contact Desk</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Contact Eparv Ingenuity
          </h1>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
            Have questions about electric cycle models, delivery timelines, authorized dealership allotments, or corporate fleet orders? Get in touch with our team directly.
          </p>
        </header>

        {/* Official Registered Office & Corporate Disclosure Card */}
        <section className="mb-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Corporate Headquarters
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                {COMPANY_DETAILS.legalName}
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="size-3.5" />
              <span>GST Verified Entity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Left: Contact Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="size-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground block">
                    Customer &amp; Business Inquiries
                  </span>
                  <a
                    href={COMPANY_DETAILS.contact.phoneTel}
                    className="text-base font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {COMPANY_DETAILS.contact.phoneFormatted}
                  </a>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    {COMPANY_DETAILS.contact.hours}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="size-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground block">
                    Official Email Desk
                  </span>
                  <a
                    href={`mailto:${COMPANY_DETAILS.contact.email}`}
                    className="text-sm sm:text-base font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {COMPANY_DETAILS.contact.email}
                  </a>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    Response within 24 business hours
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Registered Office & Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="size-4 text-energy" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground block">
                    Registered Office Address
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-foreground leading-snug block">
                    {COMPANY_DETAILS.registeredAddress.full}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/60 text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                    GSTIN
                  </span>
                  <span className="font-mono font-bold text-primary">
                    {COMPANY_DETAILS.gstin}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                    Founder &amp; Director
                  </span>
                  <span className="font-bold text-foreground">
                    {COMPANY_DETAILS.founder.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                    Incorporation Date
                  </span>
                  <span className="font-medium text-foreground">
                    {COMPANY_DETAILS.foundingDateDisplay}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                    Active Commuters
                  </span>
                  <span className="font-medium text-foreground">
                    {COMPANY_DETAILS.metrics.cyclesServedLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Enquiry Form */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-2">Send Us an Inquiry</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6">
            Share your requirements below and our regional coordinator will connect with you.
          </p>
          <LeadForm type="contact" submitLabel="Send Message" />
        </div>

        {/* Quick Link Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 text-sm hover:border-primary/50 transition-all">
            <h3 className="mb-1 font-bold text-foreground">Doorstep Test Rides</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Try an Eparv cycle in your own neighborhood with no commitment.
            </p>
            <Link href="/book-test-ride" className="text-xs font-bold text-primary hover:underline">
              Book Test Ride →
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-sm hover:border-primary/50 transition-all">
            <h3 className="mb-1 font-bold text-foreground">Dealer Partnerships</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Territory exclusive dealerships with 25%–35% retail margins.
            </p>
            <Link href="/become-a-dealer" className="text-xs font-bold text-primary hover:underline">
              Apply for Dealership →
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-sm hover:border-primary/50 transition-all">
            <h3 className="mb-1 font-bold text-foreground">Bulk &amp; Corporate Fleets</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Save ₹3,000+ monthly per rider on delivery and logistics fleets.
            </p>
            <Link href="/bulk-orders" className="text-xs font-bold text-primary hover:underline">
              Request Fleet Proposal →
            </Link>
          </div>
        </div>
      </div>

      <JsonLd data={orgSchema} />
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Contact Us | Eparv Ingenuity Private Limited',
  description:
    'Contact EPARV INGENUITY PRIVATE LIMITED: Registered office at Krishna Mall, Sector 12 Dwarka, New Delhi. Phone: +91 99689 84030, Email: eparvingenuiuty@gmail.com, GSTIN: 07AAGCE4054K1ZJ.',
  alternates: {
    canonical: `${getServerSideURL()}/contact`,
  },
  openGraph: mergeOpenGraph({
    title: 'Contact Us | Eparv Ingenuity Private Limited',
    description:
      'Official contact details, registered office, phone, email, and GST disclosures for EPARV INGENUITY PRIVATE LIMITED.',
    url: `${getServerSideURL()}/contact`,
  }),
}
