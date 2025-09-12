# Lubna Site

Projet Next.js (App Router) avec TypeScript, Tailwind et i18n.

## Démarrer

```bash
npm install
npm run dev
```

## Supabase — Health & Seed (dev)

- **Health**: `GET /api/health/supabase` renvoie les counts de contenu + état des variables d’env.
- **Seed (optionnel)**: `POST /api/dev/seed` — **nécessite** deux secrets (non committés):
  - `SUPABASE_SERVICE_ROLE_KEY`: clé *service role* (seulement côté serveur)
  - `SEED_TOKEN`: jeton simple de protection
  - Appel: `curl -X POST -H "x-seed-token: $SEED_TOKEN" http://localhost:3000/api/dev/seed`

> ⚠️ N’utilise jamais la clé *service role* côté client. Garde-la dans Codespaces Secrets / Vercel.

## Ajouter une langue

1. Créer `src/messages/<code>.json`.
2. Ajouter le code dans `src/i18n/config.ts`.
3. Mettre à jour les traductions dans le fichier JSON.

Le middleware redirige par défaut vers `/fr`.

## Supabase: santé & seed

1) Variables requises (en local/Vercel):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (optionnel, pour seed/admin API **côté serveur uniquement**) `SUPABASE_SERVICE_ROLE_KEY`
   - (optionnel) `SEED_TOKEN` (jeton court pour autoriser `/api/dev/seed`)

2) Vérifier l'état:
```bash
npm run dev
# dans un autre terminal
curl -s http://localhost:3000/api/health/supabase | jq '.' || curl -s http://localhost:3000/api/health/supabase
```

3) Seeder (uniquement si `counts.products` et `counts.resources` sont 0):
```bash
# exporter temporairement les secrets dans le terminal (ne *jamais* committer)
export SUPABASE_SERVICE_ROLE_KEY=***
export SEED_TOKEN=dev-allow
curl -s -X POST "http://localhost:3000/api/dev/seed?token=$SEED_TOKEN" | jq '.' || true
```

4) Vérifier le rendu SSR:
```bash
curl -s http://localhost:3000/fr/boutique/sous-vetements | tr '<>' '\n' | grep -m1 -E "Sous-vêtements|Ensemble|Hijab|Abaya" || true
curl -s http://localhost:3000/en/boutique/underwear | tr '<>' '\n' | grep -m1 -E "Underwear|Pink Comfort" || true
curl -s http://localhost:3000/ar/السوق/الملابس-الداخلية 2>/dev/null || true
```

