import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Eparv builds dependable electric cycles for daily commutes, weekend rides and delivery fleets across India.',
  images: [
    {
      url: `${getServerSideURL()}/eparv-og.png`,
    },
  ],
  siteName: 'Eparv',
  title: 'Eparv — Electric Cycles for India',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
