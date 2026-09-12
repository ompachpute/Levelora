# Levelora — Life RPG

Turn real-world tasks into RPG quests. This repository is the **production-ready foundation**: React frontend, Express backend, PostgreSQL connectivity, health checks and deployment configuration. RPG features (quests, XP, levels, streaks, shop) will be added feature-by-feature on top of it.

## Tech Stack

| Layer    | Tech                                                   | Deploy target   |
| -------- | ------------------------------------------------------ | --------------- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router | Vercel |
| Backend  | Node.js, Express, TypeScript                           | Render          |
| Database | PostgreSQL (via `pg` connection pool)                  | Render Postgres |

## Project Structure

```
Levelora/
├── frontend/                  # SPA (deployed to Vercel)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Layout shell + API status card
│   │   ├── config/env.ts      # Central env config (VITE_API_URL)
│   │   ├── hooks/             # useHealthCheck
│   │   ├── lib/api.ts         # Reusable typed API client
│   │   └── pages/             # Landing / Dashboard / 404
│   ├── vercel.json            # SPA rewrites for client-side routing
│   └── .env.example
├── backend/                   # API (deployed to Render)
│   ├── src/
│   │   ├── config/            # env loader + PostgreSQL pool
│   │   ├── controllers/
│   │   ├── middleware/        # CORS allowlist, 404, centralized error handler
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/             # ApiError
│   │   ├── app.ts
│   │   └── server.ts          # Listens on process.env.PORT, binds 0.0.0.0
│   └── .env.example
├── .env.example               # Root reference for all variables
├── .gitignore
└── README.md
```

Frontend and backend are fully independent packages (separate `package.json`) so they can be deployed separately.

## Prerequisites

- Node.js 18+ (Node 20/22 recommended)
- PostgreSQL 14+ (optional at this stage — the API runs and reports `database.connected: false` until `DATABASE_URL` is provided)

## Local Setup

```bash
# 1. Backend
cd backend
cp .env.example .env        # Windows: copy .env.example .env
npm install
npm run dev                 # -> http://localhost:5000

# 2. Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                 # -> http://localhost:5173
```

Open http://localhost:5173/dashboard — the status card should show **Connected**.

## Scripts

| App      | Script              | Purpose                                    |
| -------- | ------------------- | ------------------------------------------ |
| frontend | `npm run dev`       | Vite dev server (http://localhost:5173)    |
| frontend | `npm run build`     | Type-check + production build → `dist/`    |
| frontend | `npm run preview`   | Serve the production build locally         |
| backend  | `npm run dev`       | tsx watch — auto-reloading dev server      |
| backend  | `npm run build`     | Compile TypeScript → `dist/`               |
| backend  | `npm start`         | Run the compiled server (used by Render)   |
| backend  | `npm run typecheck` | Type-check only                            |

## Environment Variables

### `frontend/.env`

| Variable       | Example                 | Notes                                           |
| -------------- | ----------------------- | ----------------------------------------------- |
| `VITE_API_URL` | `http://localhost:5000` | Backend base URL. Set in Vercel for production. |

### `backend/.env`

| Variable       | Example                                          | Notes                                     |
| -------------- | ------------------------------------------------ | ----------------------------------------- |
| `PORT`         | `5000`                                           | Render injects its own `PORT`.            |
| `NODE_ENV`     | `development`                                    | Set to `production` on Render.            |
| `FRONTEND_URL` | `http://localhost:5173`                          | CORS allowlist (comma-separated list OK). |
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/levelora` | Postgres connection string.               |

Never commit `.env` files — they are git-ignored; only `.env.example` files are tracked.

## API

### `GET /api/health`

```json
{
  "success": true,
  "message": "Life RPG API is running",
  "environment": "development",
  "uptimeSeconds": 42,
  "database": { "connected": true, "message": "PostgreSQL connection successful" }
}
```

`success` refers to the API process; `database.connected` reports PostgreSQL status separately, so the API stays healthy (and the frontend still connects) even when the DB is missing or misconfigured.

## How the Frontend Connects to the Backend

1. `frontend/src/config/env.ts` reads `import.meta.env.VITE_API_URL` — the single source of truth; no URLs are hardcoded in components.
2. `frontend/src/lib/api.ts` is a thin typed `fetch` wrapper all feature code uses (`api.health.check()` today).
3. CORS: the backend allows **only** origins listed in `FRONTEND_URL` (localhost in dev, the Vercel domain in production). No wildcard in production.
4. Vite inlines `VITE_API_URL` at build time — set it as a Vercel environment variable **before** deploying.

## Deployment

### Frontend → Vercel

1. Import the repository in Vercel, set **Root Directory**: `frontend` (framework auto-detects Vite).
2. Build command `npm run build` (default), output directory `dist`.
3. Add environment variable: `VITE_API_URL = https://<your-backend>.onrender.com`.
4. `frontend/vercel.json` rewrites all routes to `/index.html` so React Router deep links work.

### Backend → Render

1. Create a **Web Service** from the repo, **Root Directory**: `backend`.
2. Build Command: `npm install && npm run build`
3. Start Command: `npm start`
4. Health Check Path: `/api/health`
5. Environment variables:
   - `DATABASE_URL` — Internal Database URL of your Render PostgreSQL instance
   - `FRONTEND_URL` — `https://<your-frontend>.vercel.app`
   - `NODE_ENV` — `production`
   - `PORT` is injected by Render automatically; the server listens on `process.env.PORT` bound to `0.0.0.0`.
6. Deploy the backend first to learn its URL, then set `VITE_API_URL` on Vercel.

## Extending (Next Steps)

The foundation is ready for: auth → users → quests → XP/levels → attributes → streaks → activity logs → inventory/shop. Add one module at a time under `routes/` + `controllers/` + `services/`, with its own tables and migrations.

