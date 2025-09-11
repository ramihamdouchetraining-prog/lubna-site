import '../globals.css';
import { ReactNode } from 'react';
import { getNavigation } from '@/lib/api/navigation';
import SiteHeader from '@/components/SiteHeader';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale || 'fr';
  const nav = await getNavigation(locale).catch(() => []);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground">
        <SiteHeader nav={nav} locale={locale} />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

