import dotenv from 'dotenv';

// Loads backend/.env when present. In production (Render) variables come from
// the dashboard, so this call is simply a no-op there.
dotenv.config();

const DEFAULT_PORT = 5000;
const DEV_DEFAULT_ORIGINS = ['http://localhost:5173'];

const toPort = (value: string | undefined): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isNaN(parsed) || parsed <= 0 ? DEFAULT_PORT : parsed;
};

/**
 * FRONTEND_URL accepts a single origin or a comma-separated list
 * (e.g. "http://localhost:5173,https://levelora.vercel.app").
 * Trailing slashes are normalized so origin comparison never fails.
 */
const parseAllowedOrigins = (raw: string | undefined, isProduction: boolean): string[] => {
  const origins = (raw ?? '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter((origin) => origin.length > 0);

  // Convenience default for local development only. Production must set
  // FRONTEND_URL explicitly — no wildcard CORS is ever applied.
  if (origins.length === 0 && !isProduction) {
    return [...DEV_DEFAULT_ORIGINS];
  }
  return origins;
};

const nodeEnv = process.env.NODE_ENV || 'development';

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: toPort(process.env.PORT),
  databaseUrl: process.env.DATABASE_URL?.trim() ?? '',
  allowedOrigins: parseAllowedOrigins(process.env.FRONTEND_URL, nodeEnv === 'production'),
} as const;

