import './globals.css';
import type {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Lubna',
  description: 'Boutique féminine & sur-mesure'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground">
        <header className="p-4 border-b flex items-center gap-6">
          <Link href={`/${locale}`} className="font-bold">Lubna</Link>

          <nav className="flex gap-4">
            <Link href={`/${locale}/boutique/sous-vetements`}>Sous-vêtements</Link>
            <Link href={`/${locale}/boutique/petite-fille`}>Petite fille</Link>
            <Link href={`/${locale}/savoir-ressources`}>Savoir & ressources</Link>
          </nav>

          <div className="ml-auto">
            <LanguageSwitcher />
          </div>
        </header>

        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
