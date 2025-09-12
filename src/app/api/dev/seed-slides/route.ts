import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function mask(v?: string) {
  if (!v) return false;
  return `${v.slice(0, 4)}…${v.slice(-4)}`;
}

export async function POST(req: Request) {
  const adminHeader = req.headers.get('x-admin-token') ?? '';
  const adminEnv = process.env.ADMIN_TOKEN ?? process.env.SEED_TOKEN ?? '';
  if (!adminHeader || adminHeader !== adminEnv) {
    return NextResponse.json({ ok: false, error: 'unauthorized', hint: 'use header x-admin-token' }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) {
    return NextResponse.json({ ok: false, error: 'missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  const supabase = createClient(url, service);
  const manifest = [
    { src: `${url}/storage/v1/object/public/assets-public/hero1.png`, alt: 'Slide 1', label: 'Nouveautés & modestie' },
    { src: `${url}/storage/v1/object/public/assets-public/hero2.png`, alt: 'Slide 2', label: 'Confort au quotidien' },
    { src: `${url}/storage/v1/object/public/assets-public/hero3.png`, alt: 'Slide 3', label: 'Voiles & Abayas' }
  ];

  const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
  const { error } = await supabase
    .storage
    .from('assets-public')
    .upload('home-slides/manifest.json', blob, { upsert: true, contentType: 'application/json' });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, wrote: 'assets-public/home-slides/manifest.json', count: manifest.length, url, admin: mask(adminEnv) });
}
