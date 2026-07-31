# pulse-remote-web

![Tests](https://github.com/undg/pulse-remote-web/actions/workflows/test.yml/badge.svg)
![Code quality analysis](https://github.com/undg/pulse-remote-web/actions/workflows/codeql-analysis.yml/badge.svg)

Web UI for [pulse-remote](https://github.com/undg/pulse-remote). Control Linux PC sound from your phone.

<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
  <img src="https://github.com/user-attachments/assets/4573dc38-7637-4612-8d66-f1fcf54afa50" width="300" alt="Image1">
  <img src="https://github.com/user-attachments/assets/e01ec214-d6e1-4ab4-ad9a-606330a04138" width="300" alt="Image2">
</div>

## Contributing

### Prerequisites

- Node.js (see `.nvmrc` or `package.json` engines)
- [pnpm](https://pnpm.io/)
- [pulse-remote](https://github.com/undg/pulse-remote) backend running locally (needed for dev and type generation)

### Setup

```bash
git clone https://github.com/undg/pulse-remote-web
cd pulse-remote-web
pnpm install
```

### Development server

```bash
pnpm dev
```

The app connects to `ws://localhost:8448` by default. Make sure the backend is running:

```bash
git clone https://github.com/undg/pulse-remote
cd pulse-remote
make run
```

### Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm test` | Run unit tests (Vitest, watch mode) |
| `pnpm test:ci` | Run unit tests once (CI) |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm lint` | Type-check (tsc) + lint (Biome) |
| `pnpm format` | Format all files with Biome |
| `pnpm validate` | Run lint + tests (same as CI) |
| `pnpm types-gen` | Fetch backend schemas and regenerate API types |

### Code style

- **Formatter & linter**: [Biome](https://biomejs.dev/) — single quotes, no semicolons, trailing commas, 80 char width
- **TypeScript**: strict mode, `import type` for type-only imports
- **React**: functional components + hooks only, no default exports (except `App.tsx`)
- **Imports**: sorted automatically by Biome on save/commit
- **Tailwind**: class order auto-sorted by Biome

Pre-commit hooks (Husky + lint-staged) format changed files and run related tests automatically.

### Project structure

```
src/
├── api/          WebSocket hooks, volume/status queries
├── components/   Reusable UI components
├── config/       Zod schemas, localStorage config, theme
├── generated/    API types from backend — do not edit by hand
├── pages/        Route-level page components
├── primitives/   Wrapped Radix UI building blocks
├── utils/        Helpers (cn, media queries, etc.)
├── app.tsx       Root component
├── main.tsx      Entry point
└── router.tsx    Route definitions
```

### Regenerating API types

Backend must be running on `localhost:8448`:

```bash
pnpm types-gen
```

This fetches JSON schemas from the backend and runs `quicktype` to produce TypeScript types in `src/generated/`. Never edit those files by hand.

### CI

GitHub Actions runs on every push and PR to `master`:

```bash
pnpm run-p lint test:ci
```

Keep PRs focused. Run `pnpm validate` locally before pushing.

## Tech Stack

| Concern | Tool |
|---|---|
| Framework | React 18, TypeScript, Vite 5 |
| State | Jotai + jotai-immer |
| Schema validation | Zod |
| Styling | Tailwind CSS, Radix UI primitives |
| Testing | Vitest + Testing Library + MSW |
| Formatting & linting | Biome |
| WebSocket | react-use-websocket |
| Data fetching | TanStack React Query |
| Drag & drop | dnd-kit |
| PWA | vite-plugin-pwa |
| CI | GitHub Actions |
| Pre-commit | Husky + lint-staged |
