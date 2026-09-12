import express from 'express';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';
import routes from './routes';

const app = express();

// The app runs behind Render's reverse proxy in production.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(corsMiddleware);
app.use(express.json({ limit: '100kb' }));

// All API routes live under /api — future routers (auth, quests, shop) plug in
// inside src/routes/index.ts without touching this file.
app.use('/api', routes);

// Unmatched requests become a typed 404, then centralized JSON errors.
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
