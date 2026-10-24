import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { adminOnly } from '../../access/adminOnly'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    // User management is a Super Admin privilege — editors and sales
    // executives must not be able to create or escalate accounts.
    create: adminOnly,
    delete: adminOnly,
    read: authenticated,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Super Admin',
          value: 'admin',
        },
        {
          label: 'Content Editor',
          value: 'editor',
        },
        {
          label: 'Sales Executive',
          value: 'sales',
        },
      ],
      // The very first user (created during first-run setup) becomes the
      // Super Admin. Admins explicitly choose roles for every later user.
      defaultValue: ['admin'],
      admin: {
        description:
          'Super Admin: full access. Content Editor: content, products, dealers, imports. Sales Executive: leads only.',
      },
    },
  ],
  timestamps: true,
}
