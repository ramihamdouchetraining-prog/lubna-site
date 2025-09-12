import createNextIntlPlugin from 'next-intl/plugin';

// next-intl: point to the request config used at runtime
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
  {protocol: 'https', hostname: 'epefjqrxjbpcasygwywh.supabase.co', pathname: '/storage/v1/object/public/**'},
      {
        protocol: 'https',
        hostname: 'epefjqrxjbpcasygwywh.supabase.co'
      }
    ]
  }
};

export default withNextIntl(baseConfig);
