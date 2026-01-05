/**
 * Type definitions for ${{ values.name }}
 */

export interface Item {
  id: number;
  name: string;
  description: string | null;
  price: number;
  createdAt: string;
}

export interface ItemCreate {
  name: string;
  description?: string;
  price: number;
}

export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
}

export interface ReadyResponse {
  status: 'ready' | 'not ready';
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
  stack?: string;
}
