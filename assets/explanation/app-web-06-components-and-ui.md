# app-web Components and UI

`app-web` is built from reusable UI components and custom wrappers over Radix primitives. Styling is handled with Tailwind classes and interactive motion.

## Component folder structure

- [`src/components/common`](../../app-web/src/components/common): shared layout pieces like header, footer, error boundary, and loading screen.
- [`src/components/auth`](../../app-web/src/components/auth): login dialog, auth redirect, and protected-route helpers.
- [`src/components/providers`](../../app-web/src/components/providers): app-wide wrappers for query, socket, auth, and loading.
- [`src/components/ui`](../../app-web/src/components/ui): design system primitives and UI controls.
- [`src/components/scanner`](../../app-web/src/components/scanner), [`src/components/lookup`](../../app-web/src/components/lookup), [`src/components/history`](../../app-web/src/components/history), [`src/components/export`](../../app-web/src/components/export), [`src/components/settings`](../../app-web/src/components/settings), [`src/components/compare`](../../app-web/src/components/compare): domain-specific feature UIs.

## UI primitives

[`src/components/ui`](../../app-web/src/components/ui) contains custom wrappers such as:
- [`button.tsx`](../../app-web/src/components/ui/button.tsx)
- [`dialog.tsx`](../../app-web/src/components/ui/dialog.tsx)
- [`select.tsx`](../../app-web/src/components/ui/select.tsx)
- [`tabs.tsx`](../../app-web/src/components/ui/tabs.tsx)
- [`popover.tsx`](../../app-web/src/components/ui/popover.tsx)
- [`table.tsx`](../../app-web/src/components/ui/table.tsx)
- [`json-viewer.tsx`](../../app-web/src/components/ui/json-viewer.tsx)
- [`skeleton.tsx`](../../app-web/src/components/ui/skeleton.tsx)
- [`badge.tsx`](../../app-web/src/components/ui/badge.tsx)

These likely combine:
- Radix UI accessibility primitives
- Tailwind utility classes
- shared theme behavior

## Visual design

- Tailwind CSS is the styling foundation.
- `globals.css` configures base styles and custom utilities.
- Animations are implemented with `framer-motion`.
- Icons come from `lucide-react`.
- Theme switching uses `next-themes`.

## App shell UI features

- `ThemeProvider` adds dark mode and system theme support.
- `LoadingProvider` shows an initial splash screen and fade transition.
- `ErrorBoundary` catches errors in children and prevents full app crashes.
- `LoginModal` is always mounted in the root layout, making login accessible globally.

## How UI and state connect

- UI components trigger state updates via Zustand stores.
- Hooks read data from React Query and render results.
- The login modal writes to `useAuthStore` and `useUIStore`.
- Scanner pages read `useScanStore` to preserve the current scan workflow.
- Websocket state is visible in UI through `useSocketStore`.

## Component composition

- Pages compose feature components and shared common components.
- Provider components wrap the whole app and avoid prop drilling.
- UI primitives keep buttons, modals, dropdowns, and forms consistent.
