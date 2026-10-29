'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  ArrowRight,
  Battery,
  Calendar,
  CheckCircle2,
  Gauge,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'

export interface HeroModel {
  id: string
  name: string
  slug: string
  tagline: string
  category: string
  range: string
  topSpeed: string
  motor: string
  battery: string
  image: string
  alt: string
  accentColor: string
  badge: string
  startingPrice?: string
}

const HERO_MODELS: HeroModel[] = [
  {
    id: 'visakka',
    name: 'Eparv Visakka',
    slug: 'eparv-visakka',
    tagline: 'Built to dominate every terrain with high-tensile power',
    category: 'Off-Road / Trail MTB',
    range: '60 km',
    topSpeed: '25 km/h',
    motor: '250W High-Torque BLDC',
    battery: '36V Detachable Li-ion',
    image: '/cycles/visakka.png',
    alt: 'Eparv Visakka electric cycle side profile',
    accentColor: '#13a5de',
    badge: 'Popular All-Terrain',
  },
  {
    id: 'panther',
    name: 'Eparv Panther',
    slug: 'eparv-panther',
    tagline: 'Stealth urban performance with featherlight alloy agility',
    category: 'City Commuter',
    range: '55 km',
    topSpeed: '25 km/h',
    motor: '250W BLDC Hub Motor',
    battery: '36V Quick-Charge Battery',
    image: '/cycles/panther.png',
    alt: 'Eparv Panther electric cycle stealth black finish',
    accentColor: '#faa435',
    badge: 'Best for Daily Office Commute',
    startingPrice: '₹21,000',
  },
  {
    id: 'lahari',
    name: 'Eparv Lahari',
    slug: 'eparv-lahari',
    tagline: 'Unstoppable 110 km long-distance touring and adventure',
    category: 'Long-Range Cruiser',
    range: '110 km',
    topSpeed: '25 km/h',
    motor: '250W High-Efficiency BLDC',
    battery: '36V Extended Capacity',
    image: '/cycles/lahari.png',
    alt: 'Eparv Lahari long range electric cycle',
    accentColor: '#10b981',
    badge: 'Longest 110 KM Range',
  },
  {
    id: 'savitri',
    name: 'Eparv Savitri',
    slug: 'eparv-savitri',
    tagline: 'Classic comfort roadster with modern electric endurance',
    category: 'Comfort Roadster',
    range: '110 km',
    topSpeed: '25 km/h',
    motor: '250W BLDC Motor',
    battery: '36V Detachable Pack',
    image: '/cycles/savitri.png',
    alt: 'Eparv Savitri classic electric cycle',
    accentColor: '#38bdf8',
    badge: 'Classic City Comfort',
  },
  {
    id: 'satya',
    name: 'Eparv Satya',
    slug: 'eparv-satya',
    tagline: 'Rugged frame and all-weather endurance for Indian roads',
    category: 'Rugged MTB',
    range: '55 km',
    topSpeed: '25 km/h',
    motor: '250W BLDC Motor',
    battery: '36V Li-ion Key Lock',
    image: '/cycles/satya.png',
    alt: 'Eparv Satya rugged trail electric cycle',
    accentColor: '#a855f7',
    badge: 'Heavy-Duty Explorer',
  },
]

export const HeroShowcase: React.FC = () => {
  const [activeModel, setActiveModel] = useState<HeroModel>(HERO_MODELS[0])

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-[#071322] via-[#0b1c31] to-[#040d18] text-white pt-24 pb-20">
      {/* Background radial glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-[560px] w-[560px] rounded-full bg-primary/20 blur-[130px] animate-pulse" />
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-energy/15 blur-[120px] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute left-[35%] bottom-[-10%] h-[420px] w-[420px] rounded-full bg-[#38bdf8]/10 blur-[100px]" />
      </div>

      {/* Subtle modern cyber grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading, Badges, Value Props, CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary backdrop-blur-md">
              <Sparkles className="size-3.5 text-energy animate-spin [animation-duration:4s]" />
              <span>Next-Gen Electric Cycles Engineered for India</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08]">
              Ride Further.{' '}
              <span className="bg-gradient-to-r from-primary via-[#5eead4] to-energy bg-clip-text text-transparent">
                Spend Less.
              </span>
              <br />
              <span className="text-white/95">Emit Nothing.</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
              Experience the freedom of smart electric mobility. Built with high-torque 250W BLDC
              motors, up to 110 km range, and zero petrol bills. No license or RTO registration needed!
            </p>

            {/* Quick feature pill highlights */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>₹0.12 / km Running Cost</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>No License / Helmet Laws Required</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>5-Year Frame Warranty</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/electric-cycles/${activeModel.slug}`}
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore {activeModel.name.replace('Eparv ', '')}</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/book-test-ride"
                className="group inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5"
              >
                <Calendar className="size-4 text-energy" />
                <span>Book Free Test Ride</span>
              </Link>
              <Link
                href="/dealers"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <MapPin className="size-4" />
                <span>Locate Dealer</span>
              </Link>
            </div>

            {/* Model switcher tabs */}
            <div className="pt-4 border-t border-white/10">
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
                Quick Select Flagship Models:
              </span>
              <div className="flex flex-wrap gap-2">
                {HERO_MODELS.map((m) => {
                  const isSelected = activeModel.id === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveModel(m)}
                      className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      <Zap className={`size-3 ${isSelected ? 'text-energy fill-energy' : 'text-white/40'}`} />
                      <span>{m.name.replace('Eparv ', '')}</span>
                      {m.startingPrice && (
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-energy font-mono">
                          {m.startingPrice}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Stage with Active Cycle Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-lg lg:max-w-none flex flex-col items-center">
              {/* Pedestal Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-gradient-to-tr from-primary/30 via-energy/20 to-transparent blur-[80px] pointer-events-none" />

              {/* Model Tag Pill */}
              <div className="self-start sm:self-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs backdrop-blur-md shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-white">{activeModel.name}</span>
                <span className="text-white/40">|</span>
                <span className="text-energy font-medium">{activeModel.badge}</span>
              </div>

              {/* Main Cycle Showcase Box */}
              <div className="relative w-full min-h-[300px] sm:min-h-[380px] md:min-h-[420px] flex items-center justify-center p-4">
                {/* Floating spec pill 1: Range */}
                <div className="absolute left-2 sm:left-4 top-6 z-20 rounded-xl border border-white/15 bg-card/60 backdrop-blur-md px-3.5 py-2 shadow-xl hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/20 p-1.5 text-primary">
                      <Gauge className="size-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-white/50">Max Range</div>
                      <div className="text-sm font-extrabold text-white">{activeModel.range}</div>
                    </div>
                  </div>
                </div>

                {/* Floating spec pill 2: Motor */}
                <div className="absolute right-2 sm:right-4 top-10 z-20 rounded-xl border border-white/15 bg-card/60 backdrop-blur-md px-3.5 py-2 shadow-xl hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-energy/20 p-1.5 text-energy">
                      <Zap className="size-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-white/50">BLDC Motor</div>
                      <div className="text-sm font-extrabold text-white">{activeModel.motor.replace(' BLDC', '')}</div>
                    </div>
                  </div>
                </div>

                {/* Floating spec pill 3: Battery */}
                <div className="absolute left-4 sm:left-8 bottom-4 z-20 rounded-xl border border-white/15 bg-card/60 backdrop-blur-md px-3.5 py-2 shadow-xl hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-emerald-500/20 p-1.5 text-emerald-400">
                      <Battery className="size-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-white/50">Detachable Battery</div>
                      <div className="text-sm font-extrabold text-white">{activeModel.battery}</div>
                    </div>
                  </div>
                </div>

                {/* Floating spec pill 4: Top Speed */}
                <div className="absolute right-4 sm:right-8 bottom-6 z-20 rounded-xl border border-white/15 bg-card/60 backdrop-blur-md px-3.5 py-2 shadow-xl hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-sky-500/20 p-1.5 text-sky-400">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-white/50">Top Speed</div>
                      <div className="text-sm font-extrabold text-white">{activeModel.topSpeed}</div>
                    </div>
                  </div>
                </div>

                {/* Central High-Definition Cycle Image */}
                <div className="relative z-10 w-full max-w-[500px] aspect-[4/3] flex items-center justify-center">
                  <img
                    key={activeModel.id}
                    src={activeModel.image}
                    alt={activeModel.alt}
                    className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-all duration-500 transform hover:scale-105"
                  />
                </div>
              </div>

              {/* Bottom Quick specs strip for the active cycle */}
              <div className="w-full mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-md">
                <div className="p-1">
                  <div className="text-[11px] text-white/60">Category</div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">{activeModel.category}</div>
                </div>
                <div className="p-1 border-x border-white/10">
                  <div className="text-[11px] text-white/60">Warranty</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400">5 Yrs Frame</div>
                </div>
                <div className="p-1">
                  <div className="text-[11px] text-white/60">Charging Time</div>
                  <div className="text-xs sm:text-sm font-bold text-energy">2–3 Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into main content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
