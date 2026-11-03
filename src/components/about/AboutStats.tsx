'use client'

import React from 'react'
import {
  Award,
  Building2,
  Calendar,
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

import { COMPANY_DETAILS } from '@/data/company'

const STATS = [
  {
    value: COMPANY_DETAILS.metrics.cyclesServed,
    label: 'Electric Cycles on Roads',
    sub: 'Active Daily Commuters Across India',
    icon: Users,
    color: 'text-primary',
  },
  {
    value: '₹0.04',
    label: 'Cost Per Kilometer',
    sub: '98% Cheaper than Petrol Two-Wheelers',
    icon: Coins,
    color: 'text-energy',
  },
  {
    value: '2021',
    label: 'Founded 31 March 2021',
    sub: 'Over 3+ Years of Dedicated EV Engineering',
    icon: Calendar,
    color: 'text-cyan-500',
  },
  {
    value: '25 Cities',
    label: 'Distribution & Service',
    sub: 'Delhi NCR, UP, Bihar & MP Network',
    icon: MapPin,
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
                <div
                  className={`size-12 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="size-6" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
