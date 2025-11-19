# Medical Education Apps Monorepo

A monorepo containing multiple medical education applications with shared components and utilities.

## 🏗️ Structure

```
medical-education-apps/
├── apps/
│   ├── bp-impact/          # Blood pressure education app
│   └── diabetes-edu/       # Diabetes education app
└── packages/
    ├── shared-ui/          # Shared UI components
    ├── shared-contexts/    # Shared React contexts
    └── shared-utils/       # Shared utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
# Install all dependencies
npm install
```

### Development

Run individual apps in development mode:

```bash
# Run BP Impact app
npm run dev:bp

# Run Diabetes Education app
npm run dev:diabetes
```

### Building

Build individual apps for production:

```bash
# Build BP Impact app
npm run build:bp

# Build Diabetes Education app
npm run build:diabetes
```

## 📦 Shared Packages

### @medical-edu/shared-ui
Reusable UI components shared across all medical education apps.

### @medical-edu/shared-contexts
React contexts for state management (Auth, Readings, Text).

### @medical-edu/shared-utils
Common utility functions and helpers.

## 🚢 Deployment

Both apps are deployed on Vercel with smart ignore commands to prevent unnecessary rebuilds:

- **BP Impact**: Only rebuilds when changes affect `apps/bp-impact/` or `packages/`
- **Diabetes Education**: Only rebuilds when changes affect `apps/diabetes-edu/` or `packages/`

### Vercel Configuration Steps

1. Update your Vercel project settings:
   - **Root Directory**: Set to `apps/bp-impact` or `apps/diabetes-edu`
   - **Repository**: Point to this monorepo

2. Each app has a `vercel.json` with an ignore command to optimize deployments

## 🔧 Adding a New App

1. Create a new directory under `apps/`:
   ```bash
   cp -r apps/bp-impact apps/my-new-app
   ```

2. Update root `package.json` with new scripts:
   ```json
   {
     "scripts": {
       "dev:my-app": "npm run dev --workspace=apps/my-new-app",
       "build:my-app": "npm run build --workspace=apps/my-new-app"
     }
   }
   ```

3. Deploy to Vercel with appropriate root directory

## 🐛 Troubleshooting

### Import errors
- Verify workspace paths in root `package.json`
- Run `npm install` in the root directory

### Build fails
- Clear node_modules: `rm -rf node_modules apps/*/node_modules packages/*/node_modules`
- Reinstall: `npm install`

### Vercel deploys both apps
- Check `vercel.json` ignore commands in each app
- Verify root directory is set correctly in Vercel project settings

## 👨‍⚕️ Author

**Travis Gerrard, MD**
- Website: [travisgerrardmd.com](https://travisgerrardmd.com)
- BP Impact: [htn.fyi](https://www.htn.fyi)

## 📄 License

MIT
