import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

// Small convenience root so visiting the API URL in a browser shows something
// useful instead of a plain 404.
router.get('/', (_request, response) => {
  response.json({
    success: true,
    message: 'Life RPG API is running',
    endpoints: { health: 'GET /api/health' },
  });
});

// Future routers plug in here (e.g. router.use('/quests', questRoutes)).
router.use('/health', healthRoutes);

export default router;
