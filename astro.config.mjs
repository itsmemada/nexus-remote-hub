// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://nexus-remote-hub.vercel.app',
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
