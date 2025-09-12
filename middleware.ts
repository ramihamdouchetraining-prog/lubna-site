import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en', 'ar'],
  defaultLocale: 'fr',
  localePrefix: 'always'
});

// Ne pas intercepter les routes /api ni /_next, ni fichiers statiques
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
