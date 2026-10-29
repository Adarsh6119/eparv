'use client'

import React, { useState } from 'react'
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Bike,
  CheckCircle2,
  Gauge,
  HeartPulse,
  Sparkles,
  Zap,
} from 'lucide-react'

interface ModeInfo {
  id: string
  title: string
  shortName: string
  subtitle: string
  description: string
  effortLevel: string
  effortPercent: number
  topSpeed: string
  maxRange: string
  batteryDrain: string
  accentColor: string
  bestFor: string
  features: string[]
}

const MODES: ModeInfo[] = [
  {
    id: 'throttle',
    title: 'Pure Throttle Mode',
    shortName: 'Twist & Go',
    subtitle: '100% Electric — Zero Pedaling Required',
    description:
      'Turn the right-hand twist throttle and zoom ahead just like a scooter. Smooth 250W instant acceleration carries you forward without breaking a single drop of sweat.',
    effortLevel: '0% Effort (Effortless)',
    effortPercent: 0,
    topSpeed: '25 km/h',
    maxRange: 'Up to 50 km',
    batteryDrain: 'Standard',
    accentColor: '#13a5de',
    bestFor: 'Daily traffic, office commutes in formal clothes, signal green lights',
    features: [
      'Instant hub torque from standstill',
      'Smooth twist throttle with safety cut-off',
      'No license or registration required by law',
    ],
  },
  {
    id: 'pas',
    title: '5-Level Intelligent Pedal Assist',
    shortName: 'Smart Assist (PAS)',
    subtitle: 'Multiplies Your Leg Power by up to 300%',
    description:
      'High-precision cadence sensors detect when you turn the pedals and seamlessly deliver electric boost. Choose between 5 levels of assist to flatten every steep flyover and bridge.',
    effortLevel: '25% Effort (Super Light)',
    effortPercent: 25,
    topSpeed: '25 km/h',
    maxRange: 'Up to 110 km',
    batteryDrain: 'Ultra Efficient',
    accentColor: '#10b981',
    bestFor: 'Long distance touring, steep flyovers, headwind rides',
    features: [
      '5 adjustable assist intensity modes',
      'Maximizes battery range up to 110 km',
      'Smooth motor power ramp-up without jerking',
    ],
  },
  {
    id: 'manual',
    title: 'Pure Fitness Pedal Mode',
    shortName: 'Manual Cycle',
    subtitle: 'Classic Bicycle Ride for Fitness & Cardio',
    description:
      'Turn the assist off and pedal like a traditional geared cycle. Experience the smooth Shimano mechanical drive train when you want your daily morning exercise.',
    effortLevel: '100% Effort (Full Workout)',
    effortPercent: 100,
    topSpeed: 'Rider Powered',
    maxRange: 'Unlimited',
    batteryDrain: '0% Battery Used',
    accentColor: '#faa435',
    bestFor: 'Morning cardio workouts, weekend fitness rides with friends',
    features: [
      'Zero battery consumption',
      'Low friction sealed bottom bracket',
      'Ride freely even if battery runs down',
    ],
  },
  {
    id: 'walk',
    title: '6 km/h Walk Assist Mode',
    shortName: 'Walk Assist',
    subtitle: 'Effortless Slope & Basement Parking Rolling',
    description:
      'Push and hold the button — the cycle powers itself forward at a gentle walking pace of 6 km/h. Never struggle pushing a heavy cycle up a steep mall or apartment basement ramp again.',
    effortLevel: '5% Effort (Guiding Only)',
    effortPercent: 5,
    topSpeed: '6 km/h',
    maxRange: 'As Needed',
    batteryDrain: 'Minimal',
    accentColor: '#8b5cf6',
    bestFor: 'Steep basement ramps, flyover footpaths, crowded markets',
    features: [
      'Gentle 6 km/h walking speed assist',
      'Prevents cycle from rolling backwards on inclines',
      'One-touch thumb button operation',
    ],
  },
]

export const RidingModes: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ModeInfo>(MODES[0])

  return (
    <section className="py-20 bg-card/60 relative overflow-hidden border-y border-border">
      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
            <Zap className="size-4 text-energy" />
            <span>Versatile 4-in-1 Riding Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            One Cycle.{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              Four Intelligent Modes.
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Whether you want a sweat-free commute, an energetic morning workout, or an assisted
            long-distance adventure — switch riding styles at the press of a button.
          </p>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-3xl mx-auto">
          {MODES.map((mode) => {
            const isSelected = activeMode.id === mode.id
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode)}
                className={`cursor-pointer px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105'
                    : 'bg-card text-foreground border-border hover:border-primary/40 hover:bg-muted'
                }`}
              >
                <Zap className={`size-4 ${isSelected ? 'text-energy fill-energy' : 'text-primary'}`} />
                <span>{mode.shortName}</span>
              </button>
            )
          })}
        </div>

        {/* Active Mode Spotlight Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle glow accent */}
          <div
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
            style={{ backgroundColor: activeMode.accentColor }}
          />

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Mode Description & Bullets */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold text-white bg-foreground">
                <Bike className="size-3.5 text-energy" />
                <span>{activeMode.title}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                {activeMode.subtitle}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeMode.description}
              </p>

              {/* Best for highlight */}
              <div className="p-3.5 rounded-xl border border-border bg-muted/50 text-xs text-foreground">
                <span className="font-bold text-primary">Best suited for: </span>
                {activeMode.bestFor}
              </div>

              {/* Key Features checklist */}
              <ul className="space-y-2 pt-2">
                {activeMode.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/90">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance Gauges Dashboard */}
            <div className="md:col-span-5 rounded-2xl border border-border/80 bg-muted/30 p-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Mode Performance Profile:
              </span>

              {/* Effort Meter */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <HeartPulse className="size-3.5 text-rose-500" />
                    Rider Leg Effort:
                  </span>
                  <span className="font-bold text-foreground">{activeMode.effortLevel}</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                    style={{ width: `${Math.max(activeMode.effortPercent, 4)}%` }}
                  />
                </div>
              </div>

              {/* Speed Metric */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2">
                  <Gauge className="size-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">Assisted Speed</span>
                </div>
                <span className="text-sm font-black text-foreground">{activeMode.topSpeed}</span>
              </div>

              {/* Range Metric */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2">
                  <BatteryCharging className="size-4 text-emerald-500" />
                  <span className="text-xs text-muted-foreground font-medium">Expected Range</span>
                </div>
                <span className="text-sm font-black text-foreground">{activeMode.maxRange}</span>
              </div>

              {/* Battery Efficiency */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-energy" />
                  <span className="text-xs text-muted-foreground font-medium">Battery Efficiency</span>
                </div>
                <span className="text-xs font-bold text-primary">{activeMode.batteryDrain}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
