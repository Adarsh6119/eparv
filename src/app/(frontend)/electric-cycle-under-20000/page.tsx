import type { Metadata } from 'next'
import React from 'react'

import { IntentHubView } from '@/components/intent/IntentHubView'
import { INTENT_HUBS } from '@/data/intents'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const intent = INTENT_HUBS['under-20000']

export const metadata: Metadata = {
  title: intent.title,
  description: intent.directAnswer,
  keywords: [intent.primaryKeyword, ...intent.secondaryKeywords],
  alternates: {
    canonical: `${getServerSideURL()}${intent.url}`,
  },
  openGraph: mergeOpenGraph({
    title: intent.title,
    description: intent.directAnswer,
    url: `${getServerSideURL()}${intent.url}`,
  }),
}

export default function ElectricCycleUnder20000Page() {
  return <IntentHubView intent={intent} />
}
