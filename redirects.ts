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

  // Legacy template blog URLs → Eparv blog (301)
  const postsToBlog = {
    destination: '/blog/:slug*',
    permanent: true,
    source: '/posts/:slug*',
  }

  // The homepage lives at "/" — a CMS page at /home would duplicate it.
  const homeRedirect = {
    destination: '/',
    permanent: true,
    source: '/home',
  }

  return [internetExplorerRedirect, postsToBlog, homeRedirect]
}
