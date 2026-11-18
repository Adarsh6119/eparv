/**
 * GA4 & Conversion Event Dispatcher
 * Dispatches standard and custom GA4 events:
 * - form_submit
 * - whatsapp_click
 * - call_click
 */

export interface AnalyticsEventParams {
  event_category?: string
  event_label?: string
  value?: number
  form_id?: string
  form_name?: string
  product_name?: string
  city?: string
  lead_type?: string
  [key: string]: unknown
}

export function trackEvent(
  eventName: 'form_submit' | 'whatsapp_click' | 'call_click' | 'lead_generated',
  params: AnalyticsEventParams = {},
): void {
  if (typeof window === 'undefined') return

  try {
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', eventName, {
        ...params,
        page_location: window.location.href,
        page_path: window.location.pathname,
      })
    }
  } catch {
    // Non-blocking fallback
  }
}

export function trackCallClick(label: string = 'header_call'): void {
  trackEvent('call_click', {
    event_category: 'engagement',
    event_label: label,
  })
}

export function trackWhatsAppClick(label: string = 'whatsapp_cta', product?: string): void {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: label,
    product_name: product,
  })
}

export function trackFormSubmit(formName: string, details?: Record<string, unknown>): void {
  trackEvent('form_submit', {
    event_category: 'conversion',
    form_name: formName,
    ...details,
  })
}
