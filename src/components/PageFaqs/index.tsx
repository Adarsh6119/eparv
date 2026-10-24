import React from 'react'

import type { Page } from '@/payload-types'

/**
 * Renders the FAQ fields attached to a page (used on city and state landing
 * pages) together with FAQPage structured data that matches the visible
 * content exactly.
 */
export const PageFaqs: React.FC<{ faqs?: Page['faqs'] | null }> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="container py-16" aria-labelledby="page-faq-heading">
      <h2 id="page-faq-heading" className="mb-8 text-2xl font-semibold md:text-3xl">
        Frequently asked questions
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {faqs.map((faq, index) => (
          <details key={index} className="rounded-lg border border-border bg-card p-6">
            <summary className="cursor-pointer list-none font-semibold marker:hidden">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }).replace(/</g, '\\u003c'),
        }}
      />
    </section>
  )
}
