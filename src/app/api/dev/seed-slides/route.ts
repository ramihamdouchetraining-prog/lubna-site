import {NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';
import type {Slide} from '@/lib/slides';
export const runtime = 'nodejs';
export async function POST(req:Request){
  if (process.env.NODE_ENV === 'production'){
    return NextResponse.json({ok:false, error:'forbidden in production'}, {status:403});
  }
  const admin = req.headers.get('x-admin-token') || '';
  const seed = req.headers.get('x-seed-token') || '';
  const allow = (admin && admin === process.env.ADMIN_TOKEN) || (seed && seed === process.env.SEED_TOKEN);
  if(!allow){
    return NextResponse.json({ok:false, error:'unauthorized'}, {status:401});
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url || !service){
    return NextResponse.json({ok:false, error:'missing supabase env'}, {status:400});
  }
  const supabase = createClient(url, service);
  const slides: Slide[] = [
    {src:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', alt:'Slide A'},
    {src:'https://images.unsplash.com/photo-1514996937319-344454492b37', alt:'Slide B'},
    {src:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb', alt:'Slide C'}
  ];
  const body = new Blob([JSON.stringify(slides, null, 2)], {type:'application/json'});
  const {error} = await supabase.storage.from('assets-public').upload('home-slides/manifest.json', body, {upsert:true, contentType:'application/json'});
  if(error){
    return NextResponse.json({ok:false, error:error.message}, {status:500});
  }
  const manifestUrl = `${url}/storage/v1/object/public/assets-public/home-slides/manifest.json`;
  return NextResponse.json({ok:true, manifestUrl});
}
