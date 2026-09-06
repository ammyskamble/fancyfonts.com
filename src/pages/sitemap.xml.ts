// src/pages/sitemap.xml.ts - Serves the canonical sitemap.xml with proper XML content-type
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const xmlContent = fs.readFileSync(filePath, 'utf-8');

  return new Response(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Robots-Tag': 'noindex'
    }
  });
};
