import "./globals.css";
import type {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import Link from "next/link";
import {LanguageSwitcher} from "@/components/LanguageSwitcher";

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const isRTL = locale === "ar";
  const nav = (messages as any).nav || {};
  const brand = (messages as any).common?.brand || "Lubna";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className={isRTL ? "font-arabic" : ""}>
        <NextIntlClientProvider messages={messages}>
          <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-4">
              <Link href={`/${locale}`} className="text-sm font-semibold">{brand}</Link>
              <nav className="ml-auto flex items-center gap-3 text-sm">
                <Link href={`/${locale}`}>{nav.home ?? "Home"}</Link>
                <Link href={`/${locale}/boutique/sous-vetements`}>{nav.underwear ?? "Underwear"}</Link>
                <Link href={`/${locale}/boutique/petite-fille`}>{nav.girls ?? "Girls"}</Link>
                <Link href={`/${locale}/savoir-ressources`}>{nav.knowledge ?? "Knowledge"}</Link>
                <LanguageSwitcher />
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
