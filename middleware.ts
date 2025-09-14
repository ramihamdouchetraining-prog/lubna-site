// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Locales supportées (aligne avec next.config.mjs)
const LOCALES = ['fr', 'en', 'ar'] as const
const DEFAULT = 'fr'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Ne JAMAIS intercepter ces chemins
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.match(/\.[a-zA-Z0-9]+$/) // fichier statique
  ) {
    return NextResponse.next()
  }

  // Si le chemin commence déjà par une locale supportée -> laisser passer
  const first = pathname.split('/')[1]
  if (LOCALES.includes(first as any)) {
    return NextResponse.next()
  }

  // Sinon, préfixer par la locale par défaut **en conservant le reste du chemin**
  const url = req.nextUrl.clone()
  url.pathname = `/${DEFAULT}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // même logique que ci-dessus, côté matcher
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
