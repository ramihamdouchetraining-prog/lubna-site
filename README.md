# Lubna Site

Projet Next.js (App Router) avec TypeScript, Tailwind et i18n.

## Slides Hero (Supabase manifest)

### Variables d’env (racine `.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=https://epefjqrxjbpcasygwywh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=…
SUPABASE_SERVICE_ROLE_KEY=…   # ne pas commit
ADMIN_TOKEN=dev-admin-ok       # ou garde SEED_TOKEN
SEED_TOKEN=dev-seed-ok
```

### Démarrer en 3001
```
npm run dev:3001
```
Regarde la bannière: `Local: http://localhost:3001`.

### Debug rapide
```
curl -s http://localhost:3001/api/dev/debug | jq .
```

### Seed des slides
```
curl -s -X POST -H "x-admin-token: $ADMIN_TOKEN" http://localhost:3001/api/dev/seed-slides | jq .
```

### Vérifier le manifest public
```
curl -s "$NEXT_PUBLIC_SUPABASE_URL/storage/v1/object/public/assets-public/home-slides/manifest.json" | jq .
```

### Slides Dev Panel

Run on port 3001 and open the locale page:

```bash
pkill -f "next dev" 2>/dev/null || true
npm run -s dev:3001 & echo $! > .pid && sleep 5
open http://localhost:3001/fr/dev/slides # or /en/dev/slides, /ar/dev/slides
```

Seed with a token (matches `ADMIN_TOKEN` or `SEED_TOKEN` in `.env.local`):

```bash
curl -s -X POST -H "x-admin-token: $ADMIN_TOKEN" http://localhost:3001/api/dev/seed-slides
# or
curl -s -X POST -H "x-seed-token: $SEED_TOKEN"  http://localhost:3001/api/dev/seed-slides
```

Probe public manifest (should be 200 OK after seeding & bucket public):

```bash
curl -I "${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets-public/home-slides/manifest.json" | head -n 5
```

> **Production safety**: `/api/dev/*` routes return 404 in production.

## Démarrer

```bash
npm install
npm run dev
```

## Ajouter une langue

1. Créer `src/messages/<code>.json`.
2. Ajouter le code dans `src/i18n/config.ts`.
3. Mettre à jour les traductions dans le fichier JSON.

Le middleware redirige par défaut vers `/fr`.
npm run dev

## Dev checks (health & seed)

1. Démarrer le dev

```bash
nvm use 20 || true
npm install
npm run dev
```

2. Santé Supabase

```bash
curl -s http://localhost:3000/api/health/supabase | jq .
```

3. Seed sécurisé (nécessite SUPABASE_SERVICE_ROLE_KEY et SEED_TOKEN)

```bash
curl -X POST -H "x-seed-token: $SEED_TOKEN" http://localhost:3000/api/dev/seed
```

## Home 5XL — Notes rapides
- Le **Hero** s’appuie sur des images publiques Supabase (fallback). Si tu changes de bucket/domaine, ajuste `next.config.mjs` (images.remotePatterns).
- **SEO**: les titres/desc sont dans `src/messages/*` (namespace `SEO.home`).
- **Thème**: le toggle écrit `lubna-theme` dans `localStorage` et applique `.dark` sur `<html>`.
