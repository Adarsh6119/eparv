'use client'

import React from 'react'
import {
  Award,
  CheckCircle2,
  Coins,
  Compass,
  FileCheck2,
  Leaf,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

const STATS = [
  {
    value: '10,000+',
    label: 'Riders Empowered',
    sub: 'Daily Commuters Across India',
    icon: Users,
    color: 'text-primary',
  },
  {
    value: '₹0.05',
    label: 'Cost Per Kilometer',
    sub: '98% Cheaper than Petrol Bikes',
    icon: Coins,
    color: 'text-energy',
  },
  {
    value: '50+',
    label: 'Cities Network',
    sub: 'Authorized Dealers & Service',
    icon: MapPin,
    color: 'text-cyan-500',
  },
  {
    value: '1,200+',
    label: 'Tons CO₂ Prevented',
    sub: 'Clean Green Micro-Mobility',
    icon: Leaf,
    color: 'text-emerald-500',
  },
]

export const AboutStats: React.FC = () => {
  return (
    <section className="py-16 relative bg-muted/30 border-b border-border/50">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-3 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted group-hover:scale-110 transition-transform">
                  <Icon className={`size-6 ${stat.color}`} />
                </div>
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                    {stat.value}
                  </span>
                  <h3 className="text-sm font-bold text-foreground">{stat.label}</h3>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
