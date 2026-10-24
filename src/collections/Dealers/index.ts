import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

import { adminOrEditor } from '../../access/adminOrEditor'
import { publiclyListedOrStaff } from '../../access/publiclyListedOrStaff'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDealer, revalidateDelete } from './hooks/revalidateDealer'

export const Dealers: CollectionConfig<'dealers'> = {
  slug: 'dealers',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    // Public visitors only ever see verified, publicly listed dealers.
    // Staff see all applications. See publiclyListedOrStaff for the exact rule.
    read: publiclyListedOrStaff,
    update: adminOrEditor,
  },
  defaultPopulate: {
    businessName: true,
    slug: true,
    city: true,
    state: true,
  },
  admin: {
    defaultColumns: ['businessName', 'city', 'state', 'applicationStatus', 'publicListing'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'dealers',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'dealers',
        req,
      }),
    useAsTitle: 'businessName',
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactPerson',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Business phone (verified)',
          validate: (value: string | null | undefined) => {
            if (!value) {
              return true
            }
            return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(value.trim())
              ? true
              : 'Enter a valid Indian mobile number.'
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Business email (verified)',
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
      ],
    },
    {
      name: 'serviceableLocations',
      type: 'array',
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
      ],
      admin: {
        description: 'Cities and towns this dealer can deliver or service cycles in.',
      },
    },
    {
      name: 'geoCoordinates',
      type: 'group',
      label: 'Map coordinates (only when verified)',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          min: -90,
          max: 90,
        },
        {
          name: 'longitude',
          type: 'number',
          min: -180,
          max: 180,
        },
      ],
    },
    {
      name: 'openingHours',
      type: 'textarea',
      label: 'Opening hours (only when verified)',
      admin: {
        description: 'e.g. Mon–Sat 10:00–20:00, Sun closed',
      },
    },
    {
      name: 'about',
      type: 'textarea',
      label: 'About this dealership',
    },
    {
      name: 'applicationStatus',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Verified', value: 'verified' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'publicListing',
      type: 'checkbox',
      label: 'Publicly listed',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'A dealer page becomes publicly visible only when this is checked AND the application status is Verified.',
      },
    },
    {
      name: 'isDemoData',
      type: 'checkbox',
      label: 'Demo data',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Marks this dealership as unverified placeholder data. The website shows a visible demo-data notice and omits LocalBusiness structured data.',
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        MetaTitleField({}),
        MetaImageField({ relationTo: 'media' }),
        MetaDescriptionField({}),
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        PreviewField({
          hasGenerateFn: false,
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField({ useAsSlug: 'businessName' }),
  ],
  hooks: {
    afterChange: [revalidateDealer],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: false,
    maxPerDoc: 20,
  },
}
