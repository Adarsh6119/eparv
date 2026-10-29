'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  ArrowRight,
  Battery,
  Calendar,
  Check,
  ChevronRight,
  Gauge,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from 'lucide-react'

interface ModelSpec {
  id: string
  name: string
  slug: string
  tagline: string
  idealFor: string
  category: string
  range: string
  topSpeed: string
  motor: string
  battery: string
  brakes: string
  suspension: string
  wheelSize: string
  startingPrice?: string
  image: string
  badge?: string
}

const MODELS: ModelSpec[] = [
  {
    id: 'visakka',
    name: 'Eparv Visakka',
    slug: 'eparv-visakka',
    tagline: 'Dominate every terrain with pure power',
    idealFor: 'Off-road trails, steep climbs, weekend adventures',
    category: 'Off-Road / Trail MTB',
    range: '60 km',
    topSpeed: '25 km/h',
    motor: '250W High-Torque BLDC',
    battery: '36V Detachable Li-ion',
    brakes: 'Dual Disc Brakes + Auto Cut-off',
    suspension: 'Tough-Terrain Front Suspension',
    wheelSize: '27.5" Double-Wall Alloy',
    image: '/visakka-images/01-visakka-side-profile.png',
    badge: 'Best Seller Trail',
  },
  {
    id: 'panther',
    name: 'Eparv Panther',
    slug: 'eparv-panther',
    tagline: 'Stealth city agility and daily office comfort',
    idealFor: 'Daily city commuting, college, effortless traffic cruising',
    category: 'City Commuter',
    range: '55 km',
    topSpeed: '25 km/h',
    motor: '250W High-Torque Hub Motor',
    battery: '36V Quick-Charge Battery',
    brakes: 'Dual Disc Brakes',
    suspension: 'Rigid Lightweight Fork',
    wheelSize: '26" Urban Alloy Rims',
    startingPrice: '₹21,000',
    image: '/panther-images/01-panther-side-profile.png',
    badge: 'Popular Commuter',
  },
  {
    id: 'lahari',
    name: 'Eparv Lahari',
    slug: 'eparv-lahari',
    tagline: 'Unmatched 110 km ultra-long distance touring',
    idealFor: 'Long commutes, cross-city touring, weekend long rides',
    category: 'Long-Range Cruiser',
    range: '110 km',
    topSpeed: '25 km/h',
    motor: '250W High-Efficiency BLDC',
    battery: '36V Extended Capacity Li-ion',
    brakes: 'Dual Mechanical Disc Brakes',
    suspension: 'Front Suspension Fork',
    wheelSize: '27.5" Touring Rims',
    image: '/lahari-images/01-lahari-side-profile.png',
    badge: 'Longest 110 KM Range',
  },
  {
    id: 'savitri',
    name: 'Eparv Savitri',
    slug: 'eparv-savitri',
    tagline: 'The classic Indian commuter, now fully electrified',
    idealFor: 'Family utility, errands, relaxed upright posture',
    category: 'Comfort Roadster',
    range: '110 km',
    topSpeed: '25 km/h',
    motor: '250W BLDC Hub Motor',
    battery: '36V Detachable Pack',
    brakes: 'Dual High-Friction Brakes',
    suspension: 'Comfort Roadster Setup',
    wheelSize: '28" Traditional Roadster Wheels',
    image: '/savitri-images/01-savitri-side-profile.png',
    badge: 'Upright Comfort',
  },
  {
    id: 'satya',
    name: 'Eparv Satya',
    slug: 'eparv-satya',
    tagline: 'Rugged MTB built for the toughest village & city roads',
    idealFor: 'Potholes, broken roads, rough terrain, fitness riders',
    category: 'Rugged Trail MTB',
    range: '55 km',
    topSpeed: '25 km/h',
    motor: '250W BLDC Motor',
    battery: '36V Anti-Theft Lock Battery',
    brakes: 'Dual Disc Brakes',
    suspension: 'Heavy-Duty Coil Fork',
    wheelSize: '27.5" All-Terrain Tyres',
    image: '/satya-images/01-satya-side-profile.png',
    badge: 'Heavy-Duty Durability',
  },
]

export const ModelComparison: React.FC = () => {
  const [filter, setFilter] = useState<string>('all')

  const filteredModels = MODELS.filter((m) => {
    if (filter === 'all') return true
    if (filter === 'commute') return m.id === 'panther' || m.id === 'savitri'
    if (filter === 'trail') return m.id === 'visakka' || m.id === 'satya'
    if (filter === 'long-range') return m.id === 'lahari' || m.id === 'savitri'
    return true
  })

  return (
    <section className="py-20 bg-muted/30 relative border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
              <SlidersHorizontal className="size-4 text-energy" />
              <span>Full Lineup Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Compare Models{' '}
              <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
                Side by Side
              </span>
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Not sure which Eparv cycle matches your daily commute or riding style? Compare range,
              power, battery, and features in one glance.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Models' },
              { id: 'commute', label: 'City Commute' },
              { id: 'trail', label: 'Trails & Off-Road' },
              { id: 'long-range', label: 'Long Range (110 km)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === f.id
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-card border border-border text-foreground hover:bg-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="rounded-2xl border border-border bg-card flex flex-col justify-between overflow-hidden shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Image & Badge Area */}
                <div className="relative aspect-[4/3] bg-muted/50 p-4 flex items-center justify-center border-b border-border">
                  {model.badge && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-white shadow-sm">
                      {model.badge}
                    </span>
                  )}
                  {model.startingPrice && (
                    <span className="absolute top-3 right-3 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-energy text-[#0a1628]">
                      {model.startingPrice}
                    </span>
                  )}
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Model Title & Category */}
                <div className="p-4 border-b border-border/60">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {model.category}
                  </span>
                  <h3 className="text-base font-extrabold text-foreground mt-0.5">
                    {model.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">
                    {model.idealFor}
                  </p>
                </div>

                {/* Specs List */}
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Range:</span>
                    <span className="font-bold text-foreground text-primary">{model.range}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Top Speed:</span>
                    <span className="font-semibold text-foreground">{model.topSpeed}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Motor:</span>
                    <span className="font-semibold text-foreground truncate max-w-[120px] text-right">
                      {model.motor.replace(' High-Torque', '')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Battery:</span>
                    <span className="font-semibold text-foreground truncate max-w-[120px] text-right">
                      {model.battery.replace(' Li-ion', '')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Suspension:</span>
                    <span className="font-semibold text-foreground truncate max-w-[120px] text-right">
                      {model.suspension.replace(' Setup', '').replace(' Fork', '')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 pt-0 space-y-2">
                <Link
                  href={`/electric-cycles/${model.slug}`}
                  className="w-full inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-primary text-xs font-bold text-white shadow-sm hover:bg-primary/90 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="size-3" />
                </Link>
                <Link
                  href="/book-test-ride"
                  className="w-full inline-flex h-8 items-center justify-center gap-1 rounded-xl border border-border text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Calendar className="size-3 text-energy" />
                  <span>Test Ride</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
