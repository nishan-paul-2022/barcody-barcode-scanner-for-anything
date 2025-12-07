# Phase 3: Database & Auth Backend - AI Implementation Prompts

> **6 Tasks**: PostgreSQL schema, Redis caching, Google OAuth, JWT authentication
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 3.1: Database Schema Setup

**TASK**: Create production-ready PostgreSQL schema with TypeORM, migrations, connection pooling, seeds, and comprehensive testing infrastructure.

**SYSTEM CONTEXT**: Foundation for all data persistence. Schema design must support multi-user scanning, sessions, and future analytics. Connection pooling critical for performance under load.

**REQUIREMENTS**:

1. **TypeORM Installation**: Install `@nestjs/typeorm`, `typeorm`, `pg`
2. **TypeORM Configuration**: Configure in AppModule with connection pooling:
   - max: 50 connections
   - min: 10 connections
   - idleTimeoutMillis: 30000
   - connectionTimeoutMillis: 2000
3. **DataSource Export**: Create `backend/src/config/typeorm.config.ts` for CLI operations
4. **Directory Structure**: Create `migrations/` and `database/seeds/`
5. **User Entity**: Create with fields:
   - id: UUID (primary key)
   - google_id: string (unique, indexed)
   - email: string (unique)
   - created_at: timestamp
   - last_login: timestamp (nullable)
6. **Session Entity**: Create with fields:
   - id: UUID (primary key)
   - user_id: UUID (foreign key to users)
   - session_token: string (unique, indexed)
   - expires_at: timestamp
7. **Scan Entity**: Create with fields:
   - id: UUID (primary key)
   - user_id: UUID (foreign key to users)
   - barcode_data: string (indexed)
   - barcode_type: enum (EAN13, UPC, QR, etc.)
   - raw_data: text
   - scanned_at: timestamp (indexed)
   - device_type: enum (web, mobile)
   - metadata: JSONB (for extensibility)
8. **Migration Scripts**: Add to package.json:
   - migration:generate
   - migration:run
   - migration:revert
   - seed
9. **Initial Migration**: Generate with `npm run migration:generate -- -n InitialSchema`
10. **Rollback Migration**: Implement down() method with DROP TABLE in reverse order (scans, sessions, users)
11. **Seed Script**: Create with development data (1 user, 50 scans with various types)
12. **Test Infrastructure**: Create directories:
    - test/unit/
    - test/integration/
    - test/e2e/
    - test/fixtures/
    - test/helpers/

**CONSTRAINTS**:
- All IDs must be UUIDs (not auto-increment)
- All timestamps must use timezone-aware types
- Foreign keys must have ON DELETE CASCADE
- Migrations must be reversible
- Connection pool must handle concurrent requests

**INTEGRATION POINTS**:
- Auth module will use User and Session entities
- Scanning module will use Scan entity
- Analytics will query Scan entity

**TESTING REQUIREMENTS**:
1. Migration runs up successfully
2. Migration rolls back without errors
3. Seed populates database correctly
4. Connection pool handles 100 concurrent connections
5. Foreign key constraints enforced
6. Indexes improve query performance

**ACCEPTANCE CRITERIA**:
- ✅ All tables created with correct schema
- ✅ Migrations reversible
- ✅ Seeds populate test data
- ✅ Connection pooling functional
- ✅ Test infrastructure ready

**QUALITY STANDARDS**:
- Follow TypeORM best practices
- Use proper TypeScript types
- Implement comprehensive error handling
- Document all entity relationships
- Use transactions for data consistency

**DELIVERABLES**:
- User, Session, Scan entities
- Initial migration files
- Seed scripts
- TypeORM configuration
- Test directory structure
- Migration scripts in package.json

**SUCCESS METRIC**: Database schema supports all application features with proper relationships and performance optimization.

---

## Task 3.2: Database Indexes & Performance

**TASK**: Add strategic database indexes to optimize query performance for common access patterns.

**SYSTEM CONTEXT**: Indexes dramatically improve query performance but add overhead to writes. Must index based on actual query patterns: user lookups, session validation, scan history retrieval.

**REQUIREMENTS**:

1. **User Indexes**: Add index on `users.google_id` for OAuth lookups
2. **Session Indexes**: Add index on `sessions.session_token` for session validation
3. **Scan Indexes**:
   - Composite index on `scans(user_id, scanned_at DESC)` for user scan history
   - Index on `scans.barcode_data` for barcode lookups
4. **Migration Generation**: Create new migration for indexes
5. **Index Naming**: Use descriptive names (idx_users_google_id, idx_sessions_token, etc.)

**CONSTRAINTS**:
- Indexes must not duplicate existing primary key indexes
- Composite index column order must match query patterns
- Index size must be monitored
- Must not over-index (impacts write performance)

**INTEGRATION POINTS**:
- Auth queries will use google_id and session_token indexes
- Scan history queries will use composite index
- Product lookup will use barcode_data index

**TESTING REQUIREMENTS**:
1. Indexes created successfully
2. Query plans show index usage (EXPLAIN ANALYZE)
3. Scan history query <100ms for 10k records
4. Session validation <50ms
5. User lookup by google_id <50ms

**ACCEPTANCE CRITERIA**:
- ✅ All indexes created
- ✅ Query performance improved
- ✅ EXPLAIN shows index usage
- ✅ No duplicate indexes

**QUALITY STANDARDS**:
- Analyze query patterns before indexing
- Use EXPLAIN ANALYZE to verify index usage
- Monitor index size and maintenance overhead
- Document index purpose

**DELIVERABLES**:
- Index migration file
- Performance test results
- Query plan analysis

**SUCCESS METRIC**: All common queries use indexes and meet performance targets.

---

## Task 3.3: Redis Setup

**TASK**: Configure Redis for session storage, caching, and rate limiting with health monitoring.

**SYSTEM CONTEXT**: Redis provides fast in-memory caching for sessions, API responses, and rate limiting. Critical for application performance and scalability.

**REQUIREMENTS**:

1. **Installation**: Install `@nestjs/cache-manager`, `cache-manager-redis-store`, `ioredis`
2. **Redis Module**: Create dedicated RedisModule
3. **Connection Configuration**: Configure from environment (REDIS_URL)
4. **Cache Service**: Implement wrapper service with methods:
   - get(key): Retrieve cached value
   - set(key, value, ttl): Store with expiration
   - del(key): Delete cached value
   - flush(): Clear all cache
5. **Health Check**: Add Redis health indicator to health module
6. **Error Handling**: Implement graceful degradation if Redis unavailable
7. **Connection Pooling**: Configure connection pool settings

**CONSTRAINTS**:
- Must handle Redis connection failures gracefully
- Cache misses must not break application
- TTL must be configurable per cache entry
- Must support key namespacing

**INTEGRATION POINTS**:
- Auth module will store refresh tokens in Redis
- Product lookup will cache API responses
- Rate limiting will use Redis counters
- Session storage will use Redis

**TESTING REQUIREMENTS**:
1. Redis connection successful
2. Cache set/get operations work
3. TTL expiration works correctly
4. Health check reports Redis status
5. Application handles Redis downtime gracefully
6. Cache invalidation works

**ACCEPTANCE CRITERIA**:
- ✅ Redis connected and functional
- ✅ Cache operations working
- ✅ Health check integrated
- ✅ Graceful error handling

**QUALITY STANDARDS**:
- Use connection pooling
- Implement proper error handling
- Set appropriate TTLs
- Use key namespacing for organization
- Monitor Redis memory usage

**DELIVERABLES**:
- RedisModule implementation
- Cache service wrapper
- Health check integration
- Error handling logic

**SUCCESS METRIC**: Redis caching functional with graceful degradation on failures.

---

## Task 3.4: Auth Module - Google OAuth Strategy

**TASK**: Implement Google OAuth 2.0 authentication strategy using Passport with user creation/retrieval.

**SYSTEM CONTEXT**: Primary authentication method. Users sign in with Google, backend validates OAuth token, creates/retrieves user record, and issues JWT.

**REQUIREMENTS**:

1. **Installation**: Install `@nestjs/passport`, `passport`, `passport-google-oauth20`
2. **Auth Module**: Create AuthModule with proper imports
3. **Google Strategy**: Implement Passport Google OAuth strategy with:
   - Client ID from environment
   - Client secret from environment
   - Callback URL from environment
   - Scope: profile, email
4. **User Validation**: Implement validate() method to:
   - Check if user exists by google_id
   - Create new user if not exists
   - Update last_login timestamp
   - Return user object
5. **Auth Controller**: Create with routes:
   - GET /auth/google (initiates OAuth)
   - GET /auth/google/callback (handles OAuth callback)
6. **Guards**: Implement GoogleAuthGuard

**CONSTRAINTS**:
- Must validate OAuth tokens with Google
- Must handle OAuth errors gracefully
- User creation must be atomic (use transactions)
- Must not expose sensitive data in responses

**INTEGRATION POINTS**:
- Uses User entity from Task 3.1
- Will generate JWT in Task 3.5
- Frontend will redirect to /auth/google

**TESTING REQUIREMENTS**:
1. OAuth redirect to Google works
2. Callback receives user data from Google
3. New user created on first login
4. Existing user retrieved on subsequent logins
5. last_login updated correctly
6. OAuth errors handled gracefully

**ACCEPTANCE CRITERIA**:
- ✅ Google OAuth flow completes
- ✅ User data received and validated
- ✅ User created/retrieved correctly
- ✅ Error handling functional

**QUALITY STANDARDS**:
- Follow Passport.js best practices
- Validate all OAuth responses
- Use transactions for user creation
- Log authentication events
- Implement proper error messages

**DELIVERABLES**:
- Google OAuth strategy
- Auth controller with routes
- User creation/retrieval logic
- OAuth guards

**SUCCESS METRIC**: Users can authenticate with Google and user records are managed correctly.

---

## Task 3.5: Auth Module - JWT Service

**TASK**: Implement JWT token generation and validation with access/refresh token pattern and Redis storage.

**SYSTEM CONTEXT**: JWT provides stateless authentication. Access tokens (short-lived) for API requests, refresh tokens (long-lived) stored in Redis for token renewal.

**REQUIREMENTS**:

1. **Installation**: Install `@nestjs/jwt`
2. **JWT Service**: Create wrapper service with methods:
   - generateAccessToken(userId): 15-minute expiry
   - generateRefreshToken(userId): 7-day expiry
   - validateAccessToken(token): Verify and decode
   - validateRefreshToken(token): Verify and check Redis
3. **Token Payload**: Include userId, email, iat, exp
4. **Refresh Token Storage**: Store in Redis with user ID as key
5. **Token Rotation**: Invalidate old refresh token when issuing new one
6. **Secret Management**: Use JWT_SECRET from environment
7. **Algorithm**: Use HS256 for signing

**CONSTRAINTS**:
- Access tokens must be short-lived (15 minutes)
- Refresh tokens must be stored in Redis
- Must validate token expiration
- Must handle token tampering
- Secrets must never be logged or exposed

**INTEGRATION POINTS**:
- Auth endpoints will use this service
- Guards will validate access tokens
- Refresh endpoint will use refresh tokens

**TESTING REQUIREMENTS**:
1. Access tokens generated with correct expiry
2. Refresh tokens generated and stored in Redis
3. Token validation works correctly
4. Expired tokens rejected
5. Tampered tokens rejected
6. Refresh token rotation works

**ACCEPTANCE CRITERIA**:
- ✅ JWT generation functional
- ✅ Token validation working
- ✅ Refresh tokens in Redis
- ✅ Expiration enforced

**QUALITY STANDARDS**:
- Use strong JWT secrets (minimum 32 characters)
- Implement proper token validation
- Handle edge cases (expired, malformed, missing)
- Log security events
- Use constant-time comparison for secrets

**DELIVERABLES**:
- JWT service implementation
- Token generation methods
- Token validation methods
- Redis integration for refresh tokens

**SUCCESS METRIC**: JWT tokens generated, validated, and refreshed securely.

---

## Task 3.6: Auth Module - Endpoints & Guards

**TASK**: Create authentication REST endpoints and JWT guard for route protection.

**SYSTEM CONTEXT**: Public API for authentication operations. Guards protect all authenticated routes across the application.

**REQUIREMENTS**:

1. **Endpoints**: Create in AuthController:
   - POST /auth/google: Exchange OAuth code for JWT tokens
   - POST /auth/refresh: Refresh access token using refresh token
   - POST /auth/logout: Invalidate session and refresh token
   - GET /auth/me: Get current authenticated user
2. **JWT Auth Guard**: Implement guard that:
   - Extracts token from Authorization header
   - Validates token using JWT service
   - Attaches user to request object
   - Returns 401 for invalid/missing tokens
3. **Request DTOs**: Create for:
   - GoogleAuthDto (code: string)
   - RefreshTokenDto (refreshToken: string)
4. **Response DTOs**: Create for:
   - AuthResponseDto (accessToken, refreshToken, user)
   - UserDto (id, email, createdAt)
5. **Guard Application**: Apply JwtAuthGuard to protected routes
6. **Swagger Documentation**: Add API documentation for all endpoints

**CONSTRAINTS**:
- All endpoints must validate input
- Passwords must never be returned
- Tokens must be returned securely
- Guards must be reusable across modules
- Must handle concurrent requests

**INTEGRATION POINTS**:
- Uses Google OAuth strategy from Task 3.4
- Uses JWT service from Task 3.5
- Guards will protect scan endpoints (Task 5.2)

**TESTING REQUIREMENTS**:
1. POST /auth/google returns tokens
2. POST /auth/refresh issues new access token
3. POST /auth/logout invalidates refresh token
4. GET /auth/me returns current user
5. Guard blocks requests without token
6. Guard blocks requests with invalid token
7. Guard allows requests with valid token

**ACCEPTANCE CRITERIA**:
- ✅ All endpoints functional
- ✅ Guards protect routes correctly
- ✅ DTOs validate input
- ✅ Swagger documentation complete

**QUALITY STANDARDS**:
- Follow REST best practices
- Implement proper HTTP status codes
- Validate all inputs
- Return consistent error format
- Log authentication events

**DELIVERABLES**:
- Auth endpoints implementation
- JWT auth guard
- Request/response DTOs
- Swagger documentation
- Guard tests

**SUCCESS METRIC**: Complete authentication API with working route protection.

---

**END OF PHASE 3**
