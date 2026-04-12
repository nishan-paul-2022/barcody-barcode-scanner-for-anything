# app-backend 07: Storage and Caching Helpers

This document explains how persistence and caching helpers are implemented.

## Redis wrapper service

[`src/modules/redis/redis.service.ts`](../app-backend/src/modules/redis/redis.service.ts#L20-L124) is a shared Redis helper.

- Uses NestJS `CACHE_MANAGER` to access Redis.
- Checks availability on module initialization.
- Wraps `get`, `set`, `del`, `flush`, and `increment` operations.
- Provides a `createKey(namespace, key)` helper for namespaced keys.
- If Redis is unavailable, methods degrade gracefully and return defaults.

## User persistence

[`src/modules/users/users.service.ts`](../app-backend/src/modules/users/users.service.ts#L7-L62) manages user records.

- `findOrCreateByGoogleId(...)` performs an upsert-like transaction.
- `updateLastLogin(...)` refreshes login timestamps.
- `getApiKeys(userId)` returns stored external API keys.
- `updateApiKeys(...)` allows user-specific key management.

## Tailscale helper route

[`src/modules/tailscale/tailscale.controller.ts`](../app-backend/src/modules/tailscale/tailscale.controller.ts#L1-L20) exposes Tailscale URI information.

- `GET /setup/tailscale-info`
- Computes a magic DNS hostname and backend URL for Tailscale access.

## Environment-driven behavior

- In non-production, Swagger is available.
- CORS rules allow localhost and trusted Tailscale hostnames.
- `trust proxy` is enabled for Docker and Tailscale IPs.
- Redis is used for token storage and cache metrics when present.
