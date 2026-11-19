import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { CityPageView } from '@/components/location/CityPageView'
import { StateHubView } from '@/components/location/StateHubView'
import { LucknowPageView } from '@/components/location/LucknowPageView'
import { VaranasiPageView } from '@/components/location/VaranasiPageView'
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
  const canonicalUrl = `${baseUrl}/electric-cycle-in-${slug}`

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
      robots: { index: true, follow: true },
      openGraph: mergeOpenGraph({
        title,
        description,
        url: canonicalUrl,
      }),
    }
  }

  // Custom metadata for Lucknow
  if (slug === 'lucknow') {
    const title = 'Electric Cycle in Lucknow | Price, EMI & Home Delivery'
    const description =
      'Buy electric cycle in Lucknow online from ₹18,999. Free test ride, home delivery to Gomti Nagar, Hazratganj, Aliganj & Alambagh, EMI options, 5-year warranty.'

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: { index: true, follow: true },
      openGraph: mergeOpenGraph({
        title,
        description,
        url: canonicalUrl,
      }),
    }
  }

  // Custom metadata for Varanasi
  if (slug === 'varanasi') {
    const title = 'Electric Cycle in Varanasi | Price, EMI & Home Delivery'
    const description =
      'Buy electric cycle in Varanasi online from ₹18,999. Free test ride, home delivery to Lanka, BHU, Sigra, Cantt & Sarnath, EMI options and 5-year frame warranty.'

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: { index: true, follow: true },
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
      alternates: {
        canonical: canonicalUrl,
      },
      robots: { index: true, follow: true },
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

  // Custom Lucknow page with dedicated content
  if (slug === 'lucknow') {
    return <LucknowPageView />
  }

  // Custom Varanasi page with dedicated content
  if (slug === 'varanasi') {
    return <VaranasiPageView />
  }

  if (slug in CITIES) {
    const city = CITIES[slug]
    return <CityPageView city={city} />
  }

  notFound()
}
