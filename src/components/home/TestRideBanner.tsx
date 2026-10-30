'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react'

import { STATE_HUBS, CITIES, type StateHubSlug } from '@/data/cities'
import { isClaimVerified } from '@/data/claims'

export const TestRideBanner: React.FC = () => {
  const [activeStateHub, setActiveStateHub] = useState<StateHubSlug>('delhi-ncr')
  const [selectedCity, setSelectedCity] = useState<string>('Delhi')

  const currentHub = STATE_HUBS[activeStateHub]
  const currentCityList = currentHub.cities.map((slug) => CITIES[slug]).filter(Boolean)

  const showDealerCountClaim = isClaimVerified('dealers150plus')

  return (
    <section className="py-16 relative overflow-hidden" id="test-ride-banner">
      <div className="container relative z-10">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-[#0a1b2e] via-[#0d2238] to-[#081525] p-8 sm:p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle glowing accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-energy/15 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
                <Calendar className="size-3.5 text-energy" />
                <span>Zero Cost • Zero Obligation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Experience the Power in Person.{' '}
                <span className="bg-gradient-to-r from-primary via-[#5eead4] to-energy bg-clip-text text-transparent">
                  Book a Free Test Ride.
                </span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
                Feel the surge of the 250W BLDC motor, test responsive dual disc brakes, and check
                how comfortably the frame fits your commute. Doorstep slots or authorized showroom
                rides available across 25 target cities.
              </p>

              {/* Guarantees */}
              <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-emerald-400 shrink-0" />
                  <span>20-Min Dedicated Ride</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>No Purchase Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-emerald-400 shrink-0" />
                  <span>Doorstep or Showroom</span>
                </div>
              </div>
            </div>

            {/* Right Card / City Selector Grouped by 4 State Hubs */}
            <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 block">
                Select Your Region & City:
              </span>

              {/* State Hub Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-black/30 border border-white/10">
                {(Object.keys(STATE_HUBS) as StateHubSlug[]).map((hubKey) => {
                  const hub = STATE_HUBS[hubKey]
                  const isActive = activeStateHub === hubKey
                  return (
                    <button
                      key={hubKey}
                      type="button"
                      onClick={() => {
                        setActiveStateHub(hubKey)
                        const firstCity = STATE_HUBS[hubKey].cities[0]
                        if (firstCity && CITIES[firstCity]) {
                          setSelectedCity(CITIES[firstCity].displayName)
                        }
                      }}
                      className={`cursor-pointer px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {hub.displayName}
                    </button>
                  )
                })}
              </div>

              {/* City quick buttons for active hub */}
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {currentCityList.map((city) => {
                  const isCityActive = selectedCity.toLowerCase() === city.displayName.toLowerCase()
                  return (
                    <button
                      key={city.slug}
                      type="button"
                      onClick={() => setSelectedCity(city.displayName)}
                      className={`cursor-pointer px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isCityActive
                          ? 'bg-energy text-slate-950 font-bold'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {city.displayName}
                    </button>
                  )
                })}
              </div>

              {/* Selection Summary */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80 space-y-1">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Selected Location:</span>
                  <span className="text-energy">{selectedCity} ({currentHub.displayName})</span>
                </div>
                <p className="text-[11px] text-white/60">
                  Doorstep or authorized showroom slot can be coordinated for your preferred date.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href={`/book-test-ride?city=${encodeURIComponent(selectedCity)}`}
                  className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="size-4" />
                  <span>Book Free Test Ride in {selectedCity}</span>
                </Link>
                <Link
                  href="/dealers"
                  className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/20 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <MapPin className="size-3.5 text-primary" />
                  <span>
                    {showDealerCountClaim
                      ? 'View All 150+ Dealerships Across India'
                      : 'Explore Authorized Dealership Network'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
