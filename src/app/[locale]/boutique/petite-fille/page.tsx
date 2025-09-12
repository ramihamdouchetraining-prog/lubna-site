import { getProductsLocalized } from '@/lib/api/catalog';
import { getTranslations } from 'next-intl/server';
import { ProductCard } from '@/components/ProductCard';

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations('categories');
  const list = await getProductsLocalized(locale, 'petite-fille');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="space-y-6" dir={dir}>
      <h1 className="text-2xl font-bold">{t('girls')}</h1>
      {list.length === 0 ? (
        <p className="text-muted-foreground">No items yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.sku} locale={locale} sku={p.sku} name={p.t?.name || p.sku} price_cents={p.price_cents} currency={p.currency} image={p.media?.cover || null} />
          ))}
        </div>
      )}
    </div>
  );
}
