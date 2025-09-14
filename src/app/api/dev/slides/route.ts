import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const FALLBACK = [
  { src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772', label:{fr:'Élégance',en:'Elegance',ar:'أناقة'} },
  { src: 'https://images.unsplash.com/photo-1520975693416-35a7baa90b69', label:{fr:'Confort', en:'Comfort', ar:'راحة'} },
  { src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', label:{fr:'Création',en:'Creation',ar:'إبداع'} }
]
function buildUrl(){ const b=process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/,''); return b?`${b}/storage/v1/object/public/assets-public/home-slides/manifest.json`:null }
export async function GET(){
  const url = buildUrl();
  if(!url) return NextResponse.json({ok:true, from:'fallback', count:FALLBACK.length, slides:FALLBACK})
  try{
    const r = await fetch(url,{cache:'no-store'});
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = await r.json();
    const arr = Array.isArray(j)? j : Array.isArray(j?.slides)? j.slides : [];
    if(!arr.length) throw new Error('empty manifest');
    return NextResponse.json({ok:true, from:'manifest', count:arr.length, slides:arr})
  }catch(e:any){
    return NextResponse.json({ok:true, from:'fallback', count:FALLBACK.length, slides:FALLBACK, error:String(e?.message??e)})
  }
}
