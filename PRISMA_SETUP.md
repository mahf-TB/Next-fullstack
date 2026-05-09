# 📘 Prisma Setup Guide

Ce guide explique comment configurer et utiliser Prisma dans ce projet, aussi bien en développement local qu'en environnement de production (déploiement classique ou hébergement partagé comme Namecheap).

---

## 🧰 Prérequis

- Node.js >= 18
- pnpm >= 8
- Base de données (PostgreSQL, MySQL ou SQLite)
- Variable d'environnement `DATABASE_URL`

---

## 📦 Installation

Installe les dépendances du projet :

```bash
pnpm install
```

Installe `tsx` pour exécuter les scripts TypeScript :

```bash
pnpm add -D tsx
```

---

## ⚙️ Configuration Prisma

### Fichier `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

### Environment variables declared in this file are NOT automatically loaded by Prisma.
- Please add `import "dotenv/config";` to your `prisma.config.ts` file, 
- or use the Prisma CLI with Bun to load environment variables from .env files: https://pris.ly/prisma-config-env-vars.


### Fichier `.env`

A la racine du projet :

```env
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

---

## 🧪 Developpement local

### Generer le client Prisma

```bash
pnpm exec prisma generate
```

### Creer une migration

```bash
pnpm exec prisma migrate dev --name init
```

### Executer le seed

Assure-toi que `package.json` contient :

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Puis :

```bash
pnpm exec prisma db seed
```

---

## 🚀 En production

### Commandes a executer

```bash
pnpm exec prisma generate
pnpm exec prisma migrate deploy
pnpm exec prisma db seed
```

> Toujours utiliser `pnpm exec` en production.

---

## 🌐 Deploiement sur Namecheap (cPanel / Shared Hosting)

### ✅ Prerequis

- Acces SSH active
- Node.js supporte via cPanel
- `tsx` installe dans `node_modules`

### 🛠 Etapes

1. Connexion SSH :

```bash
ssh user@yourdomain.com
```

2. Aller dans le dossier de l'application :

```bash
cd ~/nodejs_apps/ton-app
```

3. Installer les dependances :

```bash
pnpm install
```

4. Configurer les variables d'environnement (via cPanel ou `.env`).

5. Executer les commandes Prisma :

```bash
pnpm exec prisma generate
pnpm exec prisma migrate deploy
pnpm exec prisma db seed
```

---

### ⚠️ Si `tsx` ne fonctionne pas

Compile le seed manuellement :

```bash
pnpm tsc prisma/seed.ts --outDir dist
```

Modifie `prisma.config.ts` :

```ts
seed: "node dist/seed.js"
```

Puis execute :

```bash
node dist/seed.js
```

---

## ✅ Bonnes pratiques

| Environnement | Commande recommandee |
|---------------|-----------------------|
| Developpement | `pnpm exec prisma db seed` |
| Production    | `pnpm exec prisma migrate deploy && pnpm exec prisma db seed` |
| Namecheap     | SSH + `pnpm exec` |
| Docker        | Script de build + entrypoint |

---

## 🧠 Conseils utiles

- Ne jamais utiliser `pnpm dlx` en production.
- Toujours inclure `tsx` dans les devDependencies.
- Compiler le seed en JS si besoin pour eviter les erreurs runtime.

---

## 📬 Support

Pour toute question, ouvrez une issue ou contactez l'equipe technique.

---

© 2026 – Mon Projet Node.js + Prisma
