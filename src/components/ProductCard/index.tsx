'use client'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'

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

const AVAILABILITY_STYLES: Record<string, string> = {
  'in-stock': 'bg-success/30 border-success text-foreground',
  'pre-order': 'bg-warning/30 border-warning text-foreground',
  'out-of-stock': 'bg-error/30 border-error text-foreground',
  discontinued: 'bg-muted border-border text-muted-foreground',
}

const AVAILABILITY_LABELS: Record<string, string> = {
  'in-stock': 'In stock',
  'pre-order': 'Pre-order',
  'out-of-stock': 'Out of stock',
  discontinued: 'Discontinued',
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
  const imageUrlValue = imageUrl || (image?.url ?? null)
  const hasPromo = typeof promotionalPrice === 'number' && promotionalPrice > 0

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card flex flex-col',
        className,
      )}
    >
      <div className="relative w-full aspect-[4/3] bg-muted">
        {image ? (
          <Media resource={image} size="33vw" imgClassName="object-contain" />
        ) : imageUrlValue ? (
          <img
            src={imageUrlValue}
            alt={name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            Image coming soon
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 grow">
        <div className="flex items-center justify-between gap-2">
          <span className="uppercase text-xs tracking-wide text-muted-foreground">
            {CATEGORY_LABELS[category ?? ''] ?? category}
          </span>
          {availability && (
            <span
              className={cn(
                'text-xs border rounded-full px-2 py-0.5 whitespace-nowrap',
                AVAILABILITY_STYLES[availability] ?? '',
              )}
            >
              {AVAILABILITY_LABELS[availability] ?? availability}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold leading-snug">
          <Link className="hover:text-primary" href={href}>
            {name}
          </Link>
        </h3>
        {tagline && <p className="text-sm text-muted-foreground">{tagline}</p>}
        <div className="mt-auto pt-2 flex items-baseline gap-2 flex-wrap">
          {typeof price === 'number' && (
            <span className={cn('font-semibold', hasPromo && 'line-through text-muted-foreground text-sm')}>
              {inr.format(price)}
            </span>
          )}
          {hasPromo && typeof promotionalPrice === 'number' && (
            <span className="font-semibold text-primary">{inr.format(promotionalPrice)}</span>
          )}
          {isDemoData && <span className="text-xs text-muted-foreground">(demo data)</span>}
        </div>
      </div>
    </article>
  )
}
