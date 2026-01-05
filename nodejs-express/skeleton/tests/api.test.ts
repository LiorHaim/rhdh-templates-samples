/**
 * Tests for ${{ values.name }} API endpoints
 */

import request from 'supertest';
import app from '../src/index';

describe('Health Endpoints', () => {
  test('GET /health returns healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'healthy' });
  });

  test('GET /ready returns ready status', async () => {
    const response = await request(app).get('/ready');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ready' });
  });

  test('GET / returns service info', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('service');
    expect(response.body).toHaveProperty('version');
  });
});

describe('Items API', () => {
  test('GET /api/v1/items returns empty array initially', async () => {
    const response = await request(app).get('/api/v1/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/v1/items creates a new item', async () => {
    const itemData = {
      name: 'Test Item',
      description: 'A test item',
      price: 9.99,
    };

    const response = await request(app)
      .post('/api/v1/items')
      .send(itemData)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(itemData.name);
    expect(response.body.price).toBe(itemData.price);
  });

  test('POST /api/v1/items validates required fields', async () => {
    const response = await request(app)
      .post('/api/v1/items')
      .send({ description: 'No name or price' })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('GET /api/v1/items/:id returns 404 for non-existent item', async () => {
    const response = await request(app).get('/api/v1/items/99999');
    expect(response.status).toBe(404);
  });
});
