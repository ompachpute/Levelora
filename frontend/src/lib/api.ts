import { API_BASE_URL } from '../config/env';

/** Shape returned by GET /api/health on the backend. */
export interface HealthResponse {
  success: boolean;
  message: string;
  environment: string;
  uptimeSeconds: number;
  database: {
    connected: boolean;
    message: string;
  };
}

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Thin typed fetch wrapper around the backend API. All feature code goes
 * through `api` — the base URL is never hardcoded in components.
 */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw new ApiError('Unable to reach the API. Is the backend running?', 0);
  }

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok || !body) {
    const serverMessage = (body as { message?: unknown } | null)?.message;
    throw new ApiError(
      typeof serverMessage === 'string' ? serverMessage : `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return body as T;
}

export const api = {
  health: {
    check: () => request<HealthResponse>('/api/health'),
  },
};

