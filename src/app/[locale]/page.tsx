import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import Hero from '@/components/Hero';
import Link from 'next/link';

export async function generateMetadata({params}:{params: Promise<{locale:string}>}): Promise<Metadata>{
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'SEO'});
  const title = t('home.title');
  const description = t('home.description');
  const url = `https://example.com/${locale}`; // remplace si tu as un domaine
  return {
    title,
    description,
    openGraph: { title, description, url, type: 'website' },
    other: { 'script:type:application/ld+json': JSON.stringify({
      '@context': 'https://schema.org', '@type': 'WebSite', name: title, url
    })}
  };
}

export default async function Home({params}:{params: Promise<{locale:string}>}){
  const HeroSlides = (await import('@/src/components/HeroSlides')).default;
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');
  const c = await getTranslations('Categories');
  return (
    <>
      <HeroSlides />
      <main>
        <Hero />
        <section className="mx-auto max-w-6xl p-6">
          <h2 className="font-heading text-2xl mb-4">{t('featuredTitle')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card href="/boutique/sous-vetements" title={c('underwear')} subtitle={c('underwearSub')} />
            <Card href="/boutique/petite-fille" title={c('girls')} subtitle={c('girlsSub')} />
          </div>
        </section>
      </main>
    </>
  );
}

function Card({href, title, subtitle}:{href:string; title:string; subtitle:string}){
  return (
    <Link href={href} className="rounded-2xl border p-5 hover:shadow-lg transition shadow-sm bg-card/90">
      <p className="text-lg font-medium">{title}</p>
      <p className="text-muted-foreground mt-1">{subtitle}</p>
    </Link>
  );
}
