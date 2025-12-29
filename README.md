<div align="center">

# 🎨 RHDH & Backstage Templates Collection

### _Curated Software Templates for Developer Portals_

[![RHDH](https://img.shields.io/badge/Red%20Hat-Developer%20Hub-EE0000?style=for-the-badge&logo=redhat&logoColor=white)](https://developers.redhat.com/rhdh)
[![Backstage](https://img.shields.io/badge/Backstage-Templates-9BF0E1?style=for-the-badge&logo=backstage&logoColor=black)](https://backstage.io)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge)](LICENSE)

<br/>

**A collection of production-ready software templates designed to accelerate your golden paths and boost developer productivity.**

---

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

</div>

<br/>

## 👋 About

Hey there! I'm **Lior Haim**, a Senior Solutions Architect at Red Hat. This repository contains a curated collection of RHDH (Red Hat Developer Hub) and Backstage software templates that I've developed while working with customers and the community.

These templates are designed to:

- ⚡ **Accelerate onboarding** - Get developers productive from day one
- 🛤️ **Pave golden paths** - Standardize best practices across teams
- 🔧 **Reduce cognitive load** - Abstract away infrastructure complexity
- 🎯 **Enforce consistency** - Ensure compliance and security standards

<br/>

## 🚀 Quick Start

### Prerequisites

- A running instance of [RHDH](https://developers.redhat.com/rhdh) or [Backstage](https://backstage.io)
- Access to your `app-config.yaml`

### Register a Template

Add templates to your catalog by updating your `app-config.yaml`:

```yaml
catalog:
  locations:
    - type: url
      target: https://github.com/<your-org>/backstage-templates/blob/main/templates/<template-name>/template.yaml
      rules:
        - allow: [Template]
```

Or register directly via the UI:
1. Navigate to **Create** → **Register Existing Component**
2. Paste the template URL
3. Click **Analyze** → **Import**

<br/>

## 📖 Documentation

- 📚 [RHDH Documentation](https://docs.redhat.com/en/documentation/red_hat_developer_hub)
- 📚 [Backstage Software Templates](https://backstage.io/docs/features/software-templates/)
- 📚 [Writing Templates](https://backstage.io/docs/features/software-templates/writing-templates)
- 📚 [Built-in Actions](https://backstage.io/docs/features/software-templates/builtin-actions)

<br/>

## 🏗️ Template Structure

Each template follows this structure:

```
templates/
└── my-template/
    ├── template.yaml          # Template definition
    ├── skeleton/              # Scaffolded files
    │   └── ...
    └── README.md              # Template documentation
```

<br/>

## 🤝 Contributing

Contributions are welcome! Whether it's:

- 🐛 Bug fixes
- ✨ New templates
- 📝 Documentation improvements
- 💡 Feature suggestions

Feel free to open an issue or submit a PR.

<br/>

## 📬 Connect

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/liorhaim/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/liorhaim)

</div>

<br/>

---

<div align="center">

**Made with ❤️ by Lior Haim**

<sub>Senior Solutions Architect @ Red Hat</sub>

</div>

