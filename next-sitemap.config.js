/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://trustpadi.com', 
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/dashboard'], 
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/dashboard'] },
    ],
  },
};
