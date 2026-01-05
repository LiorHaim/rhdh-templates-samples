/**
 * API Routes for ${{ values.name }}
 */

import { Router, Request, Response, IRouter } from 'express';
import { Item, ItemCreate } from '../types';

export const apiRouter: IRouter = Router();

// In-memory storage for demo purposes
const items: Item[] = [];
let nextId = 1;

/**
 * List all items
 */
apiRouter.get('/items', (_req: Request, res: Response) => {
  res.json(items);
});

/**
 * Get item by ID
 */
apiRouter.get('/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
});

/**
 * Create new item
 */
apiRouter.post('/items', (req: Request, res: Response) => {
  const { name, description, price } = req.body as ItemCreate;

  // Validation
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (price === undefined || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  const newItem: Item = {
    id: nextId++,
    name,
    description: description || null,
    price,
    createdAt: new Date().toISOString(),
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

/**
 * Delete item by ID
 */
apiRouter.delete('/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(index, 1);
  res.json({ message: `Item ${id} deleted successfully` });
});

