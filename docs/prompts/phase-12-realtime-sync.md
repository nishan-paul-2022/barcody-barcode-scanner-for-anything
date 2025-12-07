# Phase 12: Real-Time Sync - AI Implementation Prompts

> **2 Tasks**: WebSocket client for web and mobile
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 12.1: WebSocket Client - Web

```
TASK: Implement WebSocket client for real-time scan updates on web with automatic reconnection and message queueing.

SYSTEM CONTEXT: Enable real-time synchronization across multiple devices. When user scans on mobile, web app updates instantly. Critical for multi-device experience. Must handle connection drops gracefully with exponential backoff.

REQUIREMENTS:

1. Dependencies: Install socket.io-client package
2. WebSocket Service: Create WebSocket service in lib/websocket/
3. Connection Setup: Initialize Socket.IO client:
   - Connect to backend WebSocket server
   - Pass JWT token in auth object: { auth: { token: accessToken } }
   - Fallback to query param if auth object not supported
   - Set reconnection options
4. User Room: Join user-specific room after connection
5. Event Listeners: Subscribe to events:
   - scan:created - New scan added
   - scan:deleted - Scan removed
   - connect - Connection established
   - disconnect - Connection lost
   - error - Connection error
6. React Query Integration: Update cache on events:
   - On scan:created: Add scan to cache, invalidate queries
   - On scan:deleted: Remove from cache, invalidate queries
7. Exponential Backoff Reconnection:
   - Initial delay: 1 second
   - Subsequent delays: 2s, 4s, 8s, max 30s
   - Max retry attempts: 10
   - Reset backoff on successful connection
8. Message Queueing: Queue messages during disconnect:
   - Store max 50 messages in memory
   - Flush queue on reconnect
   - Discard oldest if queue full
9. Connection Status Indicator: Create UI component showing:
   - Connected (green dot)
   - Reconnecting (yellow dot with spinner)
   - Disconnected (red dot)
10. Error Handling: Handle connection errors, authentication failures, network issues
11. Cleanup: Disconnect on component unmount

CONSTRAINTS:
- Secure connection with JWT
- Automatic reconnection required
- No message loss during brief disconnects
- Efficient cache updates
- Clear connection status

INTEGRATION POINTS:
- WebSocket gateway from Task 5.3
- React Query from Task 4.4
- Auth store from Task 4.2
- Scan list components

TESTING REQUIREMENTS:
1. WebSocket connects successfully
2. Real-time updates received
3. Cache updates automatically
4. Reconnection works after disconnect
5. Exponential backoff increases correctly
6. Stops retrying after max attempts
7. Message queue works
8. Connection status displays correctly
9. Cleanup on unmount

ACCEPTANCE CRITERIA:
- ✅ WebSocket service created
- ✅ Connection with JWT auth
- ✅ Real-time events received
- ✅ React Query cache updates
- ✅ Exponential backoff reconnection
- ✅ Message queueing functional
- ✅ Status indicator working
- ✅ Error handling robust

QUALITY STANDARDS:
- Secure authentication
- Efficient reconnection logic
- Proper cleanup
- Clear status indication
- Comprehensive error handling

DELIVERABLES:
- WebSocket service
- Event handlers
- React Query integration
- Reconnection logic
- Message queue
- Status indicator component

SUCCESS METRIC: Real-time scan updates work seamlessly with automatic reconnection and no message loss.
```

---



## Task 12.2: WebSocket Client - Mobile

```
TASK: Implement WebSocket client for real-time scan updates on mobile with SQLite sync and offline handling.

SYSTEM CONTEXT: Real-time synchronization for mobile app. Must integrate with SQLite for offline-first architecture. Handle app backgrounding and network transitions gracefully.

REQUIREMENTS:

1. Dependencies: Install socket.io-client package
2. WebSocket Service: Create WebSocket service in services/websocket/
3. Connection Setup: Initialize Socket.IO client:
   - Connect to backend WebSocket server
   - Pass JWT token in auth object
   - Handle dynamic backend URL from AsyncStorage
   - Set reconnection options
4. User Room: Join user-specific room after connection
5. Event Listeners: Subscribe to events:
   - scan:created - New scan added
   - scan:deleted - Scan removed
   - connect, disconnect, error
6. SQLite Integration: Update local database on events:
   - On scan:created: Insert into SQLite if not exists
   - On scan:deleted: Delete from SQLite
   - Mark scans as synced
7. State Updates: Update Zustand stores:
   - Update scan store with new/deleted scans
   - Update sync store with connection status
8. Exponential Backoff Reconnection:
   - Same as web: 1s, 2s, 4s, 8s, max 30s
   - Max 10 retry attempts
   - Reset on successful connection
9. Event Queueing: Queue events during disconnect (max 50)
10. Offline/Online Handling:
    - Disconnect WebSocket when offline
    - Reconnect when back online
    - Sync queued events

12. Connection Status: Update sync store with status
13. Error Handling: Handle all error scenarios

CONSTRAINTS:
- Battery efficient (disconnect when backgrounded)
- Sync with SQLite correctly
- Handle offline gracefully
- No duplicate scans in SQLite
- Efficient reconnection

INTEGRATION POINTS:
- WebSocket gateway from Task 5.3
- SQLite from Task 8.2
- Sync store from Task 7.1
- Network detection from Task 8.3

TESTING REQUIREMENTS:
1. WebSocket connects successfully
2. Real-time updates received
3. SQLite updates correctly
4. State updates work
5. Reconnection functional
6. Event queue works
7. Offline handling correct

9. No duplicate scans
10. Battery efficient

ACCEPTANCE CRITERIA:
- ✅ WebSocket service created
- ✅ Connection with JWT auth
- ✅ Real-time events received
- ✅ SQLite integration working
- ✅ State updates functional
- ✅ Reconnection with backoff
- ✅ Offline handling robust


QUALITY STANDARDS:
- Battery efficient
- Proper SQLite sync
- Clean state management
- Comprehensive error handling
- Efficient reconnection

DELIVERABLES:
- WebSocket service
- Event handlers
- SQLite integration
- State update logic
- Reconnection logic


SUCCESS METRIC: Real-time scan updates work on mobile with SQLite sync and efficient offline/background handling.
```

---



END OF PHASE 12
