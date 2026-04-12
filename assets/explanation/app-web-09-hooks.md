# app-web Hooks

The [`src/hooks`](../../app-web/src/hooks) folder contains reusable data access and domain-specific hooks. These hooks are the main way pages and components connect to backend data and application state.

## Hook files in [`src/hooks`](../../app-web/src/hooks)

- [`use-analytics.ts`](../../app-web/src/hooks/use-analytics.ts) — tracks analytics events and dashboards.
- [`use-api-keys.ts`](../../app-web/src/hooks/use-api-keys.ts) — loads and updates user API keys.
- [`use-auth-hooks.ts`](../../app-web/src/hooks/use-auth-hooks.ts) — likely wrapper helpers around auth state and login behavior.
- [`use-export.ts`](../../app-web/src/hooks/use-export.ts) — handles export requests, progress, and file downloads.
- [`use-product.ts`](../../app-web/src/hooks/use-product.ts) — product lookup logic for barcode searches.
- [`use-products.ts`](../../app-web/src/hooks/use-products.ts) — comparison and product collections.
- [`use-scans.ts`](../../app-web/src/hooks/use-scans.ts) — scan history, scan list pagination, and scan events.

## Purpose of hooks

- Encapsulate API requests and data transformation.
- Keep pages lean by moving business logic into reusable functions.
- Coordinate React Query with local component state.
- Provide a single place for feature-specific side effects.

## How hooks likely work

- Each hook uses `api` from [`src/lib/api/client.ts`](../../app-web/src/lib/api/client.ts#L1-L361).
- Hooks may use React Query for caching, invalidation, and loading state.
- Hooks may also use Zustand stores to read/write auth or scan session state.
- Export and product hooks support progress callbacks for user feedback.

## Example responsibilities

- `use-scans.ts` likely returns scan list, refresh, delete, and stats operations.
- `use-product.ts` likely handles barcode lookup, raw lookup, and product result formatting.
- `use-api-keys.ts` loads saved API keys and updates backend settings.
- `use-export.ts` manages export format selection and file blob downloads.

## Why hooks matter

- They enable domain-specific logic without duplicating code.
- They make app behaviors like scanning, lookup, and exporting easier to test.
- Hooks are the glue between [`src/lib/api`](../../app-web/src/lib/api) , shared state, and page UI.

## Best practice in this repo

- UI components should avoid direct API calls.
- Feature pages should consume hooks and render returned state.
- Hooks should remain focused on one feature area.

## Related backend docs

- [`app-backend-04-scans-realtime.md`](app-backend-04-scans-realtime.md) — scan hooks map to scan API and query behavior
- [`app-backend-05-product-lookup-cache.md`](app-backend-05-product-lookup-cache.md) — product hooks map to barcode lookup services
- [`app-backend-06-export-analytics.md`](app-backend-06-export-analytics.md) — export hooks map to streaming export endpoints
