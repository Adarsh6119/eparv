import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  HelpCircle,
  Share2,
  Sparkles,
  User,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DirectAnswer, FaqBlock, RelatedLinks } from '@/components/seo'
import { JsonLd } from '@/components/JsonLd'
import { GUIDES, type GuidePost } from '@/data/guides'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import { PostHero } from '@/heros/PostHero'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const guideSlugs = Object.keys(GUIDES).map((slug) => ({ slug }))

  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
    })

    const payloadSlugs = posts.docs.map(({ slug }) => ({ slug }))
    // Merge without duplicates
    const allSlugs = new Set([...guideSlugs.map((g) => g.slug), ...payloadSlugs.map((p) => p.slug)])
    return Array.from(allSlugs).map((slug) => ({ slug }))
  } catch (e) {
    return guideSlugs
  }
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  if (decodedSlug in GUIDES) {
    const guide = GUIDES[decodedSlug]
    const canonical = `${getServerSideURL()}/posts/${guide.slug}`

    return {
      title: `${guide.title} | Eparv Guide`,
      description: guide.directAnswer,
      keywords: [guide.primaryKeyword, ...guide.secondaryKeywords],
      alternates: {
        canonical,
      },
      openGraph: mergeOpenGraph({
        title: guide.title,
        description: guide.directAnswer,
        url: canonical,
      }),
    }
  }

  // Fallback to Payload Post
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      limit: 1,
      where: { slug: { equals: decodedSlug } },
    })
    const doc = result.docs?.[0]
    if (doc) {
      return {
        title: `${doc.title} | Eparv Blog`,
        description: (doc.meta as any)?.description || '',
        alternates: {
          canonical: `${getServerSideURL()}/posts/${decodedSlug}`,
        },
      }
    }
  } catch (e) {
    // ignore
  }

  return {
    title: 'Article Not Found | Eparv',
  }
}

export default async function GuidePostPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  // 1. Check if slug is in typed GUIDES
  if (decodedSlug in GUIDES) {
    const guide = GUIDES[decodedSlug]
    const siblings = guide.siblingPostSlugs.map((s) => GUIDES[s]).filter(Boolean)

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.directAnswer,
      datePublished: guide.lastReviewedDate,
      dateModified: guide.lastReviewedDate,
      author: {
        '@type': 'Person',
        name: guide.author,
        jobTitle: guide.authorRole,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Eparv Ingenuity Pvt Ltd',
        url: getServerSideURL(),
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${getServerSideURL()}/posts/${guide.slug}`,
      },
    }

    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getServerSideURL(),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Knowledge Hub',
          item: `${getServerSideURL()}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: guide.title,
          item: `${getServerSideURL()}/posts/${guide.slug}`,
        },
      ],
    }

    const relatedLinks = [
      ...siblings.map((sib) => ({
        title: sib.title,
        url: `/posts/${sib.slug}`,
        category: 'guide' as const,
        description: sib.directAnswer.slice(0, 80) + '...',
      })),
      {
        title: 'Explore All Electric Cycles',
        url: '/electric-cycles',
        category: 'model' as const,
        description: 'View full lineup with specs and on-road prices',
      },
      {
        title: 'Book a Free Doorstep Test Ride',
        url: '/book-test-ride',
        category: 'intent' as const,
        description: 'Experience instant electric torque in your city',
      },
    ]

    return (
      <article className="pb-20 pt-16">
        <div className="container max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Knowledge Hub', href: '/blog' },
              { label: guide.title },
            ]}
          />

          {/* Header */}
          <header className="mb-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                <BookOpen className="size-3.5 text-energy" />
                {guide.isPillar ? 'Pillar Knowledge Guide' : 'Technical Research Guide'}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {guide.readTimeMinutes} min read
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              {guide.title}
            </h1>

            {/* Byline / Author metadata */}
            <div className="flex flex-wrap items-center gap-4 pt-2 pb-4 border-b border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <User className="size-3.5 text-primary" />
                <span>{guide.author}</span>
                <span className="text-muted-foreground font-normal">({guide.authorRole})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-muted-foreground" />
                <span>Last Reviewed: {guide.lastReviewedDate}</span>
              </div>
            </div>
          </header>

          {/* Direct Answer Block (Under 60 words, upfront) */}
          <DirectAnswer text={guide.directAnswer} className="my-8" />

          {/* Commercial / Money Page Intent CTAs */}
          {guide.moneyPageLinks.length > 0 && (
            <div className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-foreground">
                Ready to upgrade your daily commute with zero petrol expenses?
              </span>
              <div className="flex items-center gap-2">
                {guide.moneyPageLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
                  >
                    {link.anchor} <ArrowRight className="size-3" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Guide Sections */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 my-10">
            {guide.sections.map((section, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {section.heading}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {/* Guide FAQs with Schema */}
          {guide.faqs.length > 0 && (
            <FaqBlock
              heading="Frequently Asked Questions"
              subheading="Key technical questions answered by our engineering team."
              faqs={guide.faqs}
              id="guide-faq"
            />
          )}

          {/* Sibling Articles & Commercial Links */}
          <RelatedLinks
            heading="Explore Related Guides & Models"
            subheading="Deepen your technical knowledge or compare models in our catalog."
            links={relatedLinks}
          />
        </div>

        <JsonLd data={articleSchema} />
        <JsonLd data={breadcrumbsSchema} />
      </article>
    )
  }

  // 2. Fallback to Payload CMS Post
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      limit: 1,
      where: { slug: { equals: decodedSlug } },
    })

    const post = result.docs?.[0]
    if (post) {
      return (
        <article className="pb-16 pt-16">
          <div className="container max-w-4xl">
            <PostHero post={post as any} />
            <div className="mt-8">
              <RichText data={post.content as any} enableGutter={false} />
            </div>
          </div>
        </article>
      )
    }
  } catch (e) {
    // ignore
  }

  notFound()
}
