import { fetchResources } from '@/lib/api/resources';
import { getTranslations } from 'next-intl/server';
import { ResourceCard } from '@/components/ResourceCard';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.knowledge' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { languages: { fr: '/fr/savoir-ressources', en: '/en/savoir-ressources', ar: '/ar/savoir-ressources' } }
  };
}

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ type?: string; topic?: string; q?: string }> }) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations('knowledge');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const list = await fetchResources({
    locale,
    type: (sp?.type as any) || 'all',
    topicSlug: sp?.topic,
    q: sp?.q || undefined,
    limit: 36
  });

  return (
    <section className="space-y-6" dir={dir}>
      <header className="space-y-2">
        <h1 className="text-2xl font-bold" dangerouslySetInnerHTML={{__html: t('title')}} />
        <p className="text-muted-foreground">{t('intro')}</p>
      </header>

      {/* Filtres minimalistes (GET) */}
      <form className="grid items-end gap-3 sm:grid-cols-4" method="get">
        <div className="flex flex-col gap-1">
          <label className="text-sm">{t('filters.type')}</label>
          <select name="type" defaultValue={sp?.type || 'all'} className="rounded-md border bg-background px-3 py-2">
            <option value="all">{t('filters.all')}</option>
            <option value="book">{t('filters.book')}</option>
            <option value="pamphlet">{t('filters.pamphlet')}</option>
            <option value="fatwa">{t('filters.fatwa')}</option>
            <option value="pdf_free">{t('filters.pdf_free')}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">{t('filters.lang')}</label>
          <select name="lang" disabled className="rounded-md border bg-muted px-3 py-2 opacity-60">
            <option>{locale.toUpperCase()}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm">{t('filters.search')}</label>
          <input name="q" defaultValue={sp?.q || ''} placeholder={t('filters.search')} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="sm:col-span-4">
          <button className="rounded-md border px-4 py-2 hover:bg-accent" type="submit">{t('filters.apply')}</button>
        </div>
      </form>

      {list.length === 0 ? (
        <p className="text-muted-foreground">{t('empty')}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(r => (
            <ResourceCard key={r.id} title={r.t?.title || ''} excerpt={r.t?.excerpt || ''} type={r.type} cover={r.media?.cover || undefined} pdf={r.media?.pdf || undefined} dir={dir as any} labels={{ read: t('cta.read'), download: t('cta.download'), details: t('cta.details') }} />
          ))}
        </div>
      )}
    </section>
  );
}
