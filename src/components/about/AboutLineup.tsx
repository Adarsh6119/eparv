'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Compass, Gauge, Sparkles, Zap } from 'lucide-react'

const CYCLES = [
  {
    name: 'Eparv Panther',
    slug: 'eparv-panther',
    badge: 'Popular Commuter',
    tagline: 'Stealth matte black urban performance with lightweight agility.',
    image: '/cycles/panther.png',
    range: '55 km',
    speed: '25 km/h',
    price: '₹19,999',
    category: 'City Commuter',
  },
  {
    name: 'Eparv Visakka',
    slug: 'eparv-visakka',
    badge: 'Best Seller Trail',
    tagline: 'Conquer tough terrains and city potholes with front suspension.',
    image: '/cycles/visakka.png',
    range: '60 km',
    speed: '25 km/h',
    price: '₹24,999',
    category: 'Off-Road / Trail MTB',
  },
  {
    name: 'Eparv Lahari',
    slug: 'eparv-lahari',
    badge: 'Longest 110 KM Range',
    tagline: 'High-capacity battery for long commutes and cross-city touring.',
    image: '/cycles/lahari.png',
    range: '110 km',
    speed: '25 km/h',
    price: '₹21,999',
    category: 'Long-Range Cruiser',
  },
  {
    name: 'Eparv Savitri',
    slug: 'eparv-savitri',
    badge: 'Upright Comfort',
    tagline: 'Relaxed riding posture with reinforced heavy-duty rear carrier.',
    image: '/cycles/savitri.png',
    range: '110 km',
    speed: '25 km/h',
    price: '₹18,999',
    category: 'Comfort Roadster',
  },
  {
    name: 'Eparv Satya',
    slug: 'eparv-satya',
    badge: 'Heavy-Duty Durability',
    tagline: 'High-tensile steel all-weather electric MTB built for Indian roads.',
    image: '/cycles/satya.png',
    range: '55 km',
    speed: '25 km/h',
    price: '₹21,000',
    category: 'Rugged Trail MTB',
  },
]

export const AboutLineup: React.FC = () => {
  return (
    <section className="py-20 relative bg-muted/20 overflow-hidden border-b border-border/50">
      <div className="container relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
              <Sparkles className="size-3.5 text-energy" />
              <span>The Eparv Lineup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Built for Every Commuter
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              From sleek daily office commuting to weekend off-road trails and heavy-duty family
              utility, explore our diverse electric bicycle lineup.
            </p>
          </div>

          <Link
            href="/electric-cycles"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 text-xs sm:text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all self-start md:self-end"
          >
            <span>View All Models</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Cycles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CYCLES.map((cycle) => (
            <div
              key={cycle.slug}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group hover:border-primary/40"
            >
              {/* Image Container with tag */}
              <div className="relative bg-gradient-to-b from-muted/50 to-muted/10 p-6 flex items-center justify-center min-h-[220px]">
                <span className="absolute top-3.5 left-3.5 text-[10px] sm:text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                  {cycle.badge}
                </span>

                <div className="relative w-full h-44 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={cycle.image}
                    alt={cycle.name}
                    fill
                    className="object-contain drop-shadow-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Info Container */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {cycle.category}
                  </span>
                  <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                    {cycle.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {cycle.tagline}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-border/50">
                  {/* Specs Bar */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Gauge className="size-3.5 text-primary shrink-0" />
                      <span>Range: <strong className="text-foreground">{cycle.range}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Zap className="size-3.5 text-energy shrink-0" />
                      <span>Speed: <strong className="text-foreground">{cycle.speed}</strong></span>
                    </div>
                  </div>

                  {/* Price & Link */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[11px] text-muted-foreground block">Starting at</span>
                      <span className="text-lg font-extrabold text-foreground">{cycle.price}</span>
                    </div>

                    <Link
                      href={`/electric-cycles/${cycle.slug}`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary/10 px-3.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      <span>Explore</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
