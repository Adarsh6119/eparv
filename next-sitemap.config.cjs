const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  // Exclude the dynamic route catch-alls from the static sitemap — content
  // URLs come from the dedicated collection sitemaps below.
  exclude: ['/*', '/electric-cycles/*', '/dealers/*', '/blog/*', '/compare/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/cities-sitemap.xml`,
      `${SITE_URL}/blog-sitemap.xml`,
      `${SITE_URL}/products-sitemap.xml`,
      `${SITE_URL}/dealers-sitemap.xml`,
    ],
  },
}
