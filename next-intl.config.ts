import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(() => ({
  locales: ['fr', 'en', 'ar'],
  defaultLocale: 'fr',
  localePrefix: 'always'
}));
