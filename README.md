# pulse-remote-web

![Tests](https://github.com/undg/pulse-remote-web/actions/workflows/test.yml/badge.svg)
![Code quality analysis](https://github.com/undg/pulse-remote-web/actions/workflows/codeql-analysis.yml/badge.svg)

## Pulse Remote Frontend

Web UI interface for [pulse-remote](https://github.com/undg/pulse-remote) websocket server.

Control Linux PC sound remotely from your phone.

<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
  <img src="https://github.com/user-attachments/assets/4573dc38-7637-4612-8d66-f1fcf54afa50" width="300" alt="Image1">
  <img src="https://github.com/user-attachments/assets/e01ec214-d6e1-4ab4-ad9a-606330a04138" width="300" alt="Image2">
</div>

## Development

#### Spin FE server

```bash
git clone https://github.com/undg/pulse-remote-web
cd pulse-remote-web
pnpm install
pnpm run dev
```

IMPORTANT: You need to run [pulse-remote](https://github.com/undg/pulse-remote) server

#### Spin BE server

```bash
git clone https://github.com/undg/pulse-remote
cd pulse-remote
make run
```

## Key Commands

- `pnpm run dev`: Start dev server
- `pnpm run build`: Build production
- `pnpm run test`: Run unit tests
- `pnpm run test:e2e`: Run E2E tests
- `pnpm run lint`: Run linting

## Deployment

Build output to [pulse-remote](https://github.com/undg/pulse-remote) `web/dist` folder.

pulse-remote have `make build` scripts that can pull this repo bundle it and wire it with the backend.

pulse-remote serves WebSockets and static files.

## Config

Stored in localStorage. Jotai + Zod ensure valid values.

## Code Quality

GitHub Actions enforce quality and tests.

Clean code awaits smart devs.

## Tech Stack

- React, TypeScript, Vite
- Jotai: state management
- Zod: schema validation
- Vitest: unit testing
- Cypress: E2E testing
- GitHub Actions: CI/CD
- Tailwind CSS + Shadcn
