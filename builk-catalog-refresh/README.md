# RHDH Admin Templates

A collection of administrator-only templates for Red Hat Developer Hub (RHDH) with RBAC-based access control.

## 📦 Contents

| File | Description |
|------|-------------|
| `catalog-refresh-template.yaml` | Force refresh catalog entities from their source |
| `rbac-conditional-policies.yaml` | RBAC policy to hide admin templates from non-admin users |

---

## 🔄 Bulk Catalog Refresh Template

### Overview

This template allows administrators to force-refresh catalog entities, syncing them with their source locations (Git, URL, etc.) without waiting for the scheduled refresh cycle.

### Use Cases

- 🔧 **Webhook failures** - When GitHub/GitLab webhooks miss an update
- ⚡ **Immediate sync** - Need changes reflected immediately
- 🐛 **Troubleshooting** - Entity metadata appears stale or incorrect
- 🔄 **After source changes** - Updated `catalog-info.yaml` in source repo

### Features

| Refresh Scope | Description |
|--------------|-------------|
| **Single Entity** | Select a specific entity via EntityPicker |
| **All Components** | Refresh all Component entities |
| **All APIs** | Refresh all API entities |
| **All Templates** | Refresh all Template entities |

### Installation

1. Add the template to your catalog locations in `app-config.yaml`:

```yaml
catalog:
  locations:
    - type: file
      target: /path/to/catalog-refresh-template.yaml
      rules:
        - allow: [Template]
```

Or import via URL:

```yaml
catalog:
  locations:
    - type: url
      target: https://github.com/YOUR_ORG/YOUR_REPO/blob/main/catalog-refresh-template.yaml
      rules:
        - allow: [Template]
```

2. Restart RHDH or wait for catalog refresh.

---

## 🔐 RBAC Conditional Policy

### Overview

This RBAC policy hides templates tagged with `admin` from non-administrator users. It uses RHDH's conditional policies feature with the `IS_ENTITY_KIND` and `HAS_METADATA` rules.

### How It Works

The policy creates a condition that:
- Applies to the `developers` role (or any non-admin role)
- Filters `catalog.entity.read` permission
- Hides entities that are **both**:
  - Kind: `Template`
  - Have tag: `admin` in `metadata.tags`

```yaml
conditions:
  not:
    allOf:
      - rule: IS_ENTITY_KIND
        params:
          kinds: [Template]
      - rule: HAS_METADATA
        params:
          key: tags
          value: admin
```

### Prerequisites

1. **RBAC Plugin enabled** in RHDH
2. **Permission framework** configured
3. **Roles defined** in `rbac-policy.csv`

### Installation

1. **Create the conditional policies file:**

   Save `rbac-conditional-policies.yaml` to your RHDH configs directory:
   ```
   /opt/app-root/src/configs/extra-files/rbac-conditional-policies.yaml
   ```

2. **Reference it in `app-config.yaml`:**

```yaml
permission:
  enabled: true
  rbac:
    policies-csv-file: /path/to/rbac-policy.csv
    conditionalPoliciesFile: /path/to/rbac-conditional-policies.yaml
    policyFileReload: true
```

3. **Remove explicit `catalog.entity.read`** from the developer role in your `rbac-policy.csv`:

```csv
# DON'T include this for developers - let the conditional policy handle it:
# p, role:default/developers, catalog.entity.read, read, allow
```

4. **Tag your admin templates:**

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: my-admin-template
  tags:
    - admin  # This tag triggers the RBAC condition
```

### Verification

1. Log in as an **administrator** → Template should appear
2. Log in as a **developer** → Template should be hidden

---

## 📋 Complete Setup Example

### 1. rbac-policy.csv

```csv
# Admin Role - Full Access
p, role:default/administrators, catalog.entity.read, read, allow
p, role:default/administrators, scaffolder.template.parameter.read, read, allow
p, role:default/administrators, scaffolder.template.step.read, read, allow
p, role:default/administrators, scaffolder.task.create, create, allow
# ... other permissions

# Developer Role - catalog.entity.read is CONDITIONAL (not listed here)
p, role:default/developers, scaffolder.template.parameter.read, read, allow
p, role:default/developers, scaffolder.template.step.read, read, allow
p, role:default/developers, scaffolder.task.create, create, allow
# ... other permissions

# Assign users to roles
g, user:default/admin-user, role:default/administrators
g, user:default/dev-user, role:default/developers
```

### 2. app-config.yaml

```yaml
permission:
  enabled: true
  rbac:
    policies-csv-file: /opt/app-root/src/configs/rbac-policy.csv
    conditionalPoliciesFile: /opt/app-root/src/configs/rbac-conditional-policies.yaml
    policyFileReload: true
    admin:
      users:
        - name: user:default/admin-user

catalog:
  locations:
    - type: file
      target: /opt/app-root/src/templates/catalog-refresh-template.yaml
      rules:
        - allow: [Template]
```

---

## 🏷️ Creating Your Own Admin Templates

To create a new admin-only template:

1. Add the `admin` tag to metadata:

```yaml
metadata:
  name: my-sensitive-template
  title: My Admin Template
  tags:
    - admin  # Required for RBAC filtering
    - other-tags
```

2. (Optional) Add permission tag to parameters for extra security:

```yaml
parameters:
  - title: Configuration
    backstage:permissions:
      tags:
        - admin
    properties:
      # ...
```

---

## 🔧 Troubleshooting

### Template still visible to non-admins

1. Ensure `catalog.entity.read` is **not** explicitly granted in `rbac-policy.csv`
2. Verify the conditional policy file path is correct
3. Restart RHDH with `podman compose down -v && podman compose up -d`
4. Check logs: `podman logs rhdh 2>&1 | grep -i "condition"`

### Template not loading

1. Check catalog logs for YAML parsing errors
2. Verify the file path in `app-config.yaml`
3. Ensure `rules: [Template]` is set

### Conditional policy not applying

1. Confirm `policyFileReload: true` is set
2. Check that the role name matches exactly (e.g., `role:default/developers`)
3. Look for policy loading errors in logs

---

## 📚 References

- [RHDH Authorization Documentation](https://docs.redhat.com/en/documentation/red_hat_developer_hub/1.4/html/authorization_in_red_hat_developer_hub/index)
- [Backstage Scaffolder Actions](https://backstage.io/docs/features/software-templates/builtin-actions/)
- [RBAC Conditional Policies](https://docs.redhat.com/en/documentation/red_hat_developer_hub/1.4/html/authorization_in_red_hat_developer_hub/con-rbac-conditional-policies-rhdh_title-authorization)

---

## 📄 License

Apache 2.0

---

## 🤝 Contributing

Contributions welcome! Please submit issues and pull requests.

