import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/eparv-og.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

type MetaDoc = Partial<Page> | Partial<Post> | null

/**
 * Builds page metadata for CMS documents with canonical URL and noindex
 * support. `canonicalPath` is the document's own URL path (e.g. /blog/my-post);
 * an explicit meta.canonicalUrl overrides it for pages that canonicalise
 * elsewhere.
 */
export const generateMeta = async (args: {
  doc: MetaDoc
  canonicalPath?: string
}): Promise<Metadata> => {
  const { doc, canonicalPath } = args

  // Page and Post meta tabs differ (only pages carry canonical/noindex).
  const meta = doc?.meta as Partial<Page['meta']> | undefined

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? `${doc.meta.title} | Eparv` : 'Eparv — Electric Cycles for India'

  const base = getServerSideURL()
  const selfCanonical = canonicalPath ? `${base}${canonicalPath}` : undefined
  const canonical = meta?.canonicalUrl || selfCanonical

  return {
    description: doc?.meta?.description,
    ...(canonical
      ? {
          alternates: {
            canonical,
          },
        }
      : {}),
    ...(meta?.noindex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalPath ?? '/',
    }),
    title,
  }
}
