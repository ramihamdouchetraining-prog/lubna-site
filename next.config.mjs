const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host : null;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...(supabaseHost ? [{protocol: 'https', hostname: supabaseHost}] : []),
      {protocol: 'https', hostname: 'images.unsplash.com'}
    ]
  },
  transpilePackages: []
};
export default nextConfig;
