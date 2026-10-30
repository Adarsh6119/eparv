import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  Battery,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  User,
  Zap,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { GUIDES, type GuidePost } from '@/data/guides'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import PageClient from './page.client'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlogIndexPage() {
  const guideList = Object.values(GUIDES)
  const pillarGuide = guideList.find((g) => g.isPillar) || guideList[0]
  const clusterGuides = guideList.filter((g) => g.slug !== pillarGuide.slug)

  // Fetch CMS posts as supplementary articles if present
  let cmsPosts: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    })
    // Filter out posts that already match the 10 typed guides
    const guideSlugs = new Set(guideList.map((g) => g.slug))
    cmsPosts = result.docs.filter((doc) => !guideSlugs.has(doc.slug))
  } catch (e) {
    // ignore
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
        name: 'Knowledge Hub & EV Guides',
        item: `${getServerSideURL()}/blog`,
      },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Eparv Electric Cycles Knowledge Hub & Buyer Guides',
    description:
      'Authoritative guides on electric bicycles in India: CMVR legal regulations, real-world range testing, battery care, and cost comparisons.',
    numberOfItems: guideList.length,
    itemListElement: guideList.map((guide, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Article',
        name: guide.title,
        url: `${getServerSideURL()}/posts/${guide.slug}`,
        description: guide.directAnswer,
        author: {
          '@type': 'Person',
          name: guide.author,
        },
      },
    })),
  }

  return (
    <article className="pb-24 pt-16">
      <PageClient />

      <div className="container max-w-6xl">
        {/* Top Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Knowledge Hub & EV Guides' },
          ]}
        />

        {/* Page Header */}
        <header className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <BookOpen className="size-3.5 text-energy" />
            <span>Official Research &amp; Engineering Hub</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Eparv Knowledge Hub &amp; EV Guides
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg max-w-3xl">
            Authoritative technical guides, battery care tutorials, CMVR legal regulations, and petrol vs EV cost comparisons engineered by the Eparv mobility research team.
          </p>
        </header>

        {/* Featured Pillar Guide Card */}
        {pillarGuide && (
          <section className="mb-14">
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                  <Sparkles className="size-3.5" /> Pillar Knowledge Guide
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
                  <Clock className="size-3.5" /> {pillarGuide.readTimeMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" /> Updated {pillarGuide.lastReviewedDate}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight max-w-4xl">
                <Link
                  href={`/posts/${pillarGuide.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {pillarGuide.title}
                </Link>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                {pillarGuide.directAnswer}
              </p>

              <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="size-3.5 text-primary" />
                  <span className="font-semibold text-foreground">{pillarGuide.author}</span>
                  <span>• {pillarGuide.authorRole}</span>
                </div>

                <Link
                  href={`/posts/${pillarGuide.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <span>Read Full Pillar Guide</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Main Grid of All 10 Research Guides */}
        <section className="mb-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Technical Guides ({guideList.length} In-Depth Articles)
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                All Engineering &amp; Buyer Guides
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Zero fluff • Verified EV specifications &amp; Indian regulations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clusterGuides.map((guide) => (
              <article
                key={guide.slug}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 hover:shadow-md transition-all overflow-hidden"
              >
                {/* Visual Header / Thumbnail Placeholder */}
                <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-primary/10 via-muted to-primary/5 p-5 flex flex-col justify-between border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm border border-border px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                      EV Guide
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                      <Clock className="size-3" /> {guide.readTimeMinutes} min
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-primary">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="size-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Eparv Engineering
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/posts/${guide.slug}`}>
                        {guide.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {guide.directAnswer}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground text-[11px]">
                      By {guide.author}
                    </span>
                    <Link
                      href={`/posts/${guide.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-primary group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Supplementary CMS Posts (if any other posts exist) */}
        {cmsPosts.length > 0 && (
          <section className="mb-16 space-y-6">
            <h2 className="text-xl font-bold text-foreground">
              Additional Community Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cmsPosts.map((post, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-5 space-y-3"
                >
                  <h3 className="text-base font-bold text-foreground">
                    <Link href={`/posts/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h3>
                  {post.meta?.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {post.meta.description}
                    </p>
                  )}
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Links to Hub Pages */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">
            Explore Models &amp; Intent Hubs
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Looking for a Specific Electric Cycle?
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/electric-cycles"
              className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              All 5 Models Comparison →
            </Link>
            <Link
              href="/electric-cycle-under-20000"
              className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Cycles Under ₹20,000 →
            </Link>
            <Link
              href="/electric-cycle-under-25000"
              className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Cycles Under ₹25,000 →
            </Link>
            <Link
              href="/electric-cycle-for-delivery"
              className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              For Delivery Riders →
            </Link>
            <Link
              href="/electric-cycle-in"
              className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Find Dealers in 25 Cities →
            </Link>
          </div>
        </section>
      </div>

      <JsonLd data={breadcrumbsSchema} />
      <JsonLd data={itemListSchema} />
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Eparv Knowledge Hub: Electric Cycle Guides, Battery Care & CMVR Laws',
    description:
      'Comprehensive EV guides on electric cycles in India: CMVR legal rules, real-world battery life, running cost per km calculator, and model comparisons.',
    alternates: {
      canonical: `${getServerSideURL()}/blog`,
    },
    openGraph: mergeOpenGraph({
      title: 'Eparv Knowledge Hub: Electric Cycle Guides & Research',
      description:
        'In-depth engineering research, battery tutorials, and EV laws for Indian electric cycle riders.',
      url: `${getServerSideURL()}/blog`,
    }),
  }
}
