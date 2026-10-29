'use client'

import React from 'react'
import {
  CheckCircle2,
  MapPin,
  Quote,
  Sparkles,
  Star,
  ThumbsUp,
  UserCheck,
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  city: string
  model: string
  rating: number
  quote: string
  headline: string
  avatarInitial: string
  savings: string
}

const REVIEWS: Testimonial[] = [
  {
    id: '1',
    name: 'Amitabh Sharma',
    role: 'IT Consultant & Daily Commuter',
    city: 'Bengaluru, Karnataka',
    model: 'Eparv Panther (Stealth Commuter)',
    rating: 5,
    headline: 'Saved over ₹3,200 every month on Outer Ring Road commute!',
    quote:
      'My 18 km office commute from Whitefield used to take 1 hour 20 minutes in cab/metro rush. On the Panther, I cruise past gridlocked traffic in 35 minutes flat. Charging the battery under my desk is an absolute game-changer.',
    avatarInitial: 'AS',
    savings: '₹38,000 / yr saved',
  },
  {
    id: '2',
    name: 'Pooja Nair',
    role: 'Fitness Enthusiast & College Professor',
    city: 'Pune, Maharashtra',
    model: 'Eparv Visakka (MTB)',
    rating: 5,
    headline: 'Steep flyovers and hills feel completely flat with pedal assist!',
    quote:
      'I wanted a cycle for morning fitness that could also handle Pune flyovers without leaving me exhausted before lectures. The 5-level pedal assist is brilliantly tuned — gentle yet powerful. Build quality is top-notch.',
    avatarInitial: 'PN',
    savings: 'Zero petrol bills',
  },
  {
    id: '3',
    name: 'Rajesh Patel',
    role: 'Pharmacy Store Owner',
    city: 'Ahmedabad, Gujarat',
    model: 'Eparv Lahari (110 km Range)',
    rating: 5,
    headline: '110 km range is real. We charge it just once every 3 days!',
    quote:
      'We use the Lahari for local medicine deliveries across city routes. It handles potholes and heavy loads effortlessly. The 60-month frame warranty and local dealer support made our decision very easy.',
    avatarInitial: 'RP',
    savings: '₹45,000 / yr saved',
  },
  {
    id: '4',
    name: 'Kunal Singhania',
    role: 'Architect & Urban Cyclist',
    city: 'Delhi NCR',
    model: 'Eparv Satya (Trail Edition)',
    rating: 5,
    headline: 'Suspension and dual disc brakes give incredible confidence',
    quote:
      'Delhi monsoons and broken patches test any two-wheeler. The electronic motor cut-off on braking stops the bike instantly, and the suspension absorbs nasty potholes. Easily the best purchase I made this year.',
    avatarInitial: 'KS',
    savings: '₹28,000 / yr saved',
  },
]

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-card/40 border-t border-border">
      <div className="container relative z-10">
        {/* Heading & Score Banner */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-3">
            <UserCheck className="size-4 text-energy" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Loved by Over{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              1,500+ Indian Riders
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Real riders, real daily commutes, and real savings. Here is what owners say about
            switching to Eparv electric cycles.
          </p>

          {/* Aggregate Rating Pill */}
          <div className="mt-5 inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-card border border-border shadow-sm">
            <div className="flex items-center gap-1 text-energy">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-energy text-energy" />
              ))}
            </div>
            <span className="text-sm font-black text-foreground">4.9 / 5.0</span>
            <span className="text-xs text-muted-foreground border-l border-border pl-3">
              Based on 1,500+ verified customer reviews
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-border bg-card p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:border-primary/40 transition-all duration-200"
            >
              <div>
                {/* Header: Stars & Model */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-energy">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-energy text-energy" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    {review.savings}
                  </span>
                </div>

                <h4 className="text-base font-bold text-foreground mb-2 leading-snug">
                  &ldquo;{review.headline}&rdquo;
                </h4>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {review.quote}
                </p>
              </div>

              {/* Rider Info footer */}
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/15 text-primary font-black flex items-center justify-center text-sm">
                    {review.avatarInitial}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <span>{review.name}</span>
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="size-3" />
                      <span>{review.city}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    Owns:
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {review.model.split(' (')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
