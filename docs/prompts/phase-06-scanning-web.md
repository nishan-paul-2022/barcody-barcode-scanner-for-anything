# Phase 6: Scanning Web - AI Implementation Prompts

> **4 Tasks**: Web camera scanner, file upload, scan history, PWA configuration
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 6.1: Web Scanner - Camera Integration

**TASK**: Implement browser-based barcode scanner using device camera with real-time detection.

**SYSTEM CONTEXT**: Core scanning functionality for web users. Must work across browsers (Chrome, Firefox, Safari) and devices (desktop webcam, mobile camera). Real-time barcode detection from live video stream.

**REQUIREMENTS**:

1. **Dependencies**: Install @zxing/browser for barcode scanning
2. **Scanner Component**: Create BarcodeScanner component with video preview
3. **Camera Permissions**: Request camera access with proper error handling
4. **Video Stream**: Display live camera preview in video element
5. **Barcode Detection**: Continuously scan video frames for barcodes
6. **Format Support**: Detect QR, EAN-13, UPC-A, UPC-E, Code-128, DataMatrix, PDF417
7. **Visual Feedback**: Highlight detected barcode with overlay
8. **Audio Feedback**: Play beep sound on successful scan
9. **Result Display**: Show scanned barcode data immediately
10. **Camera Selection**: Allow switching between front/back cameras on mobile
11. **Error Handling**: Handle permission denied, no camera, unsupported browser

**CONSTRAINTS**:
- Must work in modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Real-time performance (detect within 1 second)
- Low CPU usage (<30%)
- Handle poor lighting conditions
- Mobile-responsive

**INTEGRATION POINTS**:
- Scan results sent to backend (Task 5.2)
- Product lookup triggered (Task 10.3)
- React Query mutations (Task 4.4)

**TESTING REQUIREMENTS**:
1. Camera opens successfully
2. All barcode formats detected
3. Detection works in various lighting
4. Mobile camera switching works
5. Permission errors handled
6. Works on desktop and mobile
7. Performance acceptable

**ACCEPTANCE CRITERIA**:
- ✅ Camera preview displays
- ✅ Barcodes detected in real-time
- ✅ All formats supported
- ✅ Visual and audio feedback
- ✅ Error handling robust
- ✅ Mobile responsive

**QUALITY STANDARDS**:
- Follow browser API best practices
- Implement proper cleanup (stop camera on unmount)
- Accessible controls
- Smooth UX
- Clear error messages

**DELIVERABLES**:
- BarcodeScanner component
- Camera permission handling
- Barcode detection logic
- Visual feedback overlay
- Error handling

**SUCCESS METRIC**: Users can scan barcodes using webcam/mobile camera with real-time detection.

---

## Task 6.2: Web Scanner - File Upload

**TASK**: Implement barcode scanning from uploaded image files.

**SYSTEM CONTEXT**: Alternative scanning method for users without camera or for scanning images. Supports drag-and-drop and file selection.

**REQUIREMENTS**:

1. **File Upload Component**: Create file upload interface
2. **Drag and Drop**: Support drag-and-drop image files
3. **File Selection**: Standard file input for image selection
4. **Image Preview**: Display uploaded image before scanning
5. **Barcode Detection**: Use @zxing/browser to scan image
6. **Format Support**: Same formats as camera scanner
7. **Result Display**: Show detected barcode data
8. **Error Handling**: Handle invalid files, no barcode found
9. **File Validation**: Accept only image files (jpg, png, webp)
10. **Size Limit**: Max 10MB file size

**CONSTRAINTS**:
- Image processing must be client-side
- Fast detection (<2 seconds)
- Support common image formats
- Clear user feedback

**INTEGRATION POINTS**:
- Scan results sent to backend (Task 5.2)
- Product lookup triggered (Task 10.3)

**TESTING REQUIREMENTS**:
1. File upload works
2. Drag-and-drop works
3. Barcode detected from image
4. Invalid files rejected
5. Size limit enforced
6. Error messages clear

**ACCEPTANCE CRITERIA**:
- ✅ File upload functional
- ✅ Drag-and-drop working
- ✅ Barcodes detected from images
- ✅ File validation implemented
- ✅ Error handling robust

**QUALITY STANDARDS**:
- Intuitive UI
- Fast processing
- Clear feedback
- Accessible

**DELIVERABLES**:
- File upload component
- Image scanning logic
- File validation
- Error handling

**SUCCESS METRIC**: Users can upload barcode images and get accurate detection results.

---

## Task 6.3: Web Scanner - History & Management

**TASK**: Create scan history interface with pagination, filtering, search, and management features.

**SYSTEM CONTEXT**: Central hub for viewing and managing all scans. Must handle large datasets efficiently with pagination and filtering.

**REQUIREMENTS**:

1. **History Page**: Create scan history page with table/card layout
2. **Pagination**: Implement pagination (20 scans per page)
3. **Scan List**: Display barcode data, type, timestamp, device
4. **Scan Detail Modal**: Click scan to view full details
5. **Delete Functionality**: Delete individual scans with confirmation
6. **Bulk Actions**: Select multiple scans for bulk delete
7. **Search**: Search by barcode data
8. **Filters**: Filter by barcode type, date range, device type
9. **Sorting**: Sort by date (newest/oldest)
10. **Empty State**: Show message when no scans
11. **Loading States**: Skeleton loaders during fetch
12. **Error Handling**: Display errors with retry option

**CONSTRAINTS**:
- Efficient rendering for large lists
- Fast search and filtering
- Responsive design
- Accessible

**INTEGRATION POINTS**:
- Backend scan API (Task 5.2)
- React Query hooks (Task 4.4)
- Product display (Task 10.4)

**TESTING REQUIREMENTS**:
1. History displays correctly
2. Pagination works
3. Search finds scans
4. Filters work correctly
5. Delete removes scan
6. Bulk delete works
7. Loading states display
8. Responsive on mobile

**ACCEPTANCE CRITERIA**:
- ✅ History page functional
- ✅ Pagination implemented
- ✅ Search and filters working
- ✅ Delete functionality works
- ✅ Responsive design
- ✅ Loading/error states

**QUALITY STANDARDS**:
- Efficient rendering
- Smooth UX
- Clear UI
- Accessible

**DELIVERABLES**:
- History page component
- Pagination logic
- Search and filter UI
- Delete functionality
- Loading/error states

**SUCCESS METRIC**: Users can efficiently browse, search, filter, and manage their scan history.

---

## Task 6.4: Web PWA Configuration

**TASK**: Configure Progressive Web App with offline support, installability, and service worker caching.

**SYSTEM CONTEXT**: Make web app installable and functional offline. Critical for mobile users who want app-like experience without app store.

**REQUIREMENTS**:

1. **PWA Setup**: Install next-pwa package
2. **Next.js Configuration**: Configure PWA in next.config.js
3. **Manifest**: Create public/manifest.json with:
   - name: "Barcody - Barcode Scanner"
   - short_name: "Barcody"
   - theme_color: "#00D9FF" (neon blue)
   - background_color: "#0A1929" (dark)
   - icons: 192x192, 512x512
   - display: "standalone"
   - start_url: "/"
4. **Service Worker**: Configure service worker for offline caching
5. **Cache Strategies**:
   - NetworkFirst for API calls
   - CacheFirst for static assets
   - StaleWhileRevalidate for images
6. **Offline Page**: Create app/offline/page.tsx with:
   - Network status indicator
   - Retry connection button
   - Cached scans display (from IndexedDB)
   - Offline mode explanation
7. **Online Detection**: Implement auto-redirect when connection restored
8. **Install Prompt**: Add install button for desktop/mobile
9. **Icons**: Generate all required icon sizes

**CONSTRAINTS**:
- Must pass Lighthouse PWA audit
- Offline functionality required
- Fast cache retrieval
- Proper cache invalidation

**INTEGRATION POINTS**:
- Service worker caches API responses
- IndexedDB for offline data
- Online/offline detection

**TESTING REQUIREMENTS**:
1. App installable on mobile
2. App installable on desktop
3. Works offline after first visit
4. Service worker caches correctly
5. Offline page displays when no connection
6. Auto-redirect when back online
7. Lighthouse PWA score >90

**ACCEPTANCE CRITERIA**:
- ✅ PWA configured
- ✅ Manifest created
- ✅ Service worker functional
- ✅ Offline page implemented
- ✅ Install prompt working
- ✅ Lighthouse PWA passing

**QUALITY STANDARDS**:
- Follow PWA best practices
- Efficient caching
- Clear offline messaging
- Smooth install experience

**DELIVERABLES**:
- PWA configuration
- Manifest file
- Service worker
- Offline page
- Install prompt
- App icons

**SUCCESS METRIC**: Web app is installable, works offline, and passes Lighthouse PWA audit.

---

**END OF PHASE 6**
