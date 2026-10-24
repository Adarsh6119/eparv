import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

/**
 * Eparv wordmark — a lightning bolt inside a rounded mark plus the brand
 * name. Rendered as inline SVG with currentColor so it adapts to light and
 * dark themes.
 */
export const Logo = ({ className }: Props) => {
  return (
    <span className={clsx('inline-flex items-center gap-2', className)}>
      <svg
        aria-hidden="true"
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="8" fill="var(--primary)" />
        <path
          d="M17.8 6 10 18h5l-1.6 8L22 14h-5l.8-8Z"
          fill="var(--primary-foreground)"
        />
      </svg>
      <span className="text-[1.35rem] font-semibold tracking-tight">Eparv</span>
    </span>
  )
}
