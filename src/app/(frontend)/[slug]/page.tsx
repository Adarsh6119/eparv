import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CityLanding } from '@/components/CityLanding'
import { StateLanding } from '@/components/StateLanding'
import { LucknowPageView } from '@/components/location/LucknowPageView'
import { PrayagrajPageView } from '@/components/location/PrayagrajPageView'
import { VaranasiPageView } from '@/components/location/VaranasiPageView'
import { DelhiPageView } from '@/components/location/DelhiPageView'
import {
  getCityPageBySlug,
  getStatePageBySlug,
  isCityOrStateIndexable,
  REGISTRY_SLUGS,
} from '@/cities'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageFaqs } from '@/components/PageFaqs'

export async function generateStaticParams() {
  let cmsSlugs = new Set<string>()
  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    cmsSlugs = new Set(
      pages.docs
        ?.filter((doc) => {
          return doc.slug !== 'home'
        })
        .map(({ slug }) => slug)
        .filter((slug): slug is string => Boolean(slug)) ?? [],
    )
  } catch {
    // Database not migrated yet (e.g. first Vercel build). CMS pages will be
    // empty until `npm run migrate` runs against production Postgres and a
    // redeploy happens. Registry (code-defined) pages still generate.
  }

  // Code-defined city/state pages are served from src/cities and win over any
  // CMS page with the same slug, so they are generated here (deduped).
  const registryParams = REGISTRY_SLUGS.filter((slug) => !cmsSlugs.has(slug)).map((slug) => ({
    slug,
  }))

  return [
    ...registryParams,
    ...[...cmsSlugs].map((slug) => ({ slug })),
  ]
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  // Code-defined city and state/region pages (src/cities) take precedence
  // over CMS pages so the landing template is always what renders.
  if (decodedSlug === 'electric-cycle-in-delhi') {
    return <DelhiPageView />
  }

  if (decodedSlug === 'electric-cycle-in-lucknow') {
    return <LucknowPageView />
  }

  if (decodedSlug === 'electric-cycle-in-prayagraj') {
    return <PrayagrajPageView />
  }

  if (decodedSlug === 'electric-cycle-in-varanasi') {
    return <VaranasiPageView />
  }

  const cityPage = getCityPageBySlug(decodedSlug)
  if (cityPage) {
    return <CityLanding data={cityPage} />
  }

  const statePage = getStatePageBySlug(decodedSlug)
  if (statePage) {
    return <StateLanding data={statePage} />
  }

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: decodedSlug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout, faqs } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: page.title }]} />
      </div>

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
      <PageFaqs faqs={faqs} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)

  if (decodedSlug === 'electric-cycle-in-delhi') {
    return registryMeta({
      title: 'Electric Cycle in Delhi – From ₹18,999 – Eparv Motors',
      description:
        'Buy an electric cycle in Delhi from ₹18,999. Home delivery, free test ride and 5-year frame warranty. Book with Eparv Motors, Dwarka.',
      canonicalPath: '/electric-cycle-in-delhi',
      isIndexable: true,
    })
  }

  if (decodedSlug === 'electric-cycle-in-lucknow') {
    return registryMeta({
      title: 'Electric Cycle in Lucknow | Price, EMI & Home Delivery',
      description:
        'Buy electric cycle in Lucknow online from ₹18,999. Free test ride, home delivery to Gomti Nagar, Hazratganj, Aliganj & Alambagh, EMI options, 5-year warranty.',
      canonicalPath: '/electric-cycle-in-lucknow',
      isIndexable: true,
    })
  }

  if (decodedSlug === 'electric-cycle-in-prayagraj') {
    return registryMeta({
      title: 'Electric Cycle in Prayagraj: Price From ₹18,999 | Eparv',
      description:
        'Electric cycle in Prayagraj from ₹18,999. Home delivery in Civil Lines, Naini, Kareli, Katra, free test ride, EMI info and 5-year frame warranty.',
      canonicalPath: '/electric-cycle-in-prayagraj',
      isIndexable: true,
    })
  }

  if (decodedSlug === 'electric-cycle-in-varanasi') {
    return registryMeta({
      title: 'Electric Cycle in Varanasi | Price, EMI & Home Delivery',
      description:
        'Buy electric cycle in Varanasi online from ₹18,999. Free test ride, home delivery to Lanka, BHU, Sigra, Cantt & Sarnath, EMI options and 5-year frame warranty.',
      canonicalPath: '/electric-cycle-in-varanasi',
      isIndexable: true,
    })
  }

  const cityPage = getCityPageBySlug(decodedSlug)
  if (cityPage) {
    const isIndexable = isCityOrStateIndexable(cityPage.slug)
    return registryMeta({
      title: `Electric Cycle in ${cityPage.city} — Test Ride, Price & Delivery | Eparv`,
      description: cityPage.metaDescription,
      canonicalPath: `/${cityPage.slug}`,
      isIndexable,
    })
  }

  const statePage = getStatePageBySlug(decodedSlug)
  if (statePage) {
    const isIndexable = isCityOrStateIndexable(statePage.slug)
    return registryMeta({
      title: `Electric Cycles in ${statePage.state} — City Guides & Test Rides | Eparv`,
      description: statePage.metaDescription,
      canonicalPath: `/${statePage.slug}`,
      isIndexable,
    })
  }

  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page, canonicalPath: `/${decodedSlug}` })
}

function registryMeta(args: {
  title: string
  description: string
  canonicalPath: string
  isIndexable: boolean
}): Metadata {
  const base = getServerSideURL()
  const canonical = `${base}${args.canonicalPath}`

  return {
    title: args.title,
    description: args.description,
    alternates: {
      canonical,
    },
    robots: {
      index: args.isIndexable,
      follow: true,
    },
    openGraph: {
      title: args.title,
      description: args.description,
      url: args.canonicalPath,
      siteName: 'Eparv',
      type: 'website',
      images: [{ url: `${base}/eparv-og.png` }],
    },
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
