import type { Access } from 'payload'

import { isAdmin } from './roles'

/**
 * User creation is a Super Admin privilege — with one exception: while the
 * database has no users at all, anyone may create the very first setup
 * account (Payload's create-first-user flow). This mirrors Payload's own
 * default behaviour while keeping user management locked down afterwards.
 */
export const adminOnlyOrCreateFirstUser: Access = async ({ req }) => {
  if (isAdmin(req.user)) {
    return true
  }

  if (!req.user && req.payload) {
    const count = await req.payload.count({ collection: 'users' })
    if (count.totalDocs === 0) {
      return true
    }
  }

  return false
}
