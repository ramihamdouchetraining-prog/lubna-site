'use client';
import { useState } from 'react';

export default function SlidesDev() {
  const [token, setToken] = useState('');
  const [out, setOut] = useState('');

  async function seed() {
    setOut('Seeding…');
    const res = await fetch('/api/dev/seed-slides', { method: 'POST', headers: { 'x-admin-token': token } });
    const json = await res.json().catch(() => ({}));
    setOut(JSON.stringify(json, null, 2));
  }

  return (
    <main className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Slides – Dev</h1>
      <p className="text-sm opacity-80">Colle ton token (ADMIN_TOKEN ou SEED_TOKEN), puis clique pour uploader le manifest.</p>
      <input className="border px-2 py-1 w-full rounded" placeholder="x-admin-token" value={token} onChange={(e)=>setToken(e.target.value)} />
      <button className="px-3 py-1.5 rounded bg-black text-white" onClick={seed}>Seed manifest</button>
      <pre className="text-xs bg-neutral-100 dark:bg-neutral-900 p-3 rounded whitespace-pre-wrap">{out}</pre>
    </main>
  );
}
