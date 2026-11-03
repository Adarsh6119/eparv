import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { COMPANY_DETAILS } from '@/data/company'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  const siteUrl = getServerSideURL()
  const gscToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="48x48" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.png" rel="icon" type="image/png" sizes="48x48" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {/* Spacer for fixed header height */}
          <div className="h-16 md:h-18" />
          {children}
          <Footer />
        </Providers>
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: COMPANY_DETAILS.tradeName,
              legalName: COMPANY_DETAILS.legalName,
              taxID: COMPANY_DETAILS.gstin,
              foundingDate: COMPANY_DETAILS.foundedDate,
              url: siteUrl,
              description:
                'EPARV INGENUITY PRIVATE LIMITED designs and builds high-torque 250W electric cycles for Indian urban commutes and delivery fleets.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: `${COMPANY_DETAILS.registeredAddress.line1}, ${COMPANY_DETAILS.registeredAddress.line2}`,
                addressLocality: COMPANY_DETAILS.registeredAddress.city,
                addressRegion: COMPANY_DETAILS.registeredAddress.state,
                postalCode: COMPANY_DETAILS.registeredAddress.pincode,
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: COMPANY_DETAILS.contact.phoneFormatted,
                contactType: 'customer service',
                email: COMPANY_DETAILS.contact.email,
              },
            }).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN,
        },
      }
    : {}),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
