# app-backend 05: Product Lookup and Cache Strategy

This document explains how product barcode lookup works and how external APIs are combined.

## Lookup service architecture

`src/modules/product-lookup/product-lookup.service.ts` is the central lookup engine.

- Accepts barcode lookup requests from scan creation and direct product routes.
- Uses Redis caching to avoid repeated external API calls.
- Caches successful product results for 30 days.
- Caches "not found" results for 24 hours.
- Tracks cache hits, misses, and API usage metrics in Redis.

Source:
- [`src/modules/product-lookup/product-lookup.service.ts`](../app-backend/src/modules/product-lookup/product-lookup.service.ts#L15-L248)

## API cascade lookup

Lookup tries providers in this order:

1. OpenFoodFacts
2. UPC Database (when user API key is configured and limit not exceeded)
3. (Other providers are available via raw proxy routes)

If any provider returns a valid product, the result is cached and returned.

## Raw lookup proxy

`src/modules/product-lookup/products.controller.ts` exposes raw proxy endpoints for external sources.

- `GET /products/:barcode/raw/:source`
- Supported sources: `off`, `obf`, `usda`, `upcitemdb`, `goUpc`, `searchUpc`
- These routes can be used to inspect the raw provider response or to support admin/debug flows.

Source:
- [`src/modules/product-lookup/products.controller.ts`](../app-backend/src/modules/product-lookup/products.controller.ts#L25-L89)

## Product comparison

- `POST /products/compare` compares multiple barcodes using the same lookup pipeline.
- The result includes product info and a comparison summary from `ProductComparisonService`.

## Admin-only stats

- `GET /products/stats` is protected by `JwtAuthGuard` and `AdminGuard`.
- Returns cache hit/miss statistics and UPC usage limits.

## User API keys

Users can store API keys for external lookup providers, including UPC Database, USDA, GoUPC, and SearchUPC.
- These keys are retrieved from `UsersService.getApiKeys(userId)`.
- The service gracefully falls back when keys are missing.
