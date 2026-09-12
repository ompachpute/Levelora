import type { NextFunction, Request, Response } from 'express';
import { getHealthStatus } from '../services/health.service';

/**
 * GET /api/health — consumed by the frontend status card and Render's
 * health-check path.
 */
export const getHealth = async (_request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const health = await getHealthStatus();
    response.status(200).json(health);
  } catch (error) {
    next(error);
  }
};

