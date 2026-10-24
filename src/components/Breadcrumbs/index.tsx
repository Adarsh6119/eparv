import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'

type Crumb = {
  label: string
  href?: string
}

/**
 * Accessible breadcrumb navigation with a matching BreadcrumbList
 * structured-data block.
 */
export const Breadcrumbs: React.FC<{ items: Crumb[] }> = ({ items }) => {
  const base = getServerSideURL()

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-foreground' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: `${base}${item.href}` } : {}),
          })),
        }}
      />
    </nav>
  )
}
