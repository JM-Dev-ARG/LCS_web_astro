import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';


import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  output: 'server',

  integrations: [tailwind(), react(
    {
      compat: true
    }
  ), sitemap()],

  site: 'https://lcs-astro.netlify.app/',
  adapter: netlify(),
});