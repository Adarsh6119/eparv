#!/usr/bin/env node
/**
 * Seed the Eparv Savitri electric cycle product into Payload CMS.
 *
 * Usage:
 *   node scripts/seed-savitri.mjs
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
  console.log(`  ✓ Uploaded ${fileName} → media id ${res.json.doc.id}`)
  return res.json.doc.id
}

async function main() {
  console.log(`\nSeeding Eparv Savitri → ${BASE_URL}\n`)

  console.log('Logging in…')
  const token = await login()
  console.log('  ✓ Authenticated\n')

  const existing = await api(
    '/api/products?where[slug][equals]=eparv-savitri&draft=true',
    { token },
  )
  if (existing.json?.docs?.length > 0) {
    console.log('⚠  Product "Eparv Savitri" already exists (slug: eparv-savitri). Skipping.')
    return
  }

  // Upload images (skip the spec sheet image, only upload product photos)
  console.log('Uploading product images…')
  const imagesDir = path.join(__dirname, '..', 'savitri-images')

  let featuredImageId = null
  const galleryItems = []

  if (fs.existsSync(imagesDir)) {
    // Only upload product photos, not the spec sheet
    const productImages = [
      { file: '01-savitri-side-profile.png', alt: 'Eparv Savitri electric cycle - full side profile showing classic black roadster frame with carrier and mudguard' },
      { file: '03-savitri-branding-closeup.png', alt: 'Eparv Savitri electric cycle - close-up of frame branding and battery pack' },
      { file: '04-savitri-handlebar-closeup.png', alt: 'Eparv Savitri electric cycle - handlebar close-up showing LED light and controls' },
    ]

    for (let i = 0; i < productImages.length; i++) {
      const filePath = path.join(imagesDir, productImages[i].file)
      if (!fs.existsSync(filePath)) continue
      const mediaId = await uploadMedia(token, filePath, productImages[i].alt)
      if (i === 0) {
        featuredImageId = mediaId
      } else {
        galleryItems.push({ image: mediaId, altText: productImages[i].alt })
      }
    }
  }

  if (!featuredImageId) {
    const media = await api('/api/media?limit=1', { token })
    featuredImageId = media.json?.docs?.[0]?.id || 1
  }

  console.log('\nCreating Eparv Savitri product…')

  const productData = {
    name: 'Eparv Savitri',
    slug: 'eparv-savitri',
    category: 'city-commuter',
    tagline: 'The classic commuter, electrified',
    shortDescription:
      'The Eparv Savitri is a classic roadster-style electric cycle with a 22" heavy-duty steel frame, ' +
      '250W BLDC motor, three battery options (6.6/10.4/14.5Ah) with up to 110 km PAS range, ' +
      'V-brakes, carrier, mudguard, and double stand.',
    featuredImage: featuredImageId,
    ...(galleryItems.length > 0 ? { gallery: galleryItems } : {}),
    price: 0,
    availability: 'in-stock',
    isFeatured: true,
    isDemoData: false,

    batteryCapacity: '36V 6.6Ah / 10.4Ah / 14.5Ah Li-Ion NMC',
    motorPower: '250W 36V BLDC Hub High Power',
    claimedRangeKm: 110,
    chargingTimeHours: 3,
    topSpeedKmh: 25,
    warrantyMonths: 24,

    additionalSpecifications: [
      { label: 'Frame', value: '22" Heavy Duty Hi-Tensile Steel Frame (60 months warranty)' },
      { label: 'Paint', value: 'Metallic Paint' },
      { label: 'Stickers', value: 'UV 3D Stickers' },
      { label: 'Fork', value: '22" PH/Type Fork' },
      { label: 'Bottom Bracket', value: 'Set of 8 (BB Axle)' },
      { label: 'Crank Set', value: '44T Without Guard Cottered BCP' },
      { label: 'Freewheel', value: 'Noiseless Imported 18T' },
      { label: 'Rims', value: '36*36 Hole Steel BCP 28*11/2' },
      { label: 'Pedal', value: 'Pedal PVC (ISI Reflectors)' },
      { label: 'Tires & Tube', value: '28*11/2 Ralson/Speedways Nylon' },
      { label: 'Handle Bar', value: 'Brut Black ED Coated 640/660mm' },
      { label: 'Handle Grip', value: 'Leather Finish Handlegrip' },
      { label: 'Saddle', value: 'Black Comfo PU Finish' },
      { label: 'Seat Clamp', value: 'Bolt Type' },
      { label: 'Seat Pillar', value: '6" 25.40mm Zinc' },
      { label: 'Hub', value: 'Hub PH/T 36*36 BCP 7" Axle Black' },
      { label: 'Brakes', value: 'V-Brake with E-Brake Auto Cut' },
      { label: 'Mudguard', value: 'Steel Mudguard' },
      { label: 'Stand', value: 'Double Stand' },
      { label: 'Carrier', value: 'Heavy Duty in Steel Chrome' },
      { label: 'Cable Routing', value: 'Fully Inner Cables' },
      { label: 'Controller', value: 'DC 36 Volt with 17A (6 months warranty)' },
      { label: 'Pedal Assistance', value: 'Double 8 Magnet Sensor' },
      { label: 'Battery', value: '36V / 6.6Ah / 10.4Ah / 14.5Ah Li-Ion NMC (12 months warranty)' },
      { label: 'Throttle', value: 'Full Grip with LED Indicator & Key Ignition' },
      { label: 'Light', value: 'LED Light' },
      { label: 'Horn', value: 'Distructive Horn' },
      { label: 'Charger', value: '42V 2A (6 months warranty)' },
      { label: 'Range (Throttle - 6.6Ah)', value: '28–30 km' },
      { label: 'Range (Throttle - 10.4Ah)', value: '50–60 km' },
      { label: 'Range (Throttle - 14.5Ah)', value: '95–100 km' },
      { label: 'Range (PAS - 6.6Ah)', value: '35 km' },
      { label: 'Range (PAS - 10.4Ah)', value: '70 km' },
      { label: 'Range (PAS - 14.5Ah)', value: '110 km' },
      { label: 'Load Capacity', value: '150 kg' },
      { label: 'Key Ignition', value: 'Anti-theft Feature in Battery and Bicycle' },
      { label: 'Cruise Control', value: 'Available on 7 sec stability' },
      { label: 'Hilong Casing', value: 'QR High Quality Imported' },
      { label: 'Battery Life', value: 'Up to 30,000–75,000 km (1,000 cycles)' },
      { label: 'Colors', value: 'Crafted Grey / Metallic Grey / Scary Night Black / Air Blue' },
    ],

    meta: {
      title: 'Eparv Savitri Electric Cycle - Classic Roadster E-Bike | Up to 110 km Range',
      description:
        'Buy the Eparv Savitri electric cycle — a classic roadster e-bike with 250W BLDC motor, ' +
        '22" heavy-duty steel frame, three battery options (6.6/10.4/14.5Ah), up to 110 km range, ' +
        'V-brakes, steel carrier and mudguard. Available in Grey, Black, and Air Blue.',
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
    console.log(`\n🎉 Done! View it at: ${BASE_URL}/electric-cycles/eparv-savitri`)
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
