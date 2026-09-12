import http from 'http';
import app from './app';
import { closeDatabasePool } from './config/database';
import { env } from './config/env';

const server = http.createServer(app);

// Bind 0.0.0.0 and listen on process.env.PORT — required by production hosts
// like Render, which inject PORT dynamically. PORT has a local dev fallback.
server.listen(env.port, '0.0.0.0', () => {
  console.log(`[server] Levelora API listening on port ${env.port} (${env.nodeEnv})`);

  if (env.isProduction && env.allowedOrigins.length === 0) {
    console.warn('[server] FRONTEND_URL is not set — browser requests will be blocked by CORS.');
  }
});

const shutdown = async (signal: string): Promise<void> => {
  console.log(`[server] ${signal} received — shutting down...`);

  server.closeIdleConnections?.();
  server.close(async () => {
    await closeDatabasePool();
    process.exit(0);
  });

  // Safety net if connections refuse to drain.
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

