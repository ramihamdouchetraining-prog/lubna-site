import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchResourceBySlug } from '@/lib/api/resources';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const r = await fetchResourceBySlug(locale, slug);
  const tseo = await getTranslations({ locale, namespace: 'seo' });
  const title = r?.t?.title ? tseo('resource.title', { 0: r.t.title }) : slug;
  const description = r?.t?.excerpt ? tseo('resource.description', { 0: r.t.excerpt }) : undefined;
  return {
    title,
    description,
    alternates: { languages: { fr: `/fr/r/${slug}`, en: `/en/r/${slug}`, ar: `/ar/r/${slug}` } }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const t = await getTranslations('resource');
  const r = await fetchResourceBySlug(locale, slug);
  if (!r) return <div className="p-8" dir={dir}><p>{t('notFound')}</p></div>;
  return (
    <section className="space-y-4 p-6" dir={dir}>
      <h1 className="text-2xl font-semibold">{r.t?.title || slug}</h1>
      {r.t?.excerpt && <p className="text-muted-foreground">{r.t.excerpt}</p>}
      {r.media?.pdf && (
        <a className="inline-block rounded-md border px-4 py-2 hover:bg-accent" href={r.media.pdf} target="_blank" rel="noopener">
          {t('download')}
        </a>
      )}
      <div>
        <Link className="text-sm opacity-80" href={`/${locale}/savoir-ressources`}>{t('back')}</Link>
      </div>
    </section>
  );
}
