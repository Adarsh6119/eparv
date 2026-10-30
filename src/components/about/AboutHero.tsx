'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BatteryCharging,
  Compass,
  FileCheck2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'

const PILLARS = [
  { icon: Zap, label: '250W High-Torque BLDC' },
  { icon: BatteryCharging, label: 'Smart BMS Lithium Pack' },
  { icon: FileCheck2, label: '100% CMVR Compliant (No RTO/License)' },
  { icon: ShieldCheck, label: 'Factory Direct Warranty' },
]

export const AboutHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#061220] via-[#0a1c32] to-[#040d18] text-white pt-20 pb-24 border-b border-border/40">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -left-28 -top-28 h-[480px] w-[480px] rounded-full bg-primary/20 blur-[130px] animate-pulse" />
        <div className="absolute -right-28 top-[15%] h-[480px] w-[480px] rounded-full bg-energy/15 blur-[120px] animate-pulse [animation-delay:1.5s]" />
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
            <span>Pioneering Indian Electric Micro-Mobility</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            Engineering the Future of{' '}
            <span className="bg-gradient-to-r from-primary via-energy to-cyan-400 bg-clip-text text-transparent">
              Clean Urban Freedom
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            At Eparv, we believe daily commuting should be effortless, sweat-free, and affordable.
            We design high-torque electric bicycles engineered specifically for Indian roads, extreme
            weather, and daily journeys.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/electric-cycles"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
            >
              <span>Explore Electric Cycles</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/book-test-ride"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 text-sm font-bold text-white hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <Compass className="size-4 text-energy" />
              <span>Book a Free Test Ride</span>
            </Link>
          </div>

          {/* Pillar Badges Row */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3.5 flex items-center gap-2.5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-slate-200 leading-tight">
                    {p.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
