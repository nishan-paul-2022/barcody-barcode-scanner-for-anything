# app-web API and Network

`app-web` centralizes backend communication in [`src/lib/api/client.ts`](../../app-web/src/lib/api/client.ts#L1-L361). This file is the single place where HTTP behavior, retry, auth headers, and error handling are implemented.

## API client basics

- Uses [`axios`](https://github.com/axios/axios) with `baseURL` from `NEXT_PUBLIC_API_URL`.
- Configures `withCredentials: true` and `Content-Type: application/json` in [`src/lib/api/client.ts`](../../app-web/src/lib/api/client.ts#L1-L361).
- Sets a 30s request timeout.

## Retry strategy

- Uses `axios-retry`.
- Retries up to 3 times for network errors and 5xx responses.
- Logs retry attempts.

## Auth request flow

- Request interceptor attaches `Authorization: Bearer ${accessToken}` from `useAuthStore`.
- Response interceptor handles 401 errors and token refresh.
- When a 401 arrives:
  - if refresh is already in progress, requests queue until refresh completes
  - otherwise `refreshAccessToken()` is called
  - queued requests are replayed with the new token
  - if refresh fails, it logs the user out

## API groups

The client exports structured endpoints grouped by feature in [`src/lib/api/client.ts`](../../app-web/src/lib/api/client.ts#L167-L361):

- `api.auth`: login, refresh, logout, getMe
- `api.scans`: create, list, get, delete, bulk create/delete, get stats
- `api.products`: lookup, compare, raw lookup
- `api.settings`: get/update API keys
- `api.export`: exportCSV, exportJSON, exportPDF, exportExcel
- `api.analytics`: trackEvent, getAnalytics
- `api.upload`: generic file upload helper
- `api.setup`: tailscale info
- `api.paginate`: generic paginated fetch helper

## Export & upload handling

- Export endpoints use `responseType: 'blob'`.
- Export progress is tracked via Axios `onDownloadProgress`.
- Upload helper uses `FormData` and `multipart/form-data` for file uploads.

## Query client

- [`src/lib/query-client.ts`](../../app-web/src/lib/query-client.ts#L1-L37) configures React Query.
- Default staleTime is 5 minutes; cache garbage collection is 10 minutes.
- Queries retry unless the error status is 401, 403, or 404.
- Global query and mutation error logging is enabled.

## Error normalization

- API errors are transformed into a normalized object with `message`, `statusCode`, and `error`.
- 403 responses are logged as forbidden but not automatically redirected.

## Important side effects

- `apiClient` is the shared network layer used by hooks and UI events.
- The auth logic inside `apiClient` means most pages do not need to handle token refresh manually.
- Network resilience is tuned for fast frontend recovery.
