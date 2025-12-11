# Phase 8: Offline-First Mobile - AI Implementation Prompts

> **4 Tasks**: SQLite database, CRUD operations, offline detection, auto-sync
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 8.1: Mobile SQLite - Database Setup

```
TASK: Create local SQLite database with optimized schema and indexes for offline-first mobile app.

SYSTEM CONTEXT: Local database for offline functionality. Must store scans, sync queue, and product cache efficiently with proper indexing for performance.

REQUIREMENTS:

1. Dependencies: Install expo-sqlite
2. Database Initialization: Create database initialization script
3. Scans Table: CREATE TABLE scans (
   - id TEXT PRIMARY KEY
   - barcode_data TEXT NOT NULL
   - barcode_type TEXT NOT NULL
   - product_info TEXT (JSON)
   - scanned_at INTEGER NOT NULL
   - synced INTEGER DEFAULT 0
   - device_type TEXT DEFAULT 'mobile'
   - metadata TEXT (JSON)
   )
4. Sync Queue Table: CREATE TABLE sync_queue (
   - id TEXT PRIMARY KEY
   - scan_id TEXT
   - action TEXT CHECK(action IN ('create','update','delete'))
   - payload TEXT (JSON)
   - retry_count INTEGER DEFAULT 0
   - max_retries INTEGER DEFAULT 3
   - status TEXT CHECK(status IN ('pending','in_progress','failed','completed'))
   - created_at INTEGER NOT NULL
   - last_attempt_at INTEGER
   - error_message TEXT
   )
5. Product Cache Table: CREATE TABLE product_cache (
   - barcode TEXT PRIMARY KEY
   - product_data TEXT (JSON) NOT NULL
   - cached_at INTEGER NOT NULL
   - expires_at INTEGER NOT NULL
   )
6. Indexes: Create performance indexes:
   - CREATE INDEX idx_scans_scanned_at ON scans(scanned_at DESC)
   - CREATE INDEX idx_scans_synced ON scans(synced)
   - CREATE INDEX idx_scans_barcode ON scans(barcode_data)
   - CREATE INDEX idx_product_cache_barcode ON product_cache(barcode)
   - CREATE INDEX idx_sync_queue_status ON sync_queue(status)
7. Database Service: Implement database service with initialization
8. Migration Support: Handle schema migrations for future updates

CONSTRAINTS:
- Efficient schema design
- Proper indexes for common queries
- Handle large datasets (10k+ scans)
- Fast query performance

INTEGRATION POINTS:
- CRUD operations (Task 8.2)
- Offline detection (Task 8.3)
- Auto-sync (Task 8.4)

TESTING REQUIREMENTS:
1. Database created successfully
2. All tables exist
3. Indexes created
4. Can insert and query data
5. Query performance on large datasets

ACCEPTANCE CRITERIA:
- ✅ Database initialized
- ✅ All tables created
- ✅ Indexes functional
- ✅ Fast queries
- ✅ Migration support

QUALITY STANDARDS:
- Normalized schema
- Proper indexing
- Efficient queries
- Error handling

DELIVERABLES:
- Database initialization script
- Table schemas
- Index definitions
- Database service
- Migration support

SUCCESS METRIC: SQLite database provides fast offline storage with proper indexing.
```

---

## Task 8.2: Mobile SQLite - CRUD Operations

```
TASK: Implement comprehensive CRUD operations for local SQLite database.

SYSTEM CONTEXT: Data access layer for offline storage. All offline operations go through these methods.

REQUIREMENTS:

1. SQLite Service: Create SQLite service with CRUD methods
2. Insert Scan: insertScan(scan) - Add new scan to database
3. Get All Scans: getAllScans(limit, offset) - Paginated scan retrieval
4. Get Scan By ID: getScanById(id) - Retrieve single scan
5. Update Scan: updateScan(id, updates) - Update scan fields
6. Delete Scan: deleteScan(id) - Remove scan from database
7. Get Unsynced Scans: getUnsyncedScans() - Get scans where synced=0
8. Mark Synced: markSynced(id) - Set synced=1 for scan
9. Bulk Insert: bulkInsertScans(scans[]) - Insert multiple scans efficiently
10. Transaction Support: Use transactions for bulk operations
11. Error Handling: Proper error handling for all operations

CONSTRAINTS:
- Type-safe operations
- Efficient bulk operations
- Proper transaction handling
- Error recovery

INTEGRATION POINTS:
- Scanner saves to SQLite (Task 7.3)
- Sync reads from SQLite (Task 8.4)
- History displays from SQLite

TESTING REQUIREMENTS:
1. Insert scan works
2. Get all scans returns data
3. Get by ID works
4. Update modifies scan
5. Delete removes scan
6. Bulk insert efficient
7. Transactions work

ACCEPTANCE CRITERIA:
- ✅ All CRUD methods functional
- ✅ Bulk operations efficient
- ✅ Transactions working
- ✅ Error handling robust

QUALITY STANDARDS:
- Clean API
- Type-safe
- Efficient queries
- Proper error handling

DELIVERABLES:
- SQLite service with CRUD methods
- Transaction support
- Error handling
- Type definitions

SUCCESS METRIC: All local data operations work efficiently with proper error handling.
```

---

## Task 8.3: Mobile Offline - Detection & UI

```
TASK: Implement network status detection with offline UI indicators.

SYSTEM CONTEXT: Users must know when they're offline. App should gracefully handle offline state and provide clear feedback.

REQUIREMENTS:

1. Network Hook: Create useNetworkStatus custom hook
2. Online/Offline Detection: Use NetInfo to detect network state
3. Connection Type: Detect wifi, cellular, none
4. Offline Indicator: Create offline badge component
5. UI Integration: Show offline badge in header/status bar
6. Offline Mode: Enable offline scanning mode automatically
7. Visual Feedback: Different UI states for online/offline
8. Scan Behavior: Save to SQLite when offline
9. Queue Indicator: Show number of pending syncs
10. Reconnection Detection: Detect when back online

CONSTRAINTS:
- Real-time network detection
- Clear visual feedback
- Non-intrusive UI
- Fast state updates

INTEGRATION POINTS:
- SQLite storage (Task 8.2)
- Auto-sync (Task 8.4)
- Scanner (Task 7.2)

TESTING REQUIREMENTS:
1. Detects offline correctly
2. Detects online correctly
3. Offline badge displays
4. Scans save locally when offline
5. Queue count shows
6. Reconnection detected

ACCEPTANCE CRITERIA:
- ✅ Network detection working
- ✅ Offline indicator displays
- ✅ Offline mode functional
- ✅ Queue indicator shows
- ✅ Reconnection detected

QUALITY STANDARDS:
- Accurate detection
- Clear UI feedback
- Smooth transitions
- Non-intrusive

DELIVERABLES:
- useNetworkStatus hook
- Offline indicator component
- Queue indicator
- Offline mode logic

SUCCESS METRIC: Users always know their connection status and app works seamlessly offline.
```

---

## Task 8.4: Mobile Offline - Auto-Sync

```
TASK: Implement automatic synchronization with backend when connection restored, including deduplication and retry logic.

SYSTEM CONTEXT: Critical for offline-first experience. Must sync local changes to backend without creating duplicates, with robust retry mechanism.

REQUIREMENTS:

1. Sync Service: Create sync service for bidirectional sync
2. Backend Health Check: Detect backend availability before sync
3. Upload Offline Scans: POST unsynced scans to backend
4. Download New Scans: GET scans from backend since last sync
5. Deduplication: Implement using composite key:
   - Combine: barcode_data + scanned_at (rounded to second) + user_id
   - Generate SHA-256 hash of composite key
   - Check if hash exists before insert
   - Skip if duplicate found
6. Conflict Resolution: Timestamp-based (most recent wins)
7. Clear Sync Queue: Remove from queue on successful upload
8. Retry Logic: Exponential backoff (1s, 2s, 4s, 8s, max 30s)
9. Max Retries: Limit to 10 attempts
10. Failed Syncs: Mark as failed after max retries
11. Sync Status: Update sync store with progress
12. Error Handling: Handle network errors, backend errors

CONSTRAINTS:
- No duplicate scans
- Efficient sync (batch operations)
- Retry with backoff
- Handle failures gracefully

INTEGRATION POINTS:
- Backend sync endpoint (Task 5.2)
- SQLite storage (Task 8.2)
- Network detection (Task 8.3)
- Sync store (Task 7.1)

TESTING REQUIREMENTS:
1. Sync triggers on reconnection
2. Offline scans uploaded
3. New scans downloaded
4. No duplicates created
5. Deduplication works correctly
6. Retry logic backs off
7. Failed syncs marked
8. Conflict resolution works

ACCEPTANCE CRITERIA:
- ✅ Auto-sync functional
- ✅ Deduplication working
- ✅ No duplicates
- ✅ Retry with backoff
- ✅ Conflict resolution
- ✅ Error handling

QUALITY STANDARDS:
- Reliable sync
- Efficient batching
- Proper deduplication
- Robust error handling

DELIVERABLES:
- Sync service
- Deduplication logic
- Retry mechanism
- Conflict resolution
- Error handling

SUCCESS METRIC: Offline scans sync automatically when online with no duplicates and robust error recovery.
```

---

END OF PHASE 8
