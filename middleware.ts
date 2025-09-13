import createMiddleware from 'next-intl/middleware';
import {locales} from './src/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale: 'fr',
  localePrefix: 'always'
});

// IMPORTANT: never match API, Next internals or static files
export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*|favicon.ico).*)'
  ]
};
