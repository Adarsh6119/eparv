import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { submitLead } from '@/services/leadService'

export const dynamic = 'force-dynamic'

const clientIp = (req: NextRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return req.headers.get('x-real-ip') ?? 'unknown'
}

/**
 * Public lead submission endpoint. This path is intentionally NOT
 * /api/leads — that URL is the Payload REST endpoint for the leads
 * collection used by the admin panel.
 */
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, code: 'validation', message: 'Invalid request body.' },
      { status: 400, headers: { 'cache-control': 'no-store' } },
    )
  }

  const result = await submitLead(body, { ip: clientIp(req) })

  if (result.ok) {
    return NextResponse.json(result, { status: 200, headers: { 'cache-control': 'no-store' } })
  }

  const status = result.code === 'rate_limited' ? 429 : result.code === 'validation' ? 400 : 500
  return NextResponse.json(result, { status, headers: { 'cache-control': 'no-store' } })
}
