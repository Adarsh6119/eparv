'use client'

import React from 'react'
import {
  BatteryCharging,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Timer,
  Umbrella,
  Wrench,
  Zap,
} from 'lucide-react'

const INNOVATIONS = [
  {
    icon: BatteryCharging,
    title: 'Grade-A Smart BMS Lithium Battery',
    desc: 'Automotive-grade lithium-ion cells with an intelligent Battery Management System (BMS) safeguarding against thermal runaway, overvoltage, short circuits, and deep discharge. Rated for 1,000+ charge cycles.',
    badge: '1,000+ Cycles',
  },
  {
    icon: Zap,
    title: 'High-Torque 250W BLDC Hub Motor',
    desc: 'Whisper-quiet brushless direct-current motor delivering 35–45 Nm peak torque. Designed to glide up steep city flyovers and inclines effortlessly without straining your knees or battery efficiency.',
    badge: '35–45 Nm Torque',
  },
  {
    icon: Layers,
    title: '4 Flexible Riding Modes',
    desc: 'Switch on the fly between Pure Electric Throttle (twist & cruise), 5-Level Pedal Assist System (PAS for 80% pedal boost), Cruise Mode for highway cruising, and Traditional Manual pedaling for fitness.',
    badge: 'Pure Throttle + PAS',
  },
  {
    icon: ShieldCheck,
    title: 'Electronic Motor Cut-off Brakes',
    desc: 'Dual ventilated disc brakes integrated with instant electronic cut-off microswitches. The moment either brake lever is engaged, electrical power is cut to the motor for reliable emergency stopping control.',
    badge: 'Dual Disc + Cut-off',
  },
  {
    icon: Umbrella,
    title: 'Monsoon-Sealed IP65 Architecture',
    desc: 'Specially engineered for Indian monsoons. Features water-sealed quick-disconnect connectors, rain-proof battery casing, and weather-isolated hub motor casing for year-round dependability.',
    badge: 'IP65 Weatherproof',
  },
  {
    icon: Wrench,
    title: 'Engineered for Tough Indian Roads',
    desc: 'High-tensile steel and lightweight 6061 alloy frames stress-tested to absorb harsh road vibrations, potholes, and speed bumps while maintaining crisp, responsive riding ergonomics.',
    badge: 'Reinforced Chassis',
  },
]

export const AboutInnovations: React.FC = () => {
  return (
    <section className="py-20 relative bg-background overflow-hidden border-b border-border/50">
      <div className="container relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
            <Cpu className="size-3.5 text-energy" />
            <span>Indigenous Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            The Eparv Engineering Advantage
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Every component in an Eparv electric cycle is purpose-built to deliver long-term durability,
            uncompromising rider safety, and maximum battery efficiency.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INNOVATIONS.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-primary/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[11px] font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
