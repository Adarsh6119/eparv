'use client'

import React from 'react'
import {
  Award,
  CheckCircle2,
  Clock,
  Headphones,
  Lock,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

import { LeadForm } from '@/components/LeadForm'

const TRUST_POINTS = [
  {
    icon: TrendingUp,
    title: 'High 25%–35% Retail Margins',
    desc: 'Maximized return per unit sold, plus recurring 40%–50% profits on accessories, spares, and battery packs.',
  },
  {
    icon: ShieldCheck,
    title: 'Guaranteed Territory Protection',
    desc: 'Strict pin-code and regional lock. We never appoint competing dealers in your approved catchment zone.',
  },
  {
    icon: Zap,
    title: 'Direct Digital Customer Leads',
    desc: 'Qualified test-ride inquiries and local buyers from eparvingenuity.com are routed straight to your phone.',
  },
  {
    icon: Award,
    title: 'Turnkey Branding & Tech Training',
    desc: 'Comprehensive 3D showroom signage kit, promotional assets, demo stands, and on-site/video mechanic training.',
  },
]

export const DealerApplicationSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-background border-t border-border/50" id="apply">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-energy/10 blur-[120px]" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
            <Sparkles className="size-3.5 text-energy" />
            <span>Apply For Territory Dealership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Start Your Eparv Dealership Today
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Take the first step toward building a highly profitable green mobility business. Complete
            the application form and our franchise team will evaluate your territory within 24 hours.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Business Case & Trust Highlights */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-foreground">
                Why Franchise Partners Choose Eparv
              </h3>

              <div className="space-y-5">
                {TRUST_POINTS.map((pt, i) => {
                  const Icon = pt.icon
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm sm:text-base text-foreground">
                          {pt.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Fast SLA Box */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
                <Clock className="size-5 text-primary shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground block">
                    Fast 24-Hour Review Turnaround
                  </span>
                  Applications are reviewed on a first-come, first-served basis per pin-code.
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-2xl border border-border bg-muted/30 p-6 space-y-4">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Headphones className="size-4 text-energy" />
                <span>Franchise Expansion Advisory Desk</span>
              </h4>
              <p className="text-xs text-muted-foreground">
                Prefer discussing your proposal over a call? Reach out directly to our commercial partnerships team.
              </p>

              <div className="space-y-2 text-xs sm:text-sm">
                <a
                  href="tel:+919170244766"
                  className="flex items-center gap-2.5 text-foreground hover:text-primary font-medium transition-colors"
                >
                  <PhoneCall className="size-4 text-primary" />
                  <span>+91 91702 44766 (Mon–Sat, 9:30 AM – 7:00 PM)</span>
                </a>
                <a
                  href="mailto:dealers@eparvingenuity.com"
                  className="flex items-center gap-2.5 text-foreground hover:text-primary font-medium transition-colors"
                >
                  <Mail className="size-4 text-primary" />
                  <span>dealers@eparvingenuity.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Container */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 sm:p-8 lg:p-10 shadow-lg shadow-primary/5 relative">
              {/* Form Card Header */}
              <div className="border-b border-border/60 pb-6 mb-6 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Dealer Partnership Application
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <Lock className="size-3" />
                    <span>Confidential</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Provide your business details below to secure territorial priority in your city or district.
                </p>
              </div>

              {/* Render the LeadForm */}
              <LeadForm
                type="dealer"
                submitLabel="Submit Dealership Application"
                className="space-y-4"
              />

              {/* Bottom Trust Guarantee */}
              <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-emerald-500" />
                  <span>Zero spam guaranteed</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-primary" />
                  <span>Pin-code priority lock</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-energy" />
                  <span>Call back in &lt; 24 business hours</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
