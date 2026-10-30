'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqBlockProps {
  heading?: string
  subheading?: string
  faqs: FaqItem[]
  className?: string
  id?: string
}

export const FaqBlock: React.FC<FaqBlockProps> = ({
  heading = 'Frequently Asked Questions',
  subheading,
  faqs,
  className = '',
  id = 'faq-section',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) return null

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <section aria-labelledby={`${id}-heading`} className={`my-12 ${className}`} id={id}>
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <HelpCircle className="size-3.5 text-energy" />
          <span>Help & Clarity</span>
        </div>
        <h2 id={`${id}-heading`} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {heading}
        </h2>
        {subheading && (
          <p className="text-sm text-muted-foreground max-w-2xl">{subheading}</p>
        )}
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ml-3 ${
                    isOpen ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <JsonLd data={faqSchema} />
    </section>
  )
}
