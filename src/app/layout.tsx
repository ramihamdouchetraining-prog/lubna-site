import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'Lubna', description: 'Boutique féminine & sur-mesure' }
export const viewport: Viewport = { themeColor: '#000' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  )
}
