import {NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(request: Request){
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
