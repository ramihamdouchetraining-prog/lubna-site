import {getTranslations, setRequestLocale} from 'next-intl/server';
import {getProductsLocalized} from '@/lib/api/catalog';
import {ProductCard} from '@/components/ProductCard';

export const revalidate = 0;

export default async function UnderwearPage({params}:{params: Promise<{locale:'fr'|'en'|'ar'}>}){
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('categories');
  const products = await getProductsLocalized(locale, {category_slug: 'sous-vetements'}).catch(()=>[]);
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-heading">{t('underwear')}</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (<ProductCard key={p.id} p={p as any} />))}
      </div>
    </main>
  );
}
