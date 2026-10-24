import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { adminOnly } from '../../access/adminOnly'
import { adminOrSales } from '../../access/adminOrSales'

const generateLeadId = (): string => {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `EP-${stamp}-${rand}`
}

const setLeadMetadata: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create') {
    if (!data.leadId) {
      data.leadId = generateLeadId()
    }
    // Normalize Indian mobile numbers to a bare 10-digit form for dedupe and CRM use.
    if (typeof data.phone === 'string') {
      data.phone = data.phone.replace(/(\+91)|[\s-]/g, '')
    }
    if (data.consent && typeof data.consent === 'object' && !data.consent.at) {
      data.consent.at = new Date()
    }
  }
  return data
}

export const Leads: CollectionConfig<'leads'> = {
  slug: 'leads',
  access: {
    // Public visitors can NEVER touch the leads collection directly.
    // Leads are created exclusively through the validated submission
    // service (src/services/leadService.ts) which uses overrideAccess
    // after zod validation, rate limiting and spam checks.
    create: adminOrSales,
    delete: adminOnly,
    read: adminOrSales,
    update: adminOrSales,
  },
  admin: {
    defaultColumns: ['leadId', 'name', 'leadType', 'city', 'status', 'assignedTo', 'createdAt'],
    useAsTitle: 'leadId',
    description:
      'Lead inbox. Retail enquiries, test rides, dealer applications and bulk orders arrive here. Export to CSV is available via the API at /api/leads/export.',
  },
  fields: [
    {
      name: 'leadId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Human-readable lead reference, generated automatically.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: '10-digit Indian mobile number.',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'leadType',
      type: 'select',
      required: true,
      defaultValue: 'retail',
      options: [
        { label: 'Retail Enquiry', value: 'retail' },
        { label: 'Test Ride', value: 'test-ride' },
        { label: 'Dealer Application', value: 'dealer' },
        { label: 'Bulk Order', value: 'bulk-order' },
        { label: 'Contact', value: 'contact' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text' },
      ],
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
    },
    {
      name: 'preferredDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'preferredTimeSlot',
      type: 'select',
      options: [
        { label: 'Morning (9–12)', value: 'morning' },
        { label: 'Afternoon (12–17)', value: 'afternoon' },
        { label: 'Evening (17–20)', value: 'evening' },
      ],
    },
    {
      name: 'organization',
      type: 'text',
      admin: {
        description: 'Business name for dealer applications, organisation for bulk orders.',
      },
    },
    {
      name: 'quantity',
      type: 'number',
      min: 1,
      admin: {
        description: 'Unit count for bulk orders.',
      },
    },
    {
      name: 'investmentRange',
      type: 'select',
      options: [
        { label: 'Under ₹5 lakh', value: 'under-5-lakh' },
        { label: '₹5–15 lakh', value: '5-15-lakh' },
        { label: '₹15–30 lakh', value: '15-30-lakh' },
        { label: 'Over ₹30 lakh', value: 'over-30-lakh' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'source',
      type: 'group',
      fields: [
        { name: 'sourceUrl', type: 'text', admin: { description: 'Page URL the lead came from.' } },
        { name: 'utmSource', type: 'text' },
        { name: 'utmMedium', type: 'text' },
        { name: 'utmCampaign', type: 'text' },
        { name: 'utmTerm', type: 'text' },
        { name: 'utmContent', type: 'text' },
      ],
    },
    {
      name: 'consent',
      type: 'group',
      fields: [
        {
          name: 'accepted',
          type: 'checkbox',
          label: 'Privacy policy consent',
          required: true,
        },
        {
          name: 'marketingUpdates',
          type: 'checkbox',
          label: 'Consent to marketing updates',
        },
        {
          name: 'at',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Assigned salesperson.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
        { label: 'Spam', value: 'spam' },
      ],
    },
    {
      name: 'nextFollowUpDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'notes',
      type: 'array',
      labels: {
        singular: 'Note',
        plural: 'Notes',
      },
      fields: [
        { name: 'note', type: 'textarea', required: true },
        { name: 'addedBy', type: 'relationship', relationTo: 'users' },
        { name: 'addedAt', type: 'date' },
      ],
    },
  ],
  hooks: {
    beforeChange: [setLeadMetadata],
  },
  timestamps: true,
}
