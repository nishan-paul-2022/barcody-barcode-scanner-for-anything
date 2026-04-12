# app-backend 04: Scan API and Real-Time Updates

This file covers the scan lifecycle and real-time notifications in `app-backend`.

## Scan REST API

`src/modules/scans/scans.controller.ts` exposes scanned-item management endpoints:

- `POST /scans` — create a scan.
- `POST /scans/bulk` — bulk-create with deduplication within a 1-minute window.
- `GET /scans` — list scans with pagination, filters, search, and sorting.
- `GET /scans/stats` — aggregate scan metrics.
- `GET /scans/since/:timestamp` — incremental sync for scans after a given timestamp.
- `GET /scans/:id` — fetch a single scan by UUID.
- `DELETE /scans/:id` — delete one scan.
- `DELETE /scans/batch` — delete multiple scans.

Source:
- [`src/modules/scans/scans.controller.ts`](../app-backend/src/modules/scans/scans.controller.ts#L27-L120)

## Scan business logic

`src/modules/scans/scans.service.ts` implements scan operations.

- `create(...)` optionally performs product lookup when `productName` is missing.
- Saved scans are transformed into a client-friendly shape with embedded `product` metadata.
- `findAll(...)` supports filtering by barcode type, device type, category, nutrition grade, and date range.
- It also supports full-text search with PostgreSQL `to_tsvector` ranking.
- `findAllSince(...)` supports incremental sync by timestamp.
- `getStats(...)` returns total count, distinct active products, and most recent scan.
- `bulkCreate(...)` uses a transaction and emits created scan events.
- Deletion methods emit scan deletion events too.

Source:
- [`src/modules/scans/scans.service.ts`](../app-backend/src/modules/scans/scans.service.ts#L49-L294)

## Real-time scan events

`src/modules/scans/scans.gateway.ts` handles WebSocket-based updates.

- Uses `@WebSocketGateway({ namespace: 'scans' })`.
- Authenticates sockets by extracting JWT from `handshake.auth.token`, query token, or Authorization header.
- Joins each client to `user:<userId>` room.
- Emits `scan:created` and `scan:deleted` to the user's room.

Source:
- [`src/modules/scans/scans.gateway.ts`](../app-backend/src/modules/scans/scans.gateway.ts#L12-L63)

## Event delivery pattern

- On scan create or bulk create: `scansService.create(...)` / `bulkCreate(...)` → `scansGateway.emitScanCreated(...)`.
- On scan delete or batch delete: `scansService.delete(...)` / `bulkDelete(...)` → `scansGateway.emitScanDeleted(...)`.
- This gives the frontend instant updates without polling.
