import type { Access } from 'payload'

import { isAdminOrSales } from './roles'

/**
 * Lead management roles: Super Admin and Sales Executive. Content editors
 * have no access to lead data.
 */
export const adminOrSales: Access = ({ req: { user } }) => isAdminOrSales(user)
