import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  // Ensure the primary hero heading renders as an <h1> for strict SEO compliance
  if (richText && typeof richText === 'object' && 'root' in richText) {
    const root = (richText as any).root
    if (Array.isArray(root?.children)) {
      for (const child of root.children) {
        if (child?.type === 'heading') {
          child.tag = 'h1'
          break
        }
      }
    }
  }

  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
