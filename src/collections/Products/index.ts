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
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateProduct } from './hooks/revalidateProduct'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    // Sales executives can read products for reference while working leads,
    // but only content roles can create or edit them.
    read: authenticatedOrPublished,
    update: adminOrEditor,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    category: true,
    tagline: true,
    shortDescription: true,
    price: true,
    availability: true,
  },
  admin: {
    defaultColumns: ['name', 'category', 'price', 'availability', '_status'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Product name, e.g. "Eparv Sparx City"',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'City Commuter', value: 'city-commuter' },
        { label: 'Foldable', value: 'foldable' },
        { label: 'Off-Road / MTB', value: 'off-road' },
        { label: 'Cargo / Utility', value: 'cargo' },
        { label: 'Kids', value: 'kids' },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short marketing line shown on cards and hero sections.',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 300,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Full description',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'imageUrl',
              type: 'text',
              label: 'Image URL (external)',
              admin: {
                description:
                  'Paste a direct image URL (e.g. from imgbb/Cloudinary) if media upload is not available.',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'altText',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Descriptive alt text for accessibility and SEO.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Pricing & Availability',
          fields: [
            {
              name: 'price',
              type: 'number',
              required: true,
              min: 0,
              admin: {
                description: 'Price in INR (ex-showroom, before state subsidies).',
              },
            },
            {
              name: 'promotionalPrice',
              type: 'number',
              min: 0,
              validate: (
                value: number | null | undefined,
                { siblingData }: { siblingData?: Record<string, unknown> },
              ) => {
                if (value === undefined || value === null) {
                  return true
                }
                const price = siblingData?.price
                if (typeof price === 'number' && value >= price) {
                  return 'Promotional price must be lower than the regular price.'
                }
                return true
              },              admin: {
                description: 'Optional promotional price in INR. Must be lower than the regular price.',
              },
            },
            {
              name: 'availability',
              type: 'select',
              defaultValue: 'in-stock',
              options: [
                { label: 'In Stock', value: 'in-stock' },
                { label: 'Pre-Order', value: 'pre-order' },
                { label: 'Out of Stock', value: 'out-of-stock' },
                { label: 'Discontinued', value: 'discontinued' },
              ],
            },
            {
              name: 'deliveryLocations',
              type: 'array',
              label: 'Eligible delivery locations',
              fields: [
                { name: 'city', type: 'text', required: true },
                { name: 'state', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Specifications',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'batteryCapacity',
                  type: 'text',
                  label: 'Battery capacity (e.g. 36V 7.5Ah)',
                  admin: {
                    description:
                      'Kept as free text so different battery chemistries and configurations can be expressed.',
                  },
                },
                {
                  name: 'motorPower',
                  type: 'text',
                  label: 'Motor power (e.g. 250W BLDC)',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'claimedRangeKm', type: 'number', label: 'Claimed range (km)' },
                { name: 'chargingTimeHours', type: 'number', label: 'Charging time (hours)' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'topSpeedKmh', type: 'number', label: 'Maximum speed (km/h)' },
                { name: 'weightKg', type: 'number', label: 'Weight (kg)' },
              ],
            },
            {
              name: 'warrantyMonths',
              type: 'number',
              label: 'Warranty (months)',
            },
            {
              name: 'additionalSpecifications',
              type: 'array',
              label: 'Additional specifications',
              admin: {
                description:
                  'Products differ — add any further verified specifications as label/value pairs.',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured on homepage',
      defaultValue: false,
      admin: {
        position: 'sidebar',
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
          'Marks every specification and price on this record as unverified placeholder data. The website shows a visible demo-data notice and omits structured-data claims until this is unchecked and real data is supplied.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField({ useAsSlug: 'name' }),
  ],
  hooks: {
    afterChange: [revalidateProduct],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
