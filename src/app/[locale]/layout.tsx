import './globals.css';
import type {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import type {Metadata} from 'next';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';

export const metadata: Metadata = {
  title: 'Lubna',
  description: 'Boutique féminine & sur-mesure'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  // Messages for this request (provided by next-intl plugin + src/i18n/request.ts)
  const messages = await getMessages();
  // Server translations for header/nav
  const tNav = await getTranslations('Nav');

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-dvh">
        <NextIntlClientProvider messages={messages}>
          <header className="p-4 border-b sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center gap-6">
            <Link href={`/${locale}`} className="flex items-center gap-2 font-bold">
              {/* Logo depuis Supabase public */}
              <img src="https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/logo_lubna.png" alt={tNav('brand')} className="h-6 w-auto" />
              <span>{tNav('brand')}</span>
            </Link>
            <nav className="flex gap-4">
              <Link href={`/${locale}/boutique/sous-vetements`}>{tNav('underwear')}</Link>
              <Link href={`/${locale}/boutique/petite-fille`}>{tNav('girls')}</Link>
              <Link href={`/${locale}/savoir-ressources`}>{tNav('knowledge')}</Link>
            </nav>
            <div className="ml-auto">
              <LanguageSwitcher />
            </div>
          </header>

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
