'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X, ArrowRight } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; scrolled?: boolean }> = ({
  data,
  scrolled,
}) => {
  const navItems = data?.navItems || []
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map(({ link }, i) => {
          return (
            <div key={i} className="relative">
              <CMSLink
                {...link}
                appearance="link"
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
              />
            </div>
          )
        })}
        <Link
          href="/search"
          className="ml-1 flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-primary/10"
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="size-[18px] text-muted-foreground transition-colors hover:text-primary" />
        </Link>
        <Link
          href="/electric-cycles"
          className="ml-2 inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:-translate-y-px"
        >
          Shop Now
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="relative z-50 flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-primary/10 md:hidden"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? (
          <X className="size-5" />
        ) : (
          <Menu className="size-5" />
        )}
      </button>

      {/* Mobile Navigation Overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-card shadow-2xl md:hidden">
            <div className="flex h-16 items-center justify-end px-4">
              {/* Spacer for the X button in the header */}
            </div>
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navItems.map(({ link }, i) => (
                <div key={i} onClick={() => setMobileOpen(false)}>
                  <CMSLink
                    {...link}
                    appearance="link"
                    className="block w-full rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                  />
                </div>
              ))}
              <hr className="my-2 border-border" />
              <Link
                href="/search"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <SearchIcon className="size-5 text-muted-foreground" />
                Search
              </Link>
              <Link
                href="/electric-cycles"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
              >
                Shop Now
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
