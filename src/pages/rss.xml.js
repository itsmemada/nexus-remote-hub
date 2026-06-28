import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  
  // Sort by date descending
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Nexus Remote Hub',
    description: 'Remote work strategies, digital nomad guides, and productivity insights for location-independent professionals.',
    site: context.site || 'https://nexus-remote-hub.vercel.app',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id.replace(/\.md$/, '')}`,
      author: 'Mada <jan@nexus404.pl>',
      categories: post.data.tags || [],
    })),
    customData: `
      <language>en-us</language>
      <copyright>2026 Nexus Remote Hub</copyright>
      <managingEditor>jan@nexus404.pl</managingEditor>
      <webMaster>jan@nexus404.pl</webMaster>
      <image>
        <url>https://nexus-remote-hub.vercel.app/images/og-image.jpg</url>
        <title>Nexus Remote Hub</title>
        <link>https://nexus-remote-hub.vercel.app</link>
      </image>
    `,
  });
}
