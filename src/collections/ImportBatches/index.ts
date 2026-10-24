import type { CollectionConfig } from 'payload'

import { adminOrEditor } from '../../access/adminOrEditor'

/**
 * One record per uploaded CSV file. Holds the parsed preview, the import
 * report and an audit trail. The admin list view for this collection is
 * replaced by the full CSV Import Manager UI (see views/List.tsx).
 */
export const ImportBatches: CollectionConfig<'import-batches'> = {
  slug: 'import-batches',
  access: {
    // CSV imports are a content operation: admin and editor roles only.
    create: adminOrEditor,
    delete: adminOrEditor,
    read: adminOrEditor,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['filename', 'status', 'rowCount', 'validRowCount', 'errorRowCount', 'createdAt'],
    useAsTitle: 'filename',
    description:
      'CSV Page Import Manager. Upload a CSV, preview row-level validation, import valid rows as draft pages, then review and approve each page before publishing.',
    components: {
      views: {
        list: {
          Component: '@/collections/ImportBatches/views/List',
        },
      },
    },
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'uploaded',
      required: true,
      admin: {
        readOnly: true,
      },
      options: [
        { label: 'Uploaded', value: 'uploaded' },
        { label: 'Validated (ready to import)', value: 'validated' },
        { label: 'Imported', value: 'imported' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'rowCount', type: 'number', admin: { readOnly: true } },
        { name: 'validRowCount', type: 'number', admin: { readOnly: true } },
        { name: 'errorRowCount', type: 'number', admin: { readOnly: true } },
      ],
    },
    {
      name: 'report',
      type: 'group',
      admin: {
        readOnly: true,
      },
      fields: [
        { name: 'createdCount', type: 'number' },
        { name: 'updatedCount', type: 'number' },
        { name: 'skippedCount', type: 'number', label: 'Skipped (published page exists)' },
        { name: 'invalidCount', type: 'number', label: 'Invalid (validation errors)' },
        { name: 'failedCount', type: 'number', label: 'Failed (runtime errors)' },
      ],
    },
    {
      name: 'records',
      type: 'json',
      admin: {
        readOnly: true,
        description: 'Parsed rows with row-level validation results — the import preview.',
      },
    },
    {
      name: 'createdPages',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'events',
      type: 'array',
      labels: {
        singular: 'Audit event',
        plural: 'Audit log',
      },
      admin: {
        readOnly: true,
      },
      fields: [
        { name: 'at', type: 'date', required: true },
        { name: 'actor', type: 'relationship', relationTo: 'users' },
        { name: 'action', type: 'text', required: true },
        { name: 'detail', type: 'textarea' },
      ],
    },
  ],
  timestamps: true,
}
