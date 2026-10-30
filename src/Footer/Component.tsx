import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Mail, MapPin, Phone, ShieldCheck, Sparkles, Zap } from 'lucide-react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-[#061220] text-slate-300">
      <div className="container py-14">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & About Column (Spans 2 on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link className="inline-block" href="/">
              <Logo />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Engineering India&apos;s next-generation electric bicycles for daily urban commutes,
              active lifestyles, and commercial delivery fleets. 100% CMVR compliant, zero RTO
              registration, and zero emissions.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <a
                href="tel:+919170244766"
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
              >
                <Phone className="size-3.5 text-primary" />
                <span>+91 91702 44766 (Mon–Sat, 9:30 AM – 7:00 PM)</span>
              </a>
              <a
                href="mailto:support@eparvingenuity.com"
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
              >
                <Mail className="size-3.5 text-primary" />
                <span>support@eparvingenuity.com</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="size-3.5 text-energy" />
                <span>Headquarters: Delhi NCR &amp; Pan-India Showrooms</span>
              </div>
            </div>
          </div>

          {/* Electric Cycles Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Zap className="size-3.5 text-energy" />
              <span>Electric Cycles</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
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
                  Eparv Savitri (Family Utility)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycles/eparv-satya"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Eparv Satya (Rugged MTB)
                </Link>
              </li>
              <li>
                <Link
                  href="/electric-cycles"
                  className="text-primary font-semibold hover:underline inline-block pt-1"
                >
                  View All Models →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Network Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              <span>Company</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white font-medium"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/dealers"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Dealers &amp; Showrooms
                </Link>
              </li>
              <li>
                <Link
                  href="/become-a-dealer"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Become a Dealer
                </Link>
              </li>
              <li>
                <Link
                  href="/book-test-ride"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Book a Test Ride
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Blog &amp; EV Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Fleets Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Support &amp; Fleets</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/bulk-orders"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Bulk &amp; Corporate Fleets
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors text-slate-400 hover:text-white"
                >
                  Contact Support
                </Link>
              </li>
              {/* Dynamic CMS Nav Items (Privacy, Terms, etc.) */}
              {navItems.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink
                    className="text-slate-400 hover:text-white transition-colors"
                    {...link}
                  />
                </li>
              ))}
            </ul>
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
