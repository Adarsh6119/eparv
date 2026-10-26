#!/usr/bin/env node
/**
 * Seed the Eparv Lahari electric cycle product into Payload CMS.
 *
 * Usage:
 *   node scripts/seed-lahari.mjs
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
  console.log(`\nSeeding Eparv Lahari → ${BASE_URL}\n`)

  console.log('Logging in…')
  const token = await login()
  console.log('  ✓ Authenticated\n')

  // Check if product already exists
  const existing = await api(
    '/api/products?where[slug][equals]=eparv-lahari&draft=true',
    { token },
  )
  if (existing.json?.docs?.length > 0) {
    console.log('⚠  Product "Eparv Lahari" already exists (slug: eparv-lahari). Skipping.')
    console.log('   Delete it from /admin first if you want to re-seed.')
    return
  }

  // Upload images
  console.log('Uploading product images…')
  const imagesDir = path.join(__dirname, '..', 'lahari-images')

  let featuredImageId = null
  const galleryItems = []

  if (fs.existsSync(imagesDir)) {
    const imageFiles = fs.readdirSync(imagesDir).filter(f =>
      /\.(jpg|jpeg|png|webp)$/i.test(f)
    ).sort()

    const altTexts = [
      'Eparv Lahari electric cycle - full side profile view showing grey metallic frame with suspension fork and fat tyres',
      'Eparv Lahari electric cycle - angled view highlighting sleek grey frame design',
      'Eparv Lahari electric cycle - front angled view showing suspension fork and disc brakes',
      'Eparv Lahari electric cycle - close-up of battery pack and frame branding',
    ]

    for (let i = 0; i < imageFiles.length; i++) {
      const filePath = path.join(imagesDir, imageFiles[i])
      const alt = altTexts[i] || `Eparv Lahari electric cycle - image ${i + 1}`
      const mediaId = await uploadMedia(token, filePath, alt)
      if (i === 0) {
        featuredImageId = mediaId
      } else {
        galleryItems.push({ image: mediaId, altText: alt })
      }
    }
  }

  if (!featuredImageId) {
    const media = await api('/api/media?limit=1', { token })
    featuredImageId = media.json?.docs?.[0]?.id || 1
    console.log(`  Using placeholder media id ${featuredImageId}`)
  }

  // Create the product
  console.log('\nCreating Eparv Lahari product…')

  const productData = {
    name: 'Eparv Lahari',
    slug: 'eparv-lahari',
    category: 'off-road',
    tagline: 'Unstoppable range, unmatched adventure',
    shortDescription:
      'The Eparv Lahari is a high-performance 26T MTB e-cycle with chrome suspension fork, 250W BLDC motor, ' +
      'three battery options (6.6/10.4/14.5Ah) delivering up to 110 km PAS range, fat 2.40" tyres, ' +
      'dual disc brakes, and a fighter-crafted grey finish.',
    featuredImage: featuredImageId,
    ...(galleryItems.length > 0 ? { gallery: galleryItems } : {}),
    price: 0,
    availability: 'in-stock',
    isFeatured: true,
    isDemoData: false,

    // Specifications
    batteryCapacity: '36V 6.6Ah / 10.4Ah / 14.5Ah Li-Ion NMC',
    motorPower: '250W 36V BLDC Hub High Power',
    claimedRangeKm: 110,
    chargingTimeHours: 3,
    topSpeedKmh: 25,
    warrantyMonths: 24,

    additionalSpecifications: [
      { label: 'Frame', value: 'Light Weight Hi-Tensile Steel Frame (60 months warranty)' },
      { label: 'Paint', value: 'Metallic Paint with EP Foam Wrapping Lacquer Coating' },
      { label: 'Fork', value: 'Carbon Steel Black-Coated Chrome Suspension (Imported)' },
      { label: 'Bottom Bracket', value: 'Kenli Cotterless Cartridge 122' },
      { label: 'Crank Set', value: 'Chainwheel 40T*170mm Plastified with Guard' },
      { label: 'Free Wheel', value: 'Noiseless Imported 18T Full Ball' },
      { label: 'Rims', value: 'Double Wall Alloy Rim' },
      { label: 'Stem', value: '80mm Alloy' },
      { label: 'Pedal', value: 'SP 2590 Plastic (ISI Reflectors)' },
      { label: 'Tires & Tube', value: 'Hartex/Ralson 26*2.40' },
      { label: 'Head Set', value: 'Threadless Kenli' },
      { label: 'Handle Bar', value: 'Black ED Coated 640/660mm' },
      { label: 'Handle Grip', value: 'Leather Finish Handlegrip for More Comfort' },
      { label: 'Handle Stem', value: 'Alloy Black' },
      { label: 'Saddle', value: 'Superior Quality PU Foam Model 7600' },
      { label: 'Seat Clamp', value: 'Quick Release' },
      { label: 'Seat Pillar', value: 'Alloy Black' },
      { label: 'Hub', value: 'Mega Front Hub PH/T 36*36 BCP 7" Axle Black with Quick Release' },
      { label: 'Brakes', value: 'Mechanical Dual Disc Brakes with E-Brake Auto Cut' },
      { label: 'Stand', value: 'MTB Type' },
      { label: 'Cycle Size', value: '26T' },
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
      { label: 'Colors', value: 'Fighter Crafted Plain Grey / Turquish Blue' },
    ],

    meta: {
      title: 'Eparv Lahari Electric Cycle - 250W MTB E-Bike | Up to 110 km Range',
      description:
        'Buy the Eparv Lahari electric cycle — a high-performance 26T MTB e-bike with 250W BLDC motor, ' +
        'chrome suspension fork, three battery options (6.6/10.4/14.5Ah), up to 110 km range, ' +
        'fat 2.40" tyres, dual disc brakes, and anti-theft key ignition. Available in Grey and Turquish Blue.',
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
    console.log(`\n🎉 Done! View it at: ${BASE_URL}/electric-cycles/eparv-lahari`)
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
