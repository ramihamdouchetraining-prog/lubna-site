"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

type Slide = { src: string; label?: { fr?: string; en?: string; ar?: string } }

type Payload = { ok: boolean; count: number; from: 'manifest'|'fallback'; slides: Slide[] }

export default function DevSlidesPage() {
  const { locale } = useParams() as { locale: 'fr'|'en'|'ar' }
  const [data, setData] = useState<Payload | null>(null)
  const [err, setErr] = useState<string | null>(null)
  useEffect(() => {
    fetch('/api/dev/slides', { cache: 'no-store' })
      .then(r => r.json())
      .then((j:Payload) => setData(j))
      .catch(e => setErr(String(e)))
  }, [])
  if (err) return <div className="p-6">Erreur: {err}</div>
  if (!data) return <div className="p-6">Chargement…</div>
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Slides: {data.from} ({data.count})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.slides.map((s, i) => (
          <figure key={i} className="rounded-xl overflow-hidden border">
            <Image src={s.src} alt={s.label?.[locale] ?? `slide-${i}`} width={800} height={600} unoptimized className="w-full h-auto object-cover" />
            {s.label && <figcaption className="p-2 text-sm opacity-80">{s.label[locale] ?? s.label.fr ?? s.label.en ?? s.label.ar}</figcaption>}
          </figure>
        ))}
      </div>
    </main>
  )
}
