'use client';
import {usePathname, useRouter} from 'next/navigation';
import {useLocale} from 'next-intl';

const LOCALES = [
  {code: 'fr', label: 'FR'},
  {code: 'en', label: 'EN'},
  {code: 'ar', label: 'AR'}
] as const;

export function LanguageSwitcher() {
  const pathname = usePathname() || '/fr';
  const router = useRouter();
  const current = useLocale();
  const pathNoLocale = pathname.replace(/^\/(fr|en|ar)(?=\/|$)/, '');
  const go = (l: string) => router.push(`/${l}${pathNoLocale}`);
  return (
    <div className="flex gap-2">
      {LOCALES.map(({code, label}) => (
        <button
          key={code}
          onClick={() => go(code)}
          className={`px-2 py-1 rounded border ${code === current ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
          aria-current={code === current}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
