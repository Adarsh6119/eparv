export type ClaimKey =
  | 'noLicenseRto'
  | 'arai100'
  | 'helmetNotRequired'
  | 'dealers150plus'
  | 'cities200plus'
  | 'reviews1500plus'
  | 'rating49'
  | 'frame5yr'
  | 'motor24m'
  | 'battery12m'
  | 'ip65'
  | 'savings25k'

export interface ClaimRecord {
  key: ClaimKey
  statement: string
  verified: boolean
  sourceOrDocNumber: string | null
  lastVerifiedDate: string | null
  disclaimerIfUnverified?: string
}

/**
 * Claims Gate:
 * All marketing claims default to verified: false until confirmed by official documentation.
 * Components must check isClaimVerified(key) before rendering any claim badge, text or schema.
 */
export const CLAIMS: Record<ClaimKey, ClaimRecord> = {
  noLicenseRto: {
    key: 'noLicenseRto',
    statement: 'No RTO registration or driving license required (CMVR low-speed non-motorized EV cycle rule: <250W, <25 km/h)',
    verified: false, // Default false until official MoRTH notification verified
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
    disclaimerIfUnverified: 'Subject to CMVR guidelines for <250W 25 km/h electric cycles.',
  },
  arai100: {
    key: 'arai100',
    statement: '100% ARAI Certified Components',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  helmetNotRequired: {
    key: 'helmetNotRequired',
    statement: 'Helmet not legally mandated by Motor Vehicles Act for pedal-assist cycles',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  dealers150plus: {
    key: 'dealers150plus',
    statement: '150+ Verified Dealers Across India',
    verified: false, // DB currently has 0 verified public dealers
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  cities200plus: {
    key: 'cities200plus',
    statement: 'Active delivery & service in 200+ cities',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  reviews1500plus: {
    key: 'reviews1500plus',
    statement: '1,500+ Verified Rider Reviews',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  rating49: {
    key: 'rating49',
    statement: '4.9 / 5 Average Customer Rating',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  frame5yr: {
    key: 'frame5yr',
    statement: '5-Year Frame Warranty',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  motor24m: {
    key: 'motor24m',
    statement: '24-Month Motor Warranty',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  battery12m: {
    key: 'battery12m',
    statement: '12-Month Battery Warranty',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  ip65: {
    key: 'ip65',
    statement: 'IP65 Monsoon Weatherproof Ingress Protection',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
  savings25k: {
    key: 'savings25k',
    statement: 'Annual fuel savings of ₹25,000+ compared to petrol two-wheelers',
    verified: false,
    sourceOrDocNumber: null,
    lastVerifiedDate: null,
  },
}

export function isClaimVerified(key: ClaimKey): boolean {
  return CLAIMS[key]?.verified === true
}

export function getClaim(key: ClaimKey): ClaimRecord {
  return CLAIMS[key]
}
