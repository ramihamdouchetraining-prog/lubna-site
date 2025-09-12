import {getTranslations} from 'next-intl/server';
import {getResources} from '@/lib/api/resources';
import {ResourceCard} from '@/components/ResourceCard';

export const revalidate = 0;

export default async function KnowledgePage({params}:{params: Promise<{locale:'fr'|'en'|'ar'}>}){
  const {locale} = await params;
  const t = await getTranslations('Knowledge');
  const rows = await getResources(locale).catch(()=>[]);
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-heading">{t('title')}</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(r => (<ResourceCard key={r.id} r={r as any} />))}
      </div>
    </main>
  );
}
