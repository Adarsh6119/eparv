'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  ArrowRight,
  Battery,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  Filter,
  Gauge,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Table,
  Zap,
} from 'lucide-react'

export interface CycleModel {
  id: string
  name: string
  slug: string
  tagline: string
  idealFor: string
  category: string
  categorySlug: 'city-commute' | 'trail' | 'long-range'
  range: string
  rangeKm: number
  topSpeed: string
  motor: string
  battery: string
  brakes: string
  suspension: string
  wheelSize: string
  price: string
  originalPrice?: string
  image: string
  badge: string
  badgeColor: string
  highlights: string[]
}

export const CYCLE_MODELS: CycleModel[] = [
  {
    id: 'visakka',
    name: 'Eparv Visakka',
    slug: 'eparv-visakka',
    tagline: 'Built to dominate every terrain with high-tensile power',
    idealFor: 'Potholes, steep flyovers, broken roads & weekend trails',
    category: 'Off-Road / Trail MTB',
    categorySlug: 'trail',
    range: '60 km',
    rangeKm: 60,
    topSpeed: '25 km/h',
    motor: '250W High-Torque BLDC Hub',
    battery: '36V Detachable Lithium-ion',
    brakes: 'Dual Disc Brakes + Auto Cut-off',
    suspension: 'Tough-Terrain Front Suspension',
    wheelSize: '27.5" Double-Wall Alloy',
    price: '₹24,999',
    originalPrice: '₹26,000',
    image: '/cycles/visakka.png',
    badge: 'Best Seller Trail',
    badgeColor: 'bg-primary text-white',
    highlights: ['Front Suspension Fork', 'Dual Disc Brakes', 'Key Ignition & Lock'],
  },
  {
    id: 'panther',
    name: 'Eparv Panther',
    slug: 'eparv-panther',
    tagline: 'Stealth urban performance with lightweight agility',
    idealFor: 'Daily office commutes, college runs & fast city cruising',
    category: 'City Commuter',
    categorySlug: 'city-commute',
    range: '55 km',
    rangeKm: 55,
    topSpeed: '25 km/h',
    motor: '250W BLDC Hub Motor',
    battery: '36V Quick-Charge Li-ion',
    brakes: 'Dual Disc Brakes + Electronic Cut-off',
    suspension: 'Rigid Aerodynamic Alloy Fork',
    wheelSize: '26" Urban Alloy Wheels',
    price: '₹19,999',
    originalPrice: '₹21,000',
    image: '/cycles/panther.png',
    badge: 'Popular Commuter',
    badgeColor: 'bg-energy text-[#0a1628]',
    highlights: ['Matte Stealth Black', '2-3h Fast Charging', 'Lightweight Frame'],
  },
  {
    id: 'lahari',
    name: 'Eparv Lahari',
    slug: 'eparv-lahari',
    tagline: 'Unstoppable 110 km ultra long-distance touring',
    idealFor: 'Long daily commutes, cross-city deliveries & touring',
    category: 'Long-Range Cruiser',
    categorySlug: 'long-range',
    range: '110 km',
    rangeKm: 110,
    topSpeed: '25 km/h',
    motor: '250W High-Efficiency BLDC',
    battery: '36V Extended Capacity Li-ion',
    brakes: 'Dual Mechanical Disc Brakes',
    suspension: 'Comfort Suspension Fork',
    wheelSize: '27.5" Touring Rims',
    price: '₹21,999',
    originalPrice: '₹27,999',
    image: '/cycles/lahari.png',
    badge: 'Longest 110 KM Range',
    badgeColor: 'bg-emerald-500 text-white',
    highlights: ['110 km PAS Range', 'Comfort Touring Saddle', 'Front Suspension'],
  },
  {
    id: 'savitri',
    name: 'Eparv Savitri',
    slug: 'eparv-savitri',
    tagline: 'The classic Indian commuter, electrified with long range',
    idealFor: 'Family utility, relaxed upright posture & grocery runs',
    category: 'Comfort Roadster',
    categorySlug: 'city-commute',
    range: '110 km',
    rangeKm: 110,
    topSpeed: '25 km/h',
    motor: '250W BLDC Hub Motor',
    battery: '36V Detachable Battery Pack',
    brakes: 'High-Friction Dual Brakes',
    suspension: 'Upright Comfort Roadster Setup',
    wheelSize: '28" Traditional Roadster Rims',
    price: '₹18,999',
    originalPrice: '₹21,500',
    image: '/cycles/savitri.png',
    badge: 'Upright Comfort',
    badgeColor: 'bg-sky-500 text-white',
    highlights: ['Heavy Carrier Included', 'Full Mudguards', 'Relaxed Upright Ride'],
  },
  {
    id: 'satya',
    name: 'Eparv Satya',
    slug: 'eparv-satya',
    tagline: 'Rugged all-weather trail MTB built for tough Indian roads',
    idealFor: 'Potholes, broken village roads, gravel & fitness training',
    category: 'Rugged Trail MTB',
    categorySlug: 'trail',
    range: '55 km',
    rangeKm: 55,
    topSpeed: '25 km/h',
    motor: '250W BLDC Motor',
    battery: '36V Li-ion Anti-Theft Lock',
    brakes: 'Dual Disc Brakes',
    suspension: 'Heavy-Duty Coil Fork',
    wheelSize: '27.5" All-Terrain Tyres',
    price: '₹21,000',
    originalPrice: '₹22,999',
    image: '/cycles/satya.png',
    badge: 'Heavy-Duty Durability',
    badgeColor: 'bg-purple-600 text-white',
    highlights: ['Purple Metallic Finish', 'Dual Disc Brakes', 'Knobby Trail Tyres'],
  },
]

export interface CycleLineupProps {
  badgeText?: string
  title?: string
  subtitle?: string
  initialFilter?: 'all' | 'city-commute' | 'trail' | 'long-range'
  initialViewMode?: 'cards' | 'compare'
  id?: string
  className?: string
  hideHeader?: boolean
}

export const CycleLineup: React.FC<CycleLineupProps> = ({
  badgeText = 'Our Complete Electric Lineup',
  title = 'Explore Eparv Electric Cycles',
  subtitle = '100% proper electric cycles engineered with 250W high-torque hub motors, detachable lithium batteries, and reinforced frames. Choose the model that matches your commute.',
  initialFilter = 'all',
  initialViewMode = 'cards',
  id = 'cycle-lineup',
  className = '',
  hideHeader = false,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'city-commute' | 'trail' | 'long-range'>(initialFilter)
  const [viewMode, setViewMode] = useState<'cards' | 'compare'>(initialViewMode)

  const filteredCycles = CYCLE_MODELS.filter((m) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'city-commute') return m.categorySlug === 'city-commute'
    if (activeFilter === 'trail') return m.categorySlug === 'trail'
    if (activeFilter === 'long-range') return m.rangeKm >= 100
    return true
  })

  return (
    <section className={`py-20 relative overflow-hidden bg-gradient-to-b from-card/30 via-background to-card/20 ${className}`} id={id}>
      <div className="container relative z-10">
        {/* Section Header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
                <Sparkles className="size-4 text-energy" />
                <span>{badgeText}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-2xl">
                {subtitle}
              </p>
            </div>

            {/* Controls: Filter & View Mode */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-muted/60 border border-border">
                {[
                  { id: 'all', label: 'All Models (5)' },
                  { id: 'city-commute', label: 'City Commuter' },
                  { id: 'trail', label: 'Trails & MTB' },
                  { id: 'long-range', label: 'Long Range (110 km)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilter(f.id as any)}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeFilter === f.id
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle: Cards vs Compare */}
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-muted/60 border border-border">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`cursor-pointer p-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    viewMode === 'cards'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Card View"
                >
                  <LayoutGrid className="size-4 text-primary" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compare')}
                  className={`cursor-pointer p-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    viewMode === 'compare'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Compare Matrix"
                >
                  <Table className="size-4 text-primary" />
                  <span className="hidden sm:inline">Compare</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── VIEW 1: MODERN CARDS GRID ── */}
        {viewMode === 'cards' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {filteredCycles.map((cycle) => (
              <article
                key={cycle.id}
                className="group rounded-3xl border border-border bg-card shadow-lg hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Stage - Expanded area with zero clipping and transparent blend */}
                  <div className="relative w-full h-60 sm:h-64 lg:h-72 flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-muted/40 via-muted/10 to-transparent border-b border-border/60 overflow-hidden">
                    {/* Subtle spotlight glow behind cycle */}
                    <div className="absolute inset-0 bg-radial from-primary/15 via-transparent to-transparent opacity-80 pointer-events-none" />

                    {/* Badge */}
                    <span
                      className={`absolute top-3.5 left-3.5 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-md ${cycle.badgeColor}`}
                    >
                      {cycle.badge}
                    </span>

                    {/* Price Pill */}
                    <div className="absolute top-3.5 right-3.5 text-right z-10">
                      <span className="text-xs sm:text-sm font-black text-foreground block bg-card/95 px-3 py-1 rounded-full border border-border shadow-md backdrop-blur-md">
                        {cycle.price}
                      </span>
                      {cycle.originalPrice && (
                        <span className="text-[10px] text-muted-foreground line-through block mt-0.5 pr-1 font-semibold">
                          {cycle.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Cycle Photo with Hover Zoom - Expands to cover area without cutting */}
                    <img
                      src={cycle.image}
                      alt={cycle.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Category Info */}
                  <div className="p-5 pb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {cycle.category}
                    </span>
                    <h3 className="text-xl font-black text-foreground mt-0.5 group-hover:text-primary transition-colors">
                      {cycle.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {cycle.tagline}
                    </p>
                  </div>

                  {/* Specs Quick Pills */}
                  <div className="px-5 py-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60">
                      <Gauge className="size-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[10px] text-muted-foreground font-medium">Max Range</div>
                        <div className="font-extrabold text-foreground truncate">{cycle.range}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60">
                      <Zap className="size-4 text-energy shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[10px] text-muted-foreground font-medium">Motor</div>
                        <div className="font-extrabold text-foreground truncate">250W BLDC</div>
                      </div>
                    </div>
                  </div>

                  {/* Highlight checklist */}
                  <div className="px-5 py-3 border-t border-border/40 space-y-1.5">
                    {cycle.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Buttons */}
                <div className="p-5 pt-3 space-y-2 border-t border-border/60 bg-muted/10">
                  <Link
                    href={`/electric-cycles/${cycle.slug}`}
                    className="w-full inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary text-xs font-bold text-white shadow-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="size-3.5" />
                  </Link>

                  <Link
                    href={`/book-test-ride?model=${cycle.slug}`}
                    className="w-full inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover:bg-muted transition-colors"
                  >
                    <Calendar className="size-3.5 text-energy" />
                    <span>Book Free Test Ride</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── VIEW 2: FULL SIDE-BY-SIDE COMPARISON MATRIX ── */}
        {viewMode === 'compare' && (
          <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-4 sm:p-5 font-bold text-muted-foreground min-w-[140px]">Model</th>
                    {filteredCycles.map((c) => (
                      <th key={c.id} className="p-4 sm:p-5 font-bold min-w-[180px]">
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {c.badge}
                          </span>
                          <span className="text-base font-black text-foreground">{c.name}</span>
                          <span className="text-sm font-extrabold text-energy">{c.price}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Photo Row */}
                  <tr className="bg-muted/10">
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Cycle Photo</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5">
                        <div className="w-32 h-20 flex items-center justify-center bg-card rounded-xl p-2 border border-border shadow-sm">
                          <img src={c.image} alt={c.name} className="max-h-full max-w-full object-contain" />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Range */}
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Max Range (PAS)</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5 font-black text-primary text-base">
                        {c.range}
                      </td>
                    ))}
                  </tr>

                  {/* Motor */}
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Motor Power</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5 font-semibold text-foreground">
                        {c.motor}
                      </td>
                    ))}
                  </tr>

                  {/* Battery */}
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Battery Type</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5 font-semibold text-foreground">
                        {c.battery}
                      </td>
                    ))}
                  </tr>

                  {/* Brakes */}
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Braking System</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5 text-foreground">
                        {c.brakes}
                      </td>
                    ))}
                  </tr>

                  {/* Suspension */}
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Suspension Fork</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5 text-foreground">
                        {c.suspension}
                      </td>
                    ))}
                  </tr>

                  {/* Wheels */}
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Wheel / Tyres</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5 text-foreground">
                        {c.wheelSize}
                      </td>
                    ))}
                  </tr>

                  {/* Best For */}
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Best Suited For</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5 text-xs text-muted-foreground">
                        {c.idealFor}
                      </td>
                    ))}
                  </tr>

                  {/* Action */}
                  <tr className="bg-muted/20">
                    <td className="p-4 sm:p-5 font-bold text-muted-foreground">Details & Booking</td>
                    {filteredCycles.map((c) => (
                      <td key={c.id} className="p-4 sm:p-5">
                        <Link
                          href={`/electric-cycles/${c.slug}`}
                          className="inline-flex h-9 items-center justify-center gap-1 px-4 rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary/90 transition-all shadow-sm"
                        >
                          <span>View {c.name.replace('Eparv ', '')}</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
