import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProductBySku } from '@/lib/api/catalog';
import { Price } from '@/components/Price';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; sku: string }> }): Promise<Metadata> {
  const { locale, sku } = await params;
  const tseo = await getTranslations({ locale, namespace: 'seo' });
  const p = await fetchProductBySku(locale, sku);
  const title = p?.t?.name ? tseo('product.title', { 0: p.t.name }) : sku;
  const description = p?.t?.subtitle || tseo('product.description', { 0: p?.t?.name || sku });
  const ogImg = p?.images?.[0]?.storage_path || undefined;
  const url = `/${locale}/p/${sku}`;
  const metadata: Metadata = {
    title,
    description,
    alternates: { languages: { fr: `/fr/p/${sku}`, en: `/en/p/${sku}`, ar: `/ar/p/${sku}` } },
    openGraph: { title, description, images: ogImg ? [{ url: ogImg }] : undefined, url },
    other: {
      'script:type': 'application/ld+json',
      'script:content': JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Product',
        name: p?.t?.name || sku, description: p?.t?.description || '',
        image: ogImg ? [ogImg] : [],
        offers: { '@type': 'Offer', price: (p?.price_cents || 0) / 100, priceCurrency: p?.currency || 'EUR', availability: 'https://schema.org/InStock' }
      })
    }
  };
  return metadata;
}

export default async function Page({ params }: { params: Promise<{ locale: string; sku: string }> }) {
  const { locale, sku } = await params;
  const t = await getTranslations('product');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const p = await fetchProductBySku(locale, sku);
  if (!p) return <div className="p-8" dir={dir}><p>{t('notFound')}</p></div>;

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2" dir={dir}>
      <div className="space-y-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
          {p.images?.[0]?.storage_path && (
            <Image src={p.images[0].storage_path} alt={p.t?.name || p.sku} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          )}
        </div>
        {/* miniatures */}
        <div className="grid grid-cols-5 gap-2">
          {p.images?.slice(1,6).map((m:any, i:number) => (
            <div key={i} className="relative aspect-square w-full overflow-hidden rounded bg-muted">
              <Image src={m.storage_path} alt={`thumb-${i}`} fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{p.t?.name || p.sku}</h1>
        <div className="text-lg"><Price cents={p.price_cents} currency={p.currency} /></div>
        {p.t?.subtitle && <p className="text-muted-foreground">{p.t.subtitle}</p>}
        {p.t?.description && <p className="whitespace-pre-wrap leading-relaxed">{p.t.description}</p>}
        <div>
          <Link href={`/${locale}/boutique/sous-vetements`} className="rounded-md border px-4 py-2 hover:bg-accent">{t('back')}</Link>
        </div>
      </div>
    </div>
  );
}
