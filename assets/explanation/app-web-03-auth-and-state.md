# app-web Auth and State

Authentication and client state are centralized in `app-web`. The app keeps track of user login, tokens, UI state, scan workflow state, and socket connection status.

## Auth store: [`src/store/useAuthStore.ts`](../../app-web/src/store/useAuthStore.ts#L1-L167)

- Uses Zustand with `persist` to store auth in `localStorage` under `auth-storage`.
- Maintains:
  - `user`
  - `accessToken`
  - `refreshToken`
  - `isAuthenticated`
  - `isLoading`
- Actions:
  - `login(user, accessToken, refreshToken)`
  - `logout()`
  - `refreshAccessToken()`
  - `checkAuthStatus()`
- Token refresh strategy:
  - Refreshes token if current access token is expired or near expiry.
  - If refresh fails with 401/403, the user is logged out.
  - Axios requests automatically trigger refresh on 401 via interceptor.

## UI state: [`src/store/useUIStore.ts`](../../app-web/src/store/useUIStore.ts#L1-L26)

Simple UI store for modal and redirect state:

- `isLoginModalOpen`
- `isApiKeysModalOpen`
- `pendingRedirectPath`
- Open/close login modal
- Save redirect path for protected navigation

## Scan state: [`src/store/useScanStore.ts`](../../app-web/src/store/useScanStore.ts#L1-L149)

This store persists scan session state across refreshes.

- Tracks active tab: `camera`, `file`, or `lookup`
- Keeps latest scan results per tab
- Stores scan metadata and preview URLs
- Provides helpers to update current tab data
- Persists only safe fields; sensitive or transient state is excluded

## Socket state: [`src/store/useSocketStore.ts`](../../app-web/src/store/useSocketStore.ts#L1-L21)

- Tracks realtime connection status:
  - `connected`
  - `reconnecting`
  - `disconnected`
  - `error`
- Stores last connection error message

## Auth lifecycle in the app

1. `AuthInitializer` is mounted at app root.
2. It runs `checkAuthStatus()` once.
3. If tokens exist, it validates or refreshes the access token.
4. If auth status changes, `SocketProvider` connects/disconnects.
5. `LoginModal` is controlled by `useUIStore` and triggers login API calls.
6. `AuthRedirectHandler` can redirect unauthenticated users away from protected routes.

## Login flow

- `LoginModal` uses `@react-oauth/google`.
- On successful credential, it calls `api.auth.login()`.
- Backend returns `user`, `accessToken`, and `refreshToken`.
- `useAuthStore.login()` stores tokens and sets `isAuthenticated=true`.
- If the user was navigating to a protected page, `pendingRedirectPath` routes them after login.

## Key takeaways

- `useAuthStore` is the single source of truth for auth state.
- State persistence lets the user remain logged in across browser reloads.
- Token lifecycle is robust: login, refresh on expiry, logout on invalid refresh.
- UI state is intentionally lightweight and separate from domain state.

## Related backend docs

- `app-backend-03-auth-session.md` — JWT login, refresh, logout, and auth guard flow
- `app-backend-02-bootstrap-config.md` — CORS and global app middleware for auth support
