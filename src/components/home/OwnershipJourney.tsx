'use client'

import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  PackageCheck,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'Choose Your Model & Book',
    subtitle: 'Browse models online or take a free test ride',
    description:
      'Compare range, motor power and frame style online. Or book a free 20-minute test ride at home or at your nearest authorized dealership before finalizing.',
    icon: Bike,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-primary',
  },
  {
    step: '02',
    title: '95% Assembled Doorstep Delivery',
    subtitle: 'Secure doorstep dispatch with included toolkit',
    description:
      'Your cycle arrives carefully packed in a heavy-duty carton, 95% pre-assembled. Simply straighten the handlebar, fit pedals with the included multi-tool, and you are ready.',
    icon: PackageCheck,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-energy',
  },
  {
    step: '03',
    title: 'Plug Into Any 5A Wall Socket',
    subtitle: 'Zero special charging stations or setup needed',
    description:
      'Detach the key-locked battery and plug it into any standard home or office plug socket. Charges 0 to 100% in just 2 to 3 hours for less than ₹3.50 worth of electricity.',
    icon: PlugZap,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    step: '04',
    title: 'Ride Free with 5-Year Peace of Mind',
    subtitle: 'Save ₹25,000+ yearly with complete warranty backing',
    description:
      'Zoom past city traffic jams with zero emissions, zero petrol expense, and zero RTO paperwork. Backed by 60 months frame and 24 months motor warranty with 150+ service touchpoints.',
    icon: ShieldCheck,
    color: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-purple-500',
  },
]

export const OwnershipJourney: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="container relative z-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
            <Sparkles className="size-4 text-energy" />
            <span>Effortless EV Ownership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            How Easy It Is to{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              Go Electric
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            From picking your favorite colour to cruising on your first commute — we make electric
            cycling simple, transparent, and hassle-free.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {STEPS.map((s, idx) => (
            <div
              key={s.step}
              className="relative rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Connecting line on desktop */}
              {idx < 3 && (
                <div
                  className="hidden lg:block absolute top-10 -right-3 w-6 h-[2px] bg-border z-20 pointer-events-none"
                  aria-hidden="true"
                />
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`rounded-xl p-3 bg-gradient-to-br ${s.color}`}>
                    <s.icon className={`size-6 ${s.iconColor}`} />
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30 font-mono">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {s.title}
                </h3>
                <span className="text-xs font-semibold text-primary block mt-0.5">
                  {s.subtitle}
                </span>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-3">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border/50 flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                <CheckCircle2 className="size-3.5" />
                <span>Verified Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-energy/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-foreground">
              Ready to take your first test ride?
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Available at verified dealerships across 200+ cities in India.
            </p>
          </div>
          <Link
            href="/book-test-ride"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-6 text-xs font-bold text-white shadow-md hover:bg-primary/90 transition-all shrink-0"
          >
            <span>Book Free Test Ride</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
