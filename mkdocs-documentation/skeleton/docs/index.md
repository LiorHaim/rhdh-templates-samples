# ${{ values.name }}

${{ values.description }}

## Overview

Welcome to the documentation for **${{ values.name }}**! This site contains all the information you need to get started.

## Quick Links

| Section | Description |
|---------|-------------|
| [Getting Started](getting-started.md) | Installation and setup guide |
{%- if values.includeApiDocs %}
| [API Reference](reference/api.md) | API documentation and examples |
{%- endif %}
{%- if values.includeChangelog %}
| [Changelog](changelog.md) | Version history and updates |
{%- endif %}

## Features

- 📖 **Comprehensive Documentation** - Everything you need in one place
- 🔍 **Full-text Search** - Find what you're looking for quickly
- 🌙 **Dark Mode** - Easy on the eyes
- 📱 **Mobile Friendly** - Access from any device

## Getting Help

If you have questions or need assistance:

1. Check the [Getting Started](getting-started.md) guide
2. Search this documentation
3. Contact the ${{ values.owner }} team

---

!!! info "About this documentation"
    This documentation is built with [MkDocs](https://www.mkdocs.org/) and the [Material theme](https://squidfunk.github.io/mkdocs-material/). It integrates with Backstage TechDocs for seamless viewing within your developer portal.

