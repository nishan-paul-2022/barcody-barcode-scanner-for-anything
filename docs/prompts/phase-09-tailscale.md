# Phase 9: Tailscale Integration - AI Implementation Prompts

> **3 Tasks**: Backend Tailscale configuration, Web setup guide, Mobile integration
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 9.1: Backend Tailscale Configuration

```
TASK: Configure NestJS backend to accept connections from Tailscale network with CORS, IP auto-detection, and trusted proxy configuration.

SYSTEM CONTEXT: Tailscale enables secure access to self-hosted backend from anywhere without port forwarding. Backend must bind to all interfaces and accept connections from Tailscale's IP range (100.64.0.0/10). Critical for users running backend on home servers or VPS who want mobile access.

REQUIREMENTS:

1. Bind Configuration: Update main.ts to bind to 0.0.0.0 instead of localhost
2. CORS Setup: Configure CORS middleware in main.ts:
   - Allow origins: localhost:3000, localhost:3001, 100.64.0.0/10 range
   - Allow credentials: true
   - Allow methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
   - Allow headers: Authorization, Content-Type, Accept
   - Expose headers: Content-Length, Content-Type
3. Tailscale IP Detection: Implement auto-detection:
   - Execute tailscale ip -4 command using child_process
   - Parse command output to extract IPv4 address
   - Cache detected IP in memory (singleton service)
   - Fallback to TAILSCALE_IP environment variable if command fails
   - Log detection result
4. Trusted Proxies: Add Tailscale IP to trusted proxy list for correct client IP detection
5. Info Endpoint: Create GET /setup/tailscale-info endpoint:
   - Return backend URL (http://{tailscale_ip}:8000)
   - Return Tailscale IP address
   - Return connection status
   - Protected by JWT auth
6. Environment Variables: Add TAILSCALE_IP to .env files as fallback

CONSTRAINTS:
- Must work with or without Tailscale installed
- CORS must not be overly permissive
- IP detection must not block application startup
- Must handle Tailscale command failures gracefully

INTEGRATION POINTS:
- Web setup guide will call /setup/tailscale-info (Task 9.2)
- Mobile app will connect via Tailscale IP (Task 9.3)
- All existing API endpoints must work via Tailscale

TESTING REQUIREMENTS:
1. Backend accessible via Tailscale IP
2. CORS headers present in responses
3. Tailscale IP auto-detection works
4. Fallback to env var works when command fails
5. /setup/tailscale-info returns correct data
6. Requests from Tailscale network succeed
7. CORS allows Tailscale IP range

ACCEPTANCE CRITERIA:
- ✅ Backend binds to 0.0.0.0
- ✅ CORS configured for Tailscale
- ✅ Tailscale IP auto-detected
- ✅ Info endpoint functional
- ✅ Accessible from Tailscale network
- ✅ Fallback mechanism works

QUALITY STANDARDS:
- Follow NestJS CORS best practices
- Secure CORS configuration
- Proper error handling
- Clear logging
- Environment-based configuration

DELIVERABLES:
- Updated main.ts with CORS and binding
- Tailscale IP detection service
- /setup/tailscale-info endpoint
- Environment variable configuration
- Error handling logic

SUCCESS METRIC: Backend accessible from any device on Tailscale network with proper CORS headers.
```

---



## Task 9.2: Web Tailscale Setup Guide

```
TASK: Create Tailscale setup page with QR code generation for easy mobile configuration.

SYSTEM CONTEXT: Users need easy way to configure mobile app to connect to their self-hosted backend. QR code provides one-tap setup instead of manual IP entry.

REQUIREMENTS:

1. Dependencies: Install qrcode.react for QR code generation
2. Setup Page: Create /setup/tailscale page in web app
3. Fetch Backend Info: Call GET /setup/tailscale-info to get Tailscale IP
4. QR Code Generation: Generate QR code containing:
   - Backend URL (http://{tailscale_ip}:8000)
   - Timestamp for validation
   - Format as JSON string
5. QR Code Display: Show large, scannable QR code (300x300px minimum)
6. Manual Entry Option: Display backend URL as copyable text
7. Connection Test: Implement test button:
   - Call /health endpoint via Tailscale IP
   - Show success/failure message
   - Display response time
8. Instructions: Add clear setup instructions:
   - Install Tailscale on mobile device
   - Connect to Tailscale network
   - Scan QR code in mobile app
   - Test connection
9. Error Handling: Handle cases where Tailscale not configured
10. Loading States: Show loading while fetching backend info

CONSTRAINTS:
- QR code must be easily scannable
- Clear, user-friendly instructions
- Handle backend not configured scenario
- Mobile-responsive design

INTEGRATION POINTS:
- Backend /setup/tailscale-info endpoint (Task 9.1)
- Mobile QR scanner will read this code (Task 9.3)

TESTING REQUIREMENTS:
1. Setup page loads correctly
2. QR code generates with backend URL
3. Manual URL displays correctly
4. Connection test works
5. Error handling for unconfigured backend
6. QR code scannable by mobile devices
7. Responsive on all screen sizes

ACCEPTANCE CRITERIA:
- ✅ Setup page created
- ✅ QR code generates correctly
- ✅ Manual entry option available
- ✅ Connection test functional
- ✅ Clear instructions provided
- ✅ Error handling robust

QUALITY STANDARDS:
- User-friendly interface
- Clear instructions
- Accessible design
- Proper error messages
- Responsive layout

DELIVERABLES:
- Tailscale setup page
- QR code generation
- Connection test utility
- Setup instructions
- Error handling

SUCCESS METRIC: Users can easily generate QR code and test Tailscale connection from web interface.
```

---



## Task 9.3: Mobile Tailscale Integration

```
TASK: Implement Tailscale connectivity in mobile app with QR scanner and manual entry for backend URL configuration.

SYSTEM CONTEXT: Enable mobile app to connect to self-hosted backend via Tailscale. Users can scan QR code from web setup or manually enter backend URL. Critical for offline-first architecture with self-hosted backend.

REQUIREMENTS:

1. Dependencies: Install expo-barcode-scanner for QR scanning
2. Onboarding Screen: Create Tailscale onboarding screen shown on first launch
3. QR Scanner: Implement QR code scanner:
   - Request camera permissions
   - Scan QR code from web setup page
   - Parse JSON data from QR code
   - Extract backend URL
   - Validate URL format
4. Manual Entry: Add manual IP entry option:
   - Text input for backend URL
   - Validate URL format (http://IP:PORT)
   - Test connection before saving
5. URL Storage: Store backend URL in AsyncStorage:
   - Key: 'backend_url'
   - Persist across app restarts
   - Update API client base URL
6. Connection Test Screen: Create test screen:
   - Call /health endpoint
   - Display connection status
   - Show response time
   - Test authentication endpoint
7. Settings Integration: Add "Change Backend URL" in settings:
   - Show current backend URL
   - Button to rescan QR code
   - Button to manually edit
   - Test connection button
8. API Client Update: Modify API client to use stored backend URL
9. Error Handling: Handle connection failures, invalid URLs, network errors
10. First-Time Setup: Show onboarding only if backend URL not configured

CONSTRAINTS:
- Must work with or without Tailscale
- Handle network errors gracefully
- Validate URL format strictly
- Secure URL storage
- Fast connection testing

INTEGRATION POINTS:
- Web setup QR code (Task 9.2)
- Backend /health endpoint (Task 1.3)
- API client from Task 4.9
- Settings screen

TESTING REQUIREMENTS:
1. Onboarding screen displays on first launch
2. QR scanner opens and scans correctly
3. QR code data parsed correctly
4. Manual entry validates URL
5. Backend URL stored in AsyncStorage
6. API client uses stored URL
7. Connection test works
8. Settings allows URL change
9. Works on iOS and Android
10. Handles invalid QR codes

ACCEPTANCE CRITERIA:
- ✅ Onboarding screen created
- ✅ QR scanner functional
- ✅ Manual entry working
- ✅ URL stored persistently
- ✅ Connection test works
- ✅ Settings integration complete
- ✅ API client updated
- ✅ Error handling robust

QUALITY STANDARDS:
- User-friendly onboarding
- Clear instructions
- Smooth UX flow
- Proper error messages
- Secure storage
- Platform compatibility

DELIVERABLES:
- Tailscale onboarding screen
- QR code scanner
- Manual entry form
- Connection test screen
- Settings integration
- URL storage logic
- API client update

SUCCESS METRIC: Users can easily configure mobile app to connect to self-hosted backend via Tailscale using QR code or manual entry.
```

---



END OF PHASE 9
