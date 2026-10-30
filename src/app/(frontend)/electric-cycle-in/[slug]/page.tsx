import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { CityPageView } from '@/components/location/CityPageView'
import { StateHubView } from '@/components/location/StateHubView'
import {
  CITIES,
  STATE_HUBS,
  isCityIndexable,
  isStateHubIndexable,
  type City,
  type StateHub,
  type StateHubSlug,
} from '@/data/cities'
import { getCityKeywords, getKeywordData } from '@/data/keywords'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const stateHubParams = Object.keys(STATE_HUBS).map((slug) => ({ slug }))
  const cityParams = Object.keys(CITIES).map((slug) => ({ slug }))
  return [...stateHubParams, ...cityParams]
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const baseUrl = getServerSideURL()
  const canonicalUrl = `${baseUrl}/electric-cycle-in/${slug}`

  // Check if slug is a State Hub
  if (slug in STATE_HUBS) {
    const hub = STATE_HUBS[slug as StateHubSlug]
    const isIndexable = isStateHubIndexable(slug as StateHubSlug)
    const title = `Electric Cycle in ${hub.displayName}: Prices, Cities & Showrooms | Eparv`
    const description = `Find Eparv electric cycle prices, dealer locations, free doorstep test rides, and fast 3-5 day delivery across ${hub.displayName}.`

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: isIndexable ? { index: true, follow: true } : { index: false, follow: true },
      openGraph: mergeOpenGraph({
        title,
        description,
        url: canonicalUrl,
      }),
    }
  }

  // Check if slug is a City
  if (slug in CITIES) {
    const city = CITIES[slug]
    const stateHub = STATE_HUBS[city.stateHub]
    const keywords = getCityKeywords(city.slug, city.displayName, city.displayNameHi)
    const isIndexable = isCityIndexable(city)

    const title = `Electric Cycle in ${city.displayName} (${city.displayNameHi}): Price, Dealers & Free Test Ride`
    const description = `Buy Eparv electric cycles in ${city.displayName}, ${stateHub?.displayName ?? ''}. Starting at ₹18,999 with 55-110 km range. Verified dealer locations, petrol vs EV savings, and free doorstep test rides.`

    return {
      title,
      description,
      keywords: [keywords.primaryKeyword, ...keywords.secondaryKeywords],
      alternates: {
        canonical: canonicalUrl,
      },
      robots: isIndexable ? { index: true, follow: true } : { index: false, follow: true },
      openGraph: mergeOpenGraph({
        title,
        description,
        url: canonicalUrl,
      }),
    }
  }

  return {
    title: 'Location Not Found | Eparv',
  }
}

export default async function LocationSlugPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise

  if (slug in STATE_HUBS) {
    const hub = STATE_HUBS[slug as StateHubSlug]
    return <StateHubView hub={hub} />
  }

  if (slug in CITIES) {
    const city = CITIES[slug]
    return <CityPageView city={city} />
  }

  notFound()
}
