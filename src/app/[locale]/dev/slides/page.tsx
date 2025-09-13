/* @ts-nocheck */
'use client'
import { useEffect, useState } from 'react'

export default function DevSlidesPage(){
  const [state, setState] = useState({ ok:false, count:0, from:'', slides:[], loading:true })

  useEffect(() => { (async () => {
    try {
      const r = await fetch('/api/dev/slides', { cache: 'no-store' })
      const j = await r.json()
      setState({ ...j, loading: false })
    } catch (e) {
      setState(s => ({ ...s, loading:false, err:String(e) }))
    }
  })() }, [])

  if (state.loading) return <div style={{ padding:24 }}>Chargement…</div>

  return (
    <div style={{ padding:24 }}>
      <h1>Slides Dev Panel</h1>
      <pre>{JSON.stringify({ ok:state.ok, count:state.count, from:state.from }, null, 2)}</pre>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
        {(state.slides || []).map((s:any,i:number) => (
          <figure key={i}>
            <img src={s.src} alt={s.label?.fr || `slide-${i}`} style={{ width:'100%', height:160, objectFit:'cover', borderRadius:12 }} />
            <figcaption style={{ marginTop:8 }}>{s.label?.fr || s.src}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

