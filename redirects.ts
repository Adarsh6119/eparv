import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all IE browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // The homepage lives at "/" — a CMS page at /home would duplicate it.
  const homeRedirect = {
    destination: '/',
    permanent: true,
    source: '/home',
  }

  // Phase 1 Canonical Fix: 301-redirect any -electric-bike model URL to clean model URL
  const modelElectricBikeRedirects = [
    {
      source: '/electric-cycles/eparv-panther-electric-bike',
      destination: '/electric-cycles/eparv-panther',
      permanent: true,
    },
    {
      source: '/electric-cycles/eparv-visakka-electric-bike',
      destination: '/electric-cycles/eparv-visakka',
      permanent: true,
    },
    {
      source: '/electric-cycles/eparv-visalka-electric-bike',
      destination: '/electric-cycles/eparv-visakka',
      permanent: true,
    },
    {
      source: '/electric-cycles/eparv-visalka',
      destination: '/electric-cycles/eparv-visakka',
      permanent: true,
    },
    {
      source: '/electric-cycles/eparv-lahari-electric-bike',
      destination: '/electric-cycles/eparv-lahari',
      permanent: true,
    },
    {
      source: '/electric-cycles/eparv-savitri-electric-bike',
      destination: '/electric-cycles/eparv-savitri',
      permanent: true,
    },
    {
      source: '/electric-cycles/eparv-satya-electric-bike',
      destination: '/electric-cycles/eparv-satya',
      permanent: true,
    },
  ]

  // Consolidate parallel /electric-cycle-in/:slug URLs into canonical /electric-cycle-in-:slug
  const citySubpathRedirects = [
    {
      source: '/electric-cycle-in/:slug',
      destination: '/electric-cycle-in-:slug',
      permanent: true,
    },
  ]

  // Fix dead links / calculator aliases
  const guideAliases = [
    {
      source: '/posts/electric-cycle-running-cost-calculator',
      destination: '/posts/electric-cycle-running-cost-per-km',
      permanent: true,
    },
  ]

  // Apex domain enforcement for www duplicates (308 Permanent Redirect)
  const wwwRedirects = [
    {
      source: '/:path*',
      has: [
        {
          type: 'host' as const,
          value: 'www.eparvmotors.com',
        },
      ],
      destination: 'https://eparvmotors.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'host' as const,
          value: 'www.eparvingenuity.com',
        },
      ],
      destination: 'https://eparvingenuity.com/:path*',
      permanent: true,
    },
  ]

  return [
    internetExplorerRedirect,
    homeRedirect,
    ...wwwRedirects,
    ...modelElectricBikeRedirects,
    ...citySubpathRedirects,
    ...guideAliases,
  ]
}
