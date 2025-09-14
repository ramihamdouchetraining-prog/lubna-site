import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: '**.supabase.co'},
      {protocol: 'https', hostname: 'images.unsplash.com'}
    ]
  },
  transpilePackages: []
};

export default withNextIntl(nextConfig);
