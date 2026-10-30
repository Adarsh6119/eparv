import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  BookOpen,
  Building2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-[#061220] text-slate-300">
      <div className="container py-14">
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand & About Column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link className="inline-block" href="/">
              <Logo />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineering India&apos;s next-generation electric bicycles for daily urban commutes,
              active lifestyles, and commercial delivery fleets. 100% CMVR compliant, zero RTO
              registration, and zero emissions.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <a
                href="tel:+919170244766"
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
              >
                <Phone className="size-3.5 text-primary shrink-0" />
                <span>+91 91702 44766</span>
              </a>
              <a
                href="mailto:support@eparvingenuity.com"
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
              >
                <Mail className="size-3.5 text-primary shrink-0" />
                <span>support@eparvingenuity.com</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="size-3.5 text-energy shrink-0 mt-0.5" />
                <span>Delhi NCR &amp; Pan-India Distribution Showrooms</span>
              </div>
            </div>
          </div>

          {/* Column 2: Electric Cycles Lineup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Zap className="size-3.5 text-energy" />
              <span>Electric Cycles</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/electric-cycles/eparv-panther"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Eparv Panther (City Commuter)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycles/eparv-visakka"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Eparv Visakka (Trail MTB)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycles/eparv-lahari"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Eparv Lahari (110 km Cruiser)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycles/eparv-savitri"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Eparv Savitri (Comfort Roadster)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycles/eparv-satya"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Eparv Satya (Everyday Rugged)
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/electric-cycles"
                  className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Compare All Models</span>
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Intent Hubs (Shop by Purpose & Budget) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              <span>Shop by Need</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/electric-cycle-under-20000"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  E-Cycle Under ₹20,000
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycle-under-25000"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  E-Cycle Under ₹25,000
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycle-for-delivery"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  For Delivery Riders &amp; Fleets
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycle-for-students"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  For College Students
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycle-for-senior-citizens"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  For Senior Citizens
                </Link>
              </li>
              <li>
                <Link
                  href="/bulk-orders"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Bulk &amp; Fleet Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location Hubs (State & City Showrooms) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Building2 className="size-3.5 text-energy" />
              <span>State &amp; City Hubs</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/electric-cycle-in"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white font-medium"
                >
                  All India Location Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycle-in/delhi-ncr"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Delhi NCR (6 Cities)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycle-in/uttar-pradesh"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Uttar Pradesh (9 Cities)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycle-in/bihar"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Bihar (5 Cities)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycle-in/madhya-pradesh"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Madhya Pradesh (5 Cities)
                </Link>
              </li>
              <li>
                <Link
                  href="/dealers"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Find Nearest Dealer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Knowledge Hub & EV Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-primary" />
              <span>EV Guides &amp; Help</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/posts/electric-cycles-explained"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Electric Cycles Explained (Pillar)
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/electric-cycle-real-range-pas-vs-throttle"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  PAS vs Throttle Real Range
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/electric-cycle-license-rto-rules-india"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  CMVR Laws &amp; License Rules
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/electric-cycle-running-cost-per-km"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Running Cost Per KM Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/eparv-vs-emotorad-electric-cycle"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Eparv vs eMotorad Comparison
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/blog"
                  className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>All Knowledge Hub Posts</span>
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links Secondary Bar */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/become-a-dealer" className="text-slate-400 hover:text-white transition-colors">
              Become a Dealer
            </Link>
            <Link href="/book-test-ride" className="text-slate-400 hover:text-white transition-colors">
              Book a Free Test Ride
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
              Contact Us
            </Link>
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                className="text-slate-400 hover:text-white transition-colors"
                {...link}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span>5-Year Frame Warranty • 100% CMVR Compliant</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Theme */}
        <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Eparv Ingenuity Private Limited. All rights reserved. Made
            with pride in India 🇮🇳
          </div>
          <div className="flex items-center gap-4">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
