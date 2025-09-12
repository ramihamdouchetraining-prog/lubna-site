'use client';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';

export default function SiteHeader(){
  const locale = useLocale();
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const links = [
    {href: '/', key: 'home'},
    {href: '/boutique/sous-vetements', key: 'underwear'},
    {href: '/boutique/petite-fille', key: 'girls'},
    {href: '/savoir-ressources', key: 'knowledge'}
  ];
  const isRTL = locale === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center gap-4 p-3" dir={isRTL? 'rtl' : 'ltr'}>
        <Link href={`/${locale}`} className="font-heading text-lg">Lubna</Link>
        <nav className="ml-auto flex items-center gap-4">
          {links.map(n => {
            const href = `/${locale}${n.href === '/' ? '' : n.href}`;
            const active = pathname === href;
            return (
              <Link
                key={n.key}
                href={href}
                className={`px-2 py-1 rounded-md transition-colors ${active ? 'bg-primary/10 text-primary' : 'hover:bg-accent/50'}`}
              >
                {t(n.key)}
              </Link>
            );
          })}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
