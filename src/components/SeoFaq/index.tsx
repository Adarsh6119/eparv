import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import type { CityFaq } from '@/cities/types'

/**
 * Renders an FAQ list with a matching FAQPage JSON-LD block. Only genuinely
 * true, hand-written answers belong in `faqs` — the structured data mirrors
 * them verbatim.
 */
export const SeoFaqSection: React.FC<{
  faqs: CityFaq[]
  title?: string
}> = ({ faqs, title = 'Frequently asked questions' }) => {
  if (!faqs.length) {
    return null
  }

  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <h2 id="faq-heading" className="mb-6 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="divide-y rounded-xl border bg-card">
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium">
              {faq.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />
    </section>
  )
}
