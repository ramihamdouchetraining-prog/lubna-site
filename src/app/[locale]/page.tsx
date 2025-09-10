import {getTranslations} from 'next-intl/server';

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Home'});
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="mt-4">{t('description')}</p>
    </div>
  );
}
