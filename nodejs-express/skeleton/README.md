# ${{ values.name }}

${{ values.description }}

## Overview

This is a Node.js Express API with TypeScript, generated from the Express API template.

| Property | Value |
|----------|-------|
| **Owner** | ${{ values.owner }} |
| **Node.js Version** | ${{ values.nodeVersion }} |
| **Container Registry** | ${{ values.registryUrl }} |

## Getting Started

### Prerequisites

- Node.js ${{ values.nodeVersion }}+
- npm or yarn
- Docker/Podman (for containerization)

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info |
| GET | `/health` | Health check (liveness) |
| GET | `/ready` | Readiness check |
| GET | `/api/v1/items` | List all items |
| POST | `/api/v1/items` | Create new item |
| GET | `/api/v1/items/:id` | Get item by ID |
| DELETE | `/api/v1/items/:id` | Delete item |

## Docker

```bash
# Build image
docker build -t ${{ values.name }}:latest .

# Run container
docker run -p 3000:3000 ${{ values.name }}:latest
```

## Deployment

### Using Helm

```bash
# Install/upgrade
helm upgrade --install ${{ values.name }} ./helm/${{ values.name }} \
  --namespace <your-namespace> \
  --set image.tag=<version>
```

### CI/CD

The `.gitlab-ci.yml` provides:
- **test**: Run Jest tests and ESLint
- **build**: Build Docker image
- **push**: Push to container registry
- **deploy**: Deploy to Kubernetes (manual)

## Project Structure

```
${{ values.name }}/
├── src/
│   ├── index.ts           # Application entry
│   ├── routes/
│   │   ├── health.ts      # Health endpoints
│   │   └── api.ts         # API routes
│   ├── middleware/
│   │   └── errorHandler.ts
│   └── types/
│       └── index.ts       # Type definitions
├── tests/
│   └── api.test.ts
├── helm/
│   └── ${{ values.name }}/
├── .gitlab-ci.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── catalog-info.yaml
└── README.md
```

## License

Apache-2.0

