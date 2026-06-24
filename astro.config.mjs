// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nexus404.pl',
  base: '/',
  trailingSlash: 'ignore',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
      configFile: './tailwind.config.mjs',
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    syntaxHighlight: 'shiki',
    gfm: true,
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
