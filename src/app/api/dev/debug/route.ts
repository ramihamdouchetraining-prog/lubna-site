import {NextResponse} from 'next/server';
export const runtime = 'nodejs';
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const admin = process.env.ADMIN_TOKEN || process.env.SEED_TOKEN || '';
  const has = (v:string)=> Boolean(v && v.trim().length>10);
  const host = url.replace(/^https?:\/\//,'').replace(/\/$/,'');
  const manifestUrl = url ? `${url}/storage/v1/object/public/assets-public/home-slides/manifest.json` : '';
  let manifestProbe:any = null;
  if (manifestUrl) {
    try { const r = await fetch(manifestUrl,{cache:'no-store'}); manifestProbe = {status:r.status}; } catch(e:any){ manifestProbe = {error:e?.message}; }
  }
  return NextResponse.json({
    ok: true,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: has(url),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: has(anon) ? anon.length : 0,
      SUPABASE_SERVICE_ROLE_KEY: has(svc) ? svc.length : 0,
      ADMIN_TOKEN_or_SEED_TOKEN: has(admin)
    },
    host, manifestUrl, manifestProbe
  });
}
