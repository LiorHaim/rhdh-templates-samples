# Node.js Express API Template

A Backstage/RHDH scaffolder template that creates a production-ready Node.js Express API with TypeScript, GitLab CI/CD pipeline, Helm chart for Kubernetes/OpenShift deployment, and automatic Backstage catalog registration.

## Features

- ✅ **Express.js with TypeScript** - Type-safe API development
- ✅ **Health endpoints** - Kubernetes-ready liveness and readiness probes
- ✅ **GitLab CI/CD** - Automated testing, building, and deployment
- ✅ **Container builds** - Uses Kaniko for rootless builds (OpenShift compatible)
- ✅ **Helm chart** - Ready for Kubernetes/OpenShift deployment
- ✅ **Testing** - Jest with coverage reporting
- ✅ **Code quality** - ESLint + Prettier configured
- ✅ **Backstage integration** - Automatic catalog registration

## What It Creates

```
my-express-service/
├── src/
│   ├── index.ts              # Express app entry point
│   ├── routes/
│   │   ├── health.ts         # /health and /ready endpoints
│   │   └── api.ts            # Sample CRUD API routes
│   ├── middleware/
│   │   └── errorHandler.ts   # Global error handling
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── tests/
│   └── api.test.ts           # Jest test suite
├── helm/
│   └── <service-name>/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── deployment.yaml
│           ├── service.yaml
│           ├── serviceaccount.yaml
│           └── route.yaml    # OpenShift Route
├── .gitlab-ci.yml            # CI/CD pipeline
├── Dockerfile
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.js
├── .gitignore
├── catalog-info.yaml         # Backstage entity definition
└── README.md
```

## Prerequisites

### Required Dynamic Plugins

The following plugins must be enabled in your RHDH instance:

| Plugin | Package | Purpose |
|--------|---------|---------|
| GitLab Scaffolder | `@backstage-community/plugin-scaffolder-backend-module-gitlab-dynamic` | Provides `publish:gitlab` action |

### Enable in dynamic-plugins.yaml

```yaml
plugins:
  - package: ./dynamic-plugins/dist/@backstage-community-plugin-scaffolder-backend-module-gitlab-dynamic
    disabled: false
```

### Required Configuration

GitLab integration must be configured in `app-config.yaml`:

```yaml
integrations:
  gitlab:
    - host: gitlab.example.com  # Your GitLab instance
      apiBaseUrl: https://gitlab.example.com/api/v4
      token: ${GITLAB_TOKEN}    # Token with api scope

auth:
  providers:
    gitlab:
      production:
        clientId: ${AUTH_GITLAB_CLIENT_ID}
        clientSecret: ${AUTH_GITLAB_CLIENT_SECRET}
        additionalScopes:
          - api  # Required for repository creation
```

### Template Configuration

⚠️ **Before using this template**, update the following in `template.yaml`:

1. **GitLab Host** - Update the host URL in the `publish` step:
   ```yaml
   repoUrl: your-gitlab-instance.example.com?owner=${{ parameters.gitlabGroup }}&repo=${{ parameters.name }}
   ```

2. **GitLab Groups** - Update the available groups:
   ```yaml
   gitlabGroup:
     enum:
       - your-group-1
       - your-group-2
   ```

## Template Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Service name (must start with letter, lowercase, hyphenated) |
| `description` | string | Yes | Brief description of the service |
| `owner` | MyGroupsPicker | Yes | Team/group that owns this service |
| `gitlabGroup` | enum | Yes | GitLab group where repository will be created |
| `nodeVersion` | enum | Yes | Node.js version: 18 (LTS), 20 (Current LTS), 22 (Latest) |
| `targetNamespace` | string | No | Kubernetes/OpenShift namespace for deployment |

## Usage

1. Navigate to **Create** in your RHDH instance
2. Select **Node.js Express API**
3. Fill in the required parameters
4. Click **Create**

The template will:
1. Generate all project files from the skeleton
2. Create a new GitLab repository in the selected group
3. Push the initial code
4. Register the service in the Backstage catalog

## Development

After creating your service:

```bash
# Clone the repository
git clone https://gitlab.example.com/your-group/my-service.git
cd my-service

# Install dependencies
npm install

# Run in development mode (hot reload)
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Liveness probe |
| `/ready` | GET | Readiness probe |
| `/api/v1/items` | GET | List all items |
| `/api/v1/items/:id` | GET | Get item by ID |
| `/api/v1/items` | POST | Create new item |
| `/api/v1/items/:id` | DELETE | Delete item |

## CI/CD Pipeline

The included `.gitlab-ci.yml` provides:

| Stage | Job | Description |
|-------|-----|-------------|
| **test** | `test` | Run ESLint and Jest tests with coverage |
| **build** | `build-and-push` | Build container image with Kaniko and push to registry |
| **deploy** | `deploy` | Deploy to Kubernetes/OpenShift (manual, optional) |

### Container Registry Configuration

The pipeline supports two registry options:

#### Option 1: GitLab Container Registry (Recommended)
If enabled on your GitLab instance, images are automatically pushed to the built-in registry. No configuration needed.

#### Option 2: External Registry (Quay.io, Docker Hub, etc.)
Add these CI/CD variables in your project (**Settings → CI/CD → Variables**):

| Variable | Description | Example |
|----------|-------------|---------|
| `REGISTRY_URL` | Registry host | `quay.io` |
| `REGISTRY_USER` | Username | `myuser` |
| `REGISTRY_PASSWORD` | Password/token (masked) | `***` |

### Build Technology

The pipeline uses **Kaniko** for building container images, which:
- Works without Docker daemon (rootless)
- Compatible with OpenShift security constraints
- No privileged mode required

## Helm Deployment

Deploy to Kubernetes/OpenShift using the included Helm chart:

```bash
# Deploy to namespace
helm upgrade --install my-service ./helm/my-service \
  --namespace my-namespace \
  --set image.repository=registry.example.com/group/my-service \
  --set image.tag=latest

# View deployed resources
kubectl get all -n my-namespace -l app.kubernetes.io/name=my-service
```

### Helm Values

Key values you may want to override:

```yaml
replicaCount: 2
image:
  repository: registry.example.com/group/my-service
  tag: latest
service:
  port: 3000
resources:
  limits:
    cpu: 500m
    memory: 256Mi
```

## Customization

### Adding New Routes

1. Create a new file in `src/routes/`:
   ```typescript
   import { Router } from 'express';
   export const myRouter = Router();
   myRouter.get('/endpoint', (req, res) => { ... });
   ```

2. Register in `src/index.ts`:
   ```typescript
   import { myRouter } from './routes/myRoute';
   app.use('/api/v1', myRouter);
   ```

### Adding Dependencies

```bash
# Production dependency
npm install axios

# Development dependency
npm install -D @types/axios
```

## Troubleshooting

### CI Build Fails with Permission Errors

The pipeline is designed for OpenShift/rootless environments. If you see permission errors:
- Verify the `HOME` and `npm_config_cache` variables are set to `/tmp`
- Ensure `DOCKER_CONFIG` points to the project directory

### Container Registry Errors

If you see "No container registry configured":
1. Check if GitLab Container Registry is enabled for your project
2. Or configure external registry variables (see CI/CD section)

### ESLint Errors

Run `npm run lint:fix` to auto-fix many issues:
```bash
npm run lint:fix
```

## License

Apache-2.0
