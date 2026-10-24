import type { CollectionBeforeValidateHook } from 'payload'
import { ValidationError } from 'payload'

import type { Page } from '@/payload-types'
import { RESERVED_SLUGS, SLUG_PATTERN } from '@/utilities/reservedSlugs'

/**
 * Blocks page slugs that would collide with application routes and rejects
 * malformed slugs. Runs server-side for every create and update.
 */
export const validatePageSlug: CollectionBeforeValidateHook<Page> = ({ data }) => {
  const slug = typeof data?.slug === 'string' ? data.slug.toLowerCase() : undefined

  if (slug && !SLUG_PATTERN.test(slug)) {
    throw new ValidationError({
      errors: [
        {
          message:
            'Slugs may only contain lowercase letters, numbers and single hyphens (e.g. electric-cycle-in-delhi).',
          path: 'slug',
        },
      ],
    })
  }

  if (slug && RESERVED_SLUGS.includes(slug)) {
    throw new ValidationError({
      errors: [
        {
          message: `"${slug}" is reserved for an application route. Please choose a different slug.`,
          path: 'slug',
        },
      ],
    })
  }

  return data
}
