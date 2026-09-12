import type { ErrorRequestHandler } from 'express';
import { env } from '../config/env';

/**
 * Centralized JSON error handler — the last middleware in the chain.
 * ApiError instances keep their status code; anything else becomes a 500
 * (with its message hidden in production so internals never leak).
 */
export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  const rawStatus = (error as { statusCode?: unknown }).statusCode;
  const statusCode = typeof rawStatus === 'number' ? rawStatus : 500;
  const message = error instanceof Error ? error.message : 'Unexpected error';

  console.error(`[error] ${request.method} ${request.originalUrl} -> ${statusCode} ${message}`);

  response.status(statusCode).json({
    success: false,
    message: statusCode >= 500 && env.isProduction ? 'Internal server error' : message,
  });
};

