import {getTranslations} from 'next-intl/server';
import CustomOrderForm from './Form';

export default async function SurMesurePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'SurMesure'});
  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">{t('title')}</h1>
      <CustomOrderForm />
    </main>
  );
}
