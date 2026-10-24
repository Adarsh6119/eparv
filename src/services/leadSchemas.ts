import { z } from 'zod'

/**
 * Shared lead-form validation. Used by the public forms on the client for
 * instant feedback and re-run on the server by the lead submission service —
 * the server copy is the only one that counts.
 *
 * This module must stay free of server-only imports (payload, next/cache, …)
 * so that client components can import it safely.
 */

export const LEAD_TYPES = ['retail', 'test-ride', 'dealer', 'bulk-order', 'contact'] as const
export type LeadType = (typeof LEAD_TYPES)[number]

export const TIME_SLOTS = ['morning', 'afternoon', 'evening'] as const

export const INVESTMENT_RANGES = [
  { value: 'under-5-lakh', label: 'Under ₹5 lakh' },
  { value: '5-15-lakh', label: '₹5–15 lakh' },
  { value: '15-30-lakh', label: '₹15–30 lakh' },
  { value: 'over-30-lakh', label: 'Over ₹30 lakh' },
] as const

/**
 * Accepts "9876543210", "+91 98765 43210", "98765-43210" … and normalizes
 * everything to a bare 10-digit Indian mobile number.
 */
export const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, '').replace(/^\+91/, ''))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'))

const optionalEmail = z.union([z.literal(''), z.email('Enter a valid email address.')]).optional()

const utmField = z.string().trim().max(150).optional()

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date.')
  .refine((value) => {
    const date = new Date(`${value}T00:00:00`)
    if (Number.isNaN(date.getTime())) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date.getTime() >= today.getTime()
  }, 'Please choose today or a future date.')

export const leadFormSchema = z
  .object({
    leadType: z.enum(LEAD_TYPES),

    name: z.string().trim().min(2, 'Please enter your full name.').max(80),
    phone: phoneSchema,
    email: optionalEmail,
    city: z.string().trim().min(2, 'Please enter your city.').max(60),
    state: z.string().trim().max(60).optional(),
    message: z.string().trim().max(2000).optional(),

    productSlug: z.string().trim().max(120).optional(),
    preferredDate: isoDate.optional(),
    preferredTimeSlot: z.enum(TIME_SLOTS).optional(),

    // Dealer applications
    organization: z.string().trim().max(120).optional(),
    investmentRange: z.enum(['under-5-lakh', '5-15-lakh', '15-30-lakh', 'over-30-lakh']).optional(),

    // Bulk orders
    quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1.').max(10000).optional(),
    timeline: z.string().trim().max(120).optional(),

    // Consent
    consentAccepted: z.boolean().refine((v) => v === true, {
      error: 'Please accept the privacy policy to continue.',
    }),
    consentMarketing: z.boolean().optional(),

    // Source attribution
    sourceUrl: z.string().trim().max(500).optional(),
    utmSource: utmField,
    utmMedium: utmField,
    utmCampaign: utmField,
    utmTerm: utmField,
    utmContent: utmField,

    // Anti-spam signals — honeypot field must stay empty; startedAt is set
    // when the form renders and checked server-side for inhuman speed.
    companyWebsite: z.string().max(200).optional(),
    startedAt: z.coerce.number().int().positive().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.leadType === 'dealer' && (!data.organization || data.organization.length < 2)) {
      ctx.addIssue({
        code: 'custom',
        path: ['organization'],
        message: 'Please enter your business name.',
      })
    }
    if (data.leadType === 'dealer' && !data.state) {
      ctx.addIssue({ code: 'custom', path: ['state'], message: 'Please enter your state.' })
    }
    if (data.leadType === 'bulk-order' && (!data.organization || data.organization.length < 2)) {
      ctx.addIssue({
        code: 'custom',
        path: ['organization'],
        message: 'Please enter your organisation name.',
      })
    }
    if (data.leadType === 'bulk-order' && (data.quantity === undefined || data.quantity === null)) {
      ctx.addIssue({
        code: 'custom',
        path: ['quantity'],
        message: 'Please enter the approximate quantity required.',
      })
    }
  })

export type LeadFormInput = z.infer<typeof leadFormSchema>
