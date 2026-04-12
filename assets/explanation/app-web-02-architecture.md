# app-web Architecture

`app-web` is architected as a modern single-page application using Next.js app router and React features. It layers application concerns so UI, data, authentication, and realtime behavior remain separate and traceable.

## Root layout and global providers

- `src/app/layout.tsx` is the root layout.
- It wraps the app with these providers:
  - `QueryProvider` = React Query cache and devtools
  - `GoogleAuthProvider` = Google OAuth wrapper
  - `AuthInitializer` = check auth state and sync storage across tabs
  - `ThemeProvider` = dark/light theme support via `next-themes`
  - `SocketProvider` = connect/disconnect socket based on auth
  - `AnalyticsTracker` = track page interaction events
  - `LoginModal` = global login dialog
  - `AuthRedirectHandler` = redirect unauthenticated users
  - `LoadingProvider` = initial loading splash + fade-in
  - `ErrorBoundary` = app-level React error capture

## Data flow

1. Browser loads Next.js app.
2. `AuthInitializer` runs and checks persisted auth state.
3. `QueryProvider` manages requests and caching.
4. UI components call hooks to fetch or mutate backend data.
5. `api` client in `src/lib/api/client.ts` executes HTTP requests.
6. Auth token is attached automatically via Axios interceptor.
7. Realtime events arrive via `socketService` and invalidate React Query caches.

## State layers

- Global auth state: `src/store/useAuthStore.ts`
- UI modal state: `src/store/useUIStore.ts`
- Scan/tab result state: `src/store/useScanStore.ts`
- Websocket state: `src/store/useSocketStore.ts`

## Feature organization

- `src/app`: route pages and public landing page
- `src/components`: reusable presentational and provider components
- `src/hooks`: data access and specialized logic hooks (scan, product, exports)
- `src/lib`: infrastructure code (API, query client, websocket, analytics)
- `src/types`: app-specific shared TypeScript definitions

## Protection and routing

- Public landing route is in `src/app/page.tsx`.
- Internal app routes live under `src/app/protected` and `src/app/dev`.
- `AuthRedirectHandler` and shared auth store enforce login flow.

## Styling and UI

- Styling is mostly Tailwind CSS classes in JSX.
- Custom UI wrappers live in `src/components/ui/`.
- Radix UI packages are used for dialogs, dropdowns, tabs, popovers, selects, and more.
- Animations are handled with `framer-motion`.

## Why this architecture works

- Clear separation of concerns between UI components and data access.
- Persistent client state allows scan workflow continuity across refresh.
- React Query plus WebSocket avoids stale history or scan lists.
- Auth token refresh and retry logic reduce user-visible API failures.
