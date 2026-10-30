'use client'

import React from 'react'
import {
  Compass,
  Flame,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  TrendingDown,
  Zap,
} from 'lucide-react'

export const AboutStory: React.FC = () => {
  return (
    <section className="py-20 relative bg-background overflow-hidden border-b border-border/50">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: The Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
              <Rocket className="size-3.5 text-energy" />
              <span>Our Story & Purpose</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Born to Transform the{' '}
              <span className="text-primary">Daily Indian Commute</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                Every single day, millions of Indians battle suffocating traffic jams, skyrocketing
                fuel expenses, and crowded public transit. While conventional bicycles offer an
                eco-friendly alternative, steep flyovers, midday heat, and long distances leave
                riders exhausted and drenched in sweat before their workday even begins.
              </p>
              <p>
                <strong className="text-foreground font-semibold">Eparv Ingenuity</strong> was
                established to solve this exact dilemma. We asked ourselves:{' '}
                <em>
                  &ldquo;What if daily travel could be as effortless as twisting a throttle, as
                  healthy as pedaling when you choose, and so economical that a 20 km commute costs
                  less than a single cup of tea?&rdquo;
                </em>
              </p>
              <p>
                From that vision emerged the Eparv electric cycle lineup — engineered from the ground
                up for Indian road conditions. High-tensile reinforced frames, high-torque 250W BLDC
                hub motors that easily conquer flyovers, monsoon-sealed IP65 electrical harnesses, and
                smart BMS battery packs built to withstand peak Indian summer heat.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-base">
                  <Target className="size-5 text-energy" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  To eliminate daily commuting stress by providing ultra-reliable, zero-emission
                  electric bicycles operating at just ₹0.05 per kilometer.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
                  <Globe2 className="size-5 text-emerald-500" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  To empower 100,000+ Indian riders by 2028 with accessible green mobility and foster
                  cleaner, breathable cities across India.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Foundational Pillars */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />

              <div className="space-y-1">
                <span className="text-xs font-semibold text-energy uppercase tracking-wider">
                  The Eparv Commitment
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Why Commuters Trust Us
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <TrendingDown className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">98% Fuel Cost Savings</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      While petrol costs ₹100+/Litre, a full charge costs ₹4–₹5 for up to 60–110 km
                      of riding range.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Zero Bureaucracy</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      CMVR compliant non-motorized category. No RTO registration fees, no road tax,
                      and no driving license required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Lightbulb className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Made for Indian Roads</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Reinforced frames, all-terrain tires, and dual disc brakes built to endure
                      monsoon rains, speed bumps, and rough city patches.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <HeartHandshake className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Pan-India Support</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Rapidly growing authorized dealership network, doorstep delivery, and 24–48
                      hour technical parts dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
