# app-web Overview

`app-web` is the Next.js frontend for Barcody. It is the browser-facing client that handles user authentication, barcode scanning workflows, product lookup, export features, and realtime scan synchronization.

> See `app-web-backend-crosswalk.md` for direct frontend/backend topic mapping.

## Core responsibilities

- UI / UX for scanning and history
- Google OAuth authentication
- API communication with `app-backend`
- Client-side state persistence
- Realtime updates via WebSocket
- Exporting CSV/JSON/PDF/Excel
- Theme management and loading screens

## Main technologies

- Next.js 16 (app router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand for client state
- TanStack React Query for API caching
- Axios for HTTP + retry + token refresh
- Socket.IO client for realtime events
- Google OAuth for login
- ZXing for barcode scanning
- Radix UI and custom UI wrappers

## Directory overview

- [`src/app`](../../app-web/src/app): Next.js route entrypoints and layout
- [`src/components`](../../app-web/src/components): reusable UI components and providers
- [`src/hooks`](../../app-web/src/hooks): data hooks and domain logic hooks
- [`src/lib`](../../app-web/src/lib): shared utilities, API client, query client, websocket service
- [`src/store`](../../app-web/src/store): Zustand state stores
- [`src/types`](../../app-web/src/types): shared TypeScript types

## What is covered in this explanation set

- app-web architecture and data flow
- authentication and state management
- API client and network behavior
- route structure and page responsibilities
- UI component organization
- realtime websocket integration
- build and runtime configuration

## Related backend docs

- `app-backend-01-overview.md` — overall backend architecture
- `app-backend-02-bootstrap-config.md` — backend runtime wiring and config
- `app-backend-03-auth-session.md` — auth and token lifecycle
- `app-backend-04-scans-realtime.md` — scan API and realtime event delivery
- `app-backend-06-export-analytics.md` — export endpoints and analytics queue
