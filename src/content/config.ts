import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    readingTime: z.number().optional(),
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional(),
  }),
});

export const collections = { blog };
