# Send Notification Template

A Red Hat Developer Hub (RHDH) Scaffolder template that allows administrators to send notifications to users.

## What It Does

This template provides a simple interface for sending notifications through RHDH's notification system. Administrators can:

- **Send broadcast notifications** to all users
- **Target specific groups** (e.g., `group:default/developers`)
- **Target individual users** (e.g., `user:default/lior`)

### Notification Options

| Field | Description |
|-------|-------------|
| **Title** | The notification title displayed to recipients |
| **Message** | The notification body text |
| **Severity** | Priority level: Low, Normal, High, or Critical |
| **Link** | Optional URL to include (internal path or external URL) |

## Files

| File | Purpose |
|------|---------|
| `send-notification-template.yaml` | The Scaffolder template definition |
| `rbac-conditional-policies.yaml` | RBAC policy to restrict visibility to admins |

## Required Plugins

Enable the following dynamic plugins in your RHDH configuration:

| Plugin | Purpose |
|--------|---------|
| `@red-hat-developer-hub/backstage-plugin-notifications` | Frontend notification UI |
| `@red-hat-developer-hub/backstage-plugin-notifications-backend-dynamic` | Backend notifications API (`/notifications`) |
| `@red-hat-developer-hub/backstage-plugin-scaffolder-backend-module-http-request-dynamic` | Enables the `http:backstage:request` action used by the template |
| `@red-hat-developer-hub/backstage-plugin-rbac` | RBAC frontend (for admin-only visibility) |
| `@red-hat-developer-hub/backstage-plugin-rbac-backend-dynamic` | RBAC backend with conditional policies support |

## Usage

1. Register the template in your catalog
2. Navigate to **Create** in RHDH
3. Select "Send Notification"
4. Fill in the notification details and choose recipients
5. Execute the template

## Hiding from Non-Administrators

This template is tagged with `admin` in its metadata, which can be used with an RBAC conditional policy to hide it from developers.

The included `rbac-conditional-policies.yaml` prevents users in `role:default/developers` from seeing any template tagged with `admin`. To use it:

1. Load the conditional policy in your `app-config.yaml`:

```yaml
permission:
  enabled: true
  rbac:
    conditional-policies-file: /path/to/rbac-conditional-policies.yaml
```

2. Assign non-admin users to the developers role in your `rbac-policy.csv`:

```csv
g, user:default/developer1, role:default/developers
g, group:default/engineering, role:default/developers
```

Admins who are not in the developers role (or have broader permissions) will still see and use the template.
