/**
 * Typed application error carrying an HTTP status code. Create it anywhere in
 * services/controllers/middleware and the centralized error handler turns it
 * into a consistent JSON response.
 */
export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }

  public static notFound(message = 'Resource not found'): ApiError {
    return new ApiError(404, message);
  }
}
