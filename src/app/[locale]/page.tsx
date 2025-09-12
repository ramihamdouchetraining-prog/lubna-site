import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="mt-2">{t('tagline')}</p>
    </main>
  );
}
