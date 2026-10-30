'use client'

import React, { useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  MessageCircle,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from 'lucide-react'

const ONBOARDING_STEPS = [
  {
    step: '01',
    title: 'Submit Application',
    timeframe: 'Day 1',
    desc: 'Fill out our confidential online dealer form with your city, showroom space, and preferred investment tier.',
    deliverable: 'Instant application acknowledgment & assigned franchise advisor.',
  },
  {
    step: '02',
    title: 'Territory Feasibility & Allotment',
    timeframe: 'Day 2–3',
    desc: 'Our expansion team evaluates local EV demand, demographics, and confirms pin-code exclusivity for your territory.',
    deliverable: 'Territory exclusivity agreement & financial projection model.',
  },
  {
    step: '03',
    title: 'Showroom Setup & Inventory',
    timeframe: 'Day 4–10',
    desc: 'Receive standardized 3D store branding, promotional materials, demo display stands, and factory-fresh inventory.',
    deliverable: 'Complete turnkey showroom kit & technician certification.',
  },
  {
    step: '04',
    title: 'Grand Launch & Lead Routing',
    timeframe: 'Day 12+',
    desc: 'Inaugurate with a targeted hyper-local digital advertising blitz. Direct customer leads from eparvingenuity.com route to your phone.',
    deliverable: 'Live dealer directory listing & real-time WhatsApp inquiry stream.',
  },
]

const FAQS = [
  {
    question: 'What is the minimum showroom space required to open a dealership?',
    answer:
      'For an Authorized Retailer tier, a compact display area of 150–250 sq. ft. inside an existing automobile, bicycle, or retail store is sufficient. For an Exclusive Experience Center, we recommend 400–800 sq. ft. with dedicated display pedestals and an express quick-service bay.',
  },
  {
    question: 'Do customers need an RTO registration or driving license to buy an Eparv cycle?',
    answer:
      'No! All Eparv electric cycles are powered by 250W BLDC hub motors and capped at 25 km/h, which classifies them as non-motorized vehicles under Indian CMVR regulations. They require zero RTO registration, zero road tax, zero insurance paperwork, and zero driving license. This makes walk-in sales fast and hassle-free.',
  },
  {
    question: 'What profit margins do dealers earn?',
    answer:
      'Eparv dealers enjoy industry-leading margins of 25% to 35% on electric cycle sales. Additional revenue streams include high 40%–50% margins on fast-moving accessories (smart locks, helmets, cargo carriers, pannier bags), genuine spare parts, and battery upgrade kits.',
  },
  {
    question: 'How does Eparv protect my business territory?',
    answer:
      'We offer strict pin-code and territorial exclusivity. Once you are onboarded as an authorized partner for a designated pin-code or micro-market, no other Eparv dealer will be allotted in your operational zone. Online orders and test-ride bookings from your area are prioritized to your dealership.',
  },
  {
    question: 'What after-sales and warranty support does Eparv provide?',
    answer:
      'Eparv provides comprehensive manufacturer warranty coverage on lithium battery packs, BLDC hub motors, and frames. We supply pre-packaged fast-moving spares kits, and our engineering team provides video and hands-on technician training to your staff so repairs take less than 30 minutes.',
  },
  {
    question: 'How quickly can I break even on my investment?',
    answer:
      'Based on average dealer metrics across tier 1, 2, and 3 markets selling 8 to 18 units per month, most Eparv franchise partners recover their initial setup and stock investment within 4 to 6 months of operation.',
  },
]

export const DealerOnboarding: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <section className="py-20 relative bg-muted/20 border-t border-border/50">
      <div className="container relative z-10 space-y-20">
        {/* Section 1: 4-Step Onboarding Process */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
              <Rocket className="size-3.5 text-energy" />
              <span>Simple 4-Step Path to Launch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              From Application to First Sale in 14 Days
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Our streamlined dealer onboarding framework eliminates red tape and gets your showroom
              profitable as quickly as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ONBOARDING_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className="relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all group"
              >
                {/* Step pill and connector line on large screens */}
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    {s.step}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                    <Clock className="size-3 text-energy" />
                    {s.timeframe}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-[11px] font-semibold text-primary flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500 mt-0.5" />
                    <span>{s.deliverable}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Dealer FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
              <HelpCircle className="size-3.5 text-energy" />
              <span>Dealer FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Everything you need to know about starting an Eparv franchise dealership.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ml-3 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Section 3: Dealer Expansion Desk Support Bar */}
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-background to-energy/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2 justify-center md:justify-start">
              <Users className="size-5 text-primary" />
              Need to discuss customized dealership terms?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Connect directly with our National Franchise Expansion Desk for multi-outlet or state master distributorships.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919170244766"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-all"
            >
              <PhoneCall className="size-4" />
              <span>Call +91 91702 44766</span>
            </a>
            <a
              href="https://wa.me/919170244766?text=Hello%20Eparv%20Team%2C%20I%20am%20interested%20in%20becoming%20an%20authorized%20dealer."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
            >
              <MessageCircle className="size-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
