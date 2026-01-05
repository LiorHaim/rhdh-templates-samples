# API Reference

This section documents the API for ${{ values.name }}.

## Endpoints

### GET /api/v1/items

Retrieve a list of all items.

**Request:**

```bash
curl -X GET https://api.example.com/api/v1/items \
  -H "Authorization: Bearer <token>"
```

**Response:**

```json
{
  "items": [
    {
      "id": 1,
      "name": "Example Item",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

| Field | Type | Description |
|-------|------|-------------|
| `items` | array | List of items |
| `total` | integer | Total count of items |

---

### POST /api/v1/items

Create a new item.

**Request:**

```bash
curl -X POST https://api.example.com/api/v1/items \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item"}'
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Name of the item |
| `description` | string | No | Optional description |

**Response:**

```json
{
  "id": 2,
  "name": "New Item",
  "created_at": "2024-01-01T12:00:00Z"
}
```

---

### GET /api/v1/items/{id}

Retrieve a specific item by ID.

**Parameters:**

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | integer | path | The item ID |

**Response:**

```json
{
  "id": 1,
  "name": "Example Item",
  "description": "An example item",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-02T00:00:00Z"
}
```

---

## Error Responses

All endpoints may return the following error responses:

| Status Code | Description |
|-------------|-------------|
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Missing or invalid token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource does not exist |
| `500` | Internal Server Error |

**Error Response Format:**

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested resource was not found"
  }
}
```

---

## Authentication

All API requests require authentication using a Bearer token:

```bash
Authorization: Bearer <your-access-token>
```

!!! warning "Token Security"
    Never share your access token or commit it to version control.

