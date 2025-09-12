import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale, requestLocale}) => {
  // Fallback ultra sûr
  let l = (locale || (await requestLocale) || 'fr') as 'fr' | 'en' | 'ar';
  try {
    const messages = (await import(`../messages/${l}.json`)).default;
    return {locale: l, messages};
  } catch (e) {
    const messages = (await import('../messages/fr.json')).default;
    return {locale: 'fr', messages};
  }
});
