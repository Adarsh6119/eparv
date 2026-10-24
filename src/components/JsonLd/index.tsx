import React from 'react'

/**
 * Renders a JSON-LD structured-data script tag. Data must be an object —
 * never fabricate ratings, offers, availability or addresses; only pass
 * values that are genuinely true for the page.
 */
export const JsonLd: React.FC<{ data: Record<string, unknown> }> = ({ data }) => (
  <script
    type="application/ld+json"
    // JSON.stringify output is escaped to prevent </script> breakout.
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
)
