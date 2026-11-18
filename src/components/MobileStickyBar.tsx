'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, Calendar } from 'lucide-react'
import { COMPANY_DETAILS } from '@/data/company'

export const MobileStickyBar: React.FC = () => {
  const pathname = usePathname()

  // Do not render on admin panel
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const handleCallClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'call_click', {
        event_category: 'engagement',
        event_label: 'mobile_sticky_bar',
        page_location: window.location.href,
      })
    }
  }

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'mobile_sticky_bar',
        page_location: window.location.href,
      })
    }
  }

  const whatsappMessage = encodeURIComponent(
    'Hi Eparv, I am interested in exploring Eparv Electric Cycles. Please share model details, pricing, and test ride options.',
  )

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Quick Actions"
    >
      {/* Call Button */}
      <a
        href={COMPANY_DETAILS.contact.phoneTel}
        onClick={handleCallClick}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors text-center"
        aria-label="Call Eparv Customer Care"
      >
        <Phone className="size-4 text-primary mb-0.5" />
        <span className="text-[11px] font-semibold tracking-tight">Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/91${COMPANY_DETAILS.contact.phone}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors text-center"
        aria-label="Chat with Eparv on WhatsApp"
      >
        <MessageCircle className="size-4 text-emerald-500 mb-0.5" />
        <span className="text-[11px] font-semibold tracking-tight">WhatsApp</span>
      </a>

      {/* Book Test Ride Button */}
      <Link
        href="/book-test-ride"
        className="flex-[1.5] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-md shadow-primary/20 transition-all text-center"
      >
        <Calendar className="size-3.5" />
        <span>Book Test Ride</span>
      </Link>
    </div>
  )
}
