import { NextRequest, NextResponse } from 'next/server'
const LOCALES = ['fr','en','ar'] as const
const DEFAULT = 'fr'
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || /\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next()
  }
  const first = pathname.split('/')[1]
  if (LOCALES.includes(first as any)) {
    return NextResponse.next()
  }
  const url = req.nextUrl.clone()
  url.pathname = `/${DEFAULT}${pathname}`
  return NextResponse.redirect(url)
}
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
