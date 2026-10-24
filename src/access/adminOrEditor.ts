import type { Access } from 'payload'

import { isAdminOrEditor } from './roles'

/**
 * Content roles: Super Admin and Content Editor. Used for products, pages,
 * posts, dealers, media and CSV import operations.
 */
export const adminOrEditor: Access = ({ req: { user } }) => isAdminOrEditor(user)
