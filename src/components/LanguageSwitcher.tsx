'use client';
import {usePathname, useRouter} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
const LOCALES = ['fr','en','ar'] as const;
export function LanguageSwitcher(){
  const pathname = usePathname() || '/fr';
  const router = useRouter();
  const current = useLocale();
  const t = useTranslations('Lang');
  const pathNoLocale = pathname.replace(/^\/(fr|en|ar)(?=\/|$)/,'');
  const go = (l:string)=> router.push(`/${l}${pathNoLocale}`);
  return (
    <div className="flex gap-2">
      {LOCALES.map(l=> (
        <button
          key={l}
          onClick={()=>go(l)}
          className={`px-2 py-1 rounded border ${l===current?'bg-black text-white dark:bg-white dark:text-black':''}`}
          aria-current={l===current}
        >
          {t(l)}
        </button>
      ))}
    </div>
  );
}
