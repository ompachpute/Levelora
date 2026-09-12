/**
 * Central place for frontend environment configuration. Components must read
 * values from here instead of touching import.meta.env directly (and never
 * hardcode URLs in components).
 *
 * Vite only exposes variables prefixed with VITE_ and inlines them at build
 * time — set VITE_API_URL in Vercel project settings for production.
 */
const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

// The localhost fallback keeps local development working out of the box;
// production builds get the real URL via the VITE_API_URL env var.
export const API_BASE_URL =
  rawApiUrl && rawApiUrl.length > 0 ? rawApiUrl.replace(/\/+$/, '') : 'http://localhost:5000';
