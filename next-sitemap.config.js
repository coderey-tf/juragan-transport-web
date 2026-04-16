/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://juraganrentalsurabaya.com", // domain utama
  generateRobotsTxt: true, // otomatis bikin robots.txt
  sitemapSize: 5000, // optional, jumlah URL per sitemap file
  changefreq: "daily", // optional
  priority: 0.7, // optional
  exclude: ['/dashboard', '/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/dashboard/*'],
      },
    ],
  },
};
