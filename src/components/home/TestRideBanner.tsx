'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  PhoneCall,
  Sparkles,
  Zap,
} from 'lucide-react'

const TOP_CITIES = [
  'Delhi NCR',
  'Bengaluru',
  'Mumbai',
  'Pune',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Jaipur',
  'Chandigarh',
]

export const TestRideBanner: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Delhi NCR')

  return (
    <section className="py-16 relative overflow-hidden">
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
                <span>Zero Cost • Zero Pressure</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Experience the Power in Person.{' '}
                <span className="bg-gradient-to-r from-primary via-[#5eead4] to-energy bg-clip-text text-transparent">
                  Book a Free Test Ride.
                </span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
                Feel the surge of the 250W BLDC motor, test the responsive disc brakes, and see how
                comfortably the frame fits your riding style. Our authorized dealer will arrange
                everything for your preferred date and time.
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
                  <span>Doorstep or Dealership</span>
                </div>
              </div>
            </div>

            {/* Right Card / City Selector */}
            <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 block">
                Quick Schedule in Your City:
              </span>

              {/* City quick buttons */}
              <div className="flex flex-wrap gap-1.5">
                {TOP_CITIES.slice(0, 6).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`cursor-pointer px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedCity === city
                        ? 'bg-primary text-white font-bold'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80 space-y-1">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Selected Location:</span>
                  <span className="text-energy">{selectedCity}</span>
                </div>
                <p className="text-[11px] text-white/60">
                  Multiple authorized dealerships and test ride slots available this week.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/book-test-ride"
                  className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="size-4" />
                  <span>Confirm Free Slot in {selectedCity}</span>
                </Link>
                <Link
                  href="/dealers"
                  className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/20 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <MapPin className="size-3.5" />
                  <span>View All 150+ Dealerships Across India</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
