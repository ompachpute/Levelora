import cors from 'cors';
import { env } from '../config/env';

/**
 * Allowlist CORS:
 * - Requests without an Origin header (curl, Render health checks,
 *   server-to-server calls) pass through.
 * - Browser requests must match an origin listed in FRONTEND_URL.
 * - Unknown origins get a response without CORS headers, so the browser
 *   blocks it. Production never uses a wildcard.
 */
export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || env.allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    console.warn(`[cors] Blocked origin: ${origin}`);
    callback(null, false);
  },
  credentials: true,
});

