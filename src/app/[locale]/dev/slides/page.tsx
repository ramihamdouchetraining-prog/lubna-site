'use client';
import { useEffect, useMemo, useState } from 'react';

export default function DevSlidesPage() {
  const [token, setToken] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [debug, setDebug] = useState<any>(null);
  const [slides, setSlides] = useState<any[]>([]);
  const [probe, setProbe] = useState<{url?: string; status?: number; ok?: boolean} | null>(null);

  const manifestURL = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (!base) return '';
    try {
      return new URL('storage/v1/object/public/assets-public/home-slides/manifest.json', base).toString();
    } catch {
      return '';
    }
  }, []);

  useEffect(() => {
    // prefill from env-like hint via server debug (no secrets are exposed)
    fetch('/api/dev/debug').then(r => r.ok ? r.json() : null).then(j => setDebug(j)).catch(() => {});
    fetch('/api/dev/slides').then(r => r.ok ? r.json() : null).then(j => setSlides(j?.slides || [])).catch(() => {});
  }, []);

  async function seed(kind: 'admin' | 'seed') {
    setBusy(true);
    try {
      const headerName = kind === 'admin' ? 'x-admin-token' : 'x-seed-token';
      const res = await fetch('/api/dev/seed-slides', { method: 'POST', headers: token ? { [headerName]: token } as any : undefined });
      const j = await res.json().catch(() => ({}));
      alert(res.ok ? `Seed OK: ${j?.publicManifestURL || ''}` : `Seed ERROR: ${j?.error || res.status}`);
      // refresh
      const s = await fetch('/api/dev/slides').then(r => r.json());
      setSlides(s?.slides || []);
    } finally { setBusy(false); }
  }

  async function probePublic() {
    if (!manifestURL) return;
    try {
      const res = await fetch(manifestURL, { cache: 'no-store' });
      setProbe({ url: manifestURL, status: res.status, ok: res.ok });
    } catch {
      setProbe({ url: manifestURL, status: 0, ok: false });
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Dev • Slides</h1>

      <section className="space-y-2">
        <p className="text-sm opacity-80">Server env seen by /api/dev/debug:</p>
        <pre className="text-xs bg-black/5 p-3 rounded overflow-x-auto">{JSON.stringify(debug, null, 2)}</pre>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <input value={token} onChange={e=>setToken(e.target.value)} placeholder="Paste ADMIN_TOKEN or SEED_TOKEN" className="border rounded px-3 py-2 w-full" />
          <button onClick={()=>seed('admin')} disabled={busy} className="px-3 py-2 rounded bg-black text-white">Seed (admin)</button>
          <button onClick={()=>seed('seed')} disabled={busy} className="px-3 py-2 rounded border">Seed (seed)</button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button onClick={probePublic} className="px-3 py-1.5 rounded border">Probe public manifest</button>
          <code className="opacity-70">{manifestURL || '(no URL)'}</code>
          {probe && <span className={probe.ok ? 'text-green-600' : 'text-red-600'}>→ {probe.status}</span>}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Preview</h2>
        {slides.length === 0 && <div className="text-sm opacity-70">No slides (fallback or manifest empty).</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {slides.map((s:any, i:number) => (
            <figure key={i} className="rounded-xl overflow-hidden border">
              <img src={s.src} alt={s.alt || s.label || `slide-${i+1}`} className="w-full h-48 object-cover" />
              {(s.label || s.alt) && <figcaption className="px-3 py-2 text-sm">{s.label || s.alt}</figcaption>}
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
