#!/usr/bin/env node
/**
 * Fix product images: remove spec sheet images from products and set
 * actual cycle photos as featured images.
 *
 * Usage:
 *   node scripts/fix-product-images.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@eparv.local'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EparvAdmin!2026'

const api = async (urlPath, { method = 'GET', body, token, form } = {}) => {
  const headers = {}
  if (token) headers['Authorization'] = `JWT ${token}`
  if (body) headers['content-type'] = 'application/json'
  const res = await fetch(`${BASE_URL}${urlPath}`, {
    method,
    headers,
    body: form ?? (body ? JSON.stringify(body) : undefined),
  })
  const text = await res.text()
  let json = null
  try { json = JSON.parse(text) } catch { json = null }
  return { status: res.status, json, text }
}

const login = async () => {
  const res = await api('/api/users/login', {
    method: 'POST',
    body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  })
  if (!res.json?.token) throw new Error(`Login failed (${res.status}): ${res.text}`)
  return res.json.token
}

const uploadMedia = async (token, filePath, altText) => {
  const form = new FormData()
  const fileBuffer = fs.readFileSync(filePath)
  const fileName = path.basename(filePath)
  const blob = new Blob([fileBuffer], { type: 'image/png' })
  form.append('file', blob, fileName)
  form.append('alt', altText)
  const res = await api('/api/media', { method: 'POST', token, form })
  if (res.status !== 201 && res.status !== 200) {
    throw new Error(`Media upload failed for ${fileName} (${res.status}): ${res.text}`)
  }
  console.log(`    ✓ Uploaded ${fileName} → media id ${res.json.doc.id}`)
  return res.json.doc.id
}

async function main() {
  console.log(`\nFixing product images → ${BASE_URL}\n`)

  const token = await login()
  console.log('✓ Authenticated\n')

  // ── 1. Fix Panther (id: 10) ─────────────────────────────────────────────
  // media 25 = spec sheet (289KB), media 26 = actual side profile
  // media 27 = front angled cycle, media 28 = handlebar closeup
  console.log('Fixing Eparv Panther…')
  {
    const specSheetId = 25
    const correctFeaturedId = 26  // actual cycle side profile

    // Update product: new featured image, remove spec sheet from gallery
    const res = await api('/api/products/10', {
      method: 'PATCH',
      token,
      body: {
        featuredImage: correctFeaturedId,
        gallery: [
          { image: 27, altText: 'Eparv Panther electric cycle - front angled view with branding detail' },
          { image: 28, altText: 'Eparv Panther electric cycle - handlebar close-up with LED light, key ignition and controls' },
        ],
        _status: 'published',
      },
    })
    console.log(`  Product update: ${res.status === 200 ? '✓' : '✗'} (${res.status})`)

    // Delete the spec sheet media
    const del = await api(`/api/media/${specSheetId}`, { method: 'DELETE', token })
    console.log(`  Deleted spec sheet media ${specSheetId}: ${del.status === 200 ? '✓' : '✗'} (${del.status})`)
  }

  // ── 2. Fix Lahari (id: 8) ──────────────────────────────────────────────
  // media 18 = spec sheet (318KB), media 19 = actual side profile (129KB)
  // media 20 = front angled (57KB), media 21 = battery closeup (47KB)
  console.log('\nFixing Eparv Lahari…')
  {
    const specSheetId = 18
    const correctFeaturedId = 19  // actual cycle side profile

    const res = await api('/api/products/8', {
      method: 'PATCH',
      token,
      body: {
        featuredImage: correctFeaturedId,
        gallery: [
          { image: 20, altText: 'Eparv Lahari electric cycle - front angled view showing suspension fork and disc brakes' },
          { image: 21, altText: 'Eparv Lahari electric cycle - close-up of battery pack and frame branding' },
        ],
        _status: 'published',
      },
    })
    console.log(`  Product update: ${res.status === 200 ? '✓' : '✗'} (${res.status})`)

    const del = await api(`/api/media/${specSheetId}`, { method: 'DELETE', token })
    console.log(`  Deleted spec sheet media ${specSheetId}: ${del.status === 200 ? '✓' : '✗'} (${del.status})`)
  }

  // ── 3. Fix Savitri (id: 9) ─────────────────────────────────────────────
  // media 22 = spec sheet (315KB) — incorrectly set as featured
  // media 23 = branding closeup (51KB), media 24 = handlebar closeup (36KB)
  // The actual side profile (190KB) was skipped — need to upload it now
  console.log('\nFixing Eparv Savitri…')
  {
    const specSheetId = 22

    // Upload the correct side profile image (it was wrongly labeled as spec sheet earlier)
    const correctImagePath = path.join(__dirname, '..', 'savitri-images', '02-savitri-spec-sheet.png')
    let newFeaturedId = null

    if (fs.existsSync(correctImagePath)) {
      newFeaturedId = await uploadMedia(
        token,
        correctImagePath,
        'Eparv Savitri electric cycle - full side profile showing classic black roadster frame with carrier and mudguard',
      )
    } else {
      // Fallback: use branding closeup as featured
      newFeaturedId = 23
      console.log('  ⚠ Side profile image not found, using branding closeup as featured')
    }

    const res = await api('/api/products/9', {
      method: 'PATCH',
      token,
      body: {
        featuredImage: newFeaturedId,
        gallery: [
          { image: 23, altText: 'Eparv Savitri electric cycle - close-up of frame branding and battery pack' },
          { image: 24, altText: 'Eparv Savitri electric cycle - handlebar close-up showing LED light and controls' },
        ],
        _status: 'published',
      },
    })
    console.log(`  Product update: ${res.status === 200 ? '✓' : '✗'} (${res.status})`)

    const del = await api(`/api/media/${specSheetId}`, { method: 'DELETE', token })
    console.log(`  Deleted spec sheet media ${specSheetId}: ${del.status === 200 ? '✓' : '✗'} (${del.status})`)
  }

  // ── 4. Check Satya & Visakka (should be OK) ────────────────────────────
  console.log('\nVerifying Satya & Visakka…')
  for (const slug of ['eparv-satya', 'eparv-visakka']) {
    const res = await api(`/api/products?where[slug][equals]=${slug}`, { token })
    const product = res.json?.docs?.[0]
    if (product) {
      const img = typeof product.featuredImage === 'object' ? product.featuredImage : null
      console.log(`  ${product.name}: featured image id=${img?.id ?? product.featuredImage} — ${img?.filename ?? 'OK'}`)
    }
  }

  console.log('\n🎉 All product images fixed! Check the catalogue at /electric-cycles\n')
}

main().catch((err) => {
  console.error('Script crashed:', err)
  process.exit(1)
})
