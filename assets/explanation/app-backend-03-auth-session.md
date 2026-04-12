# app-backend 03: Authentication and Session Management

This document explains how `app-backend` handles authentication, session tokens, and Google OAuth.

## Auth controller endpoints

[`src/modules/auth/auth.controller.ts`](../app-backend/src/modules/auth/auth.controller.ts#L25-L85) exposes these routes:

- `POST /auth/google` — exchange Google ID token for JWT access and refresh tokens.
- `POST /auth/refresh` — refresh access token using a refresh token.
- `POST /auth/logout` — invalidate a stored refresh token.
- `GET /auth/me` — retrieve authenticated user profile.
- `GET /auth/google` and `GET /auth/google/callback` — web redirect handshake for Passport Google OAuth.

## Google login flow

[`src/modules/auth/auth.service.ts`](../app-backend/src/modules/auth/auth.service.ts#L31-L119) handles Google authentication.

- Verifies the Google ID token against `https://oauth2.googleapis.com/tokeninfo`.
- Verifies the `aud` claim matches `GOOGLE_CLIENT_ID`.
- Finds or creates a `User` by Google ID.
- Issues JWT access and refresh tokens using `JwtAuthService`.
- Marks the user as admin if their email matches `ADMIN_EMAIL`.

## JWT and refresh token lifecycle

[`src/modules/auth/jwt-auth.service.ts`](../app-backend/src/modules/auth/jwt-auth.service.ts#L21-L108) manages token creation and validation.

- `generateAccessToken(...)` creates a short-lived access token (15m).
- `generateRefreshToken(...)` creates a 7d refresh token and stores it in Redis.
- `generateTokens(...)` creates both tokens in parallel.
- `validateAccessToken(...)` validates access tokens and rejects invalid tokens.
- `validateRefreshToken(...)` ensures the token type is `refresh`, checks Redis for the stored token, and rejects token reuse or expiry.
- `removeRefreshToken(userId)` deletes the token from Redis on logout.

## Protecting routes

- [`JwtAuthGuard`](../app-backend/src/modules/auth/guards/jwt-auth.guard.ts#L1-L40) is applied to most protected controllers.
- It extracts `Authorization: Bearer <token>` from HTTP headers.
- If valid, it attaches the decoded JWT payload to the request as `user`.

## Google OAuth web redirect

- [`GoogleAuthGuard`](../app-backend/src/modules/auth/guards/google-auth.guard.ts#L1-L20) uses Passport's Google strategy.
- [`GoogleAuthGuard`](../app-backend/src/modules/auth/guards/google-auth.guard.ts#L1-L20) uses Passport's Google strategy.
- `GET /auth/google` begins the OAuth redirect.
- `GET /auth/google/callback` handles provider callback.
- This flow is mainly for browser redirect login, while the mobile/web client generally uses `POST /auth/google`.

## Related frontend docs

- [`app-web-03-auth-and-state.md`](app-web-03-auth-and-state.md) — auth store, login modal, and refresh token handling
- [`app-web-04-api-and-network.md`](app-web-04-api-and-network.md) — frontend API calls for login and token refresh
- [`app-web-01-overview.md`](app-web-01-overview.md) — where auth fits in the overall client workflow
