# app-backend 08: Modules and Important API Endpoints

This document maps the remaining backend modules and their public APIs.

## Health and app metadata

- [`src/modules/health/health.controller.ts`](../../app-backend/src/modules/health/health.controller.ts) provides a simple health check.
- [`src/app.controller.ts`](../../app-backend/src/app.controller.ts) can expose generic app-level endpoints.

## Product lookup module

- [`src/modules/product-lookup/product-lookup.module.ts`](../../app-backend/src/modules/product-lookup/product-lookup.module.ts) provides the lookup service and comparison service to other modules.
- Controllers guard direct lookup and raw proxy access.

## Export module

- [`src/modules/export/export.module.ts`](../../app-backend/src/modules/export/export.module.ts) registers `ExportController` and `ExportService`.
- Export endpoints are protected by JWT and return real-time streamed responses or generated files.

## Analytics module

- [`src/modules/analytics/analytics.module.ts`](../../app-backend/src/modules/analytics/analytics.module.ts) attaches a Bull queue for analytics.
- Events are queued rather than processed synchronously.

## Admin module

- [`src/modules/admin/admin.module.ts`](../../app-backend/src/modules/admin/admin.module.ts) is imported by the root `AppModule`.
- `ProductsController` uses `AdminGuard` for `GET /products/stats`.
- Admin routes are separated from user scan flows.

## How modules are connected

- `AppModule` imports feature modules and global providers.
- `AuthModule` depends on `UsersModule` and `JwtAuthService`.
- `ScansModule` depends on `ProductLookupModule` and exposes scan events via a gateway.
- `ProductLookupModule` depends on `RedisService` and `UsersService`.
- `ExportModule` depends on `Scan` entity repository.

## Useful source references

- [`src/app.module.ts`](../../app-backend/src/app.module.ts#L1-L79) — module graph and shared service wiring
- [`src/modules/product-lookup/products.controller.ts`](../../app-backend/src/modules/product-lookup/products.controller.ts#L25-L89) — user-facing product APIs
- [`src/modules/export/export.controller.ts`](../../app-backend/src/modules/export/export.controller.ts#L12-L120) — export endpoints
