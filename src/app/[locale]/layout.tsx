import './globals.css';
import type {ReactNode} from 'react';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import Link from 'next/link';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';

export default async function LocaleLayout({
  children,
  params
}: {children: ReactNode; params: Promise<{locale: 'fr' | 'en' | 'ar'}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const tNav = await getTranslations('Nav');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <header className="p-4 border-b flex items-center gap-6">
            <Link href={`/${locale}`} className="font-bold">{tNav('brand')}</Link>
            <nav className="flex gap-4">
              <Link href={`/${locale}/boutique/sous-vetements`}>{tNav('underwear')}</Link>
              <Link href={`/${locale}/boutique/petite-fille`}>{tNav('girls')}</Link>
              <Link href={`/${locale}/savoir-ressources`}>{tNav('knowledge')}</Link>
            </nav>
            <div className="ml-auto"><LanguageSwitcher /></div>
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
