# app-web Build and Config

This file explains how `app-web` is configured for development, production, linting, and testing.

## Package scripts

Defined in `app-web/package.json`:

- `dev`: `next dev -H 0.0.0.0`
- `build`: `next build`
- `start`: `next start`
- `lint`: `eslint --fix`
- `format`: `prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"`
- `format-check`: `prettier --check "**/*.{js,jsx,ts,tsx,json,css,md}"`
- `type-check`: `tsc --noEmit -p tsconfig.typecheck.json`
- `test`: `jest --passWithNoTests`

## Important dependencies

### Frontend stack
- `next` 16
- `react` 19
- `typescript`
- `tailwindcss` 4
- `zustand`
- `@tanstack/react-query`
- `axios`
- `socket.io-client`
- `framer-motion`
- `lucide-react`
- `@react-oauth/google`
- `@zxing/browser` and `@zxing/library`

### Dev tooling
- `eslint` with `@typescript-eslint`
- `jest` and `@testing-library/react`
- `prettier`
- `@next/eslint-plugin-next`

## Next.js config

`app-web/next.config.ts` key behavior:

- `output: 'standalone'` for a standalone production build.
- `experimental.optimizePackageImports`: optimize `lucide-react` imports.
- `experimental.serverActions.allowedOrigins`: allows server actions for specific hostnames.
- `images.remotePatterns`: allows remote image loading from any HTTP/S host.
- Adds COOP header `same-origin-allow-popups` on all routes.

## Environment variables

The app expects runtime environment values such as:

- `NEXT_PUBLIC_API_URL` — backend API base URL
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` — Google OAuth client ID
- Possibly theme or analytics variables in env files

Env templates exist in:
- `app-web/.env.example`
- `envs/app-web/`

## Type checking and linting

- `tsconfig.json` defines build-time TS config.
- `tsconfig.typecheck.json` is used for strict type checking via `tsc --noEmit`.
- ESLint is configured in `app-web/eslint.config.mjs`.
- Prettier config is in `app-web/.prettierrc`.

## Testing

- `jest.config.js` and `jest.setup.js` configure unit tests.
- Tests live in `app-web/__tests__/`.
- App uses Jest and React Testing Library.

## Deploy-ready artifacts

- Production build output is under `.next/`.
- `output: 'standalone'` indicates the build can be packaged with Node runtime.
- Docker support is available via `app-web/Dockerfile`.

## Summary

`app-web` is configured for modern production and local development.
It uses standard Next.js build and lint tooling, while keeping `app-web` self-contained and independent from backend runtime concerns.
