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
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { guardPublish } from './hooks/guardPublish'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { validatePageSlug } from './hooks/validatePageSlug'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    // Content roles only — sales executives work leads, never pages.
    create: adminOrEditor,
    delete: adminOrEditor,
    read: authenticatedOrPublished,
    update: adminOrEditor,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'pageType', 'slug', 'approvalStatus', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          label: 'Location & Relations',
          fields: [
            {
              name: 'pageType',
              type: 'select',
              defaultValue: 'standard',
              required: true,
              options: [
                { label: 'Standard Page', value: 'standard' },
                { label: 'City Landing Page', value: 'city' },
                { label: 'State Landing Page', value: 'state' },
                { label: 'Legal Page', value: 'legal' },
                { label: 'Landing Page', value: 'landing' },
              ],
              admin: {
                description:
                  'City and state landing pages power programmatic SEO (e.g. slugs like electric-cycle-in-delhi) and must pass the approval workflow before publishing.',
              },
            },
            {
              type: 'row',
              fields: [
                { name: 'city', type: 'text' },
                { name: 'state', type: 'text' },
              ],
            },
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              admin: {
                description: 'Products shown as available in this location.',
              },
            },
            {
              name: 'relatedDealers',
              type: 'relationship',
              relationTo: 'dealers',
              hasMany: true,
              filterOptions: () => ({
                applicationStatus: { equals: 'verified' },
              }),
            },
            {
              name: 'faqs',
              type: 'array',
              labels: {
                singular: 'FAQ',
                plural: 'FAQs',
              },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
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
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'Canonical URL',
              admin: {
                description:
                  'Absolute URL (https://…) when this page canonicalises elsewhere. Leave empty for self-referencing canonicals.',
              },
              validate: (value: string | null | undefined) => {
                if (!value) {
                  return true
                }
                try {
                  const url = new URL(value)
                  return url.protocol === 'http:' || url.protocol === 'https:'
                    ? true
                    : 'Canonical URLs must use http:// or https://'
                } catch {
                  return 'Enter an absolute URL including https://'
                }
              },
            },
            {
              name: 'noindex',
              type: 'checkbox',
              label: 'Exclude from search engines (noindex)',
              defaultValue: false,
              admin: {
                description:
                  'Removes the page from the XML sitemap and adds a noindex directive. Use for thin or unverified pages.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'approvalStatus',
      type: 'select',
      defaultValue: 'approved',
      admin: {
        position: 'sidebar',
        description:
          'Pages created by CSV imports start as Pending and must be set to Approved by a reviewer before they can be published.',
      },
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'importBatch',
      type: 'relationship',
      relationTo: 'import-batches',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Set automatically when this page was created by a CSV import.',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt, guardPublish],
    beforeValidate: [validatePageSlug],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
