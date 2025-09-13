export type Slide = { src:string; alt:string; href?:string; label?:string };
const FALLBACK: Slide[] = [
  {src:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', alt:'Look 1'},
  {src:'https://images.unsplash.com/photo-1514996937319-344454492b37', alt:'Look 2'},
  {src:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb', alt:'Look 3'}
];
export function manifestUrl(){
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/assets-public/home-slides/manifest.json` : null;
}
export async function loadSlides(): Promise<{slides:Slide[], from:string, url:string|null, status:number|null}>{
  const url = manifestUrl();
  if(!url) return {slides: FALLBACK, from:'fallback', url, status: null};
  try{
    const res = await fetch(url, {cache:'no-store'});
    if(!res.ok) return {slides: FALLBACK, from:`manifest:${res.status}`, url, status: res.status};
    const data = await res.json().catch(()=>null);
    if(Array.isArray(data) && data.every(x=>typeof x?.src==='string')){
      return {slides:data, from:'manifest', url, status: res.status};
    }
    return {slides:FALLBACK, from:'manifest:bad-json', url, status: res.status};
  }catch{
    return {slides:FALLBACK, from:'fallback:error', url, status: null};
  }
}
