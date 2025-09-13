import {NextResponse} from 'next/server';
import {manifestUrl} from '@/lib/slides';
export const runtime = 'nodejs';
export async function GET(){
  const env = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
    anonSet: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceSet: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    adminSet: !!process.env.ADMIN_TOKEN,
    seedSet: !!process.env.SEED_TOKEN
  };
  const url = manifestUrl();
  let status: number | null = null;
  let count: number | null = null;
  if(url){
    try{
      const r = await fetch(url, {cache:'no-store'});
      status = r.status;
      if(r.ok){
        const j = await r.json().catch(()=>null);
        if(Array.isArray(j)) count = j.length;
      }
    }catch{}
  }
  return NextResponse.json({ok:true, env, manifestUrl:url, manifestStatus:status, manifestCount:count});
}
