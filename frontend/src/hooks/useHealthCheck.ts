import { useCallback, useEffect, useState } from 'react';
import { api, type HealthResponse } from '../lib/api';

export type HealthStatus = 'checking' | 'online' | 'offline';

interface HealthCheckState {
  status: HealthStatus;
  data: HealthResponse | null;
  error: string | null;
}

const initialState: HealthCheckState = { status: 'checking', data: null, error: null };

/** Runs GET /api/health on mount and exposes a `recheck` action. */
export function useHealthCheck() {
  const [state, setState] = useState<HealthCheckState>(initialState);

  const check = useCallback(async () => {
    setState({ status: 'checking', data: null, error: null });
    try {
      const data = await api.health.check();
      setState({ status: data.success ? 'online' : 'offline', data, error: null });
    } catch (error) {
      setState({
        status: 'offline',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, []);

  useEffect(() => {
    void check();
  }, [check]);

  return { ...state, recheck: check };
}
