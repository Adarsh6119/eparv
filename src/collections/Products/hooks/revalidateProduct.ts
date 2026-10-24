import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Product } from '../../../payload-types'

const productPathsToRevalidate = (slug: string) => [
  `/electric-cycles/${slug}`,
  `/electric-cycles`,
  `/compare/${slug}`,
  `/`, // featured products appear on the homepage
]

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      for (const path of productPathsToRevalidate(doc.slug)) {
        payload.logger.info(`Revalidating product at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('products-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      for (const path of productPathsToRevalidate(previousDoc.slug)) {
        revalidatePath(path)
      }
      revalidateTag('products-sitemap', 'max')
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    for (const path of productPathsToRevalidate(doc?.slug ?? '')) {
      revalidatePath(path)
    }
    revalidateTag('products-sitemap', 'max')
  }

  return doc
}
