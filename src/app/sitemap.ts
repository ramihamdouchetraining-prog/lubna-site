import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ['', ''],
    ['/boutique/sous-vetements', ''],
    ['/boutique/petite-fille', ''],
    ['/savoir-ressources', '']
  ];
  const locales = ['fr','en','ar'];

  const items: MetadataRoute.Sitemap = [];
  for (const [path] of routes) {
    for (const locale of locales) {
      const url = `${BASE}/${locale}${path}`.replace(/\/+$/, '');
      items.push({ url, changefreq: 'daily', priority: path ? 0.7 : 1.0, alternates: { languages: { fr: `${BASE}/fr${path}`, en: `${BASE}/en${path}`, ar: `${BASE}/ar${path}` } } });
    }
  }
  return items;
}
