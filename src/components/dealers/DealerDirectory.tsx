'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Store,
} from 'lucide-react'

import type { Dealer } from '@/payload-types'

interface DealerDirectoryProps {
  dealers: Dealer[]
  states: string[]
  selectedState?: string
}

export const DealerDirectory: React.FC<DealerDirectoryProps> = ({
  dealers,
  states,
  selectedState,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeState, setActiveState] = useState<string>(selectedState ?? '')

  const filteredDealers = useMemo(() => {
    return dealers.filter((d) => {
      const matchState = !activeState || d.state?.toLowerCase() === activeState.toLowerCase()
      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchState
      const matchQuery =
        d.businessName.toLowerCase().includes(q) ||
        d.city?.toLowerCase().includes(q) ||
        d.state?.toLowerCase().includes(q) ||
        d.address?.toLowerCase().includes(q)
      return matchState && matchQuery
    })
  }, [dealers, activeState, searchQuery])

  const scrollToApply = () => {
    const el = document.getElementById('apply')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 relative overflow-hidden bg-background" id="directory">
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
              <Store className="size-4 text-energy" />
              <span>Verified Showroom Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Authorized Eparv Dealerships
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Locate authorized experience centers for test rides, purchases, and genuine service
              support. Or apply to establish your own showroom.
            </p>
          </div>

          {/* Quick Apply CTA pill */}
          <button
            type="button"
            onClick={scrollToApply}
            className="cursor-pointer inline-flex h-11 items-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all self-start md:self-end"
          >
            <Sparkles className="size-3.5 text-energy" />
            <span>Open a Dealership in Your City</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Search Bar & State Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by city, town, or dealership name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          {/* State Pills */}
          {states.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setActiveState('')}
                className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !activeState
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                All States ({dealers.length})
              </button>
              {states.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setActiveState(activeState === st ? '' : st)}
                  className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeState.toLowerCase() === st.toLowerCase()
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dealers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer) => (
            <article
              key={dealer.id}
              className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between shadow-md hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Verified Dealership
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <MapPin className="size-3 text-primary" />
                    <span>{dealer.city}</span>
                  </span>
                </div>

                <h3 className="text-lg font-black text-foreground">
                  <Link href={`/dealers/${dealer.slug}`} className="hover:text-primary transition-colors">
                    {dealer.businessName}
                  </Link>
                </h3>

                <p className="text-xs font-semibold text-primary mt-0.5">
                  {dealer.city}{dealer.state ? `, ${dealer.state}` : ''}
                </p>

                {dealer.address && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {dealer.address}
                  </p>
                )}

                {dealer.openingHours && (
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Clock className="size-3 text-energy shrink-0" />
                    <span>{dealer.openingHours}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2">
                <Link
                  href={`/dealers/${dealer.slug}`}
                  className="grow inline-flex h-9 items-center justify-center gap-1 rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary/90 transition-all shadow-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="size-3" />
                </Link>

                <Link
                  href={`/book-test-ride?city=${encodeURIComponent(dealer.city ?? '')}`}
                  className="grow inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover:bg-muted transition-colors"
                >
                  <Calendar className="size-3 text-energy" />
                  <span>Test Ride</span>
                </Link>
              </div>
            </article>
          ))}

          {/* Open Territory Opportunity Card */}
          <div className="rounded-3xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-7 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-energy/20 text-energy mb-4">
                <Sparkles className="size-3.5" />
                <span>Prime Territory Available</span>
              </div>

              <h3 className="text-xl font-black text-foreground">
                Your City is Open for Dealership Rights!
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed mt-2.5">
                We are rapidly expanding across India. Apply today to secure exclusive territorial
                dealership rights for your district before another entrepreneur steps in.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  <span>High 25–35% Gross Retail Margins</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  <span>Free Turnkey Showroom Branding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  <span>Exclusive Protected Pin-Codes</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={scrollToApply}
                className="cursor-pointer w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary text-xs font-bold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
              >
                <span>Claim Exclusive City Rights</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
