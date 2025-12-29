# Hiding Admin-Only Templates from Developers with RBAC Conditional Policies

This example demonstrates how to use **RBAC Conditional Policies** in Red Hat Developer Hub (RHDH) / Backstage to hide specific templates from non-admin users.

## Overview

Sometimes you have Scaffolder templates that should only be visible to administrators—such as templates for sending notifications, managing infrastructure, or other privileged operations. This pattern uses:

1. **A tag on the template** (`admin`) to mark it as admin-only
2. **An RBAC conditional policy** that prevents developers from seeing templates with that tag

## Files

| File | Purpose |
|------|---------|
| `rbac-conditional-policies.yaml` | RBAC rule that hides admin-tagged templates from developers |
| `send-notification-template.yaml` | Example admin-only template for sending notifications |

## How It Works

### 1. Tag Your Admin-Only Template

In your template's `metadata.tags`, include the `admin` tag:

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: send-notification
  title: Send Notification
  description: Send a notification to all users or a specific group (Administrators only)
  tags:
    - utility
    - notifications
    - admin  # <-- This tag marks it as admin-only
```

### 2. Create the RBAC Conditional Policy

The conditional policy uses a `not` + `allOf` rule to say:

> "Developers can read catalog entities, **unless** it's a Template **and** it has the `admin` tag."

```yaml
result: CONDITIONAL
roleEntityRef: role:default/developers
pluginId: catalog
resourceType: catalog-entity
permissionMapping:
  - read
conditions:
  not:
    allOf:
      - rule: IS_ENTITY_KIND
        resourceType: catalog-entity
        params:
          kinds:
            - Template
      - rule: HAS_METADATA
        resourceType: catalog-entity
        params:
          key: tags
          value: admin
```

### 3. Configure RHDH to Load the Conditional Policy

In your `app-config.yaml`, ensure the RBAC plugin is configured to load the conditional policies file:

```yaml
permission:
  enabled: true
  rbac:
    policies-csv-file: /path/to/rbac-policy.csv
    conditional-policies-file: /path/to/rbac-conditional-policies.yaml
```

### 4. Assign Users to the Developers Role

In your `rbac-policy.csv`, assign users or groups to the `role:default/developers` role:

```csv
g, user:default/developer1, role:default/developers
g, group:default/engineering, role:default/developers
```

## Result

- **Admins** (not in the developers role, or with broader permissions) can see and use the "Send Notification" template
- **Developers** will not see admin-tagged templates in the catalog or template list

## Additional Tips

### Step-Level Permission Tags

You can also add permission tags at the parameter step level for additional control:

```yaml
parameters:
  - title: Notification Details
    backstage:permissions:
      tags:
        - admin
    properties:
      # ...
```

### Multiple Admin Templates

Any template with the `admin` tag will be hidden from developers. Simply add the tag to any template you want to restrict:

```yaml
metadata:
  tags:
    - admin
```

## References

- [RHDH RBAC Documentation](https://docs.redhat.com/en/documentation/red_hat_developer_hub/)
- [Backstage Permissions Framework](https://backstage.io/docs/permissions/overview)
- [Conditional Policies in RHDH](https://docs.redhat.com/en/documentation/red_hat_developer_hub/1.4/html/authorization/con-rbac-conditional-policies-rhdh_title-authorization)

