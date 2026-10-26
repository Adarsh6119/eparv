#!/usr/bin/env node
/**
 * Seed the Eparv Satya electric cycle product into Payload CMS.
 *
 * Usage:
 *   node scripts/seed-satya.mjs
 *
 * Requires the dev server to be running at http://localhost:3000 (or set BASE_URL).
 * Uses the admin credentials from .env or defaults matching smoke-test.mjs.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@eparv.local'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EparvAdmin!2026'

// ── Helpers ──────────────────────────────────────────────────────────────────

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
  if (!res.json?.token) {
    throw new Error(`Login failed (${res.status}): ${res.text}`)
  }
  return res.json.token
}

const uploadMedia = async (token, filePath, altText) => {
  const form = new FormData()
  const fileBuffer = fs.readFileSync(filePath)
  const fileName = path.basename(filePath)
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' })
  form.append('file', blob, fileName)
  form.append('alt', altText)

  const res = await api('/api/media', { method: 'POST', token, form })
  if (res.status !== 201 && res.status !== 200) {
    throw new Error(`Media upload failed for ${fileName} (${res.status}): ${res.text}`)
  }
  console.log(`  ✓ Uploaded ${fileName} → media id ${res.json.doc.id}`)
  return res.json.doc.id
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nSeeding Eparv Satya → ${BASE_URL}\n`)

  // 1. Login
  console.log('Logging in…')
  const token = await login()
  console.log('  ✓ Authenticated\n')

  // 2. Check if product already exists
  const existing = await api(
    '/api/products?where[slug][equals]=eparv-satya&draft=true',
    { token },
  )
  if (existing.json?.docs?.length > 0) {
    console.log('⚠  Product "Eparv Satya" already exists (slug: eparv-satya). Skipping.')
    console.log('   Delete it from /admin first if you want to re-seed.')
    return
  }

  // 3. Upload images
  console.log('Uploading product images…')
  const imagesDir = path.join(__dirname, '..', 'satya-images')

  if (!fs.existsSync(imagesDir)) {
    console.log(`\n⚠  Image directory not found: ${imagesDir}`)
    console.log('   Creating product without images (using placeholder).')
    console.log('   To add real images, place them in satya-images/ and re-run.\n')
  }

  let featuredImageId = null
  const galleryItems = []

  if (fs.existsSync(imagesDir)) {
    const imageFiles = fs.readdirSync(imagesDir).filter(f =>
      /\.(jpg|jpeg|png|webp)$/i.test(f)
    ).sort()

    const altTexts = [
      'Eparv Satya electric cycle - full side profile view showing magenta frame and MTB design',
      'Eparv Satya electric cycle - angled front view highlighting frame design and branding',
      'Eparv Satya electric cycle - handlebar close-up showing LED light, key ignition and controls',
    ]

    for (let i = 0; i < imageFiles.length; i++) {
      const filePath = path.join(imagesDir, imageFiles[i])
      const alt = altTexts[i] || `Eparv Satya electric cycle - image ${i + 1}`
      const mediaId = await uploadMedia(token, filePath, alt)

      if (i === 0) {
        featuredImageId = mediaId
      } else {
        galleryItems.push({
          image: mediaId,
          altText: alt,
        })
      }
    }
  }

  // Use a placeholder if no images were uploaded
  if (!featuredImageId) {
    // Use the first existing media item as a placeholder
    const media = await api('/api/media?limit=1', { token })
    featuredImageId = media.json?.docs?.[0]?.id || 1
    console.log(`  Using placeholder media id ${featuredImageId}`)
  }

  // 4. Create the product
  console.log('\nCreating Eparv Satya product…')

  const productData = {
    name: 'Eparv Satya',
    slug: 'eparv-satya',
    category: 'off-road',
    tagline: 'Conquer every trail with power and style',
    shortDescription:
      'The Eparv Satya is a rugged MTB-style electric cycle featuring a 250W BLDC hub motor, ' +
      'internal 36V Li-Ion NMC battery with up to 55 km range (PAS mode), mechanical dual disc brakes, ' +
      'and a lightweight hi-tensile steel frame — all in a striking magenta finish.',
    featuredImage: featuredImageId,
    ...(galleryItems.length > 0 ? { gallery: galleryItems } : {}),
    price: 0,  // Set to 0 — update with real pricing from admin panel
    availability: 'in-stock',
    isFeatured: true,
    isDemoData: false,

    // Specifications
    batteryCapacity: '36V 6.6Ah / 7.8Ah Li-Ion NMC',
    motorPower: '250W 36V BLDC Hub High Power',
    claimedRangeKm: 55,
    chargingTimeHours: 3,
    topSpeedKmh: 25,
    warrantyMonths: 24,

    // Additional specifications
    additionalSpecifications: [
      { label: 'Frame', value: 'Light Weight Hi-Tensile Steel Frame (60 months warranty)' },
      { label: 'Paint', value: 'Metallic Paint with Lacquer Coating & EP Foam Wrapping' },
      { label: 'Fork', value: 'Threadless Rigid Heavy Duty Fork' },
      { label: 'Bottom Bracket', value: 'Kenli Cotterless Cartridge 122' },
      { label: 'Crank Set', value: 'Chainwheel 40T*170mm Plastified with Guard' },
      { label: 'Free Wheel', value: 'Noiseless Imported 18T Full Ball' },
      { label: 'Rims', value: 'Double Wall Alloy Rim' },
      { label: 'Stem', value: '80mm Alloy' },
      { label: 'Pedal', value: 'SP 2590 Plastic (ISI Reflectors)' },
      { label: 'Tires & Tube', value: 'Hartex/Ralson 26*2.10' },
      { label: 'Head Set', value: 'Threadless Kenli' },
      { label: 'Handle Bar', value: 'Black ED Coated 640/660mm' },
      { label: 'Handle Grip', value: 'Leather Finish Handlegrip for More Comfort' },
      { label: 'Handle Stem', value: 'Alloy Black' },
      { label: 'Saddle', value: 'Superior Quality PU Foam MTB' },
      { label: 'Seat Clamp', value: 'Quick Release' },
      { label: 'Seat Pillar', value: 'Alloy Black' },
      { label: 'Hub', value: 'Mega Front Hub PH/T 36*36 BCP 7" Axle Black with Quick Release' },
      { label: 'Brakes', value: 'Mechanical Dual Disc Brakes with E-Brake Auto Cut' },
      { label: 'Stand', value: 'MTB Type' },
      { label: 'Size Available', value: '26T' },
      { label: 'Cable Routing', value: 'Fully Inner Cables' },
      { label: 'Controller', value: 'DC 36 Volt with 17A (6 months warranty)' },
      { label: 'Pedal Assistance', value: 'Double 8 Magnet Sensor' },
      { label: 'Battery', value: 'Internal 36V / 6.6Ah / 7.8Ah Li-Ion NMC (12 months warranty)' },
      { label: 'Throttle', value: 'Full Grip with LED Indicator & Key Ignition' },
      { label: 'Light', value: 'LED Light' },
      { label: 'Horn', value: 'Distructive Horn' },
      { label: 'Charger', value: '42V 2A (6 months warranty)' },
      { label: 'Range (Throttle - 6.6Ah)', value: '25–30 km' },
      { label: 'Range (Throttle - 7.8Ah)', value: '45–50 km' },
      { label: 'Range (PAS - 6.6Ah)', value: '35 km' },
      { label: 'Range (PAS - 7.8Ah)', value: '55 km' },
      { label: 'Load Capacity', value: '150 kg' },
      { label: 'Key Ignition', value: 'Anti-theft Feature in Battery and Bicycle' },
      { label: 'Cruise Control', value: 'Available on 7 sec stability' },
      { label: 'Battery Life', value: 'Up to 30,000–55,000 km (1,000 cycles)' },
      { label: 'Colors', value: 'Magenta' },
    ],

    // SEO
    meta: {
      title: 'Eparv Satya Electric Cycle - 250W MTB E-Bike',
      description:
        'Buy the Eparv Satya electric cycle — a rugged 26T MTB e-bike with 250W BLDC motor, ' +
        '36V Li-Ion NMC battery, up to 55 km range, dual disc brakes, and anti-theft key ignition. ' +
        'Available in Magenta.',
    },

    _status: 'published',
  }

  const create = await api('/api/products', {
    method: 'POST',
    token,
    body: productData,
  })

  if (create.status === 201 || create.status === 200) {
    console.log(`  ✓ Product created (id: ${create.json.doc.id})`)
    console.log(`  ✓ Status: ${create.json.doc._status}`)
    console.log(`\n🎉 Done! View it at: ${BASE_URL}/electric-cycles/eparv-satya`)
    console.log(`   Admin panel: ${BASE_URL}/admin/collections/products/${create.json.doc.id}`)

    if (productData.price === 0) {
      console.log('\n⚠  Price is set to ₹0 — update the real price from the admin panel.')
    }
  } else {
    console.error(`\n✗ Product creation failed (${create.status}):`)
    console.error(JSON.stringify(create.json, null, 2))
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Script crashed:', err)
  process.exit(1)
})
