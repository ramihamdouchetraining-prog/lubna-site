import type { ReactNode } from 'react'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import SiteHeader from '@/components/SiteHeader'
export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={dir} data-locale={locale}>
        <SiteHeader />
        {children}
      </div>
    </NextIntlClientProvider>
  )
}
