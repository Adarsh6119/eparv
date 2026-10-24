import type { User } from '@/payload-types'

export type Role = 'admin' | 'editor' | 'sales'

/**
 * Server-side role checks. These are the single source of truth for
 * authorization — every collection access function and custom endpoint
 * must go through these helpers so permissions are enforced on the
 * server, never only in the admin UI.
 */
export const hasRole = (user: User | null | undefined, ...roles: Role[]): boolean => {
  const userRoles = user?.roles
  if (!userRoles || !Array.isArray(userRoles) || userRoles.length === 0) {
    return false
  }
  return roles.some((role) => userRoles.includes(role))
}

export const isAdmin = (user: User | null | undefined): boolean => hasRole(user, 'admin')

export const isAdminOrEditor = (user: User | null | undefined): boolean =>
  hasRole(user, 'admin', 'editor')

export const isAdminOrSales = (user: User | null | undefined): boolean =>
  hasRole(user, 'admin', 'sales')

export const isStaff = (user: User | null | undefined): boolean =>
  hasRole(user, 'admin', 'editor', 'sales')
