'use client'

import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Gauge,
  Zap,
} from 'lucide-react'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Product } from '@/payload-types'
import { CYCLE_MODELS } from '@/components/home/CycleLineup'

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const CATEGORY_LABELS: Record<string, string> = {
  'city-commuter': 'City Commuter',
  foldable: 'Foldable',
  'off-road': 'Off-Road / MTB',
  cargo: 'Cargo / Utility',
  kids: 'Kids',
}

export type CardProductData = Pick<
  Product,
  'slug' | 'name' | 'category' | 'tagline' | 'shortDescription' | 'price' | 'promotionalPrice' | 'availability' | 'isDemoData'
> & {
  featuredImage?: Product['featuredImage']
  imageUrl?: string | null
}

export const ProductCard: React.FC<{
  alignItems?: 'center'
  className?: string
  product?: CardProductData
}> = (props) => {
  const { className, product } = props

  if (!product) {
    return null
  }

  const { slug, name, category, tagline, price, promotionalPrice, availability, isDemoData, featuredImage, imageUrl } = product
  const href = `/electric-cycles/${slug}`
  const image = featuredImage && typeof featuredImage === 'object' ? featuredImage : null

  // Match against canonical CYCLE_MODELS by slug for rich specs, badges, and clean PNGs
  const canonical = CYCLE_MODELS.find(
    (m) =>
      slug?.toLowerCase().includes(m.id) ||
      m.slug.toLowerCase() === slug?.toLowerCase() ||
      name?.toLowerCase().includes(m.name.toLowerCase().replace('eparv ', ''))
  )

  const fallbackCycleImage =
    slug?.includes('visak') ? '/cycles/visakka.png' :
    slug?.includes('panther') ? '/cycles/panther.png' :
    slug?.includes('lahari') ? '/cycles/lahari.png' :
    slug?.includes('savitri') ? '/cycles/savitri.png' :
    slug?.includes('satya') ? '/cycles/satya.png' : null

  const resolvedImage = canonical?.image || imageUrl || (image?.url ?? fallbackCycleImage)
  const resolvedBadge = canonical?.badge || 'Eparv Electric'
  const resolvedBadgeColor = canonical?.badgeColor || 'bg-primary text-white'
  const resolvedRange = canonical?.range || '55–110 km'
  const resolvedMotor = canonical?.motor || '250W BLDC'
  const resolvedHighlights = canonical?.highlights || ['250W BLDC Hub Motor', 'Detachable Lithium Pack', 'Dual Disc Brakes']

  const displayPrice =
    typeof promotionalPrice === 'number' && promotionalPrice > 0
      ? inr.format(promotionalPrice)
      : typeof price === 'number'
      ? inr.format(price)
      : canonical?.price || '₹19,999'

  const displayOriginalPrice =
    typeof promotionalPrice === 'number' && promotionalPrice > 0 && typeof price === 'number'
      ? inr.format(price)
      : canonical?.originalPrice

  return (
    <article
      className={cn(
        'group rounded-3xl border border-border bg-card shadow-lg hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden',
        className,
      )}
    >
      <div>
        {/* Image Stage - Identical to CycleLineup */}
        <div className="relative w-full h-60 sm:h-64 lg:h-72 flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-muted/40 via-muted/10 to-transparent border-b border-border/60 overflow-hidden">
          {/* Subtle spotlight glow */}
          <div className="absolute inset-0 bg-radial from-primary/15 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Badge */}
          <span
            className={`absolute top-3.5 left-3.5 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-md ${resolvedBadgeColor}`}
          >
            {resolvedBadge}
          </span>

          {/* Price Pill */}
          <div className="absolute top-3.5 right-3.5 text-right z-10">
            <span className="text-xs sm:text-sm font-black text-foreground block bg-card/95 px-3 py-1 rounded-full border border-border shadow-md backdrop-blur-md">
              {displayPrice}
            </span>
            {displayOriginalPrice && (
              <span className="text-[10px] text-muted-foreground line-through block mt-0.5 pr-1 font-semibold">
                {displayOriginalPrice}
              </span>
            )}
          </div>

          {/* Photo */}
          {resolvedImage ? (
            <img
              src={resolvedImage}
              alt={name}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : image ? (
            <Media resource={image} size="33vw" imgClassName="object-contain w-full h-full" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              Image coming soon
            </div>
          )}
        </div>

        {/* Title & Category Info */}
        <div className="p-5 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            {canonical?.category || CATEGORY_LABELS[category ?? ''] || category || 'Electric Cycle'}
          </span>
          <h3 className="text-xl font-black text-foreground mt-0.5 group-hover:text-primary transition-colors">
            <Link href={href}>{name}</Link>
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {tagline || canonical?.tagline || product.shortDescription}
          </p>
        </div>

        {/* Specs Quick Pills */}
        <div className="px-5 py-2 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60">
            <Gauge className="size-4 text-primary shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-muted-foreground font-medium">Max Range</div>
              <div className="font-extrabold text-foreground truncate">{resolvedRange}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60">
            <Zap className="size-4 text-energy shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-muted-foreground font-medium">Motor</div>
              <div className="font-extrabold text-foreground truncate">{resolvedMotor}</div>
            </div>
          </div>
        </div>

        {/* Highlight checklist */}
        <div className="px-5 py-3 border-t border-border/40 space-y-1.5">
          {resolvedHighlights.map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card CTA Buttons */}
      <div className="p-5 pt-3 space-y-2 border-t border-border/60 bg-muted/10">
        <Link
          href={href}
          className="w-full inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary text-xs font-bold text-white shadow-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5"
        >
          <span>View Specifications</span>
          <ArrowRight className="size-3.5" />
        </Link>

        <Link
          href={`/book-test-ride?model=${slug}`}
          className="w-full inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover:bg-muted transition-colors"
        >
          <Calendar className="size-3.5 text-energy" />
          <span>Book Free Test Ride</span>
        </Link>
      </div>
    </article>
  )
}
