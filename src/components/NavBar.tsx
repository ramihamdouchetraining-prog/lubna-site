'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {locales} from '@/i18n/config';

export default function NavBar() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('NavBar');
  const locale = useLocale();
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(fr|en|ar)/, '');
  useEffect(() => setMounted(true), []);

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 backdrop-blur dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-700"
      aria-label={t('ariaLabel')}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <div className="flex gap-4">
          <Link href={`/${locale}/`} className="hover:underline">
            {t('home')}
          </Link>
          <Link href={`/${locale}/boutique`} className="hover:underline">
            {t('shop')}
          </Link>
          <Link href={`/${locale}/sur-mesure`} className="hover:underline">
            {t('custom')}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-sm">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${pathWithoutLocale}`}
                className={l === locale ? 'font-semibold underline' : 'hover:underline'}
                aria-label={`Switch language to ${l}`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label={t('toggleTheme')}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {mounted && theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}

