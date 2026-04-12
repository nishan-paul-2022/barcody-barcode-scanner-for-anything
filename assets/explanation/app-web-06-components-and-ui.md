# app-web Components and UI

`app-web` is built from reusable UI components and custom wrappers over Radix primitives. Styling is handled with Tailwind classes and interactive motion.

## Component folder structure

- `src/components/common`: shared layout pieces like header, footer, error boundary, and loading screen.
- `src/components/auth`: login dialog, auth redirect, and protected-route helpers.
- `src/components/providers`: app-wide wrappers for query, socket, auth, and loading.
- `src/components/ui`: design system primitives and UI controls.
- `src/components/scanner`, `lookup`, `history`, `export`, `settings`, `compare`: domain-specific feature UIs.

## UI primitives

`src/components/ui` contains custom wrappers such as:
- `button.tsx`
- `dialog.tsx`
- `select.tsx`
- `tabs.tsx`
- `popover.tsx`
- `table.tsx`
- `json-viewer.tsx`
- `skeleton.tsx`
- `badge.tsx`

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
