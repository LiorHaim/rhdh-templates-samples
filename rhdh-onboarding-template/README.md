# Onboarding Existing Services to RHDH

This repository contains a **Backstage Software Template** designed to solve the "Day 2" operational challenge: bringing existing, air-gapped workloads into Red Hat Developer Hub (RHDH) without disruption.

## 🎯 Goal

Our primary goal is to **simplify developer onboarding**. Developers already have services running on OpenShift, code in GitLab, and tracking in Jira. We don't want to change their workflow; we just want to surface their services in RHDH.

This template provides a seamless "wizard" experience that:
1.  **Respects Ownership**: Developers select only repositories they own.
2.  **Automates Metadata**: Generates a standardized `catalog-info.yaml`.
3.  **Prevents Errors**: Validates inputs (like K8s naming) before submission.
4.  **Connects the Dots**: Automatically links the service to:
    *   **GitLab** (Source Code)
    *   **OpenShift** (Workloads)
    *   **Jira** (Issues)
    *   **JFrog** (Artifacts)
    *   **ArgoCD** (GitOps)
    *   **APIs** (OpenAPI, GraphQL, etc.)

## ✨ Features & User Experience

### 1. "Bring Your Own Repo"
Instead of scaffolding new code, this template uses the `RepoUrlPicker` to let developers select an *existing* GitLab repository.
- **Security**: It uses the user's own token to list only repositories they have permission to access.
- **Convenience**: No copy-pasting URLs manually.

### 2. Flexible Integrations (Everything is Optional)
We understand not every service uses every tool.
- **OpenShift Resources**: Explicitly links services via the `backstage.io/kubernetes-id` label selector.
- **Jira/ArgoCD/JFrog**: Only fill these if they exist.
- **APIs**: Users can choose to register an API (OpenAPI/Swagger, GraphQL, etc.) by simply pointing to the definition file path in the repo.
- The resulting `catalog-info.yaml` will be clean, containing *only* the annotations for the tools actually used.

### 3. Rich Metadata Support
To keep the Catalog organized, we support:
- **System**: Assign the component to a System immediately.
- **Tags**: Add custom tags (e.g. `java`, `frontend`) during onboarding.
- **Ownership**: Select the owning Group or User from the Catalog.

### 4. Smart Defaults
We reduce friction by calculating defaults where possible:
- **Lifecycle**: Defaults to `production`.
- **Merge Request**: The change is proposed via a Merge Request (created by the RHDH bot), allowing the team to review the metadata before it becomes "standard".

## 📂 Repository Structure

```
.
├── template.yaml            # The main Scaffolder template definition
└── skeleton/
    └── catalog-info.yaml    # The component definition file (Jinja2 template)
```

## 🛠 Usage Flow

1.  **Developer Action**: Logs into RHDH, clicks **"Onboard Existing Service"**.
2.  **Selection**: Picks their repo and fills in the integration "blanks" (Jira key, Argo app name, etc.). **All integration fields are optional.**
3.  **Automation**: RHDH generates a Merge Request with a perfectly formatted `catalog-info.yaml`.
4.  **Completion**: The developer merges the MR. RHDH Auto-Discovery picks it up, and the service appears in the Catalog with all plugins (CI/CD, Kubernetes, etc.) lighting up immediately.
