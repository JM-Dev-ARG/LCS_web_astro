import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';



import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  integrations: [tailwind(), react(
    {
      compat: true
    }
  ), sitemap()],
  site: 'https://lcs-astro.netlify.app/',
  adapter: cloudflare()
});