import { testDatabaseConnection, type DatabaseStatus } from '../config/database';
import { env } from '../config/env';

export interface HealthStatus {
  success: boolean;
  message: string;
  environment: string;
  uptimeSeconds: number;
  database: DatabaseStatus;
}

/**
 * Builds the payload for GET /api/health. The API itself is considered healthy
 * while this service can run; PostgreSQL status is reported separately so the
 * app still works (and deployments pass) before the database is provisioned.
 */
export const getHealthStatus = async (): Promise<HealthStatus> => {
  const database = await testDatabaseConnection();

  return {
    success: true,
    message: 'Life RPG API is running',
    environment: env.nodeEnv,
    uptimeSeconds: Math.round(process.uptime()),
    database,
  };
};

