'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Building2,
  Compass,
  Mail,
  MapPin,
  PhoneCall,
  Sparkles,
  Store,
  Truck,
  Zap,
} from 'lucide-react'

export const AboutCta: React.FC = () => {
  return (
    <section className="py-20 relative bg-background overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 -top-24 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-primary/10 blur-[130px]" />
      </div>

      <div className="container relative z-10 space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
            <Zap className="size-3.5 text-energy" />
            <span>Join the Electric Revolution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Get Started with Eparv
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Whether you want to upgrade your daily commute, establish an authorized showroom, or
            electrify your delivery fleet, we are ready to assist.
          </p>
        </div>

        {/* 3 Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: For Riders */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all hover:border-primary/50 group">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Compass className="size-6" />
              </div>
              <h3 className="font-bold text-xl text-foreground">For Riders & Commuters</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Take an Eparv electric cycle for a spin in your neighborhood or locate your closest
                authorized experience center.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/book-test-ride"
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-all"
              >
                <span>Book Free Test Ride</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/dealers"
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition-all"
              >
                <MapPin className="size-4 text-primary" />
                <span>Locate a Showroom</span>
              </Link>
            </div>
          </div>

          {/* Card 2: For Dealers */}
          <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md hover:shadow-lg transition-all relative group">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-energy text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
              Lucrative Opportunity
            </span>

            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-energy/20 text-energy group-hover:bg-energy group-hover:text-slate-950 transition-colors">
                <Store className="size-6" />
              </div>
              <h3 className="font-bold text-xl text-foreground">For Franchise & Dealers</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Partner with India&apos;s high-growth electric cycle brand. Enjoy 25%–35% retail margins,
                territory exclusivity, and turnkey branding.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/dealers#apply"
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-all"
              >
                <span>Apply for Dealership</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/dealers"
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition-all"
              >
                <span>View Franchise Tiers</span>
              </Link>
            </div>
          </div>

          {/* Card 3: For Corporate & Fleets */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all hover:border-primary/50 group">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Building2 className="size-6" />
              </div>
              <h3 className="font-bold text-xl text-foreground">For Corporate & Fleets</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Slash hyper-local delivery logistics and campus transport costs by up to 90% with
                custom branded Eparv e-cycle fleets.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/bulk-orders"
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-all"
              >
                <span>Request Fleet Proposal</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition-all"
              >
                <Mail className="size-4 text-primary" />
                <span>Contact Corporate Sales</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Corporate Support Bar */}
        <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-bold text-base text-foreground">
              Have specific questions about Eparv or our electric cycles?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Our customer advisory team is available Monday through Saturday, 9:30 AM to 7:00 PM IST.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919170244766"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs sm:text-sm font-bold text-white hover:bg-primary/90 transition-all"
            >
              <PhoneCall className="size-4" />
              <span>+91 91702 44766</span>
            </a>
            <a
              href="mailto:support@eparvingenuity.com"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-xs sm:text-sm font-semibold text-foreground hover:border-primary/50 transition-all"
            >
              <Mail className="size-4 text-primary" />
              <span>support@eparvingenuity.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
