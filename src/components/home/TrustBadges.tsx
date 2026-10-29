'use client'

import React from 'react'
import {
  Award,
  BatteryCharging,
  FileCheck2,
  Gauge,
  ShieldCheck,
  Truck,
  Umbrella,
  Wrench,
} from 'lucide-react'

const STATS = [
  { value: '250W', label: 'BLDC Hub Motor', sub: 'Instant Pickup' },
  { value: '110 km', label: 'Max Range (PAS)', sub: 'Single Charge' },
  { value: '2–3 Hrs', label: 'Quick Full Charge', sub: 'Standard 5A Socket' },
  { value: '150 kg', label: 'Payload Capacity', sub: 'Reinforced Frame' },
]

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: '5-Year Frame Warranty',
    description: 'Aircraft-grade tensile steel & alloy durability guarantee',
  },
  {
    icon: FileCheck2,
    title: 'No License or RTO Needed',
    description: '100% ARAI compliant 25 km/h EV speed regulations',
  },
  {
    icon: Umbrella,
    title: 'IP65 Water & Dust Resistant',
    description: 'Ride confidently through heavy Indian monsoons & potholes',
  },
  {
    icon: Truck,
    title: '95% Pre-Assembled Delivery',
    description: 'Unbox, tighten handlebar, and ride in under 10 minutes',
  },
  {
    icon: Wrench,
    title: 'Pan-India Service Network',
    description: '150+ authorized dealer touchpoints & genuine parts support',
  },
]

export const TrustBadges: React.FC = () => {
  return (
    <div className="relative z-20 -mt-10 sm:-mt-14 mb-16 container">
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-border bg-card/90 shadow-2xl backdrop-blur-xl mb-6">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-muted/40 text-center transition-all duration-200 hover:bg-primary/5 hover:scale-[1.02]"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-foreground mt-1">
              {stat.label}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              {stat.sub}
            </span>
          </div>
        ))}
      </div>

      {/* 5 Trust Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {TRUST_ITEMS.map((item, idx) => (
          <div
            key={item.title}
            className={`flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-xl border border-border/80 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card hover:-translate-y-0.5 ${
              idx === 4 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <div className="rounded-lg bg-primary/10 p-2 text-primary mb-2.5">
              <item.icon className="size-5 text-primary" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
              {item.title}
            </h4>
            <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
