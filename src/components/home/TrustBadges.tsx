'use client'

import React from 'react'
import {
  BatteryCharging,
  FileCheck2,
  Gauge,
  ShieldCheck,
  Truck,
  Umbrella,
  Wrench,
} from 'lucide-react'

import { isClaimVerified } from '@/data/claims'

const STATS = [
  { value: '250W', label: 'BLDC Hub Motor', sub: 'Instant Pickup' },
  { value: '55–110 km', label: 'PAS Range Options', sub: 'Single Charge' },
  { value: '2–4 Hrs', label: 'Home Quick Charge', sub: 'Standard 5A Socket' },
  { value: '110–140 kg', label: 'Payload Capacity', sub: 'Reinforced Frame' },
]

export const TrustBadges: React.FC = () => {
  const verifiedLicense = isClaimVerified('noLicenseRto')
  const verifiedDealers = isClaimVerified('dealers150plus')
  const verifiedFrame = isClaimVerified('frame5yr')
  const verifiedIp65 = isClaimVerified('ip65')

  const trustItems = [
    {
      icon: ShieldCheck,
      title: verifiedFrame ? '5-Year Frame Warranty' : 'Factory Direct Warranty',
      description: verifiedFrame
        ? 'Aircraft-grade tensile steel & alloy durability guarantee'
        : 'Comprehensive manufacturer warranty on frame, motor & battery',
    },
    {
      icon: FileCheck2,
      title: verifiedLicense ? 'No License or RTO Needed' : 'CMVR Low-Speed Architecture',
      description: verifiedLicense
        ? '100% compliant with 25 km/h electric cycle regulations'
        : 'Engineered strictly within 250W motor and 25 km/h parameters',
    },
    {
      icon: Umbrella,
      title: verifiedIp65 ? 'IP65 Water & Dust Resistant' : 'Weather-Sealed Electronics',
      description: verifiedIp65
        ? 'Certified IP65 protection for heavy Indian monsoons'
        : 'Water-sealed wiring harnesses & isolated hub motor casing',
    },
    {
      icon: Truck,
      title: '95% Pre-Assembled Delivery',
      description: 'Factory boxed with toolkit included for quick 10-minute setup',
    },
    {
      icon: Wrench,
      title: verifiedDealers ? '150+ Verified Dealers' : 'Authorized Dealer Network',
      description: verifiedDealers
        ? '150+ verified dealership touchpoints across India'
        : 'Verified showroom partners & direct factory spare parts dispatch',
    },
  ]

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

      {/* Trust Guarantee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {trustItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="flex items-start gap-3 p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-card"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-4 text-energy" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {item.title}
                </h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
