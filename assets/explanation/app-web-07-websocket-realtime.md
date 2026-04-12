# app-web Websocket / Realtime

Realtime scan updates are handled by `src/lib/websocket/socket-service.ts` and `SocketProvider`. This enables the app to stay in sync with backend scan events.

## Socket lifecycle

- `SocketProvider` watches `useAuthStore.isAuthenticated` and `accessToken`.
- When the user is authenticated, `socketService.connect()` is called.
- When the user logs out or loses auth, `socketService.disconnect()` is called.

## Connection details

- Connects to the backend `/scans` namespace.
- Uses auth token in both `auth` payload and query string.
- Uses `websocket` transport with `polling` fallback.
- Reconnects up to 10 attempts with exponential delay.

## Event handling

- `connect` updates `useSocketStore.status` to `connected`.
- `disconnect` marks status as `disconnected` or `reconnecting`.
- `connect_error` captures errors and increments retry counters.
- `reconnect_attempt` updates status to `reconnecting`.

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
