import 'server-only';
import {headers} from 'next/headers';
import {Suspense} from 'react';

async function getHealth(baseUrl:string){
  const res = await fetch(`${baseUrl}/api/health/supabase`, { cache: 'no-store' });
  if(!res.ok) return {ok:false, status: res.status};
  return res.json();
}

function pretty(v:any){
  return <pre className="text-xs md:text-sm whitespace-pre-wrap break-words bg-muted p-3 rounded-lg overflow-auto">{JSON.stringify(v, null, 2)}</pre>;
}

export default async function DevHealth(){
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000';
  const proto = (h.get('x-forwarded-proto') || 'http');
  const baseUrl = `${proto}://${host}`;
  const data = await getHealth(baseUrl);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Supabase Health</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">Configuration</h2>
          {pretty(data?.env ?? {ok:false})}
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-medium mb-2">Probes</h2>
          {pretty(data?.probes ?? {ok:false})}
        </div>
      </div>

      <SeedBox baseUrl={baseUrl} />
    </main>
  );
}

function SeedBox({baseUrl}:{baseUrl:string}){
  return (
    <form className="rounded-xl border p-4 space-y-3" action={`${baseUrl}/api/dev/seed`} method="post" onSubmit={(e)=>{
      const token = (e.currentTarget.querySelector('#seedToken') as HTMLInputElement)?.value;
      if(!token) { alert('SEED_TOKEN requis'); e.preventDefault(); }
    }}>
      <h2 className="font-medium">Seed de démonstration</h2>
      <p className="text-sm text-muted-foreground">Nécessite <code>SUPABASE_SERVICE_ROLE_KEY</code> côté serveur et l’entête <code>x-seed-token</code> correspondant.</p>
      <input id="seedToken" name="seedToken" placeholder="dev-seed-ok" className="w-full md:w-64 rounded-md border p-2" />
      <button
        formAction={`${baseUrl}/api/dev/seed`}
        formMethod="post"
        onClick={(e)=>{
          const form = (e.currentTarget as HTMLButtonElement).form;
          if(form){
            const token = (form.querySelector('#seedToken') as HTMLInputElement)?.value || '';
            form.setAttribute('data-token', token);
          }
        }}
        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-primary-foreground hover:opacity-90"
      >
        Lancer le seed
      </button>
      <p className="text-xs text-muted-foreground">Sur le serveur, l’API lira l’en-tête <code>x-seed-token</code>. Depuis cette page, utilise plutôt <code>curl</code> si besoin.</p>
    </form>
  );
}
