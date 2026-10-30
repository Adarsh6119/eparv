import React from 'react'
import Link from 'next/link'
import { ArrowRight, Compass, Layers, MapPin, Sparkles } from 'lucide-react'
import type { RelatedLinkItem } from '@/data/linkGraph'

interface RelatedLinksProps {
  heading?: string
  subheading?: string
  links: RelatedLinkItem[]
  className?: string
}

export const RelatedLinks: React.FC<RelatedLinksProps> = ({
  heading = 'Explore Related Models, Guides & Locations',
  subheading = 'Continue research with verified specifications, buyer priority guides, and city delivery details.',
  links,
  className = '',
}) => {
  if (!links || links.length === 0) return null

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'model':
        return Sparkles
      case 'location':
        return MapPin
      case 'intent':
        return Compass
      default:
        return Layers
    }
  }

  return (
    <section aria-label="Related links" className={`my-12 pt-8 border-t border-border/60 ${className}`}>
      <div className="space-y-1 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {heading}
        </h3>
        {subheading && (
          <p className="text-xs sm:text-sm text-muted-foreground">{subheading}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {links.map((link, idx) => {
          const Icon = getCategoryIcon(link.category)
          return (
            <Link
              key={idx}
              href={link.url}
              className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <Icon className="size-3 text-energy" />
                  <span>{link.category}</span>
                </div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {link.title}
                </h4>
                {link.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 pt-0.5">
                    {link.description}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-end text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                <ArrowRight className="size-3.5" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
