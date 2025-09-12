import type { MetadataRoute } from 'next';
import { fetchProductSkus } from '@/lib/api/catalog';
import { fetchResourceSlugs } from '@/lib/api/resources';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['fr','en','ar'];
  const staticRoutes = ['', '/boutique/sous-vetements', '/boutique/petite-fille', '/savoir-ressources'];

  const items: MetadataRoute.Sitemap = [];
  for (const path of staticRoutes) {
    for (const locale of locales) {
      const url = `${BASE}/${locale}${path}`.replace(/\/+$/, '');
      items.push({ url, changefreq: 'daily', priority: path ? 0.7 : 1.0, alternates: { languages: { fr: `${BASE}/fr${path}`, en: `${BASE}/en${path}`, ar: `${BASE}/ar${path}` } } });
    }
  }

  try {
    const [skus, rslugs] = await Promise.all([fetchProductSkus(), fetchResourceSlugs()]);
    for (const sku of skus) {
      items.push({ url: `${BASE}/fr/p/${sku}`, priority: 0.6, changefreq: 'daily', alternates: { languages: { fr: `${BASE}/fr/p/${sku}`, en: `${BASE}/en/p/${sku}`, ar: `${BASE}/ar/p/${sku}` } } });
    }
    for (const slug of rslugs) {
      items.push({ url: `${BASE}/fr/r/${slug}`, priority: 0.5, changefreq: 'weekly', alternates: { languages: { fr: `${BASE}/fr/r/${slug}`, en: `${BASE}/en/r/${slug}`, ar: `${BASE}/ar/r/${slug}` } } });
    }
  } catch (_) {
    // ignore when supabase env is missing
  }

  return items;
}
