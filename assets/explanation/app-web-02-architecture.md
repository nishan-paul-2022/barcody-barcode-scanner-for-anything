# app-web Architecture

`app-web` is architected as a modern single-page application using Next.js app router and React features. It layers application concerns so UI, data, authentication, and realtime behavior remain separate and traceable.

## Root layout and global providers

- [`src/app/layout.tsx`](../../../app-web/src/app/layout.tsx#L1-L71) is the root layout.
- It wraps the app with these providers:
  - [`QueryProvider`](../../../app-web/src/components/providers/query-provider.tsx#L1-L14) = React Query cache and devtools
  - [`GoogleAuthProvider`](../../../app-web/src/components/providers/google-auth-provider.tsx#L1-L29) = Google OAuth wrapper
  - [`AuthInitializer`](../../../app-web/src/components/auth-initializer.tsx#L1-L36) = check auth state and sync storage across tabs
  - [`ThemeProvider`](../../../app-web/src/components/theme-provider.tsx#L1-L11) = dark/light theme support via `next-themes`
  - [`SocketProvider`](../../../app-web/src/components/providers/SocketProvider.tsx#L1-L31) = connect/disconnect socket based on auth
  - [`AnalyticsTracker`](../../../app-web/src/components/analytics-tracker.tsx#L1-L29) = track page interaction events
  - [`LoginModal`](../../../app-web/src/components/auth/LoginModal.tsx#L13-L268) = global login dialog
  - [`AuthRedirectHandler`](../../../app-web/src/components/auth/AuthRedirectHandler.tsx#L1-L51) = redirect unauthenticated users
  - [`LoadingProvider`](../../../app-web/src/components/providers/loading-provider.tsx#L1-L40) = initial loading splash + fade-in
  - [`ErrorBoundary`](../../../app-web/src/components/common/error-boundary.tsx#L1-L85) = app-level React error capture

## Data flow

1. Browser loads Next.js app.
2. `AuthInitializer` runs and checks persisted auth state.
3. `QueryProvider` manages requests and caching.
4. UI components call hooks to fetch or mutate backend data.
5. `api` client in [`src/lib/api/client.ts`](../../../app-web/src/lib/api/client.ts#L1-L361) executes HTTP requests.
6. Auth token is attached automatically via Axios interceptor.
7. Realtime events arrive via `socketService` and invalidate React Query caches.

## State layers

- Global auth state: [`src/store/useAuthStore.ts`](../../../app-web/src/store/useAuthStore.ts#L1-L167)
- UI modal state: [`src/store/useUIStore.ts`](../../../app-web/src/store/useUIStore.ts#L1-L26)
- Scan/tab result state: [`src/store/useScanStore.ts`](../../../app-web/src/store/useScanStore.ts#L1-L149)
- Websocket state: [`src/store/useSocketStore.ts`](../../../app-web/src/store/useSocketStore.ts#L1-L21)

## Feature organization

- [`src/app`](../../../app-web/src/app): route pages and public landing page
- [`src/components`](../../../app-web/src/components): reusable presentational and provider components
- [`src/hooks`](../../../app-web/src/hooks): data access and specialized logic hooks (scan, product, exports)
- [`src/lib`](../../../app-web/src/lib): infrastructure code (API, query client, websocket, analytics)
- [`src/types`](../../../app-web/src/types): app-specific shared TypeScript definitions

## Protection and routing

- Public landing route is in [`src/app/page.tsx`](../../../app-web/src/app/page.tsx#L1-L341).
- Internal app routes live under [`src/app/protected`](../../../app-web/src/app/protected) and [`src/app/dev`](../../../app-web/src/app/dev).
- `AuthRedirectHandler` and shared auth store enforce login flow.

## Styling and UI

- Styling is mostly Tailwind CSS classes in JSX.
- Custom UI wrappers live in [`src/components/ui/`](../../../app-web/src/components/ui).
- Radix UI packages are used for dialogs, dropdowns, tabs, popovers, selects, and more.
- Animations are handled with `framer-motion`.

## Why this architecture works

- Clear separation of concerns between UI components and data access.
- Persistent client state allows scan workflow continuity across refresh.
- React Query plus WebSocket avoids stale history or scan lists.
- Auth token refresh and retry logic reduce user-visible API failures.
