import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import Carousel from './Carousel';

const FALLBACK_SLIDES = [
  {src:'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero1.png', alt:'Hero 1'},
  {src:'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero2.png', alt:'Hero 2'},
  {src:'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero3.png', alt:'Hero 3'}
];

export default function Hero(){
  const t = useTranslations('Home');
  const locale = useLocale();
  const isRTL = locale==='ar';

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className={`rounded-3xl border p-6 md:p-10 bg-gradient-to-br from-primary/10 to-secondary/10 ${isRTL? 'text-right' : ''}`}>
        <p className="font-heading text-3xl md:text-4xl">{t('title')}</p>
        <p className="mt-2 text-muted-foreground md:text-lg">{t('tagline')}</p>
        <div className="mt-5 flex flex-wrap gap-3" dir={isRTL? 'rtl':'ltr'}>
          <Link href={`/${locale}/boutique/sous-vetements`} className="rounded-xl bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 transition animate-gentle-bounce">{t('ctaUnderwear')}</Link>
          <Link href={`/${locale}/savoir-ressources`} className="rounded-xl border px-4 py-2 hover:bg-accent/50 transition">{t('ctaKnowledge')}</Link>
        </div>
        <div className="mt-6">
          <Carousel slides={FALLBACK_SLIDES} />
        </div>
      </div>
    </section>
  );
}
