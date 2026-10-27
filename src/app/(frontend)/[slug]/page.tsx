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
import {
  getCityPageBySlug,
  getStatePageBySlug,
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

  const cityPage = getCityPageBySlug(decodedSlug)
  if (cityPage) {
    return registryMeta({
      title: `Electric Cycle in ${cityPage.city} — Test Ride, Price & Delivery | Eparv`,
      description: cityPage.metaDescription,
      canonicalPath: `/${cityPage.slug}`,
    })
  }

  const statePage = getStatePageBySlug(decodedSlug)
  if (statePage) {
    return registryMeta({
      title: `Electric Cycles in ${statePage.state} — City Guides & Test Rides | Eparv`,
      description: statePage.metaDescription,
      canonicalPath: `/${statePage.slug}`,
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
}): Metadata {
  const base = getServerSideURL()
  const canonical = `${base}${args.canonicalPath}`

  return {
    title: args.title,
    description: args.description,
    alternates: {
      canonical,
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
