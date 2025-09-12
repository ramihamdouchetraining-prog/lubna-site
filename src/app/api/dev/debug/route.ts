import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const admin = process.env.ADMIN_TOKEN || process.env.SEED_TOKEN || '';
  const port = process.env.PORT || 'unknown';
  const mask = (v: string) => (v ? `${v.slice(0, 4)}…${v.slice(-4)}` : 'missing');
  return NextResponse.json({
    runtime: process.env.NEXT_RUNTIME || 'node',
    port,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: !!url,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: anon ? `${anon.length} chars` : 'missing',
      SUPABASE_SERVICE_ROLE_KEY: service ? `${service.length} chars` : 'missing',
      ADMIN_OR_SEED_TOKEN: admin ? mask(admin) : 'missing'
    },
    tips: 'Use curl -s http://localhost:<port>/api/dev/debug'
  });
}
