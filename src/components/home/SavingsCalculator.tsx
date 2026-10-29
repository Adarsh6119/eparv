'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle2,
  DollarSign,
  Fuel,
  IndianRupee,
  Leaf,
  PiggyBank,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

export const SavingsCalculator: React.FC = () => {
  const [dailyKm, setDailyKm] = useState<number>(20)
  const [vehicleType, setVehicleType] = useState<'scooter' | 'bike'>('scooter')

  // Constants for Indian urban mobility
  const daysPerMonth = 25
  const monthlyKm = dailyKm * daysPerMonth
  const yearlyKm = monthlyKm * 12

  // Petrol vehicle rates
  const petrolPrice = 102 // Rs / Litre
  const mileage = vehicleType === 'scooter' ? 35 : 45 // km / Litre
  const petrolCostPerKm = petrolPrice / mileage
  const petrolMaintenancePerKm = 0.55 // oil, servicing, spark plugs
  const totalPetrolCostPerKm = petrolCostPerKm + petrolMaintenancePerKm

  // Eparv Electric Cycle
  // 36V 10Ah battery = ~0.36 kWh. Consumes ~0.45 units of electricity per charge.
  // 1 unit of domestic power in India = ~Rs. 7.50. Full charge costs ~Rs. 3.40 for 50 km = Rs. 0.07/km.
  const eparvElectricityCostPerKm = 0.07
  const eparvMaintenancePerKm = 0.08
  const totalEparvCostPerKm = eparvElectricityCostPerKm + eparvMaintenancePerKm

  // Savings calculations
  const monthlyPetrolSpend = Math.round(monthlyKm * totalPetrolCostPerKm)
  const monthlyEparvSpend = Math.round(monthlyKm * totalEparvCostPerKm)
  const monthlySavings = monthlyPetrolSpend - monthlyEparvSpend
  const yearlySavings = monthlySavings * 12

  // CO2 Saved (approx 120g CO2 per km for petrol two-wheelers)
  const yearlyCo2SavedKg = Math.round((yearlyKm * 0.12))
  const treesEquivalent = Math.max(1, Math.round(yearlyCo2SavedKg / 20))

  // Payback period (assuming average Rs 22,000 cycle)
  const paybackMonths = Math.max(3, Math.ceil(22000 / Math.max(monthlySavings, 1)))

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-card/30 via-background to-card/50">
      {/* Decorative ambient lighting */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-10 w-80 h-80 bg-energy/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
            <Calculator className="size-4 text-energy" />
            <span>Interactive EV Savings Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            See How Much You Save{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              Every Year
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Petrol prices are touching ₹100+/litre. Switch your daily office or college commute
            to an Eparv electric cycle and put thousands of rupees back into your pocket.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-border/80 bg-card shadow-2xl p-6 sm:p-8 md:p-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Sliders and Inputs */}
            <div className="md:col-span-6 space-y-6">
              {/* Daily Distance Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="commute-slider" className="text-sm font-bold text-foreground flex items-center gap-2">
                    <span>Daily Commute Distance</span>
                  </label>
                  <span className="text-lg font-black text-primary px-3 py-1 rounded-lg bg-primary/10">
                    {dailyKm} km / day
                  </span>
                </div>
                <input
                  id="commute-slider"
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={dailyKm}
                  onChange={(e) => setDailyKm(Number(e.target.value))}
                  className="w-full h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5 font-medium">
                  <span>5 km (Short errand)</span>
                  <span>25 km (Standard commute)</span>
                  <span>60 km (Long commute)</span>
                </div>
              </div>

              {/* Vehicle Comparison Selector */}
              <div>
                <label className="text-sm font-bold text-foreground block mb-2">
                  Compare with Your Current Ride:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVehicleType('scooter')}
                    className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                      vehicleType === 'scooter'
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-border bg-card/60 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Fuel className={`size-4 ${vehicleType === 'scooter' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-xs sm:text-sm font-bold">Petrol Scooter</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground block mt-1">
                      ~35 km/l + monthly service
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicleType('bike')}
                    className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                      vehicleType === 'bike'
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-border bg-card/60 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Fuel className={`size-4 ${vehicleType === 'bike' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-xs sm:text-sm font-bold">100-125cc Bike</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground block mt-1">
                      ~45 km/l + maintenance
                    </span>
                  </button>
                </div>
              </div>

              {/* Quick Math comparison preview */}
              <div className="rounded-2xl border border-border bg-muted/40 p-4 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Monthly Travel ({monthlyKm} km):</span>
                  <span className="font-semibold text-foreground">25 Working Days</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Petrol Two-Wheeler Expense:</span>
                  <span className="font-semibold text-red-500 line-through">₹{monthlyPetrolSpend.toLocaleString('en-IN')} / mo</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Eparv Electricity Bill:</span>
                  <span className="font-bold text-emerald-600">₹{monthlyEparvSpend.toLocaleString('en-IN')} / mo</span>
                </div>
              </div>
            </div>

            {/* Right Column: Savings Summary & Highlights */}
            <div className="md:col-span-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-energy/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-inner">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <PiggyBank className="size-4" />
                  Net Calculated Savings
                </span>

                {/* Big Yearly Savings Callout */}
                <div className="mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
                      ₹{yearlySavings.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-bold text-primary">/ year saved</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    That is <span className="font-bold text-foreground">₹{monthlySavings.toLocaleString('en-IN')} saved every month</span> in pure petrol costs.
                  </p>
                </div>

                {/* Payback & Carbon metrics */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="rounded-xl bg-card border border-border p-3.5 shadow-sm">
                    <div className="flex items-center gap-1.5 text-energy text-xs font-semibold">
                      <Sparkles className="size-3.5" />
                      <span>Zero-Cost Payback</span>
                    </div>
                    <div className="text-xl font-extrabold text-foreground mt-1">
                      ~{paybackMonths} Months
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      Cycle pays for itself completely!
                    </div>
                  </div>

                  <div className="rounded-xl bg-card border border-border p-3.5 shadow-sm">
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                      <Leaf className="size-3.5" />
                      <span>CO₂ Prevented</span>
                    </div>
                    <div className="text-xl font-extrabold text-foreground mt-1">
                      {yearlyCo2SavedKg} kg
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      Equal to planting ~{treesEquivalent} trees 🌲
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct action buttons */}
              <div className="space-y-2.5 pt-2">
                <Link
                  href="/book-test-ride"
                  className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-md shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="size-4" />
                  <span>Book Free Test Ride in My City</span>
                </Link>
                <Link
                  href="/electric-cycles"
                  className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <span>Explore Available Models & Prices</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
