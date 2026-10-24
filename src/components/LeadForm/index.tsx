'use client'

import { z } from 'zod'
import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utilities/ui'
import {
  INVESTMENT_RANGES,
  leadFormSchema,
  type LeadType,
} from '@/services/leadSchemas'

type ProductOption = { slug: string; name: string }

type FormValues = {
  name: string
  phone: string
  email: string
  city: string
  state: string
  productSlug: string
  preferredDate: string
  preferredTimeSlot: string
  organization: string
  investmentRange: string
  quantity: string
  timeline: string
  message: string
  consentAccepted: boolean
  consentMarketing: boolean
  companyWebsite: string
}

const EMPTY_VALUES: FormValues = {
  name: '',
  phone: '',
  email: '',
  city: '',
  state: '',
  productSlug: '',
  preferredDate: '',
  preferredTimeSlot: '',
  organization: '',
  investmentRange: '',
  quantity: '',
  timeline: '',
  message: '',
  consentAccepted: false,
  consentMarketing: false,
  companyWebsite: '',
}

const selectClass =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

const FieldError: React.FC<{ message?: string }> = ({ message }) =>
  message ? <p className="text-sm text-destructive mt-1">{message}</p> : null

/**
 * The single reusable lead form behind every public conversion point:
 * product enquiries, test rides, dealer applications, bulk orders and the
 * contact page. Client-side validation mirrors the server's zod schema;
 * the server re-validates everything before persisting.
 */
export const LeadForm: React.FC<{
  type: LeadType
  products?: ProductOption[]
  defaultProductSlug?: string
  defaultCity?: string
  submitLabel?: string
  className?: string
}> = ({ type, products, defaultProductSlug, defaultCity, submitLabel, className }) => {
  const [values, setValues] = useState<FormValues>({
    ...EMPTY_VALUES,
    productSlug: defaultProductSlug ?? '',
    city: defaultCity ?? '',
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<{ leadId: string; duplicate: boolean } | null>(null)
  const [serverMessage, setServerMessage] = useState<string | null>(null)

  const startedAt = useRef<number>(Date.now())
  const utm = useRef<Record<string, string>>({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keys = ['utmSource', 'utmMedium', 'utmCampaign', 'utmTerm', 'utmContent']
    const captured: Record<string, string> = {}
    for (const key of keys) {
      const value = params.get(key)
      if (value) {
        captured[key] = value.slice(0, 150)
      }
    }
    utm.current = captured
  }, [])

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setFieldErrors((prev) => {
      if (!prev[key as string]) {
        return prev
      }
      const next = { ...prev }
      delete next[key as string]
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setServerMessage(null)

    const payload = {
      leadType: type,
      name: values.name,
      phone: values.phone,
      email: values.email || undefined,
      city: values.city,
      state: values.state || undefined,
      productSlug: values.productSlug || undefined,
      preferredDate: values.preferredDate || undefined,
      preferredTimeSlot: values.preferredTimeSlot || undefined,
      organization: values.organization || undefined,
      investmentRange: values.investmentRange || undefined,
      quantity: values.quantity ? Number(values.quantity) : undefined,
      timeline: values.timeline || undefined,
      message: values.message || undefined,
      consentAccepted: values.consentAccepted,
      consentMarketing: values.consentMarketing,
      companyWebsite: values.companyWebsite,
      startedAt: startedAt.current,
      sourceUrl: window.location.pathname,
      ...utm.current,
    }

    const parsed = leadFormSchema.safeParse(payload)
    if (!parsed.success) {
      const errors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? '_')
        if (!errors[field]) {
          errors[field] = issue.message
        }
      }
      setFieldErrors(errors)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/lead-submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        leadId?: string
        duplicate?: boolean
        message?: string
        fieldErrors?: Record<string, string>
      }

      if (res.ok && data.ok) {
        setSuccess({ leadId: data.leadId ?? '', duplicate: Boolean(data.duplicate) })
      } else {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors)
        }
        setServerMessage(
          data.message ?? 'Something went wrong. Please try again or reach us directly.',
        )
      }
    } catch {
      setServerMessage('Network error — please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div
        className={cn(
          'border border-success bg-success/10 rounded-lg p-6 text-center',
          className,
        )}
        role="status"
      >
        <h3 className="text-xl font-semibold mb-2">Thank you{values.name ? `, ${values.name.split(' ')[0]}` : ''}!</h3>
        {success.duplicate ? (
          <p className="text-muted-foreground">
            We already have your request on record — our team will contact you shortly. No need to
            submit again.
          </p>
        ) : (
          <p className="text-muted-foreground">
            Your request has been received. Reference: <strong>{success.leadId}</strong>. Our team
            will contact you shortly.
          </p>
        )}
      </div>
    )
  }

  const showProduct = (type === 'retail' || type === 'test-ride') && products && products.length > 0
  const isDealer = type === 'dealer'
  const isBulk = type === 'bulk-order'
  const isTestRide = type === 'test-ride'

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
      noValidate
    >
      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(e) => set('companyWebsite', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="lead-name">Full name *</Label>
        <Input
          id="lead-name"
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
        />
        <FieldError message={fieldErrors.name} />
      </div>

      <div>
        <Label htmlFor="lead-phone">Mobile number *</Label>
        <Input
          id="lead-phone"
          type="tel"
          inputMode="tel"
          placeholder="10-digit mobile number"
          value={values.phone}
          onChange={(e) => set('phone', e.target.value)}
          autoComplete="tel"
          aria-invalid={Boolean(fieldErrors.phone)}
        />
        <FieldError message={fieldErrors.phone} />
      </div>

      <div>
        <Label htmlFor="lead-email">Email (optional)</Label>
        <Input
          id="lead-email"
          type="email"
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
        />
        <FieldError message={fieldErrors.email} />
      </div>

      <div>
        <Label htmlFor="lead-city">City *</Label>
        <Input
          id="lead-city"
          value={values.city}
          onChange={(e) => set('city', e.target.value)}
          autoComplete="address-level2"
          aria-invalid={Boolean(fieldErrors.city)}
        />
        <FieldError message={fieldErrors.city} />
      </div>

      {(isDealer || isBulk) && (
        <div>
          <Label htmlFor="lead-state">State {isDealer ? '*' : '(optional)'}</Label>
          <Input
            id="lead-state"
            value={values.state}
            onChange={(e) => set('state', e.target.value)}
            autoComplete="address-level1"
            aria-invalid={Boolean(fieldErrors.state)}
          />
          <FieldError message={fieldErrors.state} />
        </div>
      )}

      {showProduct && (
        <div className="sm:col-span-2">
          <Label htmlFor="lead-product">
            {isTestRide ? 'Which cycle would you like to ride?' : 'Which cycle are you interested in?'}
          </Label>
          <select
            id="lead-product"
            className={selectClass}
            value={values.productSlug}
            onChange={(e) => set('productSlug', e.target.value)}
          >
            <option value="">Not sure yet — help me choose</option>
            {products?.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.productSlug} />
        </div>
      )}

      {isTestRide && (
        <>
          <div>
            <Label htmlFor="lead-date">Preferred date</Label>
            <Input
              id="lead-date"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={values.preferredDate}
              onChange={(e) => set('preferredDate', e.target.value)}
              aria-invalid={Boolean(fieldErrors.preferredDate)}
            />
            <FieldError message={fieldErrors.preferredDate} />
          </div>
          <div>
            <Label htmlFor="lead-slot">Preferred time</Label>
            <select
              id="lead-slot"
              className={selectClass}
              value={values.preferredTimeSlot}
              onChange={(e) => set('preferredTimeSlot', e.target.value)}
            >
              <option value="">Any time</option>
              <option value="morning">Morning (9–12)</option>
              <option value="afternoon">Afternoon (12–17)</option>
              <option value="evening">Evening (17–20)</option>
            </select>
            <FieldError message={fieldErrors.preferredTimeSlot} />
          </div>
        </>
      )}

      {(isDealer || isBulk) && (
        <div className="sm:col-span-2">
          <Label htmlFor="lead-org">{isDealer ? 'Business name *' : 'Organisation name *'}</Label>
          <Input
            id="lead-org"
            value={values.organization}
            onChange={(e) => set('organization', e.target.value)}
            aria-invalid={Boolean(fieldErrors.organization)}
          />
          <FieldError message={fieldErrors.organization} />
        </div>
      )}

      {isDealer && (
        <div className="sm:col-span-2">
          <Label htmlFor="lead-investment">Planned investment range</Label>
          <select
            id="lead-investment"
            className={selectClass}
            value={values.investmentRange}
            onChange={(e) => set('investmentRange', e.target.value)}
          >
            <option value="">Prefer not to say</option>
            {INVESTMENT_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.investmentRange} />
        </div>
      )}

      {isBulk && (
        <>
          <div>
            <Label htmlFor="lead-quantity">Approx. quantity *</Label>
            <Input
              id="lead-quantity"
              type="number"
              min={1}
              value={values.quantity}
              onChange={(e) => set('quantity', e.target.value)}
              aria-invalid={Boolean(fieldErrors.quantity)}
            />
            <FieldError message={fieldErrors.quantity} />
          </div>
          <div>
            <Label htmlFor="lead-timeline">Required by (timeline)</Label>
            <Input
              id="lead-timeline"
              placeholder="e.g. within 2 months"
              value={values.timeline}
              onChange={(e) => set('timeline', e.target.value)}
            />
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <Label htmlFor="lead-message">
          {type === 'contact' ? 'Message *' : 'Message (optional)'}
        </Label>
        <Textarea
          id="lead-message"
          rows={4}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
        />
        <FieldError message={fieldErrors.message} />
      </div>

      <div className="sm:col-span-2 space-y-2">
        <div className="flex items-start gap-2">
          <input
            id="lead-consent"
            type="checkbox"
            className="mt-1 size-4 accent-[var(--primary)]"
            checked={values.consentAccepted}
            onChange={(e) => set('consentAccepted', e.target.checked)}
            aria-invalid={Boolean(fieldErrors.consentAccepted)}
          />
          <Label htmlFor="lead-consent" className="font-normal text-sm leading-snug">
            I agree to be contacted about my enquiry and accept the{' '}
            <a href="/privacy-policy" className="underline underline-offset-2">
              privacy policy
            </a>
            . *
          </Label>
        </div>
        <FieldError message={fieldErrors.consentAccepted} />

        <div className="flex items-start gap-2">
          <input
            id="lead-marketing"
            type="checkbox"
            className="mt-1 size-4 accent-[var(--primary)]"
            checked={values.consentMarketing}
            onChange={(e) => set('consentMarketing', e.target.checked)}
          />
          <Label htmlFor="lead-marketing" className="font-normal text-sm leading-snug">
            Send me occasional updates about new models and offers (optional).
          </Label>
        </div>
      </div>

      {serverMessage && (
        <p className="sm:col-span-2 text-sm text-destructive border border-destructive/40 rounded-md px-3 py-2">
          {serverMessage}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? 'Submitting…' : (submitLabel ?? 'Submit')}
        </Button>
      </div>
    </form>
  )
}
