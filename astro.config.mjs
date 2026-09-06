// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fancyfonts.com',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        if (item.url === 'https://fancyfonts.com/' || item.url === 'https://fancyfonts.com') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/about') || item.url.includes('/contact')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/privacy') || item.url.includes('/terms')) {
          item.priority = 0.6;
          item.changefreq = 'yearly';
        }
        item.lastmod = '2026-09-06';
        return item;
      }
    })
  ]
});
