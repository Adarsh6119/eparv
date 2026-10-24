import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { LeadFormInput, leadFormSchema } from './leadSchemas'
import { checkRateLimit } from './rateLimiter'

export type SubmitLeadResult =
  | { ok: true; leadId: string; duplicate: boolean }
  | {
      ok: false
      code: 'validation' | 'rate_limited' | 'server_error'
      message: string
      fieldErrors?: Record<string, string>
    }

/** Requests per hour from one IP address (shared NATs such as offices send
 *  many legitimate enquiries, so this is configurable and deliberately
 *  roomier than the per-phone limit). */
const IP_HOURLY_LIMIT = Number(process.env.LEAD_RATE_LIMIT_IP_PER_HOUR ?? 10)
/** Submissions per hour for one phone number (across IPs). */
const PHONE_HOURLY_LIMIT = Number(process.env.LEAD_RATE_LIMIT_PHONE_PER_HOUR ?? 3)
/** A repeat submission with the same phone/type/product inside this window is treated as the same lead. */
const DUPLICATE_WINDOW_MS = 15 * 60 * 1000
/** Submissions faster than this after render are almost certainly bots. */
const MIN_HUMAN_FILL_TIME_MS = 800

const toFieldErrors = (issues: { path: (string | number | symbol)[]; message: string }[]) => {
  const fieldErrors: Record<string, string> = {}
  for (const issue of issues) {
    const field = String(issue.path[0] ?? '_')
    if (!fieldErrors[field]) {
      fieldErrors[field] = issue.message
    }
  }
  return fieldErrors
}

const notifyTeam = async (input: LeadFormInput, leadId: string) => {
  const payload = await getPayload({ config: configPromise })

  if (
    !process.env.SMTP_HOST ||
    !process.env.LEAD_NOTIFICATION_TO ||
    !process.env.LEAD_NOTIFICATION_FROM
  ) {
    // Email notifications are optional — skip silently when unconfigured.
    return
  }

  try {
    await payload.sendEmail({
      to: process.env.LEAD_NOTIFICATION_TO,
      from: process.env.LEAD_NOTIFICATION_FROM,
      subject: `[Eparv] New ${input.leadType} lead ${leadId} — ${input.name} (${input.city})`,
      text: [
        `Lead ID: ${leadId}`,
        `Type: ${input.leadType}`,
        `Name: ${input.name}`,
        `Phone: ${input.phone}`,
        input.email ? `Email: ${input.email}` : null,
        `City: ${input.city}${input.state ? `, ${input.state}` : ''}`,
        input.productSlug ? `Product: ${input.productSlug}` : null,
        input.organization ? `Organisation: ${input.organization}` : null,
        input.quantity ? `Quantity: ${input.quantity}` : null,
        input.message ? `Message: ${input.message}` : null,
        `Source: ${input.sourceUrl ?? 'unknown'}`,
        `UTM: ${input.utmSource ?? '-'} / ${input.utmMedium ?? '-'} / ${input.utmCampaign ?? '-'}`,
      ]
        .filter(Boolean)
        .join('\n'),
    })
  } catch (error) {
    // Notification failure must never fail the submission itself.
    payload.logger.error({ err: error, msg: 'Lead notification email failed' })
  }
}

/**
 * The single, reusable lead submission path. Every public form posts here
 * via /api/lead-submit. Validates with zod, applies spam defences and rate
 * limits, deduplicates repeat submissions, then persists with overrideAccess
 * (the leads collection itself is closed to the public).
 */
export const submitLead = async (input: unknown, ctx: { ip: string }): Promise<SubmitLeadResult> => {
  const parsed = leadFormSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      code: 'validation',
      message: 'Please correct the highlighted fields and try again.',
      fieldErrors: toFieldErrors(parsed.error.issues as never),
    }
  }

  const data = parsed.data
  const payload = await getPayload({ config: configPromise })

  // Honeypot: real users never see this field. Accept silently and drop.
  if (data.companyWebsite && data.companyWebsite.length > 0) {
    payload.logger.info(`Honeypot lead dropped from IP ${ctx.ip}`)
    return { ok: true, leadId: 'ignored', duplicate: true }
  }

  // Time trap: filled impossibly fast after render.
  if (data.startedAt && Date.now() - data.startedAt < MIN_HUMAN_FILL_TIME_MS) {
    payload.logger.info(`Time-trap lead dropped from IP ${ctx.ip}`)
    return { ok: true, leadId: 'ignored', duplicate: true }
  }

  // Rate limits: per IP and per phone number.
  if (!checkRateLimit(`ip:${ctx.ip}`, IP_HOURLY_LIMIT, 3_600_000)) {
    return {
      ok: false,
      code: 'rate_limited',
      message: 'Too many enquiries from your network. Please try again later or call us directly.',
    }
  }
  if (!checkRateLimit(`phone:${data.phone}`, PHONE_HOURLY_LIMIT, 3_600_000)) {
    return {
      ok: false,
      code: 'rate_limited',
      message: 'We already received several requests from this number. Our team will call you shortly.',
    }
  }

  // Duplicate-submission protection: same phone + type inside the window.
  const recent = await payload.find({
    collection: 'leads',
    where: {
      and: [
        { phone: { equals: data.phone } },
        { leadType: { equals: data.leadType } },
        { createdAt: { greater_than: new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString() } },
      ],
    },
    limit: 1,
    pagination: false,
    overrideAccess: true,
  })

  if (recent.docs.length > 0) {
    const existing = recent.docs[0]
    return { ok: true, leadId: existing.leadId ?? 'duplicate', duplicate: true }
  }

  // Resolve the product reference (published products only).
  let productId: number | undefined
  if (data.productSlug) {
    const product = await payload.find({
      collection: 'products',
      where: { slug: { equals: data.productSlug } },
      limit: 1,
      pagination: false,
      overrideAccess: false,
      draft: false,
    })
    if (product.docs.length === 0) {
      return {
        ok: false,
        code: 'validation',
        message: 'The selected product is no longer available.',
        fieldErrors: { productSlug: 'Unknown product.' },
      }
    }
    productId = product.docs[0].id
  }

  try {
    const doc = await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        leadId: undefined,
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        leadType: data.leadType,
        city: data.city,
        state: data.state || undefined,
        product: productId,
        preferredDate: data.preferredDate ? new Date(`${data.preferredDate}T00:00:00`).toISOString() : undefined,
        preferredTimeSlot: data.preferredTimeSlot,
        organization: data.organization || undefined,
        quantity: data.quantity ?? undefined,
        investmentRange: data.investmentRange,
        message: data.message || undefined,
        source: {
          sourceUrl: data.sourceUrl,
          utmSource: data.utmSource,
          utmMedium: data.utmMedium,
          utmCampaign: data.utmCampaign,
          utmTerm: data.utmTerm,
          utmContent: data.utmContent,
        },
        consent: {
          accepted: data.consentAccepted,
          marketingUpdates: data.consentMarketing ?? false,
        },
        status: 'new',
      },
    })

    await notifyTeam(data, doc.leadId ?? String(doc.id))

    return { ok: true, leadId: doc.leadId ?? String(doc.id), duplicate: false }
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Lead persistence failed' })
    return {
      ok: false,
      code: 'server_error',
      message: 'Something went wrong while saving your enquiry. Please try again in a moment.',
    }
  }
}
