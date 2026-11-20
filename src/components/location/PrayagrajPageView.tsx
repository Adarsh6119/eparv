'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Clock,
  Droplets,
  Fuel,
  Gauge,
  HelpCircle,
  IndianRupee,
  Lightbulb,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  PhoneCall,
  Plug,
  Route,
  Shield,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  TrendingDown,
  Truck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FaqBlock } from '@/components/seo'
import { JsonLd } from '@/components/JsonLd'
import { LeadForm } from '@/components/LeadForm'
import { MODEL_LIST } from '@/data/models'

/* ───────────────────────── static data ───────────────────────── */

const PRICE_TABLE = [
  {
    model: 'Eparv Savitri',
    slug: 'eparv-savitri',
    price: '18,999',
    mrp: '21,500',
    pasRange: '110 km',
    throttleRange: '60 km',
    battery: '36V, 10.4Ah',
    weight: '26 kg',
    payload: '140 kg',
    chargeTime: '3 ghante',
    bestFor: 'Ladies, seniors, shopkeepers, advocates',
  },
  {
    model: 'Eparv Panther',
    slug: 'eparv-panther',
    price: '19,999',
    mrp: '21,000',
    pasRange: '55 km',
    throttleRange: '35 km',
    battery: '36V, 7.8Ah',
    weight: '22 kg',
    payload: '110 kg',
    chargeTime: '3 ghante',
    bestFor: 'Students, coaching, office commute',
  },
  {
    model: 'Eparv Satya',
    slug: 'eparv-satya',
    price: '21,000',
    mrp: '22,999',
    pasRange: '55 km',
    throttleRange: '35 km',
    battery: '36V, 7.8Ah',
    weight: '25 kg',
    payload: '115 kg',
    chargeTime: '2 se 3 ghante',
    bestFor: 'Rough roads, outskirts, rugged daily riding',
  },
  {
    model: 'Eparv Lahari',
    slug: 'eparv-lahari',
    price: '21,999',
    mrp: '27,999',
    pasRange: '110 km',
    throttleRange: '65 km',
    battery: '36V, 10.4Ah',
    weight: '25 kg',
    payload: '125 kg',
    chargeTime: '4 ghante',
    bestFor: 'Long distance, delivery, touring, cross-river',
  },
  {
    model: 'Eparv Visalka',
    slug: 'eparv-visalka',
    price: '24,999',
    mrp: '26,000',
    pasRange: '60 km',
    throttleRange: '40 km',
    battery: '36V, 10.4Ah',
    weight: '24 kg',
    payload: '120 kg',
    chargeTime: '4 ghante',
    bestFor: 'Potholes, speed breakers, suspension comfort',
  },
]

const POPULAR_ROUTES = [
  {
    from: 'Civil Lines',
    to: 'Allahabad University',
    distance: '≈ 4 km',
    why: 'Door se gate tak ka sabse chhota academic route, motorised vehicle se bhi tez',
  },
  {
    from: 'Kareli',
    to: 'High Court / Civil Lines',
    distance: '≈ 6 km',
    why: 'Court ke paas parking ki tension nahi, file bundle & bag aaram se carry hota hai',
  },
  {
    from: 'Naini',
    to: 'Civil Lines',
    distance: '≈ 9 km',
    why: 'Yamuna ke bridge par assist, flat road par economy',
  },
  {
    from: 'George Town',
    to: 'MNNIT / Jhunsi side',
    distance: '≈ 7 km',
    why: 'Shaant sadkein, pehli baar ride karne walon ke liye achha',
  },
]

const DELIVERY_AREAS = [
  'Civil Lines',
  'Allahabad University area',
  'George Town',
  'Ashok Nagar',
  'Kareli',
  'Naini',
  'Jhunsi',
  'Bhardwaj Ashram area',
  'Muthiganj',
  'Katra',
  'Chowk',
  'Tagore Town',
]

const ON_REQUEST_AREAS = [
  'Lukerganj',
  'Alopibagh',
  'Teliyarganj',
  'Daraganj',
  'Baghambari',
  'Shivkuti',
  'Phaphamau',
  'Jhalwa',
]

const COST_COMPARISON = [
  { item: 'Cost per km', petrol: '₹2.5 – ₹3', eparv: '₹0.02 – ₹0.04' },
  { item: 'Full tank / full charge', petrol: '₹500+', eparv: '₹2 – ₹3 (lagbhag 0.3 unit)' },
  { item: 'Monthly cost (25 km/day)', petrol: '₹1,700 – ₹1,800', eparv: '₹15 – ₹30' },
  { item: 'Licence, RTO, road tax', petrol: 'Required', eparv: 'Not required' },
  { item: 'Insurance', petrol: 'Mandatory', eparv: 'Not mandatory' },
  { item: 'Yearly saving', petrol: '–', eparv: 'Lagbhag ₹20,000' },
]

const WARRANTY_TABLE = [
  { component: 'Frame', warranty: '5 saal (60 mahine)' },
  { component: 'BLDC Hub Motor', warranty: '24 mahine' },
  { component: 'Lithium Battery', warranty: '12 mahine' },
]

const COMPANY_TABLE = [
  { label: 'Legal name', value: 'EPARV INGENUITY PRIVATE LIMITED' },
  { label: 'Founder & Managing Director', value: 'Rajendra Kumar Mishra' },
  { label: 'Incorporated', value: '31 March 2021' },
  { label: 'CIN', value: 'U34300DL2021PTC379435' },
  { label: 'GSTIN', value: '07AAGCE4054K1ZJ' },
  {
    label: 'Registered office',
    value: 'B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka, New Delhi – 110078',
  },
  { label: 'Phone / WhatsApp', value: '+91 99689 84030' },
  { label: 'Email', value: 'contact@eparvmotors.com' },
]

const PRAYAGRAJ_FAQS = [
  {
    question: 'Electric cycle in Prayagraj ki price kitni hai?',
    answer:
      'Eparv ki electric cycle ki price ₹18,999 (Savitri) se ₹24,999 (Visalka) tak hai. Panther ₹19,999, Satya ₹21,000 aur Lahari ₹21,999 mein listed hain. Price national hain, yaani Prayagraj mein koi alag charge nahi bataya gaya. Final amount aur offers order se pehle team se confirm karein.',
  },
  {
    question: 'Kya electric cycle chalane ke liye licence ya registration chahiye?',
    answer:
      'Nahi. Eparv ki cycles 250W motor aur 25 km/h top speed wali low-speed category mein aati hain, jiske liye company ke anusar driving licence, RTO registration, road tax aur insurance ki zaroorat nahi hoti. Latest niyam ek baar check kar lena achha rehta hai.',
  },
  {
    question: 'Electric cycle ek charge mein kitni chalti hai?',
    answer:
      'Model par depend karta hai. Panther aur Satya mein pedal assist par 55 km, Visalka mein 60 km, aur Savitri aur Lahari mein 110 km tak. Throttle mode mein range kam hoti hai, yaani 35 se 65 km. Ye figures flat road aur 70 kg rider ke test par based hain, isliye asli range thodi alag ho sakti hai.',
  },
  {
    question: 'Charging mein kitna time lagta hai aur bijli ka kharch kitna aata hai?',
    answer:
      'Model ke hisaab se 2 se 4 ghante lagte hain, aur ye normal 5A wall socket se hoti hai. Eparv ke anusar ek full charge par lagbhag 0.3 unit bijli lagti hai, yaani ₹7 per unit ke hisaab se ₹2 se ₹3 ke beech.',
  },
  {
    question: 'Electric cycle home delivery Prayagraj mein milti hai kya?',
    answer:
      'Haan. Civil Lines, George Town, Kareli, Katra, Tagore Town, Naini, Jhunsi aur kai doosre areas mein home delivery aur test ride listed hai. Delivery aam taur par kuch working days mein hoti hai, aur exact time order confirm karte waqt bataya jaata hai.',
  },
  {
    question: 'Kya main kharidne se pehle electric cycle ki test ride le sakta hoon?',
    answer:
      'Haan. Eparv free doorstep test ride deta hai, jisme koi purchase karna zaroori nahi. Aap website ke Book a Test Ride page par Prayagraj chunkar request bhej sakte hain, ya +91 99689 84030 par WhatsApp kar sakte hain.',
  },
  {
    question: 'Electric cycle EMI Prayagraj mein kaise milti hai?',
    answer:
      'Website ke anusar EMI ke vikalp order confirm karte waqt team ke saath discuss kiye jaate hain. Interest rate, tenure aur charges ki jaankari site par publish nahi hai, isliye total amount, processing fee aur sabhi shartein likhit mein lein.',
  },
  {
    question: 'Best electric cycle in Prayagraj kaun si hai?',
    answer:
      'Ye aapki zaroorat par depend karta hai. Lambi range aur carrier ke liye Savitri, lightweight aur student commute ke liye Panther, kharab sadkon ke liye Visalka, lambe shift ya touring ke liye Lahari, aur budget rugged option ke liye Satya sahi rehti hai. Test ride se faisla karna sabse behtar hai.',
  },
  {
    question: 'Electric cycle for ladies Prayagraj ke liye kaun si model theek hai?',
    answer:
      'Savitri ka upright posture, mudguards aur carrier ise ghar ke kaam ke liye practical banate hain, aur Panther sabse halki (22 kg) hai. Savitri ka frame step-through nahi hai, isliye test ride mein seat height aur chadhne-utarne ka aaram zaroor check karein.',
  },
  {
    question: 'Electric cycle for students Prayagraj ke liye kya sahi rahegi?',
    answer:
      'Panther (₹19,999, 22 kg) ya Savitri (₹18,999) ko Eparv students ke liye recommend karta hai. Key lock aur detachable battery hone se hostel ya classroom mein battery safe rakhi ja sakti hai.',
  },
  {
    question: 'Battery aur motor par kitni warranty milti hai?',
    answer:
      'Frame par 5 saal, BLDC motor par 24 mahine aur battery par 12 mahine ki warranty batayi gayi hai. Warranty ki detailed terms purchase se pehle likhit mein maang lein.',
  },
  {
    question: 'Barsaat mein electric cycle chala sakte hain kya?',
    answer:
      'Eparv ke anusar wiring aur motor casing weather-sealed hain, aur brake lagate hi motor ki power cut ho jaati hai. Phir bhi gehre jal-bharav mein cycle na chalayein aur battery ko paani se bachayein.',
  },
  {
    question: 'Cycle ka maximum weight capacity kitna hai?',
    answer:
      'Savitri 140 kg, Lahari 125 kg, Visalka 120 kg, Satya 115 kg aur Panther 110 kg tak ka payload sambhal sakti hai. Isme rider aur samaan dono ka weight shamil hota hai.',
  },
  {
    question: 'Service ya repair kahan hoga?',
    answer:
      'Brake, tyre aur chain jaise normal parts Prayagraj ke local cycle shops mein theek ho sakte hain. Battery, motor aur controller ke issues Eparv ki warranty process se handle hote hain, aur spare parts 24 se 48 ghante mein bheje jaate hain.',
  },
  {
    question: 'Kya Mela ya Kumbh ke samay electric cycle kaam aati hai?',
    answer:
      'Eparv ke anusar haan, kyunki restrictions ke samay petrol ki zaroorat nahi padti aur cycle restricted zone ke kinare tak pahunch jaati hai. Phir bhi police ya mela prashasan ke nirdesh ka palan karein.',
  },
  {
    question: 'Electric cycle in Prayagraj ke liye koi showroom hai kya?',
    answer:
      'Website par Prayagraj ka alag showroom address listed nahi hai. Eparv ghar par test ride aur delivery deta hai. Agar aapko showroom visit karna hai to Dealers page dekhein ya team se authorised dealer ke baare mein poochhein.',
  },
]

/* ───────────────────────── component ───────────────────────── */

export const PrayagrajPageView: React.FC = () => {
  /* Product JSON-LD schema for each model */
  const productSchemas = PRICE_TABLE.map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: m.model,
    brand: { '@type': 'Brand', name: 'Eparv' },
    description: `${m.model} electric cycle – ${m.pasRange} pedal-assist range, ${m.throttleRange} throttle range, ${m.battery} battery. Best for: ${m.bestFor}.`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: m.price.replace(/,/g, ''),
      availability: 'https://schema.org/InStock',
      url: `https://eparvmotors.com/electric-cycles/${m.slug}`,
    },
  }))

  /* Organization JSON-LD */
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EPARV INGENUITY PRIVATE LIMITED',
    url: 'https://eparvmotors.com',
    logo: 'https://eparvmotors.com/logo.png',
    founder: {
      '@type': 'Person',
      name: 'Rajendra Kumar Mishra',
    },
    foundingDate: '2021-03-31',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-306 Top Floor, Krishna Mall, Plot No 5, Sector 12, Dwarka',
      addressLocality: 'New Delhi',
      postalCode: '110078',
      addressCountry: 'IN',
    },
    telephone: '+919968984030',
    email: 'contact@eparvmotors.com',
  }

  return (
    <article className="pb-20 pt-16">
      <div className="container max-w-5xl">
        {/* ─── Breadcrumbs ─── */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electric Cycle in India', href: '/electric-cycle-in' },
            { label: 'Uttar Pradesh', href: '/electric-cycle-in-uttar-pradesh' },
            { label: 'Prayagraj' },
          ]}
        />

        {/* ─── H1 Header ─── */}
        <header className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <MapPin className="size-3.5 text-energy" />
            <span>Prayagraj (प्रयागराज) • Uttar Pradesh</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Electric Cycle in Prayagraj – Price, Best Models, EMI aur Free Home Delivery
          </h1>

          <p className="text-xs text-muted-foreground italic">
            Is page ki jaankari Eparv ki official website (eparvmotors.com) ke product aur city pages
            par based hai. Last updated: 20 November 2026. Price aur offers badal sakte hain,
            isliye order se pehle team se confirm zaroor karein.
          </p>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Agar aap Prayagraj mein roz Civil Lines se University, Kareli se High Court ya Naini se
            shehar ki taraf jaate hain, to petrol ka kharcha, traffic aur parking ki pareshani aap
            achhe se jaante honge.{' '}
            <strong className="text-foreground">Electric cycle in Prayagraj</strong> ek aisa vikalp
            hai jo 4 se 9 km ki in roz ki trips ko sasta, aasan aur bina licence wala bana deta hai.
            Is page par Eparv ke 5 models ki price, specifications, EMI ke baare mein sahi jaankari,
            home delivery wale areas aur free test ride ka poora process ek hi jagah diya gaya hai,
            taaki aap bina confuse hue sahi cycle chun sakein.
          </p>
        </header>

        {/* ─── EEAT Reviewer Box ─── */}
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground my-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
              RKM
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Reviewed by Rajendra Kumar Mishra
              </p>
              <p className="text-[11px] text-muted-foreground">
                Founder &amp; Managing Director, EPARV INGENUITY PRIVATE LIMITED
              </p>
            </div>
          </div>
          <div>
            <span className="inline-block px-2.5 py-1 rounded-full bg-card border border-border text-[11px] font-medium text-foreground">
              Last Updated: 20 November 2026
            </span>
          </div>
        </div>

        {/* ─── Quick Answer: Ek Nazar Mein Jaankari ─── */}
        <section
          aria-label="Quick answer"
          className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-5 sm:p-6 shadow-sm my-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            <Sparkles className="size-3.5 text-energy" />
            <span>Electric Cycle in Prayagraj: Ek Nazar Mein Jaankari</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                q: 'Price range',
                a: '₹18,999 se ₹24,999 tak, model ke hisaab se',
              },
              {
                q: 'Models',
                a: 'Eparv Savitri, Panther, Satya, Lahari aur Visalka',
              },
              {
                q: 'Motor',
                a: 'Sabhi models mein 250W BLDC hub motor, top speed 25 km/h',
              },
              {
                q: 'Range',
                a: '55 km se 110 km tak pedal assist mode mein (35–65 km throttle)',
              },
              {
                q: 'Licence aur registration',
                a: 'Not required under CMVR (250W motor, 25 km/h top speed)',
              },
              {
                q: 'Home delivery Prayagraj',
                a: 'Civil Lines, Naini, Kareli, Katra, Jhunsi, George Town samet 12 areas listed',
              },
              {
                q: 'Test ride',
                a: 'Free doorstep test ride, aapki apni daily route par',
              },
              {
                q: 'Warranty',
                a: 'Frame par 5 saal, motor par 24 mahine, battery par 12 mahine',
              },
              {
                q: 'Helpline',
                a: '+91 99689 84030 (Mon–Sat, 9:30 AM se 7:00 PM)',
              },
            ].map((item) => (
              <div
                key={item.q}
                className="flex items-start gap-2 rounded-xl border border-border/50 bg-card p-3"
              >
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-foreground">{item.q}:</span>{' '}
                  <span className="text-xs text-muted-foreground">{item.a}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Prayagraj Mein Electric Cycle Kyun? ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Prayagraj Mein Electric Cycle Kyun? Shehar Ki Zaroorat Ke Hisaab Se
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Prayagraj ek institutions wala shehar hai. High Court, Allahabad University, MNNIT,
            board offices aur coaching centres yahan ki roz ki zindagi ka hissa hain. Inke beech ki
            doori aksar 4 se 9 km hoti hai, yaani paidal chalne ke liye zyada aur car ya bike
            nikaalne ke liye kam. Isi doori mein{' '}
            <strong className="text-foreground">electric cycle in Prayagraj</strong> sabse sasti aur
            practical machine ban jaati hai.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Store,
                title: 'Institutions wala shehar',
                text: 'High Court, Allahabad University, MNNIT, board offices aur Katra coaching ke beech 4–9 km ki doori na paidal hoti hai na car lene laayak — e-cycle isme bilkul fit baithti hai.',
              },
              {
                icon: Sun,
                title: 'Garmi ke mahine (May & June)',
                text: '44°C+ ki dhoop mein class ya chamber pahunchna thaka deta hai. Motor assist se bina paseene mein doobe aap easily time par pahunchte hain.',
              },
              {
                icon: Route,
                title: 'Flat terrain & bridge assist',
                text: 'Prayagraj ka terrain zyadatar flat hai jisse battery kam kharch hoti hai. Naini aur Jhunsi ke Yamuna-Ganga bridges ki halki chadhai par motor assist aasaani deta hai.',
              },
              {
                icon: Navigation,
                title: 'Magh Mela & Kumbh vehicle restrictions',
                text: 'Bade aayojano mein jab four-wheelers aur autos par ban hota hai, ek charged electric cycle restricted zone ke kinare tak pahunchti hai aur bina parking tension nikal jaati hai.',
              },
              {
                icon: Fuel,
                title: 'Roz ka petrol kharch khatam',
                text: 'Roz 25 km chalane par scooter mahine ka ₹1,700+ petrol pita hai, jabki Eparv e-cycle sirf ₹15–₹30 ki bijli mein poora mahina chalti hai.',
              },
              {
                icon: Shield,
                title: 'Zero licence & registration',
                text: '250W aur 25 km/h low-speed rule ke tahat school students, university research scholars, ladies aur senior citizens sab bina licence legally chala sakte hain.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <item.icon className="size-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Isi wajah se <strong className="text-foreground">electric cycle in Prayagraj</strong> ab
            sirf shauk nahi, balki roz ki zaroorat banti ja rahi hai.
          </p>
        </section>

        {/* ─── Price Table ─── */}
        <section className="my-12 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Model-Wise Rate List
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Electric Cycle Price in Prayagraj
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              Neeche diye gaye rate Eparv ki website par listed selling price hain. Ye price national
              hain, yaani Prayagraj, Lucknow ya Noida mein ek hi model ki price same rehti hai. Final
              on-road amount, offer aur delivery date order confirm karte waqt team batati hai.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Model</th>
                  <th className="p-3 font-bold text-foreground">Price (MRP)</th>
                  <th className="p-3 font-bold text-foreground">Battery</th>
                  <th className="p-3 font-bold text-foreground">Range (PAS / Throttle)</th>
                  <th className="p-3 font-bold text-foreground">Weight</th>
                  <th className="p-3 font-bold text-foreground">Max Payload</th>
                  <th className="p-3 font-bold text-foreground">Full Charge</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE.map((row) => (
                  <tr key={row.model} className="border-t border-border/50 hover:bg-muted/20">
                    <td className="p-3 font-semibold text-primary">
                      <Link
                        href={`/electric-cycles/${row.slug}`}
                        className="hover:underline underline-offset-2"
                      >
                        {row.model}
                      </Link>
                    </td>
                    <td className="p-3 font-bold text-foreground">
                      ₹{row.price}{' '}
                      <span className="text-muted-foreground line-through font-normal">
                        (₹{row.mrp})
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground">{row.battery}</td>
                    <td className="p-3 text-foreground font-medium">
                      {row.pasRange} / {row.throttleRange}
                    </td>
                    <td className="p-3 text-muted-foreground">{row.weight}</td>
                    <td className="p-3 text-foreground">{row.payload}</td>
                    <td className="p-3 text-muted-foreground">{row.chargeTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground italic">
            <p>
              <strong>Table padhne ka sahi tareeka:</strong> PAS ka matlab pedal assist mode hai,
              jisme motor aapke pedal ko support deta hai. Throttle mode mein aap bina pedal maare
              sirf twist grip se chalate hain, aur isme range kam milti hai. Isliye agar aapko lambi
              range chahiye to PAS mode ke saath ride karna sabse behtar rehta hai.
            </p>
            <p>
              <strong>Price ke saath kya milta hai:</strong> Har Eparv cycle mein 250W BLDC hub
              motor, detachable lithium battery, dual disc brakes with motor cut-off aur 25 km/h ki
              governed speed milti hai. Cycle lagbhag 95% pre-assembled aati hai aur toolkit ke
              saath, yaani aapko sirf handlebar seedha karna aur pedal lagana hota hai (lagbhag 10
              minute ka kaam).
            </p>
          </div>
        </section>

        {/* ─── Best Electric Cycle in Prayagraj: Model Guide ─── */}
        <section className="my-12 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Best Electric Cycle in Prayagraj: Kaun Si Cycle Kiske Liye
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Best electric cycle in Prayagraj</strong> ek hi
            model nahi hoti, ye aapki daily zaroorat par depend karta hai. Neeche har tarah ke
            Prayagraj rider ke liye model ka suggestion diya gaya hai:
          </p>

          {/* Students */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="size-5 text-primary" />
              Electric Cycle for Students Prayagraj: University, Coaching aur Tuition
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Agar aap Allahabad University, Katra ke coaching centres ya Civil Lines ke tuition
              classes jaate hain, to{' '}
              <Link
                href="/electric-cycles/eparv-panther"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Panther
              </Link>{' '}
              ek achha vikalp hai. Ye lineup ki sabse halki cycle hai (22 kg), price ₹19,999 hai aur
              55 km tak PAS range deti hai. Key ignition lock aur detachable battery hone se aap
              battery ko hostel room ya classroom mein safe rakh sakte hain.{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Savitri
              </Link>{' '}
              bhi students ke liye recommended hai, kyunki ₹18,999 par ye sabse affordable cycle hai
              aur 110 km tak PAS range deti hai.
            </p>
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Eparv ka apna hisaab:</strong> Shared auto par
              roz ₹40 ke hisaab se mahine ke lagbhag ₹1,000 lagte hain, jabki cycle ki charging
              mahine mein sirf ₹15–₹30 ka bill badhati hai. Isse students ki mahine ki bachat ₹980 ke
              aas-paas hoti hai.{' '}
              <Link
                href="/electric-cycle-for-students"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Electric cycle for students page dekhein →
              </Link>
            </div>
          </div>

          {/* Ladies */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="size-5 text-primary" />
              Electric Cycle for Ladies Prayagraj: Aaram aur Control ko Pehle Rakhein
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ladies ke liye cycle chunte waqt teen cheezein zaroori hain: seat ki height, cycle ka
              weight aur baithne ka posture.{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Savitri
              </Link>{' '}
              ka upright, relaxed riding posture, full mudguards aur rear carrier ise ghar ke kaam,
              market trips, school ya office jaane wali mahilaon ke liye practical banata hai.{' '}
              <Link
                href="/electric-cycles/eparv-panther"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Panther
              </Link>{' '}
              (22 kg) lightest hai, isliye ise sambhalna aur seedhiyon ya gate se nikaalna aasan hai.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Ek zaroori baat:</strong> Savitri ka frame
              traditional 22 inch tubular steel frame hai, step-through nahi. Isliye cycle kharidne se
              pehle free doorstep test ride mein seat height adjust karke dekh lein ki chadhna aur
              utarna aapke liye comfortable hai ya nahi.
            </p>
          </div>

          {/* Advocates & Office */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Store className="size-5 text-primary" />
              Advocates, Office Jaane Wale aur Kareli–High Court Commuters
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kareli se High Court ya Civil Lines ka roz ka ~6 km ka route electric cycle ke liye
              ideal hai. Court ke aas-paas parking ka tanaav bilkul khatam ho jaata hai, aur Savitri
              ka rear carrier file bundle aur laptop bag aaraam se utha leta hai. Court visit karne
              wale ek poore hafte ka cycle kharch ek auto ke kiraye se bhi kam rehta hai. Lambe
              formal kapdon mein ride karne wale logon ke liye throttle mode kaam aata hai, jisme
              bina pedal maare cycle chalti hai.
            </p>
          </div>

          {/* Shopkeepers & Delivery */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Truck className="size-5 text-primary" />
              Dukaandaar, Delivery Rider aur Chhote Vyapari
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Agar aap Katra, Chowk ya Muthiganj jaise bazaar areas mein samaan lane-le jaane ka kaam
              karte hain, to{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Savitri
              </Link>{' '}
              (140 kg payload, heavy rear carrier) ya{' '}
              <Link
                href="/electric-cycles/eparv-lahari"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Lahari
              </Link>{' '}
              (110 km PAS range) behtar rahegi. Lahari ki bigger 36V 10.4Ah battery lambe shift ke
              liye bani hai.{' '}
              <Link
                href="/electric-cycle-for-delivery"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Delivery electric cycles guide dekhein →
              </Link>
            </p>
          </div>

          {/* Senior Citizens */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="size-5 text-primary" />
              Bujurg aur Senior Citizens
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Senior citizens aur family riders ke liye{' '}
              <Link
                href="/electric-cycles/eparv-savitri"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Savitri
              </Link>{' '}
              best hai, kyunki ismein seedha baithne wala posture hota hai aur kamar par zor kam
              padta hai. Purane mohalle jaise George Town, Tagore Town aur Ashok Nagar ki chhoti
              sadkon par ye aaram se chalti hai.{' '}
              <Link
                href="/electric-cycle-for-senior-citizens"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Senior citizens electric cycles dekhein →
              </Link>
            </p>
          </div>

          {/* Rough roads & Weekend */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Wrench className="size-5 text-primary" />
              Toote-Phoote Raste aur Weekend Riding Ke Liye
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Agar aapke raaste mein gaddhe, speed breaker ya kachche patch zyada hain, to{' '}
              <Link
                href="/electric-cycles/eparv-visalka"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Visalka
              </Link>{' '}
              mein 80 mm travel wala front suspension fork hai aur 27.5 inch ke all-terrain tyres
              hain.{' '}
              <Link
                href="/electric-cycles/eparv-satya"
                className="text-primary hover:underline underline-offset-2 font-medium"
              >
                Eparv Satya
              </Link>{' '}
              ka frame hi heavy-duty hai aur ye budget mein ek rugged vikalp hai. Dono mein anti-theft
              key ignition lock bhi milta hai.
            </p>
          </div>
        </section>

        {/* ─── Popular Routes Table ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Prayagraj Ke Mohallon Mein Electric Cycle: Roz Ke Asli Routes
          </h2>
          <p className="text-sm text-muted-foreground">
            Inhe dekhkar aap andaza laga sakte hain ki aapka route electric cycle ke liye kitna fit
            hai:
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Route</th>
                  <th className="p-3 font-bold text-foreground whitespace-nowrap">Doori (Ek Taraf)</th>
                  <th className="p-3 font-bold text-foreground">Kyun Kaam Karta Hai</th>
                </tr>
              </thead>
              <tbody>
                {POPULAR_ROUTES.map((route) => (
                  <tr key={route.from + route.to} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                      {route.from} se {route.to}
                    </td>
                    <td className="p-3 text-primary font-bold whitespace-nowrap">
                      {route.distance}
                    </td>
                    <td className="p-3 text-muted-foreground">{route.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Delivery Areas ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Electric Cycle in Prayagraj Ke Liye Home Delivery Wale Areas
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eparv ki website par Prayagraj ke ye 12 areas home delivery aur test ride ke liye listed
            hain:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DELIVERY_AREAS.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 p-3 rounded-xl border border-border bg-card text-xs font-semibold text-foreground"
              >
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-2 text-xs text-muted-foreground">
            <p>
              <strong className="text-foreground">Baaki areas request par:</strong> Agar aap{' '}
              {ON_REQUEST_AREAS.join(', ')} jaisi kisi aur colony mein rehte hain, to order se pehle
              team se apna pin code aur delivery timeline confirm kar lein. Delivery ka window payment
              se pehle bataya jaata hai.
            </p>
            <p>
              <strong className="text-foreground">Mohalla-wise riding tips:</strong> Civil Lines aur
              Allahabad University area mein chaudi sadkein hain jahan Panther jaisi halki cycle
              achhi rehti hai. Katra, Chowk aur Muthiganj ki tang galiyon mein Savitri ki upright
              seating kaam aati hai. Naini aur Jhunsi bridge crossing ke liye Lahari ya Savitri
              sochhein. Kareli aur Bhardwaj Ashram ke ubad-khabad patches par Visalka ka suspension
              best rehta hai.
            </p>
          </div>
        </section>

        {/* ─── Buy Online 4 Steps ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Buy Electric Cycle Online in Prayagraj: Order Ka Poora Process
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Electric cycle in Prayagraj online kharidna aasan hai:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Model chunein',
                text: 'Upar ki table se apni zaroorat ke hisaab se 1 ya 2 models shortlist karein ya Electric Cycles page dekhein.',
              },
              {
                step: '02',
                title: 'Free test ride book karein',
                text: 'Isi page ke form par apna naam, mobile number aur Prayagraj likhkar request daalein. Team aapke doorstep par test ride arrange karegi.',
              },
              {
                step: '03',
                title: 'Order confirm karein',
                text: 'Model, colour availability, delivery date aur EMI options team ke saath confirm karein.',
              },
              {
                step: '04',
                title: 'Ghar par delivery',
                text: 'Cycle lagbhag 95% assembled aati hai. Delivery team assembly, battery checks aur riding demo aapke ghar par deti hai.',
              },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                  {s.step}
                </div>
                <h3 className="font-bold text-sm text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Prayagraj ke liye delivery ka samay &ldquo;kuch working days&rdquo; rehta hai. Direct
            baat karne ke liye call ya WhatsApp karein:{' '}
            <a
              href="tel:+919968984030"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              +91 99689 84030
            </a>
            .
          </p>
        </section>

        {/* ─── Showroom vs Online Shop ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Store className="size-5 text-primary" />
            Electric Cycle Shop in Prayagraj: Showroom Chahiye Ya Online?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bahut se log pehle &ldquo;electric cycle shop in Prayagraj&rdquo; search karte hain taaki
            ek baar cycle haath mein lekar dekh sakein. Eparv ka model alag hai — company showroom ke
            chakkar lagane ke bajaye ghar par{' '}
            <strong className="text-foreground">free doorstep test ride</strong> deti hai, yaani
            &ldquo;shop&rdquo; aapke darwaze par aati hai.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Agar aap authorised dealer dekhna chahte hain, to{' '}
            <Link
              href="/dealers"
              className="text-primary hover:underline underline-offset-2 font-medium"
            >
              Dealers page dekhein
            </Link>{' '}
            ya +91 99689 84030 par call karein. Kisi bhi local shop se lene se pehle zaroor confirm
            karein ki wo Eparv ka authorised dealer hai taaki factory warranty ka valid bill mile.
          </p>
        </section>

        {/* ─── Running Cost Comparison ─── */}
        <section className="my-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-energy/5 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Running Cost &amp; Savings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Chalne Ka Kharcha: Electric Cycle in Prayagraj Kitni Bachat Karti Hai
            </h2>
            <p className="text-sm text-muted-foreground">
              Formula: battery kWh × bijli rate (₹7 per unit) / range.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Item</th>
                  <th className="p-3 font-bold text-rose-500">Petrol Scooter (100cc)</th>
                  <th className="p-3 font-bold text-primary">Eparv Electric Cycle</th>
                </tr>
              </thead>
              <tbody>
                {COST_COMPARISON.map((row) => (
                  <tr key={row.item} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground">{row.item}</td>
                    <td className="p-3 text-rose-500">{row.petrol}</td>
                    <td className="p-3 text-primary font-semibold">{row.eparv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              • <strong>Eparv Savitri aur Lahari:</strong> lagbhag ₹0.02 per km. Ek full charge ka
              kharch lagbhag ₹2.62.
            </p>
            <p>
              • <strong>Eparv Panther, Satya aur Visalka:</strong> lagbhag ₹0.04 per km. Full charge
              ka kharch ₹1.97 se ₹2.62 ke beech.
            </p>
            <p>
              • Roz 25 km chalane par mahine ka bijli kharch sirf ₹15 se ₹30 aata hai, jabki 100cc
              scooter par ₹1,700–₹1,800. Mahine ki bachat lagbhag ₹1,745 se ₹1,760 (~₹20,000/saal).
            </p>
            <p className="italic">
              *Range note: 110 km range Savitri aur Lahari ke liye pedal assist level 1 mein, flat road
              aur 68–70 kg rider par tested hai. Throttle mode mein Savitri mein 60 km aur Lahari mein
              65 km milti hai.
            </p>
          </div>
        </section>

        {/* ─── EMI Section ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <IndianRupee className="size-5 text-primary" />
            Electric Cycle EMI Prayagraj: Kya Jaankari Sahi Hai
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Electric cycle in Prayagraj ko kist par lene ka sochne wale students aur naye vakeelon ke
            liye EMI suvidha available hai. EMI options order confirm karte waqt team ke saath
            discuss hote hain.
          </p>
          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-2 text-xs text-muted-foreground">
            <strong className="text-foreground">EMI lene se pehle ye 6 cheezein zaroor puchhein:</strong>
            <ul className="list-disc list-inside space-y-1">
              <li>Down payment kitna lagega</li>
              <li>Tenure kitne mahine ka hoga</li>
              <li>Interest rate aur processing fee kitni hai</li>
              <li>Total amount kya banega (price + interest + charges)</li>
              <li>Kaun si bank ya finance company hai</li>
              <li>Late payment ya foreclosure par kya charges lagte hain</li>
            </ul>
          </div>
        </section>

        {/* ─── Licence and Rules ─── */}
        <section className="my-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Licence, Registration aur Kanooni Baatein
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eparv ki electric cycles 250W power aur 25 km/h top speed ki seema mein bani hain, jo
            Central Motor Vehicles Rules (CMVR) ke non-motorised / low-speed e-cycle category ke
            hisab se aati hain. Isliye:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 ml-1">
            {[
              'Driving licence ki koi zaroorat nahi',
              'RTO registration ya number plate ki zaroorat nahi',
              'Road tax bilkul nahi lagta',
              'Insurance mandatory nahi hai (par safety ke liye recommended)',
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                {rule}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Safety tip:</strong> Helmet pehanna kanoon se
            mandatory nahi hai par hum strongly recommend karte hain, khaaskar Naini bridge, GT Road
            aur fast stretches par.{' '}
            <Link
              href="/posts/electric-cycle-license-rto-rules-india"
              className="text-primary hover:underline underline-offset-2 font-medium"
            >
              Licence aur CMVR rules ki poori guide dekhein →
            </Link>
          </p>
        </section>

        {/* ─── Prayagraj Weather & Care ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Prayagraj Ke Mausam Mein Electric Cycle Ki Dekhbhaal
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <Sun className="size-5 text-amber-500" />
              <h3 className="font-bold text-sm text-foreground">Garmi (May–June)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Battery ko dhoop mein khada karke ya garm jagah charge na karein. Battery detachable
                hai, isliye ise ghar ya office ke andar 5A socket se 2 se 4 ghante mein charge
                karein.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <Droplets className="size-5 text-blue-500" />
              <h3 className="font-bold text-sm text-foreground">Barsaat &amp; Waterlogging</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Wiring aur motor IP65 weather-sealed hain. Phir bhi gehre jal-bharav mein cycle na
                utaarein aur motor hub tak paani na aane dein. Ride ke baad cycle sukha lein.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <Navigation className="size-5 text-primary" />
              <h3 className="font-bold text-sm text-foreground">Mela Ke Din</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Charge poori rakhein aur bheed-bhaad wali jagah par anti-theft key lock ke alawa apna
                physical cable lock saath rakhein.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <Battery className="size-5 text-emerald-500" />
              <h3 className="font-bold text-sm text-foreground">Battery Life Tips</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Battery 1,000+ charge cycles ke liye rated hai. Battery ko poora 0% na hone dein
                (20% par charge karein) aur lambe samay tak na chalana ho to 50–60% charge par
                rakhein.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Warranty & Service ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Warranty, Service Aur Spare Parts
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every Eparv electric cycle in Prayagraj comes with direct factory warranty:
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Component</th>
                  <th className="p-3 font-bold text-foreground">Warranty</th>
                </tr>
              </thead>
              <tbody>
                {WARRANTY_TABLE.map((row) => (
                  <tr key={row.component} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground">{row.component}</td>
                    <td className="p-3 text-muted-foreground">{row.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mechanical parts jaise brake, tyre aur chain standard bicycle components hain jinhe
            Prayagraj ke local cycle mistri aasani se theek kar sakte hain. Battery, motor aur
            controller ke issues Eparv support handle karti hai aur spare parts 24 se 48 ghante mein
            dispatch kiye jaate hain.
          </p>
        </section>

        {/* ─── 7 Things Checklist ─── */}
        <section className="my-12 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Kharidne Se Pehle Ye 7 Cheezein Check Karein
          </h2>
          <ul className="text-sm text-muted-foreground space-y-2.5">
            {[
              'Apne roz ke route ka total distance napein aur uski range se 30 se 40% zyada range wala model chunein.',
              'Sirf brochure range dekhkar nahi, free doorstep test ride mein apni actual route par cycle chala kar dekhein.',
              'Seat height, handlebar posture aur weight aapke liye comfortable hai ya nahi.',
              'Charging kahan hogi — battery nikaal kar ghar ya hostel room mein charge ho sakti hai ya nahi.',
              'Warranty aur invoice mein company ka naam (EPARV INGENUITY PRIVATE LIMITED, GSTIN 07AAGCE4054K1ZJ) aur model sahi likha ho.',
              'EMI ke saare charges (down payment, processing fee, total amount) likhit mein lein.',
              'Seller ka helpline number (+91 99689 84030) aur technical support ka tareeka pehle hi save kar lein.',
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Why Trust Eparv ─── */}
        <section className="my-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Eparv Ke Baare Mein: Company Ki Jaankari
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eparv ek Indian brand hai jise EPARV INGENUITY PRIVATE LIMITED chalati hai. Company ki
            sthapna 31 March 2021 ko Rajendra Kumar Mishra ne ki, jo Founder aur Managing Director
            hain. Company ka registered office Dwarka, New Delhi mein hai.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-3 font-bold text-foreground">Company Detail</th>
                  <th className="p-3 font-bold text-foreground">Information</th>
                </tr>
              </thead>
              <tbody>
                {COMPANY_TABLE.map((row) => (
                  <tr key={row.label} className="border-t border-border/50">
                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="p-3 text-muted-foreground">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              {
                icon: ShieldCheck,
                title: '40-Point Factory Inspection',
                text: 'Har cycle dispatch hone se pehle 40-point inspection se guzarti hai: battery cell test, frame stress test, waterproofing aur brake cut-off check.',
              },
              {
                icon: Battery,
                title: 'Smart BMS Lithium Battery',
                text: 'Grade-A lithium cells with Smart BMS protection jo overcharge, short circuit, overvoltage aur deep discharge se bachata hai.',
              },
              {
                icon: Route,
                title: '25+ Cities Distribution Network',
                text: 'Delhi NCR, Uttar Pradesh, Bihar aur Madhya Pradesh ke 25+ cities mein direct delivery network aur video technical assistance.',
              },
              {
                icon: Truck,
                title: 'Try Before You Buy',
                text: 'Prayagraj mein doorstep free test ride without any purchase obligation.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <item.icon className="size-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Hindi Section ─── */}
        <section className="my-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Prayagraj में इलेक्ट्रिक साइकिल (प्रयागराज में इलेक्ट्रिक साइकिल): हिंदी में सार
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            अगर आप प्रयागराज में इलेक्ट्रिक साइकिल खरीदना चाहते हैं, तो Eparv के 5 मॉडल ₹18,999 से
            ₹24,999 तक उपलब्ध हैं। सभी में 250W BLDC मोटर, 25 km/h की गति सीमा और निकाली जा सकने वाली
            (detachable) लिथियम बैटरी मिलती है। सिविल लाइन्स, नैनी, करेली, कटरा, जॉर्ज टाउन और झूँसी
            जैसे इलाकों में घर पर फ्री टेस्ट राइड और डिलीवरी की जा सकती है। चलाने के लिए लाइसेंस या
            RTO रजिस्ट्रेशन की ज़रूरत नहीं बताई गई है। फ्रेम पर 5 साल, मोटर पर 24 महीने और बैटरी पर
            12 महीने की वारंटी दी गई है। प्रयागराज में इलेक्ट्रिक साइकिल लेने से पहले टेस्ट राइड ज़रूर
            लें और कीमत, EMI व डिलीवरी की तारीख टीम से पक्की कर लें।
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ज़्यादा जानकारी या फ्री टेस्ट राइड बुक करने के लिए{' '}
            <a
              href="tel:+919968984030"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              +91 99689 84030
            </a>{' '}
            पर कॉल या WhatsApp करें।
          </p>
        </section>

        {/* ─── All Models Gallery ─── */}
        <section className="my-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Official Lineup
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Electric Cycle Models Available in Prayagraj
              </h2>
            </div>
            <Link
              href="/electric-cycles"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Specs Comparison</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODEL_LIST.map((model) => (
              <div
                key={model.id}
                className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-muted/30 p-4 flex items-center justify-center">
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {model.badge}
                    </span>
                    <span className="absolute top-3 right-3 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-card border border-border">
                      ₹{model.priceSelling?.toLocaleString('en-IN')}
                    </span>
                    <img
                      src={model.image}
                      alt={`${model.name} electric cycle in Prayagraj`}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {model.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{model.tagline}</p>
                    <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground border-t border-border/50">
                      <div>
                        PAS Range:{' '}
                        <strong className="text-foreground">{model.rangePasKm} km</strong>
                      </div>
                      <div>
                        Top Speed:{' '}
                        <strong className="text-foreground">{model.topSpeedKmh} km/h</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0 space-y-2">
                  <Link
                    href={`/electric-cycles/${model.slug}`}
                    className="w-full inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary/90 transition-all"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ Block ─── */}
        <FaqBlock
          heading="Frequently Asked Questions – Electric Cycle in Prayagraj"
          subheading="Prayagraj riders ke sabse aam sawal: price, models, test ride, RTO rules, Mela restrictions aur home delivery ke baare mein."
          faqs={PRAYAGRAJ_FAQS}
          id="prayagraj-faq"
        />

        {/* ─── CTA: Book Test Ride ─── */}
        <section className="my-12 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 via-card to-energy/10 p-6 sm:p-8 text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Book Your Free Test Ride for an Electric Cycle in Prayagraj
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Ready to stop paying for petrol and autos? Fill in the form below with your name, phone
              number and preferred time, and we will bring an Eparv electric cycle to your doorstep
              anywhere in Prayagraj – Civil Lines, Naini, Kareli, Katra, George Town, Jhunsi, Ashok
              Nagar or Chowk. Ride it on your own route, ask every question, and buy only if you are
              happy.
            </p>
          </div>

          <div className="max-w-xl mx-auto text-left bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-md">
            <LeadForm
              type="test-ride"
              defaultCity="Prayagraj"
              submitLabel="Book Free Test Ride in Prayagraj"
              products={[
                { slug: 'eparv-savitri', name: 'Eparv Savitri (₹18,999)' },
                { slug: 'eparv-panther', name: 'Eparv Panther (₹19,999)' },
                { slug: 'eparv-satya', name: 'Eparv Satya (₹21,000)' },
                { slug: 'eparv-lahari', name: 'Eparv Lahari (₹21,999)' },
                { slug: 'eparv-visalka', name: 'Eparv Visalka (₹24,999)' },
              ]}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="tel:+919968984030"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-xs sm:text-sm font-bold text-white hover:bg-primary/90 transition-all"
            >
              <Phone className="size-4" />
              Call / WhatsApp: +91 99689 84030
            </a>
            <a
              href="mailto:contact@eparvmotors.com"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted/30 transition-all"
            >
              Email: contact@eparvmotors.com
            </a>
          </div>
        </section>

        {/* ─── Internal Links ─── */}
        <section className="my-12 pt-8 border-t border-border/60">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-4">
            Explore Related Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              {
                title: 'Electric Cycles in Uttar Pradesh',
                url: '/electric-cycle-in-uttar-pradesh',
                cat: 'location',
                desc: 'Explore all cities and dealerships across Uttar Pradesh',
              },
              {
                title: 'Electric Cycle in Varanasi',
                url: '/electric-cycle-in-varanasi',
                cat: 'location',
                desc: 'Doorstep test ride & delivery across Varanasi',
              },
              {
                title: 'Electric Cycle in Lucknow',
                url: '/electric-cycle-in-lucknow',
                cat: 'location',
                desc: 'Gomti Nagar, Hazratganj & Aliganj delivery guides',
              },
              {
                title: 'Electric Cycle in Kanpur',
                url: '/electric-cycle-in-kanpur',
                cat: 'location',
                desc: 'Delivery, test rides and prices in nearby Kanpur',
              },
              {
                title: 'Electric Cycle for Students',
                url: '/electric-cycle-for-students',
                cat: 'intent',
                desc: 'Best electric cycles for college and university students',
              },
              {
                title: 'Electric Cycle for Senior Citizens',
                url: '/electric-cycle-for-senior-citizens',
                cat: 'intent',
                desc: 'Upright, low-effort electric cycles for seniors',
              },
              {
                title: 'Electric Cycle for Delivery',
                url: '/electric-cycle-for-delivery',
                cat: 'intent',
                desc: 'High range commercial e-cycles for delivery partners',
              },
              {
                title: 'Electric Cycle Under ₹20,000',
                url: '/electric-cycle-under-20000',
                cat: 'intent',
                desc: 'Affordable daily commuter models',
              },
              {
                title: 'Licence & RTO Rules for Electric Cycles',
                url: '/posts/electric-cycle-license-rto-rules-india',
                cat: 'guide',
                desc: 'CMVR rules & legal guidelines for electric cycles in India',
              },
            ].map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    <MapPin className="size-3 text-energy" />
                    <span>{link.cat}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {link.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 pt-0.5">{link.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-end text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="size-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ─── JSON-LD Schemas ─── */}
      {productSchemas.map((schema, idx) => (
        <JsonLd key={idx} data={schema} />
      ))}
      <JsonLd data={orgSchema} />
    </article>
  )
}
