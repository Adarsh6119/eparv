'use client'

import Link from 'next/link'
import React from 'react'
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Coins,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Zap,
} from 'lucide-react'

const KEY_METRICS = [
  { value: '25%–35%', label: 'Gross Retail Margin', sub: 'Per Cycle Sold' },
  { value: '₹1.5 Lakh', label: 'Starting Investment', sub: 'Low Capital Entry' },
  { value: '100%', label: 'Territory Exclusivity', sub: 'Protected Pin-Codes' },
  { value: '0%', label: 'Franchise Royalty', sub: 'Keep 100% Profits' },
]

export const DealerHero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#061220] via-[#0a1c32] to-[#040d18] text-white pt-24 pb-20 border-b border-border/40">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[130px] animate-pulse" />
        <div className="absolute -right-32 top-[20%] h-[500px] w-[500px] rounded-full bg-energy/15 blur-[120px] animate-pulse [animation-delay:1.5s]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary backdrop-blur-md">
            <Sparkles className="size-3.5 text-energy" />
            <span>High-Growth EV Mobility Franchise Program</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Grow Your Business with India&apos;s{' '}
            <span className="bg-gradient-to-r from-primary via-[#5eead4] to-energy bg-clip-text text-transparent">
              Next-Gen Electric Cycles
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 leading-relaxed">
            Partner with Eparv to establish an authorized showroom or store-in-store in your city.
            Enjoy high retail margins, complete territory protection, zero royalty, and guaranteed
            digital customer leads routed directly to you.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <button
              type="button"
              onClick={() => scrollTo('apply')}
              className="cursor-pointer group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Apply for Dealership</span>
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('directory')}
              className="cursor-pointer inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-bold text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-0.5"
            >
              <Store className="size-4 text-energy" />
              <span>Browse Existing Dealers</span>
            </button>
          </div>

          {/* Key highlights strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-white/80">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              <span>Free Showroom Branding Kit</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              <span>Direct Website Leads Sharing</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              <span>No License / RTO Hassle for Buyers</span>
            </div>
          </div>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 rounded-2xl sm:rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl">
          {KEY_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-black/30 border border-white/5 text-center transition-all hover:bg-white/10"
            >
              <span className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-1">
                {metric.label}
              </span>
              <span className="text-[11px] text-white/50 mt-0.5">
                {metric.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
