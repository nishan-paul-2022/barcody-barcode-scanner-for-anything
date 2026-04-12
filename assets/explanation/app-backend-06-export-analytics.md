# app-backend 06: Export and Analytics

This document details export endpoints and asynchronous analytics tracking.

## Export endpoints

[`src/modules/export/export.controller.ts`](../app-backend/src/modules/export/export.controller.ts#L12-L120) exposes export types behind JWT auth:

- `GET /export/csv` — stream CSV directly.
- `GET /export/json` — stream JSON directly.
- `GET /export/pdf` — generate PDF report on demand.
- `GET /export/excel` — generate Excel workbook with charts.

## Streaming exports

[`src/modules/export/export.service.ts`](../app-backend/src/modules/export/export.service.ts#L74-L120) uses database streaming for efficient export.

- `getCsvStream(...)` streams rows from PostgreSQL and formats CSV.
- `getJsonStream(...)` streams JSON objects using `JSONStream`.
- Streaming avoids loading large scan datasets into memory.

## Report generation

For `pdf` and `excel` exports:

- The service loads matching scans and aggregates stats.
- PDF generation uses `pdfkit` with headers, stats, charts, and a scan table.
- Excel generation uses `exceljs` and embeds charts from `chartjs-node-canvas`.
- Chart rendering is attempted but failures are gracefully logged and skipped.

## Analytics event queue

[`src/modules/analytics/analytics.controller.ts`](../app-backend/src/modules/analytics/analytics.controller.ts#L7-L22) accepts events at:

- `POST /analytics/event`

[`src/modules/analytics/analytics.service.ts`](../app-backend/src/modules/analytics/analytics.service.ts#L1-L45) queues events into a Bull queue named `analytics`.

- Hashes `user_id` with `ANALYTICS_HASH_SECRET` before storing.
- Uses exponential retry and `removeOnComplete` for cleanup.
- Fails silently so analytics does not block the main application.

## Related frontend docs

- [`app-web-08-build-and-config.md`](app-web-08-build-and-config.md) — analytics integration and environment assumptions
- [`app-web-09-hooks.md`](app-web-09-hooks.md) — frontend analytics hooks that send events to the backend
