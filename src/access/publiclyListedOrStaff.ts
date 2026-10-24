import type { Access } from 'payload'

import { isStaff } from './roles'

/**
 * Dealer directory visibility rules.
 *
 * Staff (admin, editor, sales) can see every dealer record including
 * unverified applications. The public can only read dealers that are both
 * verified AND explicitly marked for public listing — this returns a query
 * constraint so the database filters, not just the UI.
 */
export const publiclyListedOrStaff: Access = ({ req: { user } }) => {
  if (isStaff(user)) {
    return true
  }

  return {
    and: [
      {
        applicationStatus: {
          equals: 'verified',
        },
      },
      {
        publicListing: {
          equals: true,
        },
      },
    ],
  }
}
