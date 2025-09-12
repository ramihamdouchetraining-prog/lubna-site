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
npm run dev

