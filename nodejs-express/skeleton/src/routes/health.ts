/**
 * Health check endpoints for Kubernetes probes
 */

import { Router, Request, Response, IRouter } from 'express';

export const healthRouter: IRouter = Router();

/**
 * Liveness probe - Is the application alive?
 */
healthRouter.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

/**
 * Readiness probe - Is the application ready to serve traffic?
 */
healthRouter.get('/ready', (_req: Request, res: Response) => {
  // Add dependency checks here (database, external services, etc.)
  const isReady = true;

  if (isReady) {
    res.json({ status: 'ready' });
  } else {
    res.status(503).json({ status: 'not ready' });
  }
});
