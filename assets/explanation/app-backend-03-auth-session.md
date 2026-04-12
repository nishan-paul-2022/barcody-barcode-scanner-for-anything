# app-backend 03: Authentication and Session Management

This document explains how `app-backend` handles authentication, session tokens, and Google OAuth.

## Auth controller endpoints

`src/modules/auth/auth.controller.ts` exposes these routes:

- `POST /auth/google` — exchange Google ID token for JWT access and refresh tokens.
- `POST /auth/refresh` — refresh access token using a refresh token.
- `POST /auth/logout` — invalidate a stored refresh token.
- `GET /auth/me` — retrieve authenticated user profile.
- `GET /auth/google` and `GET /auth/google/callback` — web redirect handshake for Passport Google OAuth.

Source:
- [`src/modules/auth/auth.controller.ts`](../app-backend/src/modules/auth/auth.controller.ts#L25-L85)

## Google login flow

`src/modules/auth/auth.service.ts` handles Google authentication.

- Verifies the Google ID token against `https://oauth2.googleapis.com/tokeninfo`.
- Verifies the `aud` claim matches `GOOGLE_CLIENT_ID`.
- Finds or creates a `User` by Google ID.
- Issues JWT access and refresh tokens using `JwtAuthService`.
- Marks the user as admin if their email matches `ADMIN_EMAIL`.

Source:
- [`src/modules/auth/auth.service.ts`](../app-backend/src/modules/auth/auth.service.ts#L31-L119)

## JWT and refresh token lifecycle

`src/modules/auth/jwt-auth.service.ts` manages token creation and validation.

- `generateAccessToken(...)` creates a short-lived access token (15m).
- `generateRefreshToken(...)` creates a 7d refresh token and stores it in Redis.
- `generateTokens(...)` creates both tokens in parallel.
- `validateAccessToken(...)` validates access tokens and rejects invalid tokens.
- `validateRefreshToken(...)` ensures the token type is `refresh`, checks Redis for the stored token, and rejects token reuse or expiry.
- `removeRefreshToken(userId)` deletes the token from Redis on logout.

Source:
- [`src/modules/auth/jwt-auth.service.ts`](../app-backend/src/modules/auth/jwt-auth.service.ts#L21-L108)

## Protecting routes

- `JwtAuthGuard` is applied to most protected controllers.
- It extracts `Authorization: Bearer <token>` from HTTP headers.
- If valid, it attaches the decoded JWT payload to the request as `user`.

Source:
- [`src/modules/auth/guards/jwt-auth.guard.ts`](../app-backend/src/modules/auth/guards/jwt-auth.guard.ts#L1-L40)

## Google OAuth web redirect

- `GoogleAuthGuard` uses Passport's Google strategy.
- `GET /auth/google` begins the OAuth redirect.
- `GET /auth/google/callback` handles provider callback.
- This flow is mainly for browser redirect login, while the mobile/web client generally uses `POST /auth/google`.

Source:
- [`src/modules/auth/guards/google-auth.guard.ts`](../app-backend/src/modules/auth/guards/google-auth.guard.ts#L1-L20)
