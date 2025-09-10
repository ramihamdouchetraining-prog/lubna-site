import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

const categories = [
  {name: 'Hijab', slug: 'hijab'},
  {name: 'Jilbab', slug: 'jilbab'},
  {name: 'Abaya', slug: 'abaya'},
  {name: 'Sitar', slug: 'sitar'},
  {name: 'Khimar', slug: 'khimar'},
  {name: 'Sous-vêtements', slug: 'sous-vetements'}
];

export default async function BoutiquePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Boutique'});
  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">{t('title')}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${locale}/boutique/${cat.slug}`}
            className="rounded-lg border p-4 shadow-sm transition hover:shadow-md bg-white dark:bg-zinc-800"
          >
            <div className="mb-2 h-24 rounded bg-gray-200 dark:bg-zinc-700" />
            <h2 className="text-center font-medium">{cat.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
