// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.nexus404.pl',
  base: '/',
  trailingSlash: 'ignore',
  output: 'static',
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
