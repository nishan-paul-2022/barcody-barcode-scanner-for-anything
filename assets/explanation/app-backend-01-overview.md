# app-backend 01: Overview

This document explains the core backend architecture of the Barcody API server in `app-backend`.

> See [`app-web-backend-crosswalk.md`](app-web-backend-crosswalk.md) for direct frontend/backend topic mapping.

## What this backend does

- Provides authenticated REST APIs for barcode scanning, product lookup, export, analytics, and health checks.
- Implements Google OAuth sign-in with JWT access/refresh token management.
- Uses Redis for refresh token storage, cache, rate tracking, and lookup statistics.
- Streams exports as CSV/JSON and generates PDF/Excel reports on demand.
- Emits real-time scan updates to the client over Socket.IO.

## Core technologies

- NestJS 11 framework with modular structure
- TypeORM for PostgreSQL access
- Redis via `cache-manager` and custom `RedisService`
- JWT-based auth and Passport Google OAuth
- Socket.IO Gateway for scan notifications
- Bull queue for analytics event processing
- Swagger docs in non-production environments

## Main backend entry points

- [`src/main.ts`](../app-backend/src/main.ts#L32-L105)  — application bootstrap, CORS, global pipes, logging, Swagger setup
- [`src/app.module.ts`](../app-backend/src/app.module.ts#L1-L79)  — root module wiring all feature modules
- [`src/modules/auth`](../app-backend/src/modules/auth)  — auth controllers, JWT handling, refresh tokens, Google OAuth
- [`src/modules/scans`](../app-backend/src/modules/scans)  — scan API CRUD, query filters, bulk writes, real-time gateway
- [`src/modules/product-lookup`](../app-backend/src/modules/product-lookup)  — barcode product data lookup with cache and API fallback
- [`src/modules/export`](../app-backend/src/modules/export)  — streaming export endpoints and report generation
- [`src/modules/analytics`](../app-backend/src/modules/analytics)  — enqueue analytics events safely
- [`src/modules/redis`](../app-backend/src/modules/redis)  — Redis helper wrapper used across backend

## How the backend is organized

1. `ConfigModule` validates environment variables and loads Redis config.
2. `TypeOrmModule` connects to PostgreSQL via `getDatabaseConfig`.
3. `RedisModule` bootstraps Redis cache and exposes `RedisService`.
4. Feature modules are imported into `AppModule`.
5. `JwtAuthGuard` protects most API routes.

## Related frontend docs

- [`app-web-01-overview.md`](app-web-01-overview.md) — overall client architecture and goals
- [`app-web-03-auth-and-state.md`](app-web-03-auth-and-state.md) — how auth state is mapped from backend tokens
- [`app-web-04-api-and-network.md`](app-web-04-api-and-network.md) — frontend API client and retry behavior
- [`app-web-07-websocket-realtime.md`](app-web-07-websocket-realtime.md) — frontend realtime event processing

## Read next

- [`app-backend-02-bootstrap-config.md`](app-backend-02-bootstrap-config.md) — bootstrap, CORS, Swagger, and module wiring
- [`app-backend-03-auth-session.md`](app-backend-03-auth-session.md) — authentication, JWT, refresh tokens, and Google OAuth
- [`app-backend-04-scans-realtime.md`](app-backend-04-scans-realtime.md) — scan CRUD, filters, bulk writes, and Socket.IO
