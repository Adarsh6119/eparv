'use client'

import React from 'react'
import {
  Award,
  CheckCircle2,
  Clock,
  Eye,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'

const VALUES = [
  {
    icon: Award,
    title: 'Indigenous Innovation',
    desc: 'Proudly engineered in India. We design cycles adapted to the Indian climate, terrain, and riding behavior rather than simply rebadging generic global kits.',
  },
  {
    icon: ShieldCheck,
    title: 'Rider Safety First',
    desc: 'We never cut corners on battery quality or braking systems. Every lithium pack features certified thermal monitoring and auto-cutoff disc brakes.',
  },
  {
    icon: Leaf,
    title: 'Measurable Sustainability',
    desc: 'Every 1,000 kilometers ridden on an Eparv cycle saves approximately 120 kg of carbon emissions compared to petrol two-wheelers, delivering real clean air impact.',
  },
  {
    icon: Heart,
    title: 'Customer Obsession',
    desc: 'From your first test ride to years into ownership, our pan-India network of authorized dealers and service engineers are dedicated to keeping your cycle in prime condition.',
  },
]

const QA_STEPS = [
  {
    step: '01',
    title: 'Cell-Level Battery Testing',
    desc: 'Lithium cells are tested for internal resistance, heat dissipation, and cycle retention before assembly into packs.',
  },
  {
    step: '02',
    title: 'Frame Stress & Fatigue',
    desc: 'High-tensile alloy frames undergo 100,000-cycle vibration and drop tests exceeding BIS safety benchmarks.',
  },
  {
    step: '03',
    title: 'Monsoon Waterproofing',
    desc: 'Harnesses, throttle modules, and controllers are tested for IP65 water-ingress resistance in heavy spray booths.',
  },
  {
    step: '04',
    title: 'Dyno & Braking Cut-Off',
    desc: 'Every completed cycle runs on our dynamometer to verify peak torque output, top speed cut-off, and brake-disconnect microswitches.',
  },
]

export const AboutValues: React.FC = () => {
  return (
    <section className="py-20 relative bg-background overflow-hidden border-b border-border/50">
      <div className="container relative z-10 space-y-20">
        {/* Core Values Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
              <Sparkles className="size-3.5 text-energy" />
              <span>What Drives Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Our Core Principles
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              The fundamental convictions that guide our design choices, manufacturing practices,
              and customer relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quality Assurance Framework */}
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Rigorous Standards
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
              The 40-Point Factory Inspection
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              No Eparv electric cycle leaves our assembly facility without completing our exhaustive
              safety and performance protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QA_STEPS.map((qa) => (
              <div
                key={qa.step}
                className="rounded-xl border border-border/80 bg-background/80 backdrop-blur-sm p-5 space-y-2.5"
              >
                <span className="text-xs font-black text-energy uppercase tracking-wider">
                  Phase {qa.step}
                </span>
                <h4 className="font-bold text-base text-foreground">{qa.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{qa.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
