# app-web Routing and Pages

`app-web` uses the Next.js app router under `src/app`. Routes are composed from folder names and file names.

## Top-level route structure

- `src/app/page.tsx` is the public landing page.
- `src/app/layout.tsx` wraps every route with providers and global UI.
- `src/app/globals.css` contains Tailwind and global styles.
- `src/app/loading.tsx` and `src/app/not-found.tsx` handle shared loading and 404 behavior.

## Protected and public route patterns

- Routes under `src/app/protected` are likely guarded by auth logic.
- `AuthRedirectHandler` detects unauthenticated users and sends them to login.
- `LoginModal` is global and can open from any page.
- `useUIStore.pendingRedirectPath` stores the desired page for redirect after login.

## Landing page behavior

- `src/app/page.tsx` is the marketing/home page.
- It uses `useAuthStore` to determine login state.
- Clicking "Launch Scanner" either opens the login prompt or navigates to `/scanner`.
- Uses `framer-motion` for animation and `lucide-react` icons.

## Common route components

- `src/components/common/Header.tsx` and `Footer.tsx` render app chrome.
- `src/components/auth/AuthRedirectHandler.tsx` likely enforces route-level redirects.
- `src/components/auth/protected-route.tsx` can wrap UI that requires authentication.

## Route-specific feature groups

- `src/components/scanner`: all scanner UI and workflow patterns.
- `src/components/lookup`: product lookup and manual barcode entry.
- `src/components/history`: scan history UI.
- `src/components/export`: export management UI.
- `src/components/settings`: configuration and API key settings.
- `src/components/compare`: product comparison UI.

## Route semantics

- `app-web` uses client components for interactive pages (`'use client'` at top of many files).
- Shared state and API hooks keep pages lean and focused on rendering.
- Side effects such as login, scan results, and websocket messages are handled by stores/hooks.

## Layout and app shell

- `layout.tsx` builds the shell once.
- All pages share the same theme, auth, socket, and loading wrappers.
- This means page-level code can assume the app shell is already present.
