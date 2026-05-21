# Despliegue

## Variables

Configura `DATABASE_URL` con una base PostgreSQL compatible, por ejemplo Vercel Postgres, Neon o Supabase.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

## Primera migracion local

```bash
npm run prisma:migrate -- --name init
npm run prisma:generate
npm run prisma db seed
```

## Produccion / Vercel

En Vercel configura `DATABASE_URL` en Environment Variables.

Comandos utiles:

```bash
npm run prisma:deploy
npm run build
```

Si quieres cargar datos iniciales en produccion, ejecuta:

```bash
npm run prisma db seed
```
