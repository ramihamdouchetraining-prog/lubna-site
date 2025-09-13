'use client';
import {useState} from 'react';
export default function DevSlides(){
  const [token, setToken] = useState('');
  const [log, setLog] = useState<string>('');
  async function call(path:string, init?:RequestInit){
    const res = await fetch(path, {cache:'no-store', ...(init||{})});
    const text = await res.text();
    setLog(prev => `${prev}\n\n=== ${path} (${res.status}) ===\n${text}`);
  }
  return (
    <div style={{padding:24, maxWidth:900, margin:'0 auto', fontFamily:'system-ui'}}>
      <h1>Slides Dev Panel</h1>
      <p>Dev only. Requires tokens from .env.local.</p>
      <label>Token (ADMIN_TOKEN or SEED_TOKEN): <input value={token} onChange={e=>setToken(e.target.value)} style={{width:'60%'}} /></label>
      <div style={{display:'flex', gap:12, marginTop:12, flexWrap:'wrap'}}>
        <button onClick={()=>call('/api/dev/debug')}>Debug</button>
        <button onClick={()=>call('/api/dev/slides')}>Preview slides</button>
        <button onClick={()=>call('/api/dev/seed-slides',{method:'POST', headers:{'x-admin-token':token}})}>Seed (admin)</button>
        <button onClick={()=>call('/api/dev/seed-slides',{method:'POST', headers:{'x-seed-token':token}})}>Seed (seed)</button>
        <button onClick={async()=>{
          const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
          if(!base){ setLog(p=>p+'\nNo NEXT_PUBLIC_SUPABASE_URL'); return; }
          const u = `${base}/storage/v1/object/public/assets-public/home-slides/manifest.json`;
          await call(u);
        }}>Probe public manifest</button>
      </div>
      <pre style={{whiteSpace:'pre-wrap', background:'#111', color:'#0f0', padding:12, marginTop:16, borderRadius:8}}>{log||'…'}</pre>
    </div>
  );
}
