import type { RequestHandler } from 'express';
import { ApiError } from '../utils/ApiError';

/**
 * Catch-all for requests no route handled — forwards a typed 404 to the
 * centralized error handler so every response has the same JSON shape.
 */
export const notFoundHandler: RequestHandler = (request, _response, next) => {
  next(ApiError.notFound(`Cannot ${request.method} ${request.originalUrl}`));
};
