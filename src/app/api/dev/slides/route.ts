import {NextResponse} from 'next/server';
import {loadSlides} from '@/lib/slides';
export const runtime = 'nodejs';
export async function GET(){
  if (process.env.NODE_ENV === 'production'){
    return NextResponse.json({ok:false, error:'forbidden in production'}, {status:403});
  }
  const {slides, from, url, status} = await loadSlides();
  return NextResponse.json({ok:true, count:slides.length, from, manifestUrl:url, manifestStatus:status, slides});
}
