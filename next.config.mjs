import createNextIntlPlugin from 'next-intl/plugin';

// next-intl: point to the request config used at runtime
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'epefjqrxjbpcasygwywh.supabase.co'}
    ]
  },
  experimental: {
    optimizePackageImports: ['next-intl']
  }
  // i18n & other config already present
};

export default withNextIntl(baseConfig);
