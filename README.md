# Porra Mundial 2026

Aplicacion Next.js/React para gestionar una porra del Mundial 2026: alta de participantes, envio de predicciones, administracion de resultados y clasificacion por puntos.

## Stack

- Next.js 16 y React 19
- Prisma 7 con PostgreSQL
- TypeScript
- jsPDF para justificantes en PDF

## Configuracion

1. Instala dependencias:

```bash
npm install
```

2. Crea `.env.local` a partir de `.env.example`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
ADMIN_PIN="change-me"
```

`ADMIN_PIN` protege las escrituras administrativas de la API. Si no esta definido, las rutas `PUT` quedan abiertas para facilitar desarrollo local.

3. Genera Prisma y aplica migraciones:

```bash
npm run prisma:generate
npm run prisma:migrate
```

## Desarrollo

```bash
npm run dev
```

La app queda disponible en `http://localhost:3000`.

## Scripts

- `npm run dev`: arranca Next en desarrollo.
- `npm run build`: genera Prisma y compila la app.
- `npm run lint`: ejecuta ESLint.
- `npm test`: ejecuta los tests de dominio.
- `npm run prisma:migrate`: crea/aplica migraciones en desarrollo.
- `npm run prisma:deploy`: aplica migraciones en despliegue.

## Notas de seguridad

- No guardes el PIN de administracion en el cliente. El servidor valida `ADMIN_PIN` mediante la cabecera `x-admin-pin`.
- Las rutas de escritura validan la forma basica de los payloads antes de tocar base de datos.
- Las sincronizaciones completas heredadas ya no borran participantes ni predicciones ausentes del payload.

## Estructura relevante

- `src/App.tsx`: interfaz principal.
- `app/api/*/route.ts`: rutas API de Next.
- `src/domain/scoring.ts`: reglas de puntuacion.
- `src/domain/scoring.test.ts`: cobertura de las reglas de puntuacion.
- `prisma/schema.prisma`: modelos de base de datos.
