import {NextResponse} from 'next/server';

export const runtime = 'nodejs';

function has(v?: string|null){return !!(v && v.length>0)}

export async function GET(){
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const host = base ? base.replace(/^https?:\/\//,'').replace(/\/+$/, '') : '';
  const manifestUrl = host ? `https://${host}/storage/v1/object/public/assets-public/home-slides/manifest.json` : null;

  let probe: any = null;
  if (manifestUrl) {
    try {
      const r = await fetch(manifestUrl, {cache:'no-store'});
      probe = { ok: r.ok, status: r.status };
    } catch (e:any) {
      probe = { ok:false, error: String(e?.message ?? e) };
    }
  }

  return NextResponse.json({
    env: {
      NEXT_PUBLIC_SUPABASE_URL: has(process.env.NEXT_PUBLIC_SUPABASE_URL),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: has(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      SUPABASE_SERVICE_ROLE_KEY: has(process.env.SUPABASE_SERVICE_ROLE_KEY),
      ADMIN_TOKEN: has(process.env.ADMIN_TOKEN),
      SEED_TOKEN: has(process.env.SEED_TOKEN)
    },
    server: { port: process.env.PORT ?? '3000' },
    manifest: manifestUrl ? { url: manifestUrl, probe } : null
  });
}
