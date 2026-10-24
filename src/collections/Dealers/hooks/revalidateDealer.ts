import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Dealer } from '../../../payload-types'

const dealerPathsToRevalidate = (slug: string) => [`/dealers/${slug}`, '/dealers', '/']

export const revalidateDealer: CollectionAfterChangeHook<Dealer> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const wasPublic =
      previousDoc?.applicationStatus === 'verified' && previousDoc?.publicListing === true
    const isPublic = doc.applicationStatus === 'verified' && doc.publicListing === true

    if (isPublic || wasPublic) {
      for (const path of dealerPathsToRevalidate(doc.slug)) {
        payload.logger.info(`Revalidating dealer at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('dealers-sitemap', 'max')
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Dealer> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    for (const path of dealerPathsToRevalidate(doc?.slug ?? '')) {
      revalidatePath(path)
    }
    revalidateTag('dealers-sitemap', 'max')
  }

  return doc
}
