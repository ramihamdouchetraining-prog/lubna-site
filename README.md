# Lubna Site

Projet Next.js (App Router) avec TypeScript, Tailwind et i18n.

## Development

### Run on port 3001
```
npm run dev:3001
```

### Debug env & manifest
```
curl -s http://localhost:3001/api/dev/debug | jq .
```

### Seed slides (admin or seed token)
```
# admin
curl -s -X POST -H "x-admin-token: $ADMIN_TOKEN" http://localhost:3001/api/dev/seed-slides | jq .
# seed token
curl -s -X POST -H "x-seed-token: $SEED_TOKEN" http://localhost:3001/api/dev/seed-slides | jq .
```

```bash
npm install
npm run dev
```

## Ajouter une langue

1. Créer `src/messages/<code>.json`.
2. Ajouter le code dans `src/i18n/config.ts`.
3. Mettre à jour les traductions dans le fichier JSON.

Le middleware redirige par défaut vers `/fr`.

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
