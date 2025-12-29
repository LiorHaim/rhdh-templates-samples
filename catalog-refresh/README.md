# RHDH Admin Templates

Administrator-only templates for Red Hat Developer Hub with RBAC-based access control.

## 🔄 Bulk Catalog Refresh

Force refresh catalog entities from their source locations without waiting for the scheduled refresh cycle.

**Use when:**
- GitHub/GitLab webhook missed an update
- Entity metadata appears stale
- You need immediate sync after source changes

**Options:**
- Single Entity (via EntityPicker)
- All Components
- All APIs  
- All Templates

## 🔐 RBAC Setup

The `rbac-conditional-policies.yaml` hides templates tagged with `admin` from non-admin users.

### Installation

1. **Add the template** to your `app-config.yaml`:

```yaml
catalog:
  locations:
    - type: url
      target: https://github.com/YOUR_ORG/YOUR_REPO/blob/main/catalog-refresh-template.yaml
      rules:
        - allow: [Template]
```

2. **Add the conditional policy** to your `app-config.yaml`:

```yaml
permission:
  enabled: true
  rbac:
    conditionalPoliciesFile: /path/to/rbac-conditional-policies.yaml
    policyFileReload: true
```

3. **Remove `catalog.entity.read`** from your developer role in `rbac-policy.csv` (the conditional policy handles it).

4. **Restart RHDH**.

### Create Your Own Admin Templates

Just add the `admin` tag:

```yaml
metadata:
  tags:
    - admin
```

Admins will see it, developers won't.
