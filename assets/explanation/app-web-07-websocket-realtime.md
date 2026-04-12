# app-web Websocket / Realtime

Realtime scan updates are handled by [`src/lib/websocket/socket-service.ts`](../../app-web/src/lib/websocket/socket-service.ts#L1-L184) and [`SocketProvider`](../../app-web/src/components/providers/SocketProvider.tsx#L1-L31). This enables the app to stay in sync with backend scan events.

## Socket lifecycle

- [`SocketProvider`](../../app-web/src/components/providers/SocketProvider.tsx#L1-L31) watches `useAuthStore.isAuthenticated` and `accessToken`.
- When the user is authenticated, [`socketService.connect()`](../../app-web/src/lib/websocket/socket-service.ts#L19-L49) is called.
- When the user logs out or loses auth, [`socketService.disconnect()`](../../app-web/src/lib/websocket/socket-service.ts#L182-L184) is called.

## Connection details

- Connects to the backend `/scans` namespace.
- Uses auth token in both `auth` payload and query string.
- Uses `websocket` transport with `polling` fallback.
- Reconnects up to 10 attempts with exponential delay.

## Event handling

- [`connect`](../../app-web/src/lib/websocket/socket-service.ts#L51-L60) updates `useSocketStore.status` to `connected`.
- [`disconnect`](../../app-web/src/lib/websocket/socket-service.ts#L182-L184) marks status as `disconnected` or `reconnecting`.
- [`connect_error`](../../app-web/src/lib/websocket/socket-service.ts#L62-L70) captures errors and increments retry counters.
- [`reconnect_attempt`](../../app-web/src/lib/websocket/socket-service.ts#L72-L77) updates status to `reconnecting`.

## Business events

- `scan:created`
  - Invalidate cached `['scans']` query.
  - Update the React Query cache to prepend the new scan.
- `scan:deleted`
  - Invalidate cached `['scans']` query.
  - Remove deleted scan from cached scan list.

## Message queueing

- If the socket is not currently connected, emitted messages are queued.
- Queue size is limited to 50 messages.
- When the socket reconnects, queued messages are flushed.

## Why it matters

- Keeps scan history accurate without full page refresh.
- Ensures multiple clients see changes quickly.
- Makes the frontend feel real-time while still relying on React Query cache invalidation.
