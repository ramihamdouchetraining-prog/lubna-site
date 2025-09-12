'use client';

import {usePathname, useRouter} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';

const LOCALES = ['fr', 'en', 'ar'] as const;

export function LanguageSwitcher() {
  const pathname = usePathname() || '/fr';
  const router = useRouter();
  const current = useLocale();
  const t = useTranslations('Lang');

  // enlève le préfixe /fr|/en|/ar de l’URL courante
  const pathWithoutLocale = pathname.replace(/^\/(fr|en|ar)(?=\/|$)/, '');

  const go = (next: string) => {
    router.push(`/${next}${pathWithoutLocale}`);
  };

  return (
    <div className="flex gap-2">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => go(l)}
          className={`px-2 py-1 rounded border ${
            l === current ? 'bg-black text-white dark:bg-white dark:text-black' : ''
          }`}
          aria-current={l === current}
        >
          {t(l)}
        </button>
      ))}
    </div>
  );
}

