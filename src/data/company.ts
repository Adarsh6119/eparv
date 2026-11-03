export interface RegisteredAddress {
  line1: string
  line2: string
  city: string
  state: string
  pincode: string
  country: string
  full: string
}

export interface CompanyFounder {
  name: string
  role: string
}

export interface CompanyContact {
  phone: string
  phoneFormatted: string
  phoneTel: string
  email: string
  hours: string
}

export interface CompanyMetrics {
  cyclesServed: string
  cyclesServedCount: number
  cyclesServedLabel: string
  experienceYears: string
}

export interface CompanyDetails {
  legalName: string
  tradeName: string
  brandName: string
  gstin: string
  cin: string | null
  registeredAddress: RegisteredAddress
  foundedDate: string
  foundedYear: string
  foundingDateDisplay: string
  founder: CompanyFounder
  contact: CompanyContact
  metrics: CompanyMetrics
}

export const COMPANY_DETAILS: CompanyDetails = {
  legalName: 'EPARV INGENUITY PRIVATE LIMITED',
  tradeName: 'Eparv',
  brandName: 'Eparv Ingenuity',
  gstin: '07AAGCE4054K1ZJ',
  cin: null,
  registeredAddress: {
    line1: 'B-306 Top Floor, Krishna Mall',
    line2: 'Plot No 5, Sector 12, Dwarka',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110078',
    country: 'India',
    full: 'B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka, New Delhi - 110078',
  },
  foundedDate: '2021-03-31',
  foundedYear: '2021',
  foundingDateDisplay: '31 March 2021',
  founder: {
    name: 'Rajendra Kumar Mishra',
    role: 'Founder & Director',
  },
  contact: {
    phone: '9968984030',
    phoneFormatted: '+91 99689 84030',
    phoneTel: '+919968984030',
    email: 'eparvingenuiuty@gmail.com',
    hours: 'Monday – Saturday, 9:30 AM – 7:00 PM IST',
  },
  metrics: {
    cyclesServed: '100+',
    cyclesServedCount: 100,
    cyclesServedLabel: '100+ Electric Cycles on Indian Roads',
    experienceYears: '3+ Years of EV Engineering',
  },
}
