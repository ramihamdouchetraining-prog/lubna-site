import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Charge les messages selon la locale courante
  return {
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});

