import { getCollection, type CollectionEntry } from 'astro:content';

export interface BlogPost {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    tags?: string[];
    featured?: boolean;
    draft?: boolean;
    image?: string | { url: string; alt?: string };
    imageAlt?: string;
    readingTime?: number;
  };
  body: string;
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replaceAll(' ', '-');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
}

export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function filterPublished(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
  return posts.filter(({ data }) => !data.draft);
}

export function sortPosts(
  posts: CollectionEntry<'blog'>[],
  sortBy: 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc' | 'reading-asc' | 'reading-desc'
): CollectionEntry<'blog'>[] {
  const sorted = [...posts];
  sorted.sort((a, b) => {
    const dateA = new Date(a.data.pubDate).getTime();
    const dateB = new Date(b.data.pubDate).getTime();
    const titleA = a.data.title.toLowerCase();
    const titleB = b.data.title.toLowerCase();
    const readingA = calculateReadingTime(a.body);
    const readingB = calculateReadingTime(b.body);

    switch (sortBy) {
      case 'date-asc': return dateA - dateB;
      case 'date-desc': return dateB - dateA;
      case 'title-asc': return titleA.localeCompare(titleB);
      case 'title-desc': return titleB.localeCompare(titleA);
      case 'reading-asc': return readingA - readingB;
      case 'reading-desc': return readingB - readingA;
      default: return dateB - dateA;
    }
  });
  return sorted;
}

export function filterByTag(
  posts: CollectionEntry<'blog'>[],
  tag: string
): CollectionEntry<'blog'>[] {
  const normalizedTag = tag.toLowerCase();
  return posts.filter(post =>
    post.data.tags?.some(t => t.toLowerCase() === normalizedTag)
  );
}

export function getFeaturedPost(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'> | undefined {
  return posts.find(post => post.data.featured === true) || posts[0];
}

export function getAllTags(posts: CollectionEntry<'blog'>[]): string[] {
  return Array.from(new Set(posts.flatMap(post => post.data.tags || [])));
}

export function getPostUrl(post: CollectionEntry<'blog'>, site?: string): string {
  const base = site || 'https://www.nexusremotehub.com';
  const slug = post.id.replace(/\.md$/, '');
  return `${base}/blog/${slug}/`;
}

export function getPostImageUrl(post: CollectionEntry<'blog'>, site?: string): string {
  const base = site || 'https://www.nexusremotehub.com';
  if (typeof post.data.image === 'string') {
    return `${base}${post.data.image}`;
  }
  if (post.data.image?.url) {
    return `${base}${post.data.image.url}`;
  }
  return `${base}/images/og-image.jpg`;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

export function jsonLdArticle(post: CollectionEntry<'blog'>, site?: string): string {
  const SITE = site || 'https://www.nexusremotehub.com';
  const postUrl = getPostUrl(post, SITE);
  const imgUrl = getPostImageUrl(post, SITE);
  const datePublished = post.data.pubDate.toISOString();
  const dateModified = (post.data.updatedDate || post.data.pubDate).toISOString();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: escapeHtml(post.data.title),
    description: escapeHtml(post.data.description),
    image: imgUrl,
    author: {
      '@type': 'Person',
      name: 'Mada',
      url: 'https://nexus404.pl'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nexus Remote Hub',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/images/og-image.jpg`
      }
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    }
  };

  return JSON.stringify(jsonLd);
}