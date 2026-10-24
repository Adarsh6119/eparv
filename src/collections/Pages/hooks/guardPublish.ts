import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

import type { Page } from '@/payload-types'

/**
 * Server-side publishing gate for pages.
 *
 * 1. Pages that originate from a CSV import can only be published after a
 *    reviewer has explicitly set their approval status to "Approved".
 * 2. City and state landing pages must carry their location data before
 *    they can go live (indexation safeguard against thin location pages).
 *
 * These rules apply to every role, including Super Admins — the approval
 * workflow cannot be bypassed from the UI.
 */
export const guardPublish: CollectionBeforeChangeHook<Page> = ({ data }) => {
  if (data?._status === 'published') {
    if (data.importBatch && data.approvalStatus !== 'approved') {
      throw new ValidationError({
        errors: [
          {
            message:
              'This page was created by a CSV import. Review it and set the Approval Status to "Approved" before publishing.',
            path: 'approvalStatus',
          },
        ],
      })
    }

    if (data.pageType === 'city' && !data.city) {
      throw new ValidationError({
        errors: [
          {
            message: 'City landing pages must specify their city before they can be published.',
            path: 'city',
          },
        ],
      })
    }

    if (data.pageType === 'state' && !data.state) {
      throw new ValidationError({
        errors: [
          {
            message: 'State landing pages must specify their state before they can be published.',
            path: 'state',
          },
        ],
      })
    }
  }

  return data
}
