import "./globals.css";
import type {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import {LanguageSwitcher} from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";

export default async function LocaleLayout({params, children}: {params: Promise<{locale: string}>, children: ReactNode}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const tNav = await getTranslations('nav');
  const tBrand = await getTranslations('brand');
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={isRTL ? 'font-arabic' : ''}>
        <NextIntlClientProvider messages={messages}>
          <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
              <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold">
                <Image src="https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/logo_lubna.png" alt="logo" width={28} height={28} className="rounded-full" />
                <span>{tBrand('title')}</span>
              </Link>
              <nav className="ml-auto hidden items-center gap-4 sm:flex">
                <Link href={`/${locale}`}>{tNav('home')}</Link>
                <Link href={`/${locale}/boutique/sous-vetements`}>{tNav('underwear')}</Link>
                <Link href={`/${locale}/boutique/petite-fille`}>{tNav('girls')}</Link>
                <Link href={`/${locale}/savoir-ressources`}>{tNav('knowledge')}</Link>
                <LanguageSwitcher />
              </nav>
              <div className="ml-auto sm:hidden">
                <MobileMenu locale={locale} labels={{home:tNav('home'),underwear:tNav('underwear'),girls:tNav('girls'),knowledge:tNav('knowledge')}} />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <footer className="border-t py-8 text-center text-sm text-muted-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
            © {tBrand('title')}
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
