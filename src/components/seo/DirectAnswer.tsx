import React from 'react'
import { CheckCircle2, Sparkles } from 'lucide-react'

interface DirectAnswerProps {
  heading?: string
  text: string
  keyPoints?: string[]
  className?: string
}

/**
 * Direct Answer Block for Featured Snippets & Search Engine Overview.
 * Concise (40–60 words) factual summary positioned immediately after H1.
 */
export const DirectAnswer: React.FC<DirectAnswerProps> = ({
  heading = 'Quick Summary & Direct Answer',
  text,
  keyPoints,
  className = '',
}) => {
  return (
    <section
      aria-label="Direct answer overview"
      className={`rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-5 sm:p-6 shadow-sm my-6 ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
        <Sparkles className="size-3.5 text-energy" />
        <span>{heading}</span>
      </div>

      <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
        {text}
      </p>

      {keyPoints && keyPoints.length > 0 && (
        <ul className="mt-3.5 pt-3.5 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
          {keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
