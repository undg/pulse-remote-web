# pr-web

![Tests](https://github.com/undg/pr-web/actions/workflows/test.yml/badge.svg)
![Code quality analysis](https://github.com/undg/pr-web/actions/workflows/codeql-analysis.yml/badge.svg)

## Pulse Remote Frontend

React frontend for [go-prapi](https://github.com/undg/go-prapi) (v0.5.0) websocket server.

Control Linux PC sound remotely from your phone.

<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
  <img src="https://github.com/user-attachments/assets/464f7ee0-b1b8-4dbf-86d2-6310b97b3678" width="300" alt="Image1">
  <img src="https://github.com/user-attachments/assets/3e9cd49a-666e-43d6-a0a5-1a1830f74cfd" width="300" alt="Image2">
</div>

## Tech Stack

- React, TypeScript, Vite
- Jotai: state management
- Zod: schema validation
- Vitest: unit testing
- Cypress: E2E testing
- GitHub Actions: CI/CD
- Tailwind CSS + Shadcn

## Development

#### Spin FE server

```bash
git clone https://github.com/undg/pr-web
cd pr-web
pnpm install
pnpm run dev
```

IMPORTANT: You need to run [go-prapi's](https://github.com/undg/go-prapi) server

#### Spin BE server

```bash
git clone https://github.com/undg/go-prapi
cd go-prapi
make run
```

## Key Commands

- `pnpm run dev`: Start dev server
- `pnpm run build`: Build production
- `pnpm run test`: Run unit tests
- `pnpm run test:e2e`: Run E2E tests
- `pnpm run lint`: Run linting

## Deployment

Build output to [go-prapi's](https://github.com/undg/go-prapi) `/tmp/bin/pr-web/dist` folder.

go-prapi have `make build/fe` and `make build/full` command's that will pull this repo with frontend code and wire it with the backend.

go-prapi serves WebSockets and static files.

## Config

Stored in localStorage. Jotai + Zod ensure valid values.

## Code Quality

GitHub Actions enforce quality and tests.

Clean code awaits smart devs.
