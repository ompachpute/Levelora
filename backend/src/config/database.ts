import { Pool } from 'pg';
import { env } from './env';

export interface DatabaseStatus {
  connected: boolean;
  message: string;
}

/**
 * Single shared connection pool for the whole app. Future services (users,
 * quests, shop, ...) should import `pool` from here instead of creating new
 * connections.
 */
export const pool = new Pool({
  // DATABASE_URL is empty until the database is provisioned; queries then fail
  // fast and the health endpoint reports the database as disconnected.
  connectionString: env.databaseUrl || undefined,
  max: 10,
  // Managed Postgres providers (e.g. Render) require SSL from outside their
  // network; rejectUnauthorized: false works with their certificates.
  ssl: env.isProduction && env.databaseUrl ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 5000,
});

export const testDatabaseConnection = async (): Promise<DatabaseStatus> => {
  if (!env.databaseUrl) {
    return { connected: false, message: 'DATABASE_URL is not set — database skipped' };
  }

  try {
    await pool.query('SELECT 1');
    return { connected: true, message: 'PostgreSQL connection successful' };
  } catch (error) {
    // Node's AggregateError (e.g. ECONNREFUSED on all interfaces) has an
    // empty message — fall back to something readable for the status card.
    const message =
      error instanceof Error && error.message.length > 0
        ? error.message
        : 'Unable to connect to PostgreSQL';
    return { connected: false, message };
  }
};

export const closeDatabasePool = (): Promise<void> => pool.end();

