'use client'

import React, { useState } from 'react'
import {
  Battery,
  Cpu,
  Eye,
  Gauge,
  Layers,
  Shield,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react'

interface TechFeature {
  id: string
  title: string
  highlight: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  specs: string[]
  description: string
  image: string
}

const TECH_FEATURES: TechFeature[] = [
  {
    id: 'motor',
    title: '250W BLDC Hub Motor',
    highlight: 'Instant 45Nm torque with whisper-quiet efficiency',
    icon: Zap,
    badge: 'IP65 Waterproof',
    specs: ['250W Continuous Power', '45 Nm Peak Torque', 'Brushless & Maintenance-Free', '24-Month Warranty'],
    description:
      'Engineered specifically for Indian stop-and-go city traffic and steep flyover climbs. The high-efficiency brushless hub motor delivers instant power the moment you twist the throttle or turn the pedals.',
    image: '/cycles/panther.png',
  },
  {
    id: 'battery',
    title: 'Smart Detachable Li-ion Battery',
    highlight: 'Charge anywhere inside your home or office in 2–3 hours',
    icon: Battery,
    badge: 'Grade-A Cells',
    specs: ['36V High-Energy Capacity', '2–3 Hrs Fast Charging', 'Dual Key Anti-Theft Lock', 'Intelligent Smart BMS'],
    description:
      'No charging station required! Simply unlock the battery with your key, take it to your apartment or office desk, and plug it into any standard 5A household wall socket just like a laptop.',
    image: '/visakka-images/03-visakka-battery-closeup.png',
  },
  {
    id: 'brakes',
    title: 'Dual Disc Brakes with Motor Cut-off',
    highlight: 'Instant stopping power with electronic fail-safe protection',
    icon: Shield,
    badge: 'Wet Weather Safe',
    specs: ['160mm Dual Rotor Discs', '0.1s Instant Motor Cut-off', 'High Heat Dissipation', 'All-Weather Pad Grip'],
    description:
      'Safety comes first on busy Indian streets. Tapping either brake lever instantly cuts off electrical power to the hub motor in 100 milliseconds, ensuring controlled, skid-free stopping even during heavy monsoon downpours.',
    image: '/cycles/visakka.png',
  },
  {
    id: 'display',
    title: 'Digital LCD Smart Cockpit',
    highlight: 'Crystal-clear visibility under harsh Indian afternoon sunlight',
    icon: Gauge,
    badge: 'Day & Night Display',
    specs: ['Real-Time Speedometer', 'Battery Fuel Level Meter', '5-Level PAS Selector', 'Integrated LED Lamp Switch'],
    description:
      'Keep complete control at your fingertips. The weather-resistant digital console displays your current speed, trip mileage, remaining battery capacity, and lets you toggle headlamps with a single click.',
    image: '/panther-images/04-panther-handlebar-closeup.png',
  },
  {
    id: 'suspension',
    title: 'Tough Terrain Suspension Fork',
    highlight: 'Smooths out potholes, rough gravel, and high speed humps',
    icon: Layers,
    badge: '80mm Travel',
    specs: ['80mm Damping Travel', 'Preload Adjustability', 'Alloy Crown & Stanchions', 'Wrist Fatigue Relief'],
    description:
      'Say goodbye to shoulder and wrist aches. The front suspension fork absorbs shocks from potholes, speed breakers, and unpaved roads, ensuring every commute is silky smooth.',
    image: '/cycles/lahari.png',
  },
  {
    id: 'frame',
    title: 'Reinforced 150kg Payload Chassis',
    highlight: 'Aircraft-grade tensile steel & alloy with 5-year warranty',
    icon: Cpu,
    badge: '60-Month Warranty',
    specs: ['150 kg Load Tested', 'Multi-Coat Anti-Rust Finish', 'Robotically Welded Joints', 'Rear Carrier Ready'],
    description:
      'Built to last decades. The frame is structurally tested to carry rider plus heavy cargo up to 150 kg with zero frame flexing. Protected by a premium corrosion-resistant powder coating.',
    image: '/cycles/savitri.png',
  },
]

export const TechAnatomy: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<TechFeature>(TECH_FEATURES[0])

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
            <Wrench className="size-4 text-energy" />
            <span>Heavy-Duty Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Engineered for the Realities of{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              Indian Roads
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            From scorching 45°C summers and waterlogged monsoon roads to steep flyovers and
            potholes — Eparv cycles are designed with heavy-duty components that never let you down.
          </p>
        </div>

        {/* Feature Grid & Interactive Inspector */}
        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: 6 Feature Pills */}
          <div className="lg:col-span-5 space-y-2.5">
            {TECH_FEATURES.map((feat) => {
              const isSelected = selectedFeature.id === feat.id
              return (
                <div
                  key={feat.id}
                  onClick={() => setSelectedFeature(feat)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-md shadow-primary/10 scale-[1.02]'
                      : 'border-border bg-card/60 hover:bg-card hover:border-primary/40'
                  }`}
                >
                  <div
                    className={`rounded-xl p-2.5 shrink-0 ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <feat.icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-foreground truncate">
                        {feat.title}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-energy/20 text-energy">
                        {feat.badge}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {feat.highlight}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Deep-Dive Preview Box */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <Sparkles className="size-3.5 text-energy" />
                  Component Deep-Dive
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/20">
                  {selectedFeature.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                {selectedFeature.title}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-primary mt-1">
                {selectedFeature.highlight}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                {selectedFeature.description}
              </p>

              {/* Specs pill list */}
              <div className="grid grid-cols-2 gap-2.5 mt-6">
                {selectedFeature.specs.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-muted/40 text-xs font-semibold text-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Component Image Preview */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-center">
              <div className="relative w-full max-w-sm h-48 sm:h-56 flex items-center justify-center">
                <img
                  src={selectedFeature.image}
                  alt={selectedFeature.title}
                  className="w-full h-full object-contain filter drop-shadow-xl transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
