# Phase 7: Scanning Mobile - AI Implementation Prompts

> **4 Tasks**: Mobile state management, camera scanner, scan result UI, batch mode
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 7.1: Mobile State Management

```
TASK: Configure Zustand stores for global state management across mobile app.

SYSTEM CONTEXT: Centralized state management for mobile app. Separate stores for different concerns with persistence for offline support.

REQUIREMENTS:

1. Zustand Installation: Install zustand package
2. Auth Store: Already created in Task 4.7 (user, tokens, isAuthenticated)
3. Scan Store: Create with state:
   - scans: Scan[] (current scan list)
   - filters: FilterState (barcode type, date range)
   - pagination: PaginationState (page, limit, total)
   - selectedScans: string[] (for bulk operations)
4. Settings Store: Create with state:
   - theme: 'dark' | 'light'
   - backendURL: string
   - cameraPreferences: CameraSettings
   - notificationsEnabled: boolean
5. Sync Store: Create with state:
   - syncStatus: 'idle' | 'syncing' | 'error'
   - queueCount: number
   - lastSyncTime: Date | null
   - errors: SyncError[]
6. Persist Middleware: Implement AsyncStorage persistence for all stores
7. Store Hooks: Create typed hooks for each store
8. Actions: Implement actions for state updates

CONSTRAINTS:
- Type-safe throughout
- Efficient state updates
- Proper persistence
- No memory leaks

INTEGRATION POINTS:
- Scanner components (Task 7.2-7.4)
- Offline sync (Task 8.4)
- Settings screen

TESTING REQUIREMENTS:
1. Stores initialize correctly
2. State updates work
3. Persistence works across app restarts
4. Hooks return correct state
5. Actions update state properly

ACCEPTANCE CRITERIA:
- ✅ All stores created
- ✅ Persistence configured
- ✅ Hooks functional
- ✅ Type-safe
- ✅ State persists

QUALITY STANDARDS:
- Clean store structure
- Efficient updates
- Proper typing
- Clear action names

DELIVERABLES:
- Scan store
- Settings store
- Sync store
- Persist middleware
- Typed hooks

SUCCESS METRIC: Global state management configured with persistence and type safety.
```

---



## Task 7.2: Mobile Scanner - Camera Screen

```
TASK: Implement native barcode scanner using device camera with haptic feedback and scan debouncing.

SYSTEM CONTEXT: Core mobile scanning functionality. Must provide smooth native experience with proper camera handling and resource cleanup.

REQUIREMENTS:

1. Dependencies: Install expo-camera, expo-barcode-scanner, expo-haptics
2. Camera Screen: Create camera scanner screen component
3. Permissions: Request camera permissions with proper error handling
4. Permission Denied: Show error message with settings link
5. Camera Preview: Display full-screen camera preview
6. Barcode Detection: Detect all formats (QR, EAN, UPC, Code128, DataMatrix, PDF417)
7. Scan Debouncing: Implement 500ms debounce to prevent rapid duplicate scans
8. Duplicate Prevention: Don't scan same barcode within 2 seconds
9. Visual Feedback: Show scan indicator during debounce
10. Haptic Feedback: Trigger notification haptic on successful scan
11. Error Haptics: Trigger error haptic on scan failure
12. Camera Cleanup: Implement useEffect cleanup:
    - Stop camera recording
    - Pause camera preview
    - Remove barcode listeners
    - Clear debounce timers
    - Release camera permissions
13. Memory Management: Prevent memory leaks on unmount

CONSTRAINTS:
- Must work on iOS and Android
- Real-time performance
- Proper resource cleanup
- No memory leaks
- Battery efficient

INTEGRATION POINTS:
- Scan results saved (Task 7.3)
- Product lookup triggered (Task 10.4)
- Offline storage (Task 8.2)

TESTING REQUIREMENTS:
1. Camera opens successfully
2. All barcode formats detected
3. Haptic feedback triggers
4. Permission denied shows error
5. No duplicate scans
6. Camera properly released on unmount
7. No memory leaks after multiple scans
8. Works on iOS and Android

ACCEPTANCE CRITERIA:
- ✅ Camera scanner functional
- ✅ All formats detected
- ✅ Haptic feedback working
- ✅ Debouncing implemented
- ✅ Cleanup proper
- ✅ No memory leaks

QUALITY STANDARDS:
- Native feel
- Smooth performance
- Proper resource management
- Clear error messages
- Accessible

DELIVERABLES:
- Camera scanner screen
- Permission handling
- Barcode detection logic
- Haptic feedback
- Cleanup logic

SUCCESS METRIC: Users can scan barcodes smoothly with native feel and no performance issues.
```

---



## Task 7.3: Mobile Scanner - Scan Result UI

```
TASK: Create scan result and history screens with API integration and offline fallback.

SYSTEM CONTEXT: Display scan results and manage scan history. Must handle both online and offline scenarios gracefully.

REQUIREMENTS:

1. API Service: Create scan API service using API client from Task 4.9
2. Scan Result Screen: Create screen to display scanned barcode data
3. Product Display: Show product information if available
4. Save Button: Implement save functionality with API integration
5. Online Save: POST to /scans endpoint when online
6. Offline Fallback: Save to SQLite when network error occurs
7. Sync Queue: Add to sync queue if offline
8. Error Handling: Display user-friendly error messages
9. Scan History Screen: Create with FlatList for performance
10. Pull-to-Refresh: Implement pull-to-refresh to fetch latest scans
11. Scan Detail Screen: Show full scan details on tap
12. Delete Functionality: Delete scan with confirmation

CONSTRAINTS:
- Handle offline gracefully
- Fast list rendering
- Smooth scrolling
- Clear error messages

INTEGRATION POINTS:
- Backend scan API (Task 5.2)
- SQLite storage (Task 8.2)
- Sync queue (Task 8.4)
- Product lookup (Task 10.4)

TESTING REQUIREMENTS:
1. Result screen displays data
2. Save works when online
3. Save falls back to SQLite when offline
4. Added to sync queue when offline
5. History displays scans
6. Pull-to-refresh works
7. Delete removes scan
8. Works offline

ACCEPTANCE CRITERIA:
- ✅ Result screen functional
- ✅ Save with online/offline handling
- ✅ History screen with FlatList
- ✅ Pull-to-refresh working
- ✅ Delete functionality
- ✅ Offline support

QUALITY STANDARDS:
- Smooth UX
- Clear feedback
- Efficient rendering
- Proper error handling

DELIVERABLES:
- Scan result screen
- History screen
- Detail screen
- API integration
- Offline fallback

SUCCESS METRIC: Users can save and view scans with seamless online/offline experience.
```

---



## Task 7.4: Mobile Scanner - Batch Mode

```
TASK: Implement continuous scanning mode with in-memory queue and auto-save.

SYSTEM CONTEXT: Enable rapid scanning of multiple items. Queue scans in memory and batch save to reduce API calls and improve performance.

REQUIREMENTS:

1. Batch Toggle: Add toggle switch to enable batch scanning mode
2. Continuous Scan: Keep camera active after scan in batch mode
3. In-Memory Queue: Store scans in memory (max 100 scans)
4. Scan Counter: Display current queue count
5. Auto-Save: Automatically save batch when queue reaches 100
6. Manual Save: Button to save current batch
7. Batch Save API: Use POST /scans/bulk endpoint
8. Queue Clear: Clear queue after successful save
9. Visual Feedback: Show scan added to queue animation


CONSTRAINTS:
- Max 100 scans in queue
- Auto-save at limit
- Clear queue after save
- Handle save errors

INTEGRATION POINTS:
- Bulk create endpoint (Task 5.2)
- Camera scanner (Task 7.2)
- Offline queue (Task 8.4)

TESTING REQUIREMENTS:
1. Batch mode toggles correctly
2. Scans queue in memory
3. Counter updates
4. Auto-save at 100 scans
5. Manual save works
6. Queue clears after save


ACCEPTANCE CRITERIA:
- ✅ Batch mode functional
- ✅ Queue management working
- ✅ Auto-save at limit
- ✅ Manual save button

- ✅ Clear after save

QUALITY STANDARDS:
- Efficient memory usage
- Clear UI feedback
- Smooth scanning
- Proper error handling

DELIVERABLES:
- Batch mode toggle
- Queue management
- Batch save logic
- Queue display UI
- Auto-save functionality

SUCCESS METRIC: Users can rapidly scan multiple items with automatic batching and saving.
```

---



END OF PHASE 7
