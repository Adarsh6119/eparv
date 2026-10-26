import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

/**
 * Eparv brand mark — the official EAV monogram with the energy bolt,
 * served from /eparv-logo.png (transparent background, works on light
 * and dark themes).
 */
export const Logo = ({ className, loading: loadingFromProps, priority: priorityFromProps }: Props) => {
  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <span className={clsx('inline-flex items-center gap-2', className)}>
      <img
        alt="Eparv logo"
        width={40}
        height={40}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="h-10 w-10"
        src="/eparv-logo.png"
      />
      <span className="text-[1.35rem] font-semibold tracking-tight text-primary">Eparv</span>
    </span>
  )
}
