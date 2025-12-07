# Phase 5: Scanning Backend - AI Implementation Prompts

> **3 Tasks**: Scan CRUD operations, REST API, WebSocket real-time updates
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 5.1: Backend Scans - Database Operations

**TASK**: Implement comprehensive scan CRUD operations with TypeORM repository pattern, pagination, and filtering.

**SYSTEM CONTEXT**: Core scanning functionality. All scan data flows through these operations. Must handle high volume (thousands of scans per user) with efficient queries.

**REQUIREMENTS**:

1. **Scans Module**: Create ScansModule with proper imports
2. **Scans Service**: Create ScansService with TypeORM repository injection
3. **Create Method**: Implement `create(userId, createScanDto)` that:
   - Validates barcode data
   - Associates scan with user
   - Stores metadata (device type, location if provided)
   - Returns created scan entity
4. **Find All Method**: Implement `findAll(userId, pagination, filters)` with:
   - User-scoped queries (only user's scans)
   - Pagination (page, limit)
   - Filtering by barcode_type, date range, device_type
   - Sorting by scanned_at DESC
5. **Find One Method**: Implement `findOne(userId, scanId)` with user ownership validation
6. **Delete Method**: Implement `delete(userId, scanId)` with user ownership validation
7. **Bulk Create**: Implement `bulkCreate(userId, scans[])` with transaction support

**CONSTRAINTS**:
- All operations must be user-scoped (prevent access to other users' scans)
- Bulk operations must use database transactions
- Queries must use indexes for performance
- Must handle duplicate barcode scans gracefully

**INTEGRATION POINTS**:
- Uses Scan entity from Task 3.1
- Will be called by ScansController (Task 5.2)
- Will trigger WebSocket events (Task 5.3)

**TESTING REQUIREMENTS**:
1. Create scan successfully
2. Find all scans with pagination
3. Find all with filters (date range, type)
4. Find one scan by ID
5. Delete scan successfully
6. Bulk create with transaction rollback on error
7. User cannot access other users' scans

**ACCEPTANCE CRITERIA**:
- ✅ All CRUD operations functional
- ✅ User-scoped queries enforced
- ✅ Pagination working correctly
- ✅ Filters applied correctly

**QUALITY STANDARDS**:
- Use TypeORM repository pattern
- Implement proper error handling
- Use transactions for bulk operations
- Validate user ownership on all operations
- Log all database operations

**DELIVERABLES**:
- ScansModule implementation
- ScansService with all CRUD methods
- Unit tests for all methods
- Integration tests with database

**SUCCESS METRIC**: Scan CRUD operations handle high volume efficiently with proper user isolation.

---

## Task 5.2: Backend Scans - API Endpoints

**TASK**: Create REST API endpoints for scan operations with validation, authentication, and bulk operations.

**SYSTEM CONTEXT**: Public API for scan management. Frontend applications (web, mobile) will use these endpoints for all scan operations.

**REQUIREMENTS**:

1. **Scans Controller**: Create ScansController with route prefix `/scans`
2. **Create Endpoint**: `POST /scans`
   - Accept CreateScanDto (barcode_data, barcode_type, device_type, metadata)
   - Validate input with class-validator
   - Call ScansService.create()
   - Return 201 Created with scan data
3. **Bulk Create Endpoint**: `POST /scans/bulk`
   - Accept BulkCreateScansDto (scans array)
   - Implement deduplication logic (same barcode + timestamp within 1 minute)
   - Call ScansService.bulkCreate()
   - Return 201 with created scans count
4. **List Endpoint**: `GET /scans`
   - Accept query params (page, limit, barcode_type, start_date, end_date, device_type)
   - Validate with ScanFilterDto
   - Call ScansService.findAll()
   - Return paginated response with metadata (total, page, pages)
5. **Get One Endpoint**: `GET /scans/:id`
   - Validate UUID format
   - Call ScansService.findOne()
   - Return 404 if not found or not owned by user
6. **Incremental Sync Endpoint**: `GET /scans/since/:timestamp`
   - Accept timestamp parameter
   - Return all scans created/updated since timestamp
   - Support pagination for large result sets
7. **Delete Endpoint**: `DELETE /scans/:id`
   - Validate UUID format
   - Call ScansService.delete()
   - Return 204 No Content
8. **Guards**: Apply `@UseGuards(JwtAuthGuard)` to all endpoints
9. **Swagger Documentation**: Add @ApiOperation, @ApiResponse decorators

**CONSTRAINTS**:
- All endpoints must require authentication
- Input validation must be comprehensive
- Bulk endpoint must handle up to 1000 scans
- Deduplication must be efficient
- Must return consistent error format

**INTEGRATION POINTS**:
- Uses ScansService from Task 5.1
- Triggers WebSocket events (Task 5.3)
- Web scanner will call these endpoints (Task 6.1-6.3)
- Mobile scanner will call these endpoints (Task 7.3)

**TESTING REQUIREMENTS**:
1. POST /scans creates scan successfully
2. POST /scans/bulk handles duplicates correctly
3. GET /scans returns paginated results
4. GET /scans with filters works correctly
5. GET /scans/:id returns scan
6. GET /scans/since/:timestamp returns incremental data
7. DELETE /scans/:id deletes scan
8. All endpoints reject unauthenticated requests
9. Endpoints return 404 for non-existent scans

**ACCEPTANCE CRITERIA**:
- ✅ All endpoints functional
- ✅ Authentication enforced
- ✅ Validation working
- ✅ Swagger documentation complete

**QUALITY STANDARDS**:
- Follow REST best practices
- Use proper HTTP status codes
- Implement comprehensive validation
- Return detailed error messages
- Log all API requests

**DELIVERABLES**:
- ScansController with all endpoints
- DTOs with validation decorators
- Swagger documentation
- API tests (Postman/Jest)

**SUCCESS METRIC**: Complete scan API with authentication, validation, and bulk operations.

---

## Task 5.3: Backend Scans - WebSocket Gateway

**TASK**: Implement WebSocket gateway for real-time scan updates with JWT authentication and user-scoped rooms.

**SYSTEM CONTEXT**: Enables real-time synchronization across devices. When user scans on mobile, web app updates instantly. Critical for multi-device experience.

**REQUIREMENTS**:

1. **Installation**: Install `@nestjs/websockets`, `@nestjs/platform-socket.io`
2. **Scans Gateway**: Create ScansGateway with @WebSocketGateway decorator
3. **JWT Middleware**: Implement WebSocket middleware for authentication:
   - Extract token from `socket.handshake.auth.token` (preferred)
   - Fallback to `socket.handshake.query.token` for compatibility
   - Validate token using JwtService.verify()
   - Reject connection with error if token invalid/missing
   - Extract user ID from token payload
   - Attach user to socket: `socket.data.user = decodedToken`
4. **Connection Handling**: Implement `handleConnection(socket)`:
   - Validate authentication (middleware should handle)
   - Join user to private room: `socket.join(`user:${userId}`)`
   - Log connection event
5. **Disconnection Handling**: Implement `handleDisconnect(socket)`:
   - Leave user room
   - Clean up socket data
   - Log disconnection
6. **Event Emitters**: Emit events to user rooms:
   - `scan:created` when new scan created (from ScansService)
   - `scan:deleted` when scan deleted (from ScansService)
   - Include full scan data in event payload
7. **Integration**: Call gateway methods from ScansService after database operations

**CONSTRAINTS**:
- Only authenticated users can connect
- Users must only receive their own scan events
- Must handle connection failures gracefully
- Must support multiple concurrent connections per user
- Token validation must be secure

**INTEGRATION POINTS**:
- Uses JwtService from Task 3.5
- Called by ScansService after CRUD operations
- Web client will connect (Task 12.1)
- Mobile client will connect (Task 12.2)

**TESTING REQUIREMENTS**:
1. Connection succeeds with valid token in auth object
2. Connection succeeds with valid token in query param
3. Connection rejected with missing token
4. Connection rejected with invalid token
5. User joins correct room on connection
6. scan:created event received only by scan owner
7. scan:deleted event received only by scan owner
8. Multiple connections per user supported
9. Events not leaked to other users

**ACCEPTANCE CRITERIA**:
- ✅ WebSocket authentication working
- ✅ User rooms functional
- ✅ Events broadcast correctly
- ✅ No event leakage between users

**QUALITY STANDARDS**:
- Follow Socket.IO best practices
- Implement proper error handling
- Use user-scoped rooms for security
- Log all connection events
- Handle edge cases (rapid connect/disconnect)

**DELIVERABLES**:
- ScansGateway implementation
- JWT middleware for WebSocket
- Event emitters in ScansService
- WebSocket tests

**SUCCESS METRIC**: Real-time scan updates work securely across multiple devices per user.

---

**END OF PHASE 5**
