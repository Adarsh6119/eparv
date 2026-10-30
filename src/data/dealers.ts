export interface VerifiedDealer {
  id: string
  businessName: string
  slug: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  email: string | null
  mapUrl: string | null
  lat: number | null
  lng: number | null
  verifiedDate: string
  isPublicListing: boolean
}

/**
 * Verified Dealers Only:
 * Per ground rules: NEVER invent data. Unknown = null.
 * No fake reviews, fake dealers, fake phone numbers.
 * Dealers in this registry have completed physical/documentary onboarding.
 */
export const VERIFIED_DEALERS: VerifiedDealer[] = [
  // When an authorized dealer signs onboarding and passes verification, add record here.
]

export function getVerifiedDealersByCity(citySlug: string): VerifiedDealer[] {
  return VERIFIED_DEALERS.filter(
    (d) => d.city.toLowerCase().replace(/\s+/g, '-') === citySlug.toLowerCase(),
  )
}

export function getVerifiedDealersByState(stateSlug: string): VerifiedDealer[] {
  return VERIFIED_DEALERS.filter(
    (d) => d.state.toLowerCase().replace(/\s+/g, '-') === stateSlug.toLowerCase(),
  )
}
