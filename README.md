# Prisma Setup & Usage
This document explains how to configure, use, and deploy Prisma in this project with pnpm. For a full French guide (including shared hosting steps), see PRISMA_SETUP.md.

## Prerequisites

- Node.js >= 18
- pnpm >= 8
- Access to a database (PostgreSQL, MySQL, SQLite, etc.)
- A `DATABASE_URL` environment variable

## Installation

Install project dependencies:

```bash
pnpm install
```

Install `tsx` to run TypeScript files:

```bash
pnpm add -D tsx
```

## Prisma Configuration

In `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Create a `.env` file at the project root:

```bash
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
ADMIN_ROLE="ADMIN"
```

## Local Development

1) Generate Prisma Client

```bash
pnpm exec prisma generate
```

2) Create a migration

```bash
pnpm exec prisma migrate dev --name init
```

3) Seed the database

Add this to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Then run:

```bash
pnpm exec prisma db seed
```

## Production (Shared Hosting)

1) Set `DATABASE_URL` in your hosting environment (cPanel env vars or `.env`).
2) Run migrations in a safe environment (CI or a one-time deploy step):

```bash
pnpm exec prisma migrate deploy
```

3) Regenerate client if you deploy built artifacts:

```bash
pnpm exec prisma generate
```

## Common Troubleshooting

- If `prisma db seed` cannot find `tsx`, run `pnpm install` and ensure `tsx` is in devDependencies.
- If `PrismaClient` complains about missing adapter, confirm the generator is `prisma-client-js`.
- If auth fails, double-check `DATABASE_URL` credentials and DB access.