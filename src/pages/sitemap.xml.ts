import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  // Base URL from environment or default
  const baseUrl = import.meta.env.SITE || 'https://nexus-remote-hub.vercel.app';
  
  // Static pages
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/blog', priority: 0.9, changefreq: 'daily' },
    { url: '/about', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' },
    { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
  ];

  // Blog posts
  const blogPages = posts.map((post) => ({
    url: `/blog/${post.id.replace(/\.md$/, '')}`,
    lastmod: post.data.pubDate,
    priority: 0.8,
    changefreq: 'monthly' as const,
  }));

  // Combine all pages
  const allPages = [...staticPages, ...blogPages];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod.toISOString()}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 