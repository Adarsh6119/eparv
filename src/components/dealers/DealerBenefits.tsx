'use client'

import React from 'react'
import {
  Award,
  Coins,
  Cpu,
  FileCheck2,
  Headset,
  MapPin,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'

const BENEFITS = [
  {
    icon: Coins,
    title: 'High Profit Margins & Fast ROI',
    highlight: '25% to 35% gross margin per cycle',
    description:
      'Earn substantial upfront retail margins on every cycle sold, plus lucrative repeat earnings from accessories (smart helmets, locks, child carriers), battery upgrades, and servicing.',
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-energy',
  },
  {
    icon: MapPin,
    title: 'Guaranteed Territory Exclusivity',
    highlight: 'Complete pin-code protection',
    description:
      'We respect your investment. Every authorized Eparv dealer receives exclusive distribution rights for their assigned town, district, or pin-code cluster with zero local competition.',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-primary',
  },
  {
    icon: Megaphone,
    title: 'Direct Customer Leads to Your Phone',
    highlight: '100% website lead pass-through',
    description:
      'Riders visiting eparvingenuity.com from your city who request test rides, model quotes, or availability are automatically routed directly to your showroom phone and WhatsApp.',
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Store,
    title: 'Full Showroom Branding Support',
    highlight: 'Turnkey 3D signage & marketing kits',
    description:
      'We provide illuminated showroom signboards, branded floor display podiums, standees, model spec brochures, and promotional customer merchandising to make your store stand out.',
    color: 'from-purple-500/20 to-violet-500/20',
    iconColor: 'text-purple-500',
  },
  {
    icon: FileCheck2,
    title: 'Zero RTO & Zero License = Instant Sales',
    highlight: '10-minute customer checkout',
    description:
      'Because Eparv cycles are low-speed CMVR compliant (250W, 25 km/h limit), customers require no RTO registration, no road tax, and no driving license. Selling is as simple as retail consumer electronics.',
    color: 'from-sky-500/20 to-indigo-500/20',
    iconColor: 'text-sky-500',
  },
  {
    icon: Wrench,
    title: 'Factory Warranty & Mechanic Training',
    highlight: '60-month frame & 24-month motor warranty',
    description:
      'Eparv provides comprehensive factory warranty coverage, free technical training for your service technicians, and guaranteed 48-hour dispatch for genuine spare parts.',
    color: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-500',
  },
]

export const DealerBenefits: React.FC = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
            <TrendingUp className="size-4 text-energy" />
            <span>Unmatched Business Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Why Partner with{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              Eparv Mobility?
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Electric cycles are India&apos;s fastest growing micro-mobility segment. We make it easy,
            profitable, and sustainable for dealers to lead the green transition in their cities.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="group rounded-3xl border border-border bg-card p-7 flex flex-col justify-between shadow-lg hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`rounded-2xl p-3 bg-gradient-to-br ${b.color}`}>
                    <b.icon className={`size-6 ${b.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    Verified Advantage
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground">
                  {b.title}
                </h3>
                <span className="text-xs font-bold text-primary block mt-1">
                  {b.highlight}
                </span>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-3">
                  {b.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                <ShieldCheck className="size-4" />
                <span>100% Contractual Commitment</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
