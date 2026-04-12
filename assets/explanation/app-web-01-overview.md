# app-web Overview

`app-web` is the Next.js frontend for Barcody. It is the browser-facing client that handles user authentication, barcode scanning workflows, product lookup, export features, and realtime scan synchronization.

## Core responsibilities

- UI / UX for scanning and history
- Google OAuth authentication
- API communication with `app-backend`
- Client-side state persistence
- Realtime updates via WebSocket
- Exporting CSV/JSON/PDF/Excel
- Theme management and loading screens

## Main technologies

- Next.js 16 (app router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand for client state
- TanStack React Query for API caching
- Axios for HTTP + retry + token refresh
- Socket.IO client for realtime events
- Google OAuth for login
- ZXing for barcode scanning
- Radix UI and custom UI wrappers

## Directory overview

- `src/app`: Next.js route entrypoints and layout
- `src/components`: reusable UI components and providers
- `src/hooks`: data hooks and domain logic hooks
- `src/lib`: shared utilities, API client, query client, websocket service
- `src/store`: Zustand state stores
- `src/types`: shared TypeScript types

## What is covered in this explanation set

- app-web architecture and data flow
- authentication and state management
- API client and network behavior
- route structure and page responsibilities
- UI component organization
- realtime websocket integration
- build and runtime configuration
