# MkDocs Documentation Site Template

A Backstage/RHDH scaffolder template that creates a documentation site using MkDocs with the Material theme, fully integrated with Backstage TechDocs.

## Features

- ✅ **MkDocs with Material Theme** - Beautiful, responsive documentation
- ✅ **Backstage TechDocs Integration** - View docs directly in Backstage
- ✅ **Dark Mode Support** - Automatic light/dark theme switching
- ✅ **Full-text Search** - Built-in search functionality
- ✅ **Code Highlighting** - Syntax highlighting with copy button
- ✅ **GitLab CI/CD** - Automatic validation and building
- ✅ **Customizable** - Choose colors, sections, and structure

## What It Creates

```
my-documentation/
├── docs/
│   ├── index.md              # Home page
│   ├── getting-started.md    # Setup guide
│   ├── changelog.md          # Version history (optional)
│   └── reference/
│       └── api.md            # API docs (optional)
├── mkdocs.yml                # MkDocs configuration
├── catalog-info.yaml         # Backstage entity with TechDocs
└── .gitlab-ci.yml            # CI pipeline
```

## Prerequisites

### Required Dynamic Plugins

| Plugin | Package | Purpose |
|--------|---------|---------|
| GitLab Scaffolder | `@backstage-community/plugin-scaffolder-backend-module-gitlab-dynamic` | Provides `publish:gitlab` action |

### TechDocs Configuration

Ensure TechDocs is configured in your Backstage instance. For the `dir:.` annotation to work, you need either:

**Option 1: Local Builder (Development)**
```yaml
techdocs:
  builder: 'local'
  generator:
    runIn: 'local'
```

**Option 2: External Builder (Production)**
```yaml
techdocs:
  builder: 'external'
  publisher:
    type: 'awsS3'  # or googleGcs, azureBlobStorage
    awsS3:
      bucketName: 'your-techdocs-bucket'
```

### Template Configuration

⚠️ **Before using this template**, update the following in `template.yaml`:

1. **GitLab Host** - Update the host URL in the `publish` step
2. **GitLab Groups** - Update the available groups in `gitlabGroup` enum

## Template Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Documentation site name (lowercase, hyphenated) |
| `description` | string | Yes | Brief description of the documentation |
| `owner` | MyGroupsPicker | Yes | Team that owns this documentation |
| `gitlabGroup` | enum | Yes | GitLab group for the repository |
| `includeApiDocs` | boolean | No | Include API reference section (default: true) |
| `includeChangelog` | boolean | No | Include changelog page (default: true) |
| `primaryColor` | enum | No | Theme color (default: indigo) |

## Usage

1. Navigate to **Create** in your RHDH instance
2. Select **MkDocs Documentation Site**
3. Fill in the documentation details
4. Choose optional sections and theme color
5. Click **Create**

The template will:
1. Generate MkDocs configuration and sample pages
2. Create a GitLab repository
3. Register the documentation in Backstage catalog
4. TechDocs will automatically build and serve the docs

## Local Development

After creating your documentation:

```bash
# Clone the repository
git clone https://gitlab.example.com/your-group/my-docs.git
cd my-docs

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate

# Install MkDocs
pip install mkdocs-material mkdocs-techdocs-core

# Run local server with hot reload
mkdocs serve

# Build static site
mkdocs build
```

Visit `http://localhost:8000` to preview your documentation.

## Writing Documentation

### Adding New Pages

1. Create a new `.md` file in the `docs/` folder
2. Add it to `nav` in `mkdocs.yml`:

```yaml
nav:
  - Home: index.md
  - My New Page: my-new-page.md
```

### Using Admonitions

```markdown
!!! note "Title"
    This is a note admonition.

!!! warning
    This is a warning without a custom title.

!!! tip "Pro Tip"
    This is a helpful tip.
```

### Code Blocks with Syntax Highlighting

````markdown
```python title="example.py"
def hello():
    print("Hello, World!")
```
````

### Tabbed Content

```markdown
=== "Python"

    ```python
    print("Hello")
    ```

=== "JavaScript"

    ```javascript
    console.log("Hello");
    ```
```

## CI/CD Pipeline

The included `.gitlab-ci.yml` provides:

| Stage | Job | Description |
|-------|-----|-------------|
| **test** | `test` | Validate docs build with `--strict` flag |
| **build** | `build-docs` | Build documentation artifacts |

### Deploying to GitLab Pages

Uncomment the `pages` job in `.gitlab-ci.yml` to deploy to GitLab Pages:

```yaml
pages:
  stage: build
  script:
    - pip install mkdocs-material mkdocs-techdocs-core
    - mkdocs build --site-dir public
  artifacts:
    paths:
      - public
  only:
    - main
```

## Theme Customization

### Available Colors

The template supports these Material theme colors:
- `indigo` (default)
- `blue`
- `teal`
- `green`
- `deep-orange`
- `red`
- `pink`
- `purple`

### Additional Customization

Edit `mkdocs.yml` to customize:
- Logo and favicon
- Navigation structure
- Additional plugins
- Custom CSS

## Troubleshooting

### TechDocs Not Building

1. Verify `backstage.io/techdocs-ref: dir:.` annotation in `catalog-info.yaml`
2. Check TechDocs builder configuration in Backstage
3. Ensure `mkdocs.yml` is valid: `mkdocs build --strict`

### Missing Styles in TechDocs

The `techdocs-core` plugin ensures compatibility with Backstage. Make sure it's installed:

```bash
pip install mkdocs-techdocs-core
```

### Local Preview Differs from TechDocs

TechDocs may render slightly differently. Use `mkdocs-techdocs-core` plugin locally for consistent results.

## License

Apache-2.0
