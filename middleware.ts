import createMiddleware from 'next-intl/middleware';
import intlConfig from './next-intl.config';

export default createMiddleware({
  locales: intlConfig.locales,
  defaultLocale: intlConfig.defaultLocale,
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
