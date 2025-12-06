# Barcody - Modular Implementation Task List

> **Strategy**: Atomic tasks optimized for AI agent single-shot implementation
> 
> **Structure**: 58 focused tasks, 5-8 checkboxes each, single responsibility
> 
> **Goal**: Seamless, robust, bug-free implementation

---

## Phase 1: Foundation (Tasks 1-8)

### Task 1.1: Backend Project Setup

**Scope**: Initialize NestJS backend with core configuration

- [ ] Initialize NestJS project: `nest new backend`
- [ ] Configure `tsconfig.json` with strict mode and path aliases
- [ ] Set up `.env.example` with all required variables
- [ ] Install core dependencies: `@nestjs/config`, `class-validator`, `class-transformer`
- [ ] Create environment validation schema
- [ ] Configure Winston logger with JSON format
- [ ] Test: `npm run start:dev` works

**Acceptance**: Backend starts without errors, logger outputs JSON

---

### Task 1.2: Backend Docker Setup

**Scope**: Containerize backend with multi-stage build

- [ ] Create `Dockerfile` with multi-stage build (builder + production)
- [ ] Create `.dockerignore` file
- [ ] Create `docker-compose.yml` with PostgreSQL, Redis, backend services
- [ ] Add health check to Dockerfile
- [ ] Configure environment variables in docker-compose
- [ ] Test: `docker-compose up -d` starts all services
- [ ] Test: Backend accessible at `localhost:8000`

**Acceptance**: All containers start, backend responds to requests

---

### Task 1.3: Backend Health Checks

**Scope**: Implement comprehensive health monitoring

- [ ] Install `@nestjs/terminus`
- [ ] Create `HealthModule`
- [ ] Implement `/health` endpoint (overall health)
- [ ] Implement `/health/db` endpoint (PostgreSQL check)
- [ ] Implement `/health/redis` endpoint (Redis check)
- [ ] Add health check to Docker Compose
- [ ] Test: All health endpoints return 200 OK

**Acceptance**: Health checks pass, Docker health status shows healthy

---

### Task 1.4: Backend API Documentation

**Scope**: Set up Swagger/OpenAPI documentation

- [ ] Install `@nestjs/swagger`
- [ ] Configure Swagger in `main.ts`
- [ ] Add API metadata (title, description, version)
- [ ] Create example DTO with decorators
- [ ] Test: Swagger UI accessible at `/api/docs`
- [ ] Verify: API documentation renders correctly

**Acceptance**: Swagger UI loads, shows API documentation

---

### Task 1.5: Web Project Setup

**Scope**: Initialize Next.js web application

- [ ] Initialize Next.js 14+: `npx create-next-app@latest web --typescript --tailwind --app`
- [ ] Configure `tsconfig.json` with path aliases
- [ ] Set up `.env.local.example`
- [ ] Install shadcn/ui: `npx shadcn-ui@latest init`
- [ ] Configure dark mode (default)
- [ ] Create basic layout with header
- [ ] Test: `npm run dev` works at `localhost:3000`

**Acceptance**: Web app loads with dark mode, Tailwind working

---

### Task 1.6: Web Docker Setup

**Scope**: Containerize web application

- [ ] Create `Dockerfile` with multi-stage build
- [ ] Create `.dockerignore`
- [ ] Add web service to `docker-compose.yml`
- [ ] Configure environment variables
- [ ] Test: `docker-compose up web` works
- [ ] Test: Web accessible at `localhost:3000`

**Acceptance**: Web container runs, app accessible

---

### Task 1.7: Mobile Project Setup

**Scope**: Initialize Expo mobile application

- [ ] Initialize Expo: `npx create-expo-app@latest mobile --template blank-typescript`
- [ ] Configure `app.json` (name: "Barcody", slug, version)
- [ ] Set up `eas.json` with build profiles (production, preview, development)
- [ ] Configure dark theme in `app.json`
- [ ] Install navigation: `expo-router`
- [ ] Create basic app structure with tabs
- [ ] Test: `npx expo start` works

**Acceptance**: Mobile app runs in Expo Go, dark theme applied

---

### Task 1.8: Admin Dashboard Setup

**Scope**: Initialize admin dashboard

- [ ] Initialize Next.js: `npx create-next-app@latest admin --typescript --tailwind --app`
- [ ] Install Supabase client: `@supabase/supabase-js`
- [ ] Configure Supabase connection
- [ ] Create basic dashboard layout
- [ ] Set up Vercel deployment configuration
- [ ] Test: Dashboard loads locally
- [ ] Test: Supabase connection works

**Acceptance**: Admin dashboard runs, connects to Supabase

---

## Phase 2: CI/CD Pipeline (Tasks 9-12)

### Task 2.1: Backend CI/CD

**Scope**: Automate backend Docker builds

- [ ] Create `.github/workflows/backend-build.yml`
- [ ] Configure Docker Buildx
- [ ] Add Docker Hub login step
- [ ] Implement multi-platform build (linux/amd64)
- [ ] Add semantic versioning tags
- [ ] Configure build caching
- [ ] Test: Push to main triggers build

**Acceptance**: Backend Docker image pushed to Docker Hub

---

### Task 2.2: Web CI/CD

**Scope**: Automate web Docker builds

- [ ] Create `.github/workflows/web-build.yml`
- [ ] Configure Docker Buildx
- [ ] Add Docker Hub login
- [ ] Implement build and push
- [ ] Add versioning tags
- [ ] Test: Push to main triggers build

**Acceptance**: Web Docker image pushed to Docker Hub

---

### Task 2.3: Mobile CI/CD

**Scope**: Automate mobile APK builds

- [ ] Create `.github/workflows/mobile-build.yml`
- [ ] Configure EAS Build
- [ ] Add Expo token secret
- [ ] Implement APK build on tag push (`mobile-v*`)
- [ ] Upload APK to GitHub Releases
- [ ] Add release notes template
- [ ] Test: Tag push triggers build

**Acceptance**: APK built and uploaded to GitHub Releases

---

### Task 2.4: Admin Dashboard CI/CD

**Scope**: Automate admin dashboard deployment

- [ ] Create `vercel.json` configuration
- [ ] Connect GitHub repo to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Set up production domain
- [ ] Test: Push to main triggers deployment

**Acceptance**: Admin dashboard auto-deploys to Vercel

---

## Phase 3: Database & Auth Backend (Tasks 13-18)

### Task 3.1: Database Schema Setup

**Scope**: Create PostgreSQL schema with TypeORM

- [ ] Install TypeORM: `@nestjs/typeorm`, `typeorm`, `pg`
- [ ] Configure TypeORM in `AppModule`
- [ ] Create `User` entity (id, google_id, email, created_at, last_login)
- [ ] Create `Session` entity (id, user_id, session_token, expires_at)
- [ ] Create `Scan` entity (id, user_id, barcode_data, barcode_type, raw_data, scanned_at, device_type, metadata)
- [ ] Generate migration: `npm run migration:generate`
- [ ] Test: Migration runs successfully

**Acceptance**: Database tables created, entities working

---

### Task 3.2: Database Indexes & Optimization

**Scope**: Add performance indexes

- [ ] Add index on `users.google_id`
- [ ] Add index on `sessions.session_token`
- [ ] Add composite index on `scans(user_id, scanned_at DESC)`
- [ ] Add index on `scans.barcode_data`
- [ ] Generate migration for indexes
- [ ] Test: Indexes created successfully

**Acceptance**: All indexes exist, query performance improved

---

### Task 3.3: Redis Setup

**Scope**: Configure Redis for caching and sessions

- [ ] Install `@nestjs/cache-manager`, `cache-manager-redis-store`, `ioredis`
- [ ] Create `RedisModule`
- [ ] Configure Redis connection from environment
- [ ] Implement cache service wrapper
- [ ] Add health check for Redis
- [ ] Test: Redis connection works
- [ ] Test: Cache set/get works

**Acceptance**: Redis connected, caching functional

---

### Task 3.4: Auth Module - Google OAuth Strategy

**Scope**: Implement Google OAuth authentication

- [ ] Install `@nestjs/passport`, `passport`, `passport-google-oauth20`
- [ ] Create `AuthModule`
- [ ] Implement Google OAuth strategy
- [ ] Configure Google OAuth credentials from env
- [ ] Create auth controller with Google routes
- [ ] Test: OAuth redirect works
- [ ] Test: Callback receives user data

**Acceptance**: Google OAuth flow completes, user data received

---

### Task 3.5: Auth Module - JWT Service

**Scope**: Implement JWT token generation and validation

- [ ] Install `@nestjs/jwt`
- [ ] Create `JwtService` wrapper
- [ ] Implement access token generation (15min expiry)
- [ ] Implement refresh token generation (7 days expiry)
- [ ] Create JWT validation logic
- [ ] Store refresh tokens in Redis
- [ ] Test: Tokens generated and validated

**Acceptance**: JWT tokens work, validation passes

---

### Task 3.6: Auth Module - Endpoints & Guards

**Scope**: Create auth endpoints and protection

- [ ] Create `POST /auth/google` endpoint (exchange code for JWT)
- [ ] Create `POST /auth/refresh` endpoint (refresh access token)
- [ ] Create `POST /auth/logout` endpoint (invalidate session)
- [ ] Create `GET /auth/me` endpoint (get current user)
- [ ] Implement `JwtAuthGuard`
- [ ] Add guard to protected routes
- [ ] Test: All endpoints work
- [ ] Test: Guard blocks unauthorized requests

**Acceptance**: Auth endpoints functional, guards protect routes

---

## Phase 4: Auth Frontend (Tasks 19-24)

### Task 4.1: Web Auth - Google OAuth UI

**Scope**: Implement Google sign-in button

- [ ] Install `@react-oauth/google`, `axios`
- [ ] Create Google OAuth provider wrapper
- [ ] Create login page (`/login`)
- [ ] Add Google sign-in button component
- [ ] Implement OAuth callback handler
- [ ] Add loading states
- [ ] Test: Button renders, OAuth flow starts

**Acceptance**: Google OAuth button works, redirects to Google

---

### Task 4.2: Web Auth - State Management

**Scope**: Implement auth state with Zustand

- [ ] Install `zustand`
- [ ] Create auth store (user, tokens, isAuthenticated)
- [ ] Implement login action
- [ ] Implement logout action
- [ ] Implement token refresh logic
- [ ] Add axios interceptor for auth headers
- [ ] Test: State updates on login/logout

**Acceptance**: Auth state persists, tokens attached to requests

---

### Task 4.3: Web Auth - Protected Routes

**Scope**: Implement route protection

- [ ] Create `ProtectedRoute` wrapper component
- [ ] Implement redirect to login if unauthenticated
- [ ] Add loading state during auth check
- [ ] Protect dashboard routes
- [ ] Test: Unauthenticated users redirected
- [ ] Test: Authenticated users access dashboard

**Acceptance**: Route protection works, redirects functional

---

### Task 4.4: Mobile Auth - Google OAuth Flow

**Scope**: Implement Google OAuth on mobile

- [ ] Install `expo-auth-session`, `expo-web-browser`
- [ ] Create Google OAuth hook
- [ ] Implement OAuth flow with Expo AuthSession
- [ ] Create login screen with Google button
- [ ] Handle OAuth callback
- [ ] Test: OAuth flow completes
- [ ] Test: User data received

**Acceptance**: Mobile Google OAuth works end-to-end

---

### Task 4.5: Mobile Auth - Token Storage

**Scope**: Implement secure token storage

- [ ] Install `@react-native-async-storage/async-storage`, `expo-secure-store`
- [ ] Create secure storage service
- [ ] Implement token save/retrieve/delete
- [ ] Create auth context provider
- [ ] Implement auto-login on app launch
- [ ] Test: Tokens persist across app restarts
- [ ] Test: Auto-login works

**Acceptance**: Tokens stored securely, auto-login functional

---

### Task 4.6: Mobile Auth - UI Components

**Scope**: Create auth UI screens

- [ ] Create login screen with Google button
- [ ] Create loading screen during auth
- [ ] Create user profile screen
- [ ] Add logout button
- [ ] Implement navigation flow (login → home)
- [ ] Test: All screens render
- [ ] Test: Navigation works

**Acceptance**: Auth UI complete, navigation smooth

---

## Phase 5: Barcode Scanning Backend (Tasks 25-27)

### Task 5.1: Scans Module - Database Operations

**Scope**: Implement scan CRUD operations

- [ ] Create `ScansModule`
- [ ] Create `ScansService` with TypeORM repository
- [ ] Implement `create()` method
- [ ] Implement `findAll()` with pagination
- [ ] Implement `findOne()` method
- [ ] Implement `delete()` method
- [ ] Test: All CRUD operations work

**Acceptance**: Scan CRUD operations functional

---

### Task 5.2: Scans Module - API Endpoints

**Scope**: Create scan REST API

- [ ] Create `ScansController`
- [ ] Implement `POST /scans` (create scan)
- [ ] Implement `GET /scans` (list with pagination, filters)
- [ ] Implement `GET /scans/:id` (get single scan)
- [ ] Implement `DELETE /scans/:id` (delete scan)
- [ ] Add DTOs with validation
- [ ] Add `@UseGuards(JwtAuthGuard)` to all endpoints
- [ ] Test: All endpoints work with Postman

**Acceptance**: Scan API endpoints functional, protected

---

### Task 5.3: Scans Module - WebSocket Gateway

**Scope**: Implement real-time scan updates

- [ ] Install `@nestjs/websockets`, `@nestjs/platform-socket.io`
- [ ] Create `ScansGateway`
- [ ] Implement JWT authentication for WebSocket
- [ ] Emit `scan:created` event on new scan
- [ ] Emit `scan:deleted` event on delete
- [ ] Implement user-specific rooms
- [ ] Test: WebSocket connection works
- [ ] Test: Events received by clients

**Acceptance**: WebSocket events broadcast correctly

---

## Phase 6: Barcode Scanning Web (Tasks 28-30)

### Task 6.1: Web Scanner - Camera Component

**Scope**: Implement browser-based barcode scanner

- [ ] Install `@zxing/browser`
- [ ] Create `BarcodeScanner` component
- [ ] Request camera permissions
- [ ] Implement live video preview
- [ ] Add barcode detection logic
- [ ] Handle all formats (QR, EAN, UPC, Code128, DataMatrix, PDF417)
- [ ] Test: Camera opens, barcodes detected

**Acceptance**: Web scanner detects barcodes in real-time

---

### Task 6.2: Web Scanner - File Upload

**Scope**: Implement image file scanning

- [ ] Install `html5-qrcode`
- [ ] Create file upload component
- [ ] Implement image file selection
- [ ] Add barcode detection from image
- [ ] Display scan result
- [ ] Test: Upload image, barcode detected

**Acceptance**: File upload scanner works

---

### Task 6.3: Web Scanner - Scan History UI

**Scope**: Create scan history interface

- [ ] Create scan history page
- [ ] Implement scan list with pagination
- [ ] Add scan detail modal
- [ ] Implement delete scan button
- [ ] Add search and filter UI
- [ ] Connect to backend API
- [ ] Test: History displays, CRUD works

**Acceptance**: Scan history UI functional

---

## Phase 7: Barcode Scanning Mobile (Tasks 31-33)

### Task 7.1: Mobile Scanner - Camera Screen

**Scope**: Implement mobile barcode scanner

- [ ] Install `expo-camera`, `expo-barcode-scanner`
- [ ] Create camera screen
- [ ] Request camera permissions
- [ ] Implement barcode scanning
- [ ] Add haptic feedback on scan
- [ ] Handle all barcode formats
- [ ] Test: Camera opens, scans work

**Acceptance**: Mobile scanner detects barcodes

---

### Task 7.2: Mobile Scanner - Scan Result UI

**Scope**: Create scan result and history screens

- [ ] Create scan result screen
- [ ] Display barcode data
- [ ] Add save button
- [ ] Create scan history screen (FlatList)
- [ ] Implement pull-to-refresh
- [ ] Add scan detail screen
- [ ] Test: All screens render, navigation works

**Acceptance**: Scan UI complete, navigation smooth

---

### Task 7.3: Mobile Scanner - Batch Mode

**Scope**: Implement continuous scanning

- [ ] Add batch scanning toggle
- [ ] Implement continuous scan mode
- [ ] Queue scans in memory
- [ ] Add batch save functionality
- [ ] Show scan count indicator
- [ ] Test: Batch mode works

**Acceptance**: Continuous scanning functional

---

## Phase 8: Offline-First Mobile (Tasks 34-37)

### Task 8.1: Mobile SQLite - Database Setup

**Scope**: Create local SQLite database

- [ ] Install `expo-sqlite`
- [ ] Create database initialization script
- [ ] Create `scans` table schema
- [ ] Create `sync_queue` table schema
- [ ] Create `product_cache` table schema
- [ ] Implement database service
- [ ] Test: Database created, tables exist

**Acceptance**: SQLite database functional

---

### Task 8.2: Mobile SQLite - CRUD Operations

**Scope**: Implement local data operations

- [ ] Create SQLite service with CRUD methods
- [ ] Implement `insertScan()`
- [ ] Implement `getAllScans()`
- [ ] Implement `getScanById()`
- [ ] Implement `deleteScan()`
- [ ] Implement `updateScan()`
- [ ] Test: All CRUD operations work

**Acceptance**: Local CRUD operations functional

---

### Task 8.3: Mobile Offline - Detection & UI

**Scope**: Implement offline detection

- [ ] Create `useNetworkStatus` hook
- [ ] Detect online/offline state
- [ ] Create offline indicator component
- [ ] Show offline badge in UI
- [ ] Implement offline mode for scanning
- [ ] Test: Offline detection works
- [ ] Test: Scans save locally when offline

**Acceptance**: Offline mode works, scans saved locally

---

### Task 8.4: Mobile Offline - Auto-Sync

**Scope**: Implement sync on reconnection

- [ ] Create sync service
- [ ] Detect backend availability (health check)
- [ ] Implement upload offline scans
- [ ] Implement download new scans
- [ ] Add conflict resolution (timestamp-based)
- [ ] Clear sync queue on success
- [ ] Add retry logic with exponential backoff
- [ ] Test: Sync works on reconnection

**Acceptance**: Auto-sync functional, no duplicates

---

## Phase 9: Tailscale Integration (Tasks 38-40)

### Task 9.1: Backend Tailscale Configuration

**Scope**: Configure backend for Tailscale access

- [ ] Update backend to bind to `0.0.0.0`
- [ ] Configure CORS for Tailscale IP range (100.64.0.0/10)
- [ ] Add Tailscale IP to trusted proxies
- [ ] Create `/setup/tailscale-info` endpoint
- [ ] Test: Backend accessible via Tailscale IP

**Acceptance**: Backend accessible from Tailscale network

---

### Task 9.2: Web Tailscale Setup Guide

**Scope**: Create Tailscale setup UI

- [ ] Create Tailscale setup page
- [ ] Install `qrcode.react`
- [ ] Generate QR code with backend URL
- [ ] Add manual IP entry option
- [ ] Create connection test utility
- [ ] Test: QR code generates, test works

**Acceptance**: Setup guide functional, QR code displays

---

### Task 9.3: Mobile Tailscale Integration

**Scope**: Implement Tailscale connectivity

- [ ] Create Tailscale onboarding screen
- [ ] Install `expo-barcode-scanner` for QR scan
- [ ] Implement QR code scanner for backend URL
- [ ] Add manual IP entry
- [ ] Store backend URL in AsyncStorage
- [ ] Create connection test screen
- [ ] Add "Change Backend URL" in settings
- [ ] Test: QR scan works, connection test passes

**Acceptance**: Mobile connects via Tailscale from any network

---

## Phase 10: Product Lookup (Tasks 41-44)

### Task 10.1: Backend Product Lookup - API Clients

**Scope**: Implement external API integrations

- [ ] Install `axios`
- [ ] Create `ProductLookupModule`
- [ ] Implement Open Food Facts client
- [ ] Implement UPC Database client
- [ ] Implement Barcode Lookup client
- [ ] Add API key configuration from env
- [ ] Test: All API clients work

**Acceptance**: API clients fetch product data

---

### Task 10.2: Backend Product Lookup - Caching

**Scope**: Implement aggressive caching strategy

- [ ] Create caching service with Redis
- [ ] Implement cache-first lookup strategy
- [ ] Add cascade fallback (OFF → UPC → Barcode)
- [ ] Set TTL: 30 days for products
- [ ] Cache "not found" results (24 hours)
- [ ] Track API usage per day
- [ ] Test: Cache hit rate >90%

**Acceptance**: Caching works, API limits respected

---

### Task 10.3: Backend Product Lookup - Endpoint

**Scope**: Create product lookup API

- [ ] Create `ProductsController`
- [ ] Implement `GET /products/:barcode` endpoint
- [ ] Add rate limiting
- [ ] Return product data or "not found"
- [ ] Add cache statistics endpoint
- [ ] Test: Endpoint returns product data

**Acceptance**: Product lookup endpoint functional

---

### Task 10.4: Frontend Product Display

**Scope**: Create product detail UI (Web + Mobile)

**Web:**
- [ ] Create product detail component
- [ ] Display product info (name, brand, nutrition)
- [ ] Add nutrition grade visualization
- [ ] Show allergen warnings
- [ ] Display product images

**Mobile:**
- [ ] Create product detail screen
- [ ] Display product information
- [ ] Add nutrition facts card
- [ ] Show allergen badges
- [ ] Cache product data in SQLite

**Test**: Product details display correctly

**Acceptance**: Product UI works on both platforms

---

## Phase 11: Export Functionality (Tasks 45-47)

### Task 11.1: Backend Export - CSV & JSON

**Scope**: Implement CSV and JSON export

- [ ] Install `json2csv`
- [ ] Create `ExportModule`
- [ ] Implement `GET /export/csv` endpoint
- [ ] Implement `GET /export/json` endpoint
- [ ] Add filters (date range, barcode type)
- [ ] Implement pagination for large exports
- [ ] Test: CSV and JSON exports work

**Acceptance**: CSV and JSON exports functional

---

### Task 11.2: Backend Export - PDF & Excel

**Scope**: Implement PDF and Excel export

- [ ] Install `pdfkit`, `exceljs`
- [ ] Implement `GET /export/pdf` endpoint
- [ ] Create PDF template with charts
- [ ] Implement `GET /export/excel` endpoint
- [ ] Add multi-sheet Excel support
- [ ] Test: PDF and Excel exports work

**Acceptance**: PDF and Excel exports functional

---

### Task 11.3: Frontend Export UI

**Scope**: Create export interface (Web + Mobile)

**Web:**
- [ ] Create export modal
- [ ] Add format selector
- [ ] Implement date range picker
- [ ] Add filter options
- [ ] Create download trigger

**Mobile:**
- [ ] Install `expo-file-system`, `expo-sharing`
- [ ] Create export screen
- [ ] Add format selector
- [ ] Implement file download
- [ ] Add share functionality

**Test**: Export works on both platforms

**Acceptance**: All 4 formats export correctly

---

## Phase 12: Real-Time Sync (Tasks 48-49)

### Task 12.1: WebSocket Client - Web

**Scope**: Implement WebSocket on web

- [ ] Install `socket.io-client`
- [ ] Create WebSocket service
- [ ] Implement auto-reconnect logic
- [ ] Subscribe to scan events
- [ ] Update UI on real-time events
- [ ] Add connection status indicator
- [ ] Test: Real-time updates work

**Acceptance**: Web receives real-time scan updates

---

### Task 12.2: WebSocket Client - Mobile

**Scope**: Implement WebSocket on mobile

- [ ] Install `socket.io-client`
- [ ] Create WebSocket service
- [ ] Implement background connection
- [ ] Subscribe to scan events
- [ ] Update SQLite on events
- [ ] Add connection status indicator
- [ ] Test: Real-time updates work

**Acceptance**: Mobile receives real-time scan updates

---

## Phase 13: Analytics Dashboard (Tasks 50-52)

### Task 13.1: Analytics Backend - Event Tracking

**Scope**: Implement analytics event collection

- [ ] Create `AnalyticsModule`
- [ ] Implement `POST /analytics/event` endpoint
- [ ] Create event processor
- [ ] Implement user ID hashing (SHA-256)
- [ ] Send events to Supabase
- [ ] Test: Events tracked correctly

**Acceptance**: Analytics events sent to Supabase

---

### Task 13.2: Analytics Database Schema

**Scope**: Create analytics tables in Supabase

- [ ] Create `usage_stats` table
- [ ] Create `scan_metrics` table
- [ ] Create `error_stats` table
- [ ] Create `user_behavior` table
- [ ] Create `device_stats` table
- [ ] Create `api_metrics` table
- [ ] Test: Tables created, data inserted

**Acceptance**: Analytics database ready

---

### Task 13.3: Admin Dashboard - Charts & Metrics

**Scope**: Create analytics dashboard UI

- [ ] Install `recharts`
- [ ] Create overview page (total scans, users)
- [ ] Add daily scans trend chart
- [ ] Create barcode type pie chart
- [ ] Add success rate gauge
- [ ] Create retention cohort table
- [ ] Add device breakdown chart
- [ ] Implement date range filter
- [ ] Test: All charts render

**Acceptance**: Admin dashboard shows all metrics

---

## Phase 14: Advanced Features (Tasks 53-54)

### Task 14.1: Product Comparison

**Scope**: Implement product comparison feature

**Backend:**
- [ ] Create `POST /products/compare` endpoint
- [ ] Implement comparison logic

**Web:**
- [ ] Create comparison page
- [ ] Add side-by-side product view
- [ ] Display nutrition comparison

**Mobile:**
- [ ] Create comparison screen
- [ ] Add product selection UI

**Test**: Comparison works on both platforms

**Acceptance**: Product comparison functional

---

### Task 14.2: Advanced Search & Filters

**Scope**: Implement search and filtering

**Backend:**
- [ ] Add search endpoint with filters
- [ ] Implement dietary filters (vegan, gluten-free)
- [ ] Add batch delete endpoint

**Web:**
- [ ] Create advanced search UI
- [ ] Add filter dropdowns
- [ ] Implement batch selection

**Mobile:**
- [ ] Create search screen
- [ ] Add filter UI
- [ ] Implement batch mode

**Test**: Search and filters work

**Acceptance**: Advanced features functional

---

## Phase 15: Testing & Quality (Tasks 55-56)

### Task 15.1: Backend Testing

**Scope**: Achieve >75% test coverage

- [ ] Write unit tests for services (Jest)
- [ ] Write integration tests for endpoints (Supertest)
- [ ] Write E2E tests for user flows
- [ ] Set up test database
- [ ] Configure CI to run tests
- [ ] Test: Coverage >75%

**Acceptance**: All tests pass, coverage achieved

---

### Task 15.2: Frontend Testing

**Scope**: Test web and mobile

**Web:**
- [ ] Write component tests (Jest + RTL)
- [ ] Write E2E tests (Playwright)
- [ ] Add visual regression tests

**Mobile:**
- [ ] Write component tests (Jest)
- [ ] Write E2E tests (Detox)
- [ ] Test on multiple devices

**Test**: All tests pass

**Acceptance**: Frontend tests complete, coverage >75%

---

## Phase 16: Deployment (Tasks 57-58)

### Task 16.1: Documentation

**Scope**: Create comprehensive docs

- [ ] Write `README.md` with features and screenshots
- [ ] Create `INSTALLATION.md` with Tailscale setup
- [ ] Write `API_DOCUMENTATION.md`
- [ ] Create `CONTRIBUTING.md`
- [ ] Add `CHANGELOG.md`
- [ ] Create `LICENSE` file

**Acceptance**: All documentation complete

---

### Task 16.2: Production Deployment

**Scope**: Deploy to production

- [ ] Create `install.sh` one-click installer
- [ ] Build production Docker images
- [ ] Build production APK via EAS
- [ ] Upload APK to GitHub Releases
- [ ] Deploy admin dashboard to Vercel
- [ ] Configure monitoring (Sentry)
- [ ] Set up automated backups
- [ ] Test: Full system works in production

**Acceptance**: v1.0.0 deployed, all features working

---

## Task Dependency Graph

```mermaid
graph TD
    %% Phase 1: Foundation
    T1[1.1 Backend Setup] --> T2[1.2 Backend Docker]
    T2 --> T3[1.3 Health Checks]
    T3 --> T4[1.4 API Docs]
    
    T5[1.5 Web Setup] --> T6[1.6 Web Docker]
    T7[1.7 Mobile Setup]
    T8[1.8 Admin Setup]
    
    %% Phase 2: CI/CD
    T2 --> T9[2.1 Backend CI/CD]
    T6 --> T10[2.2 Web CI/CD]
    T7 --> T11[2.3 Mobile CI/CD]
    T8 --> T12[2.4 Admin CI/CD]
    
    %% Phase 3: Database & Auth Backend
    T4 --> T13[3.1 DB Schema]
    T13 --> T14[3.2 DB Indexes]
    T4 --> T15[3.3 Redis Setup]
    T13 --> T16[3.4 Google OAuth]
    T16 --> T17[3.5 JWT Service]
    T17 --> T18[3.6 Auth Endpoints]
    
    %% Phase 4: Auth Frontend
    T18 --> T19[4.1 Web OAuth UI]
    T19 --> T20[4.2 Web Auth State]
    T20 --> T21[4.3 Web Protected Routes]
    
    T18 --> T22[4.4 Mobile OAuth]
    T22 --> T23[4.5 Mobile Token Storage]
    T23 --> T24[4.6 Mobile Auth UI]
    
    %% Phase 5: Scanning Backend
    T18 --> T25[5.1 Scans DB Ops]
    T25 --> T26[5.2 Scans API]
    T26 --> T27[5.3 WebSocket]
    
    %% Phase 6: Scanning Web
    T26 --> T28[6.1 Web Scanner]
    T28 --> T29[6.2 Web File Upload]
    T29 --> T30[6.3 Web History]
    
    %% Phase 7: Scanning Mobile
    T26 --> T31[7.1 Mobile Scanner]
    T31 --> T32[7.2 Mobile History]
    T32 --> T33[7.3 Batch Mode]
    
    %% Phase 8: Offline
    T31 --> T34[8.1 SQLite Setup]
    T34 --> T35[8.2 SQLite CRUD]
    T35 --> T36[8.3 Offline Detection]
    T36 --> T37[8.4 Auto-Sync]
    
    %% Phase 9: Tailscale
    T26 --> T38[9.1 Backend Tailscale]
    T38 --> T39[9.2 Web Tailscale]
    T38 --> T40[9.3 Mobile Tailscale]
    
    %% Phase 10: Product Lookup
    T15 --> T41[10.1 API Clients]
    T41 --> T42[10.2 Caching]
    T42 --> T43[10.3 Lookup Endpoint]
    T43 --> T44[10.4 Product UI]
    
    %% Phase 11: Export
    T26 --> T45[11.1 CSV/JSON Export]
    T45 --> T46[11.2 PDF/Excel Export]
    T46 --> T47[11.3 Export UI]
    
    %% Phase 12: Real-time
    T27 --> T48[12.1 WebSocket Web]
    T27 --> T49[12.2 WebSocket Mobile]
    
    %% Phase 13: Analytics
    T26 --> T50[13.1 Analytics Backend]
    T50 --> T51[13.2 Analytics DB]
    T51 --> T52[13.3 Dashboard Charts]
    
    %% Phase 14: Advanced
    T43 --> T53[14.1 Comparison]
    T26 --> T54[14.2 Search/Filters]
    
    %% Phase 15: Testing
    T54 --> T55[15.1 Backend Tests]
    T54 --> T56[15.2 Frontend Tests]
    
    %% Phase 16: Deployment
    T55 --> T57[16.1 Documentation]
    T56 --> T57
    T57 --> T58[16.2 Production Deploy]
```

---

## Progress Tracking

**Total Tasks**: 58  
**Completed**: 0  
**In Progress**: 0  
**Remaining**: 58

---

## Implementation Guidelines

### For Each Task:

1. **Read Task Scope** - Understand single responsibility
2. **Check Dependencies** - Ensure prerequisite tasks complete
3. **Implement Checkboxes** - Complete all items
4. **Test Locally** - Verify acceptance criteria
5. **Commit** - Git commit with descriptive message
6. **Mark Complete** - Update task status

### Code Quality:
- TypeScript strict mode, no `any`
- Error handling with try-catch
- Input validation with DTOs
- Structured logging
- Unit tests for critical logic

### Git Workflow:
```bash
git checkout -b task-X.Y-description
# Implement task
git add .
git commit -m "feat(component): implement feature X"
git push origin task-X.Y-description
```

---

## Success Metrics

- ✅ Each task completable in 1-2 AI sessions
- ✅ Clear acceptance criteria
- ✅ Minimal context switching
- ✅ Independent testing
- ✅ Bug-free implementation
- ✅ >90% first-time success rate

---

**End of Modular Task List**
