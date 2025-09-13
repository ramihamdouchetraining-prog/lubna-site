import {NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';

// original implementation kept as internal function
async function seedSlidesImpl(request: Request){
  const admin = process.env.ADMIN_TOKEN || process.env.SEED_TOKEN || '';
  const token = request.headers.get('x-admin-token') || request.headers.get('x-seed-token') || '';
  if (!admin || token !== admin) {
    return NextResponse.json({ok:false, error:'unauthorized'}, {status:401});
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !service) {
    return NextResponse.json({ok:false, error:'missing_supabase_env'}, {status:400});
  }

  const supabase = createClient(url, service, {auth:{persistSession:false}});

  const manifest = {
    updatedAt: new Date().toISOString(),
    slides: [
      { src: 'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero1.png', alt: 'Slide 1' },
      { src: 'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero2.png', alt: 'Slide 2' },
      { src: 'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero3.png', alt: 'Slide 3' }
    ]
  };

  const bytes = new TextEncoder().encode(JSON.stringify(manifest, null, 2));
  const path = 'home-slides/manifest.json';

  const { error } = await supabase.storage.from('assets-public').upload(path, bytes, {
    contentType: 'application/json',
    upsert: true
  });
  if (error) return NextResponse.json({ok:false, error: error.message}, {status:500});

  const host = url.replace(/^https?:\/\//,'').replace(/\/+$/, '');
  const publicUrl = `https://${host}/storage/v1/object/public/assets-public/${path}`;
  return NextResponse.json({ok:true, url: publicUrl});
}

/* CODEx_HARDEN_START */
// --- HARDEN: block in production, accept admin or seed token ---
export const runtime = 'nodejs';

function tokenOk(req: Request) {
  const admin = process.env.ADMIN_TOKEN || process.env.SEED_TOKEN;
  const header = req.headers.get('x-admin-token') || req.headers.get('x-seed-token');
  return !!admin && !!header && header === admin;
}

// wrap handler
export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return new Response(JSON.stringify({ error: 'Not available in production' }), { status: 404, headers: { 'content-type': 'application/json' }});
  }
  if (!tokenOk(req)) {
    return new Response(JSON.stringify({ error: 'Unauthorized: missing or invalid x-admin-token / x-seed-token' }), { status: 401, headers: { 'content-type': 'application/json' }});
  }
  return seedSlidesImpl(req);
}
/* CODEx_HARDEN_END */
