import type { Access } from 'payload'

import { isAdmin } from './roles'

/**
 * Super Admin only. Used for destructive or sensitive operations such as
 * deleting leads or managing users.
 */
export const adminOnly: Access = ({ req: { user } }) => isAdmin(user)
