'use client'

import React from 'react'
import {
  ArrowRight,
  Award,
  Building,
  CheckCircle2,
  Crown,
  Sparkles,
  Store,
  Truck,
  Zap,
} from 'lucide-react'

interface Tier {
  id: string
  name: string
  badge: string
  isPopular?: boolean
  investment: string
  space: string
  target: string
  inventory: string
  features: string[]
}

const TIERS: Tier[] = [
  {
    id: 'retailer',
    name: 'Authorized Retailer',
    badge: 'Store-in-Store Model',
    investment: '₹1.5 L – ₹3 Lakh',
    space: '150 – 200 sq.ft.',
    target: 'Existing cycle, auto, or electronics shop owners adding an EV line',
    inventory: '4 to 6 Display Cycles',
    features: [
      'Low initial capital commitment',
      'Branded floor display & wall banner kit',
      'Full retail sales margin per cycle',
      'Direct dealer ordering portal login',
      'Free technician training & maintenance manuals',
    ],
  },
  {
    id: 'experience-center',
    name: 'Exclusive Experience Center',
    badge: 'Most Popular Choice',
    isPopular: true,
    investment: '₹5 L – ₹10 Lakh',
    space: '350 – 600 sq.ft.',
    target: 'Entrepreneurs wanting a flagship, dedicated Eparv showroom',
    inventory: '10 to 15 Cycles + Test Ride Fleet',
    features: [
      'Exclusive territorial lock on entire city zone',
      'Full 5-model lineup (Visakka, Panther, Lahari, Savitri, Satya)',
      'Illuminated 3D LED storefront signage & interior podiums',
      '100% website customer leads routed to your showroom',
      'Higher wholesale discount margins',
      'Co-funded digital & local newspaper marketing support',
    ],
  },
  {
    id: 'distributor',
    name: 'District Master Distributor',
    badge: 'Enterprise & Fleet Scale',
    investment: '₹15 Lakh+',
    space: '800+ sq.ft. (Showroom + Storage)',
    target: 'Distribution houses & corporate delivery fleet suppliers',
    inventory: '25+ Cycles + Spare Parts Depot',
    features: [
      'District-level master territory exclusivity',
      'Sub-dealer onboarding rights with wholesale override margin',
      'Access to commercial B2B delivery fleet contracts',
      'Dedicated Regional Account Manager & rapid logistics',
      'Direct factory billing & priority production allocation',
    ],
  },
]

export const DealerTiers: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 bg-muted/30 relative border-t border-border">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
            <Building className="size-4 text-energy" />
            <span>Tailored Partnership Models</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              Dealership Tier
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Whether you want to add electric cycles to your existing showroom or launch a premier
            exclusive EV destination, we offer flexible models tailored to your capital.
          </p>
        </div>

        {/* 3 Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl border bg-card p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5 relative ${
                tier.isPopular
                  ? 'border-primary ring-2 ring-primary/20 shadow-primary/10 scale-100 md:scale-105 z-10'
                  : 'border-border'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[11px] font-black text-white shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                  <Crown className="size-3.5 text-energy fill-energy" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                {!tier.isPopular && (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">
                    {tier.badge}
                  </span>
                )}

                <h3 className="text-2xl font-black text-foreground mt-1">
                  {tier.name}
                </h3>

                {/* Investment callout */}
                <div className="my-5 p-4 rounded-2xl bg-muted/40 border border-border/80">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">
                    Required Capital:
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-primary mt-0.5">
                    {tier.investment}
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-2 pt-2 border-t border-border/60">
                    <span>Min Space:</span>
                    <span className="font-bold text-foreground">{tier.space}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                    <span>Initial Inventory:</span>
                    <span className="font-bold text-foreground">{tier.inventory}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                  <span className="font-bold text-foreground">Best suited for: </span>
                  {tier.target}
                </p>

                {/* Feature Checklist */}
                <ul className="space-y-2.5">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-foreground/90 leading-snug">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => scrollTo('apply')}
                  className={`cursor-pointer w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all ${
                    tier.isPopular
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90'
                      : 'border border-border bg-muted/40 text-foreground hover:bg-muted'
                  }`}
                >
                  <span>Apply for {tier.name}</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
