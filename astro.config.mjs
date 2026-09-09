// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fancyfonts-23k.pages.dev',
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
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/500') &&
        !page.includes('/about-us') &&
        !page.includes('/contact-us') &&
        !page.includes('/privacy-policy') &&
        !page.includes('/terms-and-conditions') &&
        !page.includes('/terms-of-service') &&
        !page.includes('/tos'),
      serialize(item) {
        if (item.url === 'https://fancyfonts-23k.pages.dev/' || item.url === 'https://fancyfonts-23k.pages.dev') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/about') || item.url.includes('/contact')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/privacy') || item.url.includes('/terms') || item.url.includes('/disclaimer')) {
          item.priority = 0.6;
          item.changefreq = 'yearly';
        }
        item.lastmod = '2026-09-09';
        return item;
      }
    })
  ]
});
