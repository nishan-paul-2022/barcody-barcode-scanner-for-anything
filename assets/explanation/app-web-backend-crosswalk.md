# app-web ↔ app-backend Crosswalk

This file helps readers map `app-web` explanation files to their most relevant `app-backend` counterparts.

| Frontend topic | Backend topic | Why this pairing matters |
|---|---|---|
| `app-web-01-overview.md` | `app-backend-01-overview.md` | High-level architecture and project scope for both client and server. |
| `app-web-02-architecture.md` | `app-backend-02-bootstrap-config.md` | App structure, module wiring, and runtime setup for frontend and backend. |
| `app-web-03-auth-and-state.md` | `app-backend-03-auth-session.md` | Auth flows, JWT lifecycle, and how login state maps between client and API. |
| `app-web-04-api-and-network.md` | `app-backend-03-auth-session.md`, `app-backend-04-scans-realtime.md`, `app-backend-05-product-lookup-cache.md`, `app-backend-06-export-analytics.md` | Frontend API calls correspond to backend auth, scan, product lookup, and export endpoints. |
| `app-web-05-routing-and-pages.md` | `app-backend-08-modules-endpoints.md` | Frontend page groups map to backend API modules and route responsibilities. |
| `app-web-06-components-and-ui.md` | `app-backend-04-scans-realtime.md`, `app-backend-05-product-lookup-cache.md` | UI components represent scan, lookup, and product data from backend services. |
| `app-web-07-websocket-realtime.md` | `app-backend-04-scans-realtime.md` | Realtime WebSocket handling on the client and the scan gateway on the server. |
| `app-web-08-build-and-config.md` | `app-backend-02-bootstrap-config.md` | Build/runtime configuration for frontend and backend environments. |
| `app-web-09-hooks.md` | `app-backend-04-scans-realtime.md`, `app-backend-05-product-lookup-cache.md`, `app-backend-06-export-analytics.md` | Hooks encapsulate backend data access for scans, products, and exports. |

## How to use this crosswalk

- Start with the frontend topic you are interested in.
- Follow the corresponding backend topic(s) to see where the API or server logic is implemented.
- Use the links inside each explanation file to jump directly to the specific counterpart.
