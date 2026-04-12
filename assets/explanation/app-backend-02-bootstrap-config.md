# app-backend 02: Bootstrap and Config

This file describes how `app-backend` starts and wires dependencies.

## Application bootstrap

- Entry point: [`app-backend/src/main.ts`](../app-backend/src/main.ts#L32-L105).
- Bootstraps Nest application using `NestFactory.create(AppModule)`.
- Sets global prefix `api/v1`.
- Adds a custom middleware to fix `Cross-Origin-Opener-Policy` for Google login.
- Enables CORS for localhost, `*.kaiofficial.xyz`, and Tailscale IP ranges.
- Trusts proxy addresses for Docker and Tailscale.
- In development/test environments, initializes Swagger at `/api/docs`.

## Root module wiring

[`app-backend/src/app.module.ts`](../app-backend/src/app.module.ts#L1-L79) is the root injector.

Key imports:
- `ConfigModule.forRoot(...)` validates env vars via `src/config/env.schema.ts`.
- `ServeStaticModule` serves static files from `public/`.
- `WinstonModule` configures logging.
- `TypeOrmModule.forRootAsync(...)` connects PostgreSQL using `getDatabaseConfig`.
- `BullModule.forRootAsync(...)` configures Redis-backed queues.
- Application modules: `HealthModule`, `UsersModule`, `AuthModule`, `ScansModule`, `TailscaleModule`, `ProductLookupModule`, `ExportModule`, `AdminModule`, `AnalyticsModule`.

## Environment and validation

The backend relies on a validated environment schema in [`src/config/env.schema.ts`](../app-backend/src/config/env.schema.ts#L1-L35).

Required values include:
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `ADMIN_EMAIL`
- `ANALYTICS_HASH_SECRET`

This ensures the backend fails early if essential secrets or endpoints are missing.
