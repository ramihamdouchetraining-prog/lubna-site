# Lubna Site

Projet Next.js (App Router) avec TypeScript, Tailwind et i18n.

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

