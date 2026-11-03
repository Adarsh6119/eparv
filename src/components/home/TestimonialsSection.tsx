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

import { COMPANY_DETAILS } from '@/data/company'

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
    name: 'Saurabh Srivastava',
    role: 'Senior Financial Analyst',
    city: 'Dwarka Sector 11, New Delhi',
    model: 'Eparv Panther (City Commuter)',
    rating: 5,
    headline: 'Dwarka to Aerocity commute is now completely sweat-free!',
    quote:
      'My 14 km office commute from Dwarka used to take 45–50 minutes in bumper-to-bumper morning traffic. On the Panther, I cruise through bypass roads in 25 minutes flat. Being able to take the battery up to my 3rd floor flat to charge via a normal 5A socket is an absolute game-changer.',
    avatarInitial: 'SS',
    savings: '₹3,200/mo saved on petrol',
  },
  {
    id: '2',
    name: 'Dr. Manisha Verma',
    role: 'Assistant Professor & Daily Commuter',
    city: 'Gomti Nagar, Lucknow, UP',
    model: 'Eparv Savitri (Comfort Roadster)',
    rating: 5,
    headline: 'Upright sitting posture and sturdy carrier make it so practical',
    quote:
      'I wanted a reliable electric cycle for university commutes and local grocery runs. Savitri’s upright posture is very comfortable for daily riding, and the heavy-duty rear carrier easily carries books and shopping bags. Full charge takes just 2.5 hours.',
    avatarInitial: 'MV',
    savings: '₹2,400/mo saved',
  },
  {
    id: '3',
    name: 'Nitin Agrawal',
    role: 'Civil Contractor & Site Engineer',
    city: 'Vijay Nagar, Indore, MP',
    model: 'Eparv Visakka (Trail MTB)',
    rating: 5,
    headline: 'Conquers Indore bypass flyovers and broken roads with zero effort',
    quote:
      'Indore flyovers and ongoing roadwork test any vehicle. Visakka’s front suspension absorbs harsh bumps effortlessly and the 250W hub motor powers up steep inclines without breaking a sweat. The dual disc brakes give incredible confidence in wet weather.',
    avatarInitial: 'NA',
    savings: '₹3,800/mo saved',
  },
  {
    id: '4',
    name: 'Ankit Mehra',
    role: 'Tech Operations Lead',
    city: 'Sector 62, Noida, UP',
    model: 'Eparv Lahari (Long Range Cruiser)',
    rating: 5,
    headline: 'The 110 km range is genuine — charge it just twice a week',
    quote:
      'I travel 32 km round-trip between Noida and Delhi. Lahari easily delivers 3 full days of riding on pedal assist mode on a single charge. The build quality, frame rigidity, and responsive motor response are far superior to generic conversion kits.',
    avatarInitial: 'AM',
    savings: '₹4,100/mo saved',
  },
  {
    id: '5',
    name: 'Rameshwar Tiwari',
    role: 'Stationery Store Owner',
    city: 'Kankarbagh, Patna, Bihar',
    model: 'Eparv Savitri (Family Utility)',
    rating: 5,
    headline: 'Replaced my old 100cc petrol scooter for all shop supply runs',
    quote:
      'I used to spend nearly ₹3,500 every month on petrol for my shop deliveries in Patna. Since switching to Savitri, my monthly electricity bill only increased by around ₹80! It requires no RTO registration, no road tax, and zero petrol bills.',
    avatarInitial: 'RT',
    savings: '₹3,400/mo saved',
  },
  {
    id: '6',
    name: 'Harshit Kapoor',
    role: 'B.Tech Student',
    city: 'Janakpuri / Dwarka, New Delhi',
    model: 'Eparv Panther (Stealth Commuter)',
    rating: 5,
    headline: 'Best purchase for college travel. No license and zero fuel cost!',
    quote:
      'Travelling between Janakpuri and Dwarka campus every day was getting expensive on autos and metro. Panther is lightweight, fast, and the key ignition and battery lock provide great security when parked outside coaching or college.',
    avatarInitial: 'HK',
    savings: 'Pocket money intact',
  },
  {
    id: '7',
    name: 'Vikramaditya Chauhan',
    role: 'Corporate Professional',
    city: 'DLF CyberCity, Gurugram, Haryana',
    model: 'Eparv Satya (Everyday Rugged)',
    rating: 5,
    headline: 'Instant motor cut-off on brakes and rock-solid build quality',
    quote:
      'Gurugram traffic requires quick braking and agile handling. The electronic motor cut-off stops acceleration the split-second you touch the brake levers. Customer support from the Eparv Dwarka head office was exemplary from order to delivery.',
    avatarInitial: 'VC',
    savings: '₹2,800/mo saved',
  },
  {
    id: '8',
    name: 'Sunil Kumar Yadav',
    role: 'Quick Commerce Fleet Rider',
    city: 'Delhi NCR',
    model: 'Eparv Lahari (Heavy Duty)',
    rating: 5,
    headline: '100% of my delivery earnings stay in my pocket now',
    quote:
      'When you ride 60–80 km daily delivering packages, fuel eats up half your daily income. On the Eparv Lahari, my daily running cost is barely ₹4. The frame is tough and the battery charges quickly between shifts.',
    avatarInitial: 'SY',
    savings: '₹5,000+/mo saved',
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
            Loved by Daily{' '}
            <span className="bg-gradient-to-r from-primary to-energy bg-clip-text text-transparent">
              {COMPANY_DETAILS.metrics.cyclesServed} Indian Commuters
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Real riders, real daily commutes, and real savings. From Dwarka and Noida to Lucknow,
            Patna, and Indore, here is what owners say about switching to Eparv electric cycles.
          </p>

          <div className="mt-5 inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-card border border-border shadow-sm">
            <div className="flex items-center gap-1 text-energy">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-energy text-energy" />
              ))}
            </div>
            <span className="text-sm font-black text-foreground">Verified Rider Reviews</span>
            <span className="text-xs text-muted-foreground border-l border-border pl-3">
              {COMPANY_DETAILS.metrics.cyclesServedLabel}
            </span>
          </div>
        </div>

        {/* Testimonials Grid (2 columns on md, 3 on xl) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200"
            >
              <div>
                {/* Header: Stars & Savings */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-energy">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-energy text-energy" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
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
                      <MapPin className="size-3 text-energy" />
                      <span>{review.city}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    Model:
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
