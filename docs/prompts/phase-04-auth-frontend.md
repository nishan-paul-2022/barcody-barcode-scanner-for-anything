# Phase 4: Auth Frontend - Complete Implementation Prompts

> **Tasks 4.1 - 4.13 (13 tasks)**
>
> **Full Detail - No Code Snippets - Requirements-Driven**

---

## Task 4.1: Web Auth - Google OAuth UI

```
TASK: Implement Google OAuth login interface for web application

SYSTEM CONTEXT:
Web authentication for Barcody using Google OAuth:
- No username/password forms needed
- Secure third-party authentication via Google
- Seamless user experience
- Integration with backend OAuth flow from Task 3.4

REQUIREMENTS:

1. DEPENDENCIES
   - Install @react-oauth/google for Google OAuth integration
   - Install axios for HTTP requests (if not already installed)
   - Ensure compatibility with Next.js 14+ App Router

2. GOOGLE OAUTH PROVIDER
   - Create GoogleOAuthProvider wrapper component
   - Configure with Google Client ID from environment (NEXT_PUBLIC_GOOGLE_CLIENT_ID)
   - Wrap application at root level
   - Handle provider initialization errors

3. LOGIN PAGE
   - Create login page at /login route
   - Implement Google Sign-In button using @react-oauth/google
   - Display application branding (Barcody logo, tagline)
   - Dark theme styling consistent with app
   - Responsive design (mobile-first)
   - Loading state during OAuth flow

4. OAUTH CALLBACK HANDLER
   - Handle OAuth response from Google
   - Extract authorization code or credential
   - Send to backend /auth/google endpoint
   - Receive JWT tokens from backend
   - Store tokens securely (will integrate with state management in Task 4.2)
   - Redirect to dashboard on success
   - Display error message on failure

5. ERROR HANDLING
   - Handle OAuth popup blocked
   - Handle OAuth cancellation by user
   - Handle network errors
   - Handle backend authentication errors
   - Display user-friendly error messages
   - Provide retry mechanism

6. LOADING STATES
   - Show loading spinner during OAuth flow
   - Disable button during authentication
   - Prevent multiple simultaneous auth attempts
   - Smooth transitions between states

7. REDIRECT LOGIC
   - Redirect authenticated users away from login page
   - Support "redirect after login" functionality
   - Preserve intended destination URL

CONSTRAINTS:
- Must work with Google OAuth 2.0
- No password fields (OAuth only)
- Must be accessible (WCAG 2.1 AA)
- Fast page load (<2s)
- Mobile-responsive
- Dark theme only

INTEGRATION POINTS:
- Backend OAuth from Task 3.4
- Will integrate with auth store (Task 4.2)
- Will use API client (Task 4.3)
- Protected routes will use this (Task 4.5)

TESTING REQUIREMENTS:
- Login page renders correctly
- Google Sign-In button displays
- Clicking button initiates OAuth flow
- OAuth popup opens (or redirect works)
- Successful auth redirects to dashboard
- Failed auth shows error message
- Loading states display correctly
- Already authenticated users redirect away
- Works on mobile viewport
- Accessible via keyboard navigation

ACCEPTANCE CRITERIA:
✅ Login page created and accessible
✅ Google OAuth provider configured
✅ Sign-in button functional
✅ OAuth flow completes successfully
✅ Backend receives auth code
✅ JWT tokens received and handled
✅ Success redirects to dashboard
✅ Errors display user-friendly messages
✅ Loading states implemented
✅ Mobile responsive
✅ Dark theme applied
✅ Keyboard accessible

QUALITY STANDARDS:
- Follow Next.js 14 App Router best practices
- Implement proper error boundaries
- Use TypeScript for type safety
- Accessible components
- Smooth UX transitions
- Clear error messages
- Secure token handling

DELIVERABLES:
- Login page component
- Google OAuth provider wrapper
- OAuth callback handler
- Error handling logic
- Loading state management
- Redirect logic

SUCCESS METRIC: User can click "Sign in with Google", complete OAuth flow, and land on dashboard with valid JWT tokens.
```

---



## Task 4.2: Web Auth - State Management

```
TASK: Implement global authentication state management for web application

SYSTEM CONTEXT:
Centralized auth state for Barcody web app:
- Track authentication status across all pages
- Store user information and tokens
- Provide login/logout actions
- Automatic token refresh
- Persist auth state across page reloads

REQUIREMENTS:

1. STATE MANAGEMENT LIBRARY
   - Install zustand for lightweight state management
   - Create dedicated auth store
   - TypeScript interfaces for all state
   - Persist middleware for localStorage

2. AUTH STORE STRUCTURE
   - State: user (User object or null), accessToken (string or null), refreshToken (string or null), isAuthenticated (boolean), isLoading (boolean)
   - User object: id, email, googleId, createdAt, lastLogin
   - Clear type definitions for all fields

3. AUTH ACTIONS
   - login(user, accessToken, refreshToken): Store user and tokens, set isAuthenticated to true
   - logout(): Clear all auth state, remove from localStorage, redirect to login
   - setUser(user): Update user information
   - setTokens(accessToken, refreshToken): Update tokens
   - refreshAccessToken(): Call refresh endpoint, update access token
   - checkAuthStatus(): Validate current auth state on app load

4. TOKEN PERSISTENCE
   - Store tokens in localStorage (encrypted if possible)
   - Restore tokens on app initialization
   - Clear tokens on logout
   - Handle token expiration
   - Automatic cleanup on browser close (optional)

5. TOKEN REFRESH LOGIC
   - Monitor access token expiration (decode JWT to check exp)
   - Automatically refresh before expiration (2 minutes before)
   - Use refresh token to get new access token
   - Update store with new access token
   - Handle refresh token expiration (force logout)
   - Retry mechanism for failed refresh

6. AXIOS INTERCEPTOR
   - Create axios instance with base URL from environment
   - Request interceptor: Inject access token in Authorization header
   - Response interceptor: Handle 401 errors (trigger token refresh)
   - Response interceptor: Handle 403 errors (force logout)
   - Retry failed requests after token refresh
   - Queue requests during token refresh

7. INITIALIZATION
   - Check for stored tokens on app load
   - Validate tokens (check expiration)
   - Fetch current user if tokens valid
   - Set loading state during initialization
   - Handle initialization errors gracefully

CONSTRAINTS:
- Type-safe throughout
- Secure token storage
- Handle token expiration gracefully
- No token exposure in URLs
- Automatic refresh before expiration
- Single source of truth for auth state

INTEGRATION POINTS:
- Login UI from Task 4.1
- API client from Task 4.3
- Protected routes from Task 4.5
- All API calls will use this store

TESTING REQUIREMENTS:
- Store initializes correctly
- Login action stores user and tokens
- Logout action clears all state
- Tokens persist across page reload
- Token refresh works automatically
- Expired tokens trigger logout
- Axios interceptor adds auth header
- 401 errors trigger token refresh
- Failed refresh triggers logout
- Multiple simultaneous requests handled correctly

ACCEPTANCE CRITERIA:
✅ Zustand store created
✅ Auth state properly typed
✅ Login/logout actions work
✅ Tokens stored in localStorage
✅ Tokens restored on page load
✅ Automatic token refresh implemented
✅ Axios interceptor configured
✅ 401 errors handled
✅ Refresh failures force logout
✅ Request queueing during refresh
✅ Type-safe throughout

QUALITY STANDARDS:
- Clean, maintainable code
- Proper error handling
- Type safety enforced
- Secure token handling
- Efficient state updates
- No memory leaks
- Clear action names

DELIVERABLES:
- Zustand auth store
- Login/logout actions
- Token refresh logic
- Axios interceptor
- Persistence middleware
- Type definitions

SUCCESS METRIC: User stays authenticated across page reloads, tokens refresh automatically, and logout works correctly.
```

---



## Task 4.3: Web API Client Service

```
TASK: Create centralized, type-safe API client for all backend communication

SYSTEM CONTEXT:
Unified API layer for Barcody web app:
- Single source for all backend calls
- Consistent error handling
- Automatic authentication
- Request retry logic
- Type-safe API methods

REQUIREMENTS:

1. API CLIENT SETUP
   - Create lib/api/client.ts as centralized API client
   - Use axios as HTTP client
   - Configure base URL from environment (NEXT_PUBLIC_API_URL)
   - Set default timeout (30 seconds)
   - Include credentials in requests

2. AUTHENTICATION INTEGRATION
   - Import auth store from Task 4.2
   - Request interceptor: Add Authorization header with access token
   - Format: "Bearer {accessToken}"
   - Only add header if token exists
   - Skip auth header for public endpoints

3. ERROR HANDLING INTERCEPTOR
   - Response interceptor for error handling
   - Parse backend error responses
   - Extract error message from response
   - Handle network errors (no response)
   - Handle timeout errors
   - Transform errors to consistent format
   - Log errors for debugging

4. RETRY LOGIC
   - Implement exponential backoff for failed requests
   - Retry on network errors (not 4xx errors)
   - Retry on 5xx server errors
   - Retry on timeout
   - Max retries: 3 attempts
   - Backoff: 1s, 2s, 4s
   - Don't retry on 401, 403, 404

5. TYPED API METHODS
   - Create type-safe methods for each endpoint
   - Auth methods: login, refresh, logout, getMe
   - Scan methods: createScan, getScans, getScan, deleteScan, bulkCreateScans, getScansSince
   - Product methods: getProduct, compareProducts
   - Export methods: exportCSV, exportJSON, exportPDF, exportExcel
   - Analytics methods: trackEvent
   - All methods return typed promises
   - Use TypeScript generics for flexibility

6. REQUEST/RESPONSE TYPES
   - Define interfaces for all request DTOs
   - Define interfaces for all response DTOs
   - Use consistent naming: CreateScanDto, ScanResponseDto, etc.
   - Export all types for use in components
   - Ensure types match backend Swagger definitions

7. PAGINATION SUPPORT
   - Helper method for paginated requests
   - Accept page, limit parameters
   - Return data, total, page, limit in response
   - Type-safe pagination response

8. FILE UPLOAD SUPPORT
   - Support multipart/form-data for file uploads
   - Helper method for file upload requests
   - Progress callback for upload tracking
   - Proper content-type headers

CONSTRAINTS:
- All methods must be type-safe
- Consistent error format
- No hardcoded URLs (use environment)
- Proper timeout handling
- Retry logic must not retry indefinitely
- Must work with auth store from Task 4.2

INTEGRATION POINTS:
- Auth store from Task 4.2
- Backend API from Tasks 3.6, 5.2, 10.3, 11.1, 11.2, 13.2
- Will be used by React Query hooks (Task 4.4)
- All components will use this client

TESTING REQUIREMENTS:
- API client initializes correctly
- Base URL configured from environment
- Auth header added to requests
- Requests succeed with valid data
- Errors handled and transformed
- Retry logic works for network errors
- No retry for 4xx errors
- Typed methods return correct types
- Pagination helper works
- File upload works

ACCEPTANCE CRITERIA:
✅ API client created and configured
✅ Base URL from environment
✅ Auth header interceptor works
✅ Error handling interceptor implemented
✅ Retry logic with exponential backoff
✅ All API methods typed
✅ Request/response types defined
✅ Pagination support added
✅ File upload support added
✅ Consistent error format

QUALITY STANDARDS:
- Type-safe throughout
- Clean, maintainable code
- Comprehensive error handling
- Efficient retry logic
- Clear method names
- Well-documented types
- No code duplication

DELIVERABLES:
- API client service
- Request/response type definitions
- Typed API methods
- Error handling logic
- Retry mechanism
- Pagination helper
- File upload helper

SUCCESS METRIC: All backend communication goes through this client with proper typing, auth, and error handling.
```

---



## Task 4.4: Web Data Fetching Setup

```
TASK: Configure React Query for efficient data fetching and caching

SYSTEM CONTEXT:
Data fetching layer for Barcody web app:
- Automatic caching and revalidation
- Loading and error states
- Optimistic updates
- Background refetching
- Type-safe hooks

REQUIREMENTS:

1. REACT QUERY SETUP
   - Install @tanstack/react-query
   - Install @tanstack/react-query-devtools (dev only)
   - Create QueryClient configuration
   - Wrap app with QueryClientProvider
   - Configure devtools for development

2. QUERY CLIENT CONFIGURATION
   - Default stale time: 5 minutes (scans, products)
   - Default cache time: 10 minutes
   - Retry failed queries: 3 attempts with exponential backoff
   - Refetch on window focus: true (for scans)
   - Refetch on reconnect: true
   - Error handling: log errors, show toast notifications

3. QUERY HOOKS
   - useScans(page, limit, filters): Fetch paginated scan list
   - useScan(id): Fetch single scan by ID
   - useProduct(barcode): Fetch product information
   - useAnalytics(dateRange): Fetch analytics data (admin only)
   - useMe(): Fetch current user info
   - All hooks return: data, isLoading, isError, error, refetch

4. MUTATION HOOKS
   - useCreateScan(): Create new scan
   - useDeleteScan(): Delete scan by ID
   - useBulkCreateScans(): Create multiple scans
   - useExportData(format): Export scans in specified format
   - useTrackEvent(): Track analytics event
   - All mutations return: mutate, mutateAsync, isLoading, isError, error

5. CUSTOM STALE TIMES
   - Scans: 5 minutes (frequently updated)
   - Products: 30 days (rarely change)
   - User info: 15 minutes
   - Analytics: 1 minute (real-time data)
   - Configure per-query stale time

6. CACHE INVALIDATION
   - Invalidate scans cache after create/delete
   - Invalidate user cache after profile update
   - Invalidate analytics cache after event tracking
   - Use queryClient.invalidateQueries()
   - Proper query key structure for targeted invalidation

7. OPTIMISTIC UPDATES
   - Optimistically add scan to list on create
   - Optimistically remove scan from list on delete
   - Roll back on error
   - Show loading state during mutation
   - Sync with server response

8. ERROR HANDLING
   - Display toast notifications for errors
   - Retry failed mutations (optional)
   - Clear error state on retry
   - Log errors for debugging
   - User-friendly error messages

9. LOADING STATES
   - Show skeleton loaders during initial fetch
   - Show spinner for refetch
   - Disable actions during mutations
   - Smooth transitions between states

CONSTRAINTS:
- All hooks must be type-safe
- Proper query key structure
- Efficient cache invalidation
- No unnecessary refetches
- Handle offline scenarios gracefully
- Memory-efficient caching

INTEGRATION POINTS:
- API client from Task 4.3
- Auth store from Task 4.2
- Will be used by all data-driven components
- Scanner components (Task 6.1, 6.2, 6.3)
- Product display (Task 10.4)

TESTING REQUIREMENTS:
- QueryClient configured correctly
- Query hooks fetch data
- Mutation hooks create/update/delete data
- Cache invalidation works
- Optimistic updates work
- Error handling displays messages
- Loading states display correctly
- Stale time respected
- Refetch on window focus works
- DevTools accessible in development

ACCEPTANCE CRITERIA:
✅ React Query installed and configured
✅ QueryClient with proper defaults
✅ All query hooks created
✅ All mutation hooks created
✅ Custom stale times configured
✅ Cache invalidation implemented
✅ Optimistic updates working
✅ Error handling with toasts
✅ Loading states implemented
✅ DevTools configured
✅ Type-safe throughout

QUALITY STANDARDS:
- Efficient caching strategy
- Proper query key structure
- Clean hook interfaces
- Comprehensive error handling
- Smooth UX transitions
- No memory leaks
- Well-documented hooks

DELIVERABLES:
- QueryClient configuration
- Query hooks for all endpoints
- Mutation hooks for all actions
- Cache invalidation logic
- Optimistic update handlers
- Error handling setup
- DevTools configuration

SUCCESS METRIC: Data fetching is automatic, cached efficiently, and provides smooth UX with proper loading/error states.
```

---



## Task 4.5: Web Auth - Protected Routes

```
TASK: Implement route protection and error boundaries for authenticated pages

SYSTEM CONTEXT:
Route security for Barcody web app:
- Prevent unauthorized access to protected pages
- Redirect unauthenticated users to login
- Handle authentication errors gracefully
- Provide loading states during auth checks

REQUIREMENTS:

1. PROTECTED ROUTE WRAPPER
   - Create ProtectedRoute component
   - Check authentication status from auth store (Task 4.2)
   - Redirect to /login if not authenticated
   - Preserve intended destination URL for post-login redirect
   - Show loading spinner during auth check
   - Allow children to render only when authenticated

2. AUTHENTICATION CHECK
   - Read isAuthenticated from auth store
   - Read isLoading from auth store
   - If loading: show loading spinner
   - If not authenticated: redirect to /login with return URL
   - If authenticated: render children
   - Re-check on auth state changes

3. REDIRECT LOGIC
   - Capture current URL before redirect
   - Store in query parameter: /login?redirect=/dashboard
   - After successful login, redirect to stored URL
   - Default to /dashboard if no redirect URL
   - Handle invalid redirect URLs (security)

4. ERROR BOUNDARY COMPONENT
   - Create ErrorBoundary component
   - Catch React errors in component tree
   - Display user-friendly error message
   - Provide "Try Again" button
   - Log errors to console (and Sentry in production)
   - Reset error state on retry

5. ERROR BOUNDARY INTEGRATION
   - Wrap protected routes with ErrorBoundary
   - Catch authentication errors
   - Catch API errors
   - Catch rendering errors
   - Prevent white screen of death

6. LOADING STATES
   - Show full-page spinner during initial auth check
   - Show skeleton loader for page content
   - Smooth transition from loading to content
   - Prevent flash of unauthenticated content

7. PUBLIC ROUTES
   - Define list of public routes (/, /login, /about)
   - Skip auth check for public routes
   - Redirect authenticated users away from /login
   - Allow public access to landing page

CONSTRAINTS:
- Must prevent unauthorized access
- No flash of protected content
- Secure redirect URL handling
- Fast auth check (<500ms)
- Accessible error messages
- Mobile-responsive

INTEGRATION POINTS:
- Auth store from Task 4.2
- Login page from Task 4.1
- All protected pages will use this
- Error monitoring from Task 1.11

TESTING REQUIREMENTS:
- Unauthenticated users redirected to login
- Authenticated users see protected content
- Redirect URL preserved and used
- Loading state displays during check
- Error boundary catches errors
- Error boundary displays message
- Try again button resets error
- Public routes accessible without auth
- Authenticated users redirect from login

ACCEPTANCE CRITERIA:
✅ ProtectedRoute component created
✅ Auth check implemented
✅ Redirect to login works
✅ Return URL preserved
✅ Post-login redirect works
✅ Loading state displays
✅ ErrorBoundary component created
✅ Errors caught and displayed
✅ Try again functionality works
✅ Public routes accessible
✅ No flash of content

QUALITY STANDARDS:
- Secure route protection
- Smooth UX transitions
- Clear error messages
- Accessible components
- Type-safe implementation
- No security vulnerabilities

DELIVERABLES:
- ProtectedRoute component
- ErrorBoundary component
- Redirect logic
- Loading states
- Public route configuration

SUCCESS METRIC: Unauthorized users cannot access protected pages, and all errors are caught gracefully.
```

---



## Task 4.6: Mobile Auth - Google OAuth Flow

```
TASK: Implement Google OAuth authentication for React Native mobile app

SYSTEM CONTEXT:
Mobile authentication for Barcody using Google OAuth:
- Native OAuth flow with Expo
- Secure authentication via Google
- Seamless mobile UX
- Integration with backend OAuth from Task 3.4

REQUIREMENTS:

1. DEPENDENCIES
   - Install expo-auth-session for OAuth flow
   - Install expo-web-browser for OAuth popup
   - Install expo-crypto for secure random state generation
   - Ensure compatibility with Expo SDK

2. GOOGLE OAUTH CONFIGURATION
   - Configure Google OAuth in app.json
   - Add Android and iOS client IDs
   - Configure redirect URI scheme
   - Set up OAuth scopes (profile, email)

3. OAUTH HOOK
   - Create useGoogleAuth custom hook
   - Use Expo AuthSession for OAuth flow
   - Generate secure state parameter
   - Handle OAuth redirect
   - Extract authorization code
   - Send code to backend /auth/google endpoint

4. OAUTH FLOW
   - User taps "Sign in with Google" button
   - Open Google OAuth in WebBrowser
   - User authenticates with Google
   - Google redirects back to app
   - App receives authorization code
   - Send code to backend
   - Receive JWT tokens
   - Store tokens securely (Task 4.7)
   - Navigate to main app

5. ERROR HANDLING
   - Handle OAuth cancellation
   - Handle network errors
   - Handle backend errors
   - Display error alerts
   - Provide retry mechanism
   - Log errors for debugging

6. LOADING STATES
   - Show loading indicator during OAuth
   - Disable button during flow
   - Prevent multiple simultaneous attempts
   - Show progress messages

7. PLATFORM-SPECIFIC HANDLING
   - Handle iOS OAuth flow
   - Handle Android OAuth flow
   - Test on both platforms
   - Handle platform-specific errors

CONSTRAINTS:
- Must work on iOS and Android
- Secure OAuth implementation
- Handle all error cases
- Fast OAuth flow (<5s)
- Native feel
- No web views (use WebBrowser)

INTEGRATION POINTS:
- Backend OAuth from Task 3.4
- Token storage from Task 4.7
- Auth store from Task 4.7
- Login screen from Task 4.8

TESTING REQUIREMENTS:
- OAuth flow initiates correctly
- Google login page opens
- User can authenticate
- App receives auth code
- Backend receives code
- JWT tokens returned
- Tokens stored securely
- Navigation to main app works
- Errors display correctly
- Works on iOS
- Works on Android

ACCEPTANCE CRITERIA:
✅ OAuth dependencies installed
✅ Google OAuth configured
✅ useGoogleAuth hook created
✅ OAuth flow completes
✅ Authorization code received
✅ Backend authentication works
✅ JWT tokens received
✅ Error handling implemented
✅ Loading states display
✅ Works on both platforms

QUALITY STANDARDS:
- Secure OAuth implementation
- Smooth native UX
- Comprehensive error handling
- Platform compatibility
- Type-safe code
- Clear user feedback

DELIVERABLES:
- useGoogleAuth hook
- OAuth configuration
- Error handling logic
- Loading states
- Platform-specific handling

SUCCESS METRIC: User can authenticate with Google on mobile and receive valid JWT tokens.
```

---



## Task 4.7: Mobile Auth - Token Storage

```
TASK: Implement secure token storage and auth state management for mobile

SYSTEM CONTEXT:
Secure authentication state for Barcody mobile app:
- Store JWT tokens securely
- Manage auth state globally
- Auto-login on app launch
- Persist auth across app restarts

REQUIREMENTS:

1. SECURE STORAGE DEPENDENCIES
   - Install @react-native-async-storage/async-storage for general storage
   - Install expo-secure-store for sensitive data (tokens)
   - Install zustand for state management
   - Ensure compatibility with Expo

2. SECURE STORAGE SERVICE
   - Create services/secureStorage.ts
   - Wrapper methods for SecureStore
   - saveTokens(accessToken, refreshToken): Store tokens securely
   - getTokens(): Retrieve tokens
   - deleteTokens(): Remove tokens
   - Error handling for storage operations
   - Platform-specific handling (iOS keychain, Android keystore)

3. AUTH STORE WITH ZUSTAND
   - Create stores/authStore.ts
   - State: user, accessToken, refreshToken, isAuthenticated, isLoading
   - Actions: login, logout, setUser, setTokens, refreshAccessToken, initialize
   - Type-safe state and actions
   - No persistence in Zustand (use SecureStore instead)

4. LOGIN ACTION
   - Accept user, accessToken, refreshToken
   - Store tokens in SecureStore
   - Update Zustand state
   - Set isAuthenticated to true
   - Navigate to main app

5. LOGOUT ACTION
   - Clear tokens from SecureStore
   - Clear Zustand state
   - Set isAuthenticated to false
   - Navigate to login screen
   - Revoke tokens on backend (optional)

6. AUTO-LOGIN ON APP LAUNCH
   - Create initialize action
   - Check SecureStore for tokens on app start
   - If tokens exist: validate expiration
   - If valid: fetch user info, set auth state
   - If invalid/expired: attempt refresh or logout
   - Set isLoading during initialization

7. TOKEN REFRESH
   - Monitor access token expiration
   - Automatically refresh before expiration
   - Use refresh token to get new access token
   - Update SecureStore with new token
   - Update Zustand state
   - Handle refresh failure (force logout)

8. ERROR HANDLING
   - Handle SecureStore errors
   - Handle network errors during refresh
   - Handle invalid tokens
   - Clear state on errors
   - Log errors for debugging

CONSTRAINTS:
- Tokens must be stored securely (SecureStore)
- No tokens in AsyncStorage
- Type-safe throughout
- Handle token expiration
- Fast initialization (<1s)
- Platform compatibility

INTEGRATION POINTS:
- OAuth flow from Task 4.6
- API client from Task 4.9
- Protected navigation from Task 4.11
- All authenticated screens

TESTING REQUIREMENTS:
- Tokens stored in SecureStore
- Tokens retrieved correctly
- Login stores tokens and user
- Logout clears all data
- Auto-login works on app restart
- Token refresh works automatically
- Expired tokens trigger logout
- Errors handled gracefully
- Works on iOS
- Works on Android

ACCEPTANCE CRITERIA:
✅ SecureStore service created
✅ Auth store with Zustand created
✅ Login action stores tokens securely
✅ Logout action clears all data
✅ Auto-login on app launch works
✅ Token refresh implemented
✅ Error handling robust
✅ Type-safe throughout
✅ Platform compatible

QUALITY STANDARDS:
- Secure token storage
- Clean state management
- Efficient initialization
- Comprehensive error handling
- Type safety enforced
- No security vulnerabilities

DELIVERABLES:
- Secure storage service
- Zustand auth store
- Login/logout actions
- Auto-login logic
- Token refresh mechanism
- Error handling

SUCCESS METRIC: Tokens stored securely, user stays authenticated across app restarts, automatic token refresh works.
```

---



## Task 4.8: Mobile Auth - UI Components

```
TASK: Create authentication UI screens for mobile app

SYSTEM CONTEXT:
User-facing auth screens for Barcody mobile:
- Login screen with Google OAuth
- Loading screen during auth
- User profile screen
- Logout functionality
- Navigation flow

REQUIREMENTS:

1. LOGIN SCREEN
   - Create screens/LoginScreen.tsx
   - Display Barcody logo and branding
   - "Sign in with Google" button
   - Use Google branding guidelines
   - Dark theme styling
   - Loading state during OAuth
   - Error message display
   - Retry button on error

2. LOADING SCREEN
   - Create screens/LoadingScreen.tsx
   - Display during app initialization
   - Show Barcody logo
   - Loading spinner
   - "Checking authentication..." message
   - Dark theme
   - Smooth fade-in/out transitions

3. USER PROFILE SCREEN
   - Create screens/ProfileScreen.tsx
   - Display user information (name, email, profile picture)
   - Account creation date
   - Last login timestamp
   - Logout button
   - Settings link
   - Dark theme
   - Responsive layout

4. LOGOUT BUTTON
   - Prominent logout button on profile screen
   - Confirmation dialog before logout
   - "Are you sure you want to logout?"
   - Cancel and Confirm buttons
   - Clear all auth state on confirm
   - Navigate to login screen

5. NAVIGATION FLOW
   - Unauthenticated: Show login screen
   - Authenticating: Show loading screen
   - Authenticated: Show main app (tabs)
   - Logout: Navigate to login screen
   - Smooth transitions between screens

6. ERROR HANDLING UI
   - Display error alerts for auth failures
   - User-friendly error messages
   - Retry button
   - Clear error state on retry
   - Log errors for debugging

7. ACCESSIBILITY
   - Proper labels for screen readers
   - Keyboard navigation support
   - High contrast for readability
   - Touch target sizes (min 44x44)
   - Focus indicators

CONSTRAINTS:
- Dark theme only
- Native feel (no web views)
- Fast screen transitions
- Accessible (WCAG 2.1 AA)
- Works on iOS and Android
- Responsive to different screen sizes

INTEGRATION POINTS:
- OAuth hook from Task 4.6
- Auth store from Task 4.7
- Tab navigation from Task 1.7
- Protected navigation from Task 4.11

TESTING REQUIREMENTS:
- Login screen renders correctly
- Google button works
- Loading screen displays during auth
- Profile screen shows user info
- Logout button triggers confirmation
- Logout clears auth and navigates
- Error messages display
- Retry button works
- Navigation flow correct
- Works on iOS
- Works on Android
- Accessible via screen reader

ACCEPTANCE CRITERIA:
✅ Login screen created
✅ Loading screen created
✅ Profile screen created
✅ Logout button functional
✅ Confirmation dialog works
✅ Navigation flow correct
✅ Error handling UI implemented
✅ Dark theme applied
✅ Accessible components
✅ Works on both platforms

QUALITY STANDARDS:
- Professional UI design
- Smooth animations
- Clear user feedback
- Accessible components
- Type-safe code
- Consistent styling

DELIVERABLES:
- Login screen component
- Loading screen component
- Profile screen component
- Logout confirmation dialog
- Navigation flow logic
- Error handling UI

SUCCESS METRIC: User can navigate through auth flow with clear, professional UI on both iOS and Android.
```

---



## Task 4.9: Mobile API Client Service

```
TASK: Create centralized API client for mobile backend communication

SYSTEM CONTEXT:
API layer for Barcody mobile app:
- Single source for all backend calls
- Automatic authentication
- Offline detection
- Request retry logic
- Type-safe methods

REQUIREMENTS:

1. API CLIENT SETUP
   - Create services/apiClient.ts
   - Use axios as HTTP client
   - Configure base URL from AsyncStorage (Tailscale URL from Task 9.3)
   - Set default timeout (30 seconds)
   - Include credentials in requests

2. AUTHENTICATION INTEGRATION
   - Import auth store from Task 4.7
   - Request interceptor: Add Authorization header
   - Get access token from SecureStore
   - Format: "Bearer {accessToken}"
   - Only add header if token exists

3. OFFLINE DETECTION
   - Install @react-native-community/netinfo
   - Check network status before requests
   - Queue requests when offline
   - Retry when back online
   - Display offline indicator

4. ERROR HANDLING
   - Response interceptor for errors
   - Parse backend error responses
   - Handle network errors
   - Handle timeout errors
   - Transform to consistent format
   - Log errors for debugging

5. RETRY LOGIC
   - Exponential backoff for failed requests
   - Retry on network errors
   - Retry on 5xx errors
   - Retry on timeout
   - Max retries: 3 attempts
   - Backoff: 1s, 2s, 4s
   - Don't retry on 4xx errors

6. TYPED API METHODS
   - Auth methods: login, refresh, logout, getMe
   - Scan methods: createScan, getScans, getScan, deleteScan, bulkCreateScans, getScansSince
   - Product methods: getProduct
   - All methods return typed promises
   - Use TypeScript generics

7. REQUEST/RESPONSE TYPES
   - Define interfaces for all DTOs
   - Consistent naming conventions
   - Export types for components
   - Match backend Swagger definitions

8. OFFLINE QUEUE
   - Queue failed requests when offline
   - Store in AsyncStorage
   - Retry when back online
   - Max queue size: 50 requests
   - Clear queue on success

CONSTRAINTS:
- Type-safe throughout
- Handle offline scenarios
- Secure token handling
- Efficient retry logic
- No infinite retries
- Platform compatible

INTEGRATION POINTS:
- Auth store from Task 4.7
- Backend API from Tasks 3.6, 5.2, 10.3
- React Query from Task 4.10
- Offline sync from Task 8.4

TESTING REQUIREMENTS:
- API client initializes
- Base URL configured
- Auth header added
- Requests succeed
- Errors handled
- Retry logic works
- Offline detection works
- Queue works when offline
- Typed methods correct
- Works on iOS
- Works on Android

ACCEPTANCE CRITERIA:
✅ API client created
✅ Base URL from AsyncStorage
✅ Auth header interceptor
✅ Offline detection implemented
✅ Error handling interceptor
✅ Retry logic with backoff
✅ All API methods typed
✅ Request/response types defined
✅ Offline queue implemented
✅ Platform compatible

QUALITY STANDARDS:
- Type-safe code
- Robust error handling
- Efficient retry logic
- Clean method interfaces
- No code duplication
- Well-documented types

DELIVERABLES:
- API client service
- Type definitions
- Typed API methods
- Error handling logic
- Retry mechanism
- Offline queue

SUCCESS METRIC: All backend communication works reliably with proper offline handling and type safety.
```

---



## Task 4.10: Mobile Data Fetching Setup

```
TASK: Configure React Query for mobile data fetching with offline support

SYSTEM CONTEXT:
Data fetching for Barcody mobile:
- Automatic caching
- Offline query handling
- Loading states
- Type-safe hooks
- Background sync

REQUIREMENTS:

1. REACT QUERY SETUP
   - Install @tanstack/react-query
   - Create QueryClient configuration
   - Wrap app with QueryClientProvider
   - Configure for mobile environment

2. QUERY CLIENT CONFIGURATION
   - Default stale time: 5 minutes
   - Default cache time: 10 minutes
   - Retry failed queries: 3 attempts
   - Refetch on app focus: true
   - Refetch on reconnect: true
   - Network mode: offlineFirst

3. QUERY HOOKS
   - useScans(page, limit): Fetch scan list
   - useScan(id): Fetch single scan
   - useProduct(barcode): Fetch product info
   - useMe(): Fetch current user
   - All hooks return: data, isLoading, isError, error, refetch

4. MUTATION HOOKS
   - useCreateScan(): Create scan
   - useDeleteScan(): Delete scan
   - useBulkCreateScans(): Bulk create
   - All mutations return: mutate, mutateAsync, isLoading, isError, error

5. CUSTOM STALE TIMES
   - Scans: 5 minutes
   - Products: 30 days
   - User info: 15 minutes
   - Configure per-query

6. OFFLINE QUERY HANDLING
   - Queries work offline (return cached data)
   - Mutations queue when offline
   - Auto-retry when back online
   - Show offline indicator
   - Sync with server when online

7. CACHE INVALIDATION
   - Invalidate scans after create/delete
   - Invalidate user after update
   - Proper query key structure
   - Targeted invalidation

8. OPTIMISTIC UPDATES
   - Optimistically add scan to list
   - Optimistically remove scan
   - Roll back on error
   - Sync with server response

9. PERSISTENCE
   - Persist query cache to AsyncStorage
   - Restore cache on app launch
   - Clear cache on logout
   - Max cache size management

CONSTRAINTS:
- Type-safe hooks
- Offline-first approach
- Efficient caching
- No unnecessary refetches
- Platform compatible
- Memory efficient

INTEGRATION POINTS:
- API client from Task 4.9
- Auth store from Task 4.7
- SQLite from Task 8.1
- Offline sync from Task 8.4

TESTING REQUIREMENTS:
- QueryClient configured
- Query hooks fetch data
- Mutation hooks work
- Offline queries return cache
- Offline mutations queue
- Cache invalidation works
- Optimistic updates work
- Persistence works
- Works on iOS
- Works on Android

ACCEPTANCE CRITERIA:
✅ React Query installed
✅ QueryClient configured
✅ All query hooks created
✅ All mutation hooks created
✅ Custom stale times set
✅ Offline handling implemented
✅ Cache invalidation works
✅ Optimistic updates working
✅ Persistence configured
✅ Type-safe throughout

QUALITY STANDARDS:
- Efficient caching
- Proper query keys
- Clean hook interfaces
- Offline-first design
- Type safety enforced
- No memory leaks

DELIVERABLES:
- QueryClient configuration
- Query hooks
- Mutation hooks
- Cache invalidation logic
- Optimistic update handlers
- Persistence setup

SUCCESS METRIC: Data fetching works offline, caches efficiently, and syncs automatically when online.
```

---



## Task 4.11: Mobile Auth - Protected Navigation

```
TASK: Implement navigation guards for authenticated screens

SYSTEM CONTEXT:
Navigation security for Barcody mobile:
- Prevent unauthorized access
- Redirect to login when needed
- Handle auth state changes
- Smooth navigation flow

REQUIREMENTS:

1. AUTH GUARD HOOK
   - Create hooks/useAuthGuard.ts
   - Check authentication status from auth store
   - Return isAuthenticated, isLoading
   - Subscribe to auth state changes
   - Trigger navigation on auth changes

2. NAVIGATION LISTENER
   - Listen for navigation events
   - Check auth before each screen
   - Redirect to login if not authenticated
   - Allow navigation if authenticated
   - Handle loading state

3. SPLASH SCREEN
   - Show splash screen during initial auth check
   - Display Barcody logo
   - Loading indicator
   - Check for stored tokens
   - Navigate to login or main app
   - Hide splash when auth determined

4. PROTECTED SCREEN WRAPPER
   - Create components/ProtectedScreen.tsx
   - Wrap protected screens
   - Check auth with useAuthGuard
   - Show loading if checking
   - Redirect to login if not authenticated
   - Render children if authenticated

5. NAVIGATION FLOW
   - App launch: Show splash screen
   - Check auth: Loading state
   - Not authenticated: Navigate to login
   - Authenticated: Navigate to main tabs
   - Logout: Navigate to login
   - Smooth transitions

6. AUTH STATE CHANGES
   - Listen for auth state changes
   - Navigate to login on logout
   - Navigate to main app on login
   - Handle token expiration
   - Handle refresh failures

7. DEEP LINKING
   - Handle deep links to protected screens
   - Store intended destination
   - Redirect to login if needed
   - Navigate to destination after login
   - Validate deep link URLs

CONSTRAINTS:
- No flash of protected content
- Fast auth check (<500ms)
- Smooth transitions
- Handle all auth states
- Platform compatible
- Secure navigation

INTEGRATION POINTS:
- Auth store from Task 4.7
- Login screen from Task 4.8
- Tab navigation from Task 1.7
- All protected screens

TESTING REQUIREMENTS:
- Splash screen shows on launch
- Auth check completes
- Unauthenticated users go to login
- Authenticated users go to main app
- Logout navigates to login
- Protected screens check auth
- Loading states display
- Transitions smooth
- Deep links work
- Works on iOS
- Works on Android

ACCEPTANCE CRITERIA:
✅ useAuthGuard hook created
✅ Navigation listener implemented
✅ Splash screen functional
✅ ProtectedScreen wrapper created
✅ Navigation flow correct
✅ Auth state changes handled
✅ Deep linking works
✅ No flash of content
✅ Smooth transitions
✅ Platform compatible

QUALITY STANDARDS:
- Secure navigation
- Smooth UX
- Fast auth checks
- Type-safe code
- No navigation bugs
- Clear user feedback

DELIVERABLES:
- useAuthGuard hook
- Navigation listener
- Splash screen
- ProtectedScreen wrapper
- Navigation flow logic
- Deep link handling

SUCCESS METRIC: Unauthorized users cannot access protected screens, navigation is smooth and secure.
```

---



## Task 4.12: Admin Dashboard Data Fetching

```
TASK: Configure React Query for admin dashboard data fetching

SYSTEM CONTEXT:
Data fetching for Barcody admin dashboard:
- Analytics data fetching
- User management data
- Scan statistics
- Real-time updates
- Type-safe hooks

REQUIREMENTS:

1. REACT QUERY SETUP
   - Install @tanstack/react-query
   - Install @tanstack/react-query-devtools
   - Create QueryClient configuration
   - Wrap app with QueryClientProvider
   - Configure devtools

2. QUERY CLIENT CONFIGURATION
   - Default stale time: 1 minute (analytics)
   - Default cache time: 5 minutes
   - Retry failed queries: 3 attempts
   - Refetch on window focus: true
   - Refetch on reconnect: true
   - Auto-refetch for real-time data

3. ADMIN QUERY HOOKS
   - useAnalyticsOverview(dateRange): Fetch overview stats
   - useAnalyticsTrends(dateRange, metric): Fetch trend data
   - useBarcodeTypes(): Fetch barcode type distribution
   - useDeviceBreakdown(): Fetch device statistics
   - useUsers(page, limit): Fetch user list
   - useScans(page, limit, filters): Fetch all scans
   - All hooks return: data, isLoading, isError, error, refetch

4. CUSTOM STALE TIMES
   - Analytics overview: 1 minute
   - Trend data: 1 minute
   - User list: 5 minutes
   - Scan list: 2 minutes
   - Configure per-query

5. AUTO-REFETCH
   - Refetch analytics every 1 minute
   - Refetch on window focus
   - Refetch on reconnect
   - Pause refetch when window hidden
   - Configurable refetch interval

6. CACHE INVALIDATION
   - Invalidate analytics after event tracking
   - Invalidate users after admin actions
   - Invalidate scans after bulk operations
   - Proper query key structure

7. ERROR HANDLING
   - Display toast notifications
   - Retry failed queries
   - Log errors
   - User-friendly messages
   - Admin-specific error details

8. LOADING STATES
   - Skeleton loaders for charts
   - Spinner for tables
   - Disable actions during mutations
   - Smooth transitions

9. DEVTOOLS
   - Enable React Query DevTools
   - Show cache state
   - Show query status
   - Debug query issues
   - Development only

CONSTRAINTS:
- Type-safe hooks
- Efficient caching
- Real-time updates
- No unnecessary refetches
- Admin-only access
- Secure data handling

INTEGRATION POINTS:
- API client from Task 4.3
- Auth store from Task 4.2
- Admin backend from Task 13.1
- Charts from Task 13.4

TESTING REQUIREMENTS:
- QueryClient configured
- All query hooks fetch data
- Auto-refetch works
- Cache invalidation works
- Error handling displays messages
- Loading states display
- DevTools accessible
- Type-safe throughout

ACCEPTANCE CRITERIA:
✅ React Query installed
✅ QueryClient configured
✅ All admin query hooks created
✅ Custom stale times set
✅ Auto-refetch configured
✅ Cache invalidation works
✅ Error handling implemented
✅ Loading states added
✅ DevTools configured
✅ Type-safe throughout

QUALITY STANDARDS:
- Efficient caching
- Real-time data updates
- Clean hook interfaces
- Comprehensive error handling
- Type safety enforced
- No memory leaks

DELIVERABLES:
- QueryClient configuration
- Admin query hooks
- Cache invalidation logic
- Error handling setup
- DevTools configuration

SUCCESS METRIC: Admin dashboard fetches real-time analytics data efficiently with proper caching and error handling.
```

---



## Task 4.13: Admin Dashboard Authentication

```
TASK: Implement Google OAuth and admin-only access for dashboard

SYSTEM CONTEXT:
Admin authentication for Barcody dashboard:
- Google OAuth login
- Email-based admin verification
- Protected admin routes
- Secure admin access

REQUIREMENTS:

1. DEPENDENCIES
   - Install @react-oauth/google
   - Install zustand
   - Install axios
   - Ensure Next.js 14 compatibility

2. GOOGLE OAUTH PROVIDER
   - Create GoogleOAuthProvider wrapper
   - Configure with Google Client ID
   - Wrap app at root level
   - Handle initialization errors

3. LOGIN PAGE
   - Create /login route
   - "Sign in with Gmail" button
   - Display admin branding
   - Dark theme styling
   - Loading state during OAuth
   - Error message display

4. AUTH STORE
   - Create stores/authStore.ts with Zustand
   - State: user, accessToken, refreshToken, isAuthenticated, isAdmin, isLoading
   - Actions: login, logout, setUser, setTokens, checkAdminStatus
   - Persist to localStorage
   - Type-safe state

5. ADMIN VERIFICATION
   - After OAuth, send to backend /auth/google
   - Backend validates email against ADMIN_EMAIL env var
   - Return isAdmin flag in response
   - Store isAdmin in auth store
   - Redirect to dashboard if admin
   - Show "Not authorized" if not admin

6. API CLIENT SERVICE
   - Create lib/api/client.ts
   - Axios instance with base URL
   - Request interceptor: Add auth header
   - Response interceptor: Handle 401/403
   - Retry logic for failed requests
   - Type-safe API methods

7. PROTECTED ROUTE WRAPPER
   - Create components/ProtectedRoute.tsx
   - Check isAuthenticated and isAdmin
   - Redirect to login if not authenticated
   - Show "Not authorized" if not admin
   - Loading state during check
   - Render children if authorized

8. LOGOUT FUNCTIONALITY
   - Logout button in header
   - Clear auth store
   - Clear localStorage
   - Redirect to login
   - Revoke tokens on backend (optional)

9. TOKEN REFRESH
   - Monitor access token expiration
   - Auto-refresh before expiration
   - Use refresh token
   - Update store with new token
   - Handle refresh failure (logout)

CONSTRAINTS:
- Admin-only access (email-based)
- Secure OAuth implementation
- Type-safe throughout
- Fast auth check
- Dark theme only
- Mobile-responsive

INTEGRATION POINTS:
- Backend admin guard from Task 13.1
- Admin API from Task 13.1
- Data fetching from Task 4.12
- Charts from Task 13.4

TESTING REQUIREMENTS:
- Login page renders
- Google OAuth works
- Admin email verified
- Non-admin users blocked
- Admin users access dashboard
- Protected routes work
- Logout clears auth
- Token refresh works
- Error handling displays messages

ACCEPTANCE CRITERIA:
✅ Google OAuth configured
✅ Login page created
✅ Auth store with Zustand
✅ Admin verification works
✅ API client created
✅ Protected route wrapper
✅ Logout functionality
✅ Token refresh implemented
✅ Error handling robust
✅ Type-safe throughout

QUALITY STANDARDS:
- Secure authentication
- Admin-only access enforced
- Smooth UX
- Type safety
- Clear error messages
- No security vulnerabilities

DELIVERABLES:
- Login page
- Google OAuth provider
- Auth store
- Admin verification logic
- API client service
- Protected route wrapper
- Logout functionality
- Token refresh mechanism

SUCCESS METRIC: Only authorized admin users can access dashboard, authentication is secure and seamless.
```

---



## Phase 4 Complete

All 13 tasks for Auth Frontend have been detailed with:
- ✅ Full requirements (no code snippets)
- ✅ System context and integration points
- ✅ Comprehensive testing requirements
- ✅ Clear acceptance criteria
- ✅ Quality standards
- ✅ Success metrics

**Next**: Create files for remaining phases (5-16)


```
TASK: Implement Google OAuth login interface for web application

SYSTEM CONTEXT:
Web authentication for Barcody using Google OAuth:
- No username/password forms needed
- Secure third-party authentication via Google
- Seamless user experience
- Integration with backend OAuth flow from Task 3.4

REQUIREMENTS:

1. DEPENDENCIES
   - Install @react-oauth/google for Google OAuth integration
   - Install axios for HTTP requests (if not already installed)
   - Ensure compatibility with Next.js 14+ App Router

2. GOOGLE OAUTH PROVIDER
   - Create GoogleOAuthProvider wrapper component
   - Configure with Google Client ID from environment (NEXT_PUBLIC_GOOGLE_CLIENT_ID)
   - Wrap application at root level
   - Handle provider initialization errors

3. LOGIN PAGE
   - Create login page at /login route
   - Implement Google Sign-In button using @react-oauth/google
   - Display application branding (Barcody logo, tagline)
   - Dark theme styling consistent with app
   - Responsive design (mobile-first)
   - Loading state during OAuth flow

4. OAUTH CALLBACK HANDLER
   - Handle OAuth response from Google
   - Extract authorization code or credential
   - Send to backend /auth/google endpoint
   - Receive JWT tokens from backend
   - Store tokens securely (will integrate with state management in Task 4.2)
   - Redirect to dashboard on success
   - Display error message on failure

5. ERROR HANDLING
   - Handle OAuth popup blocked
   - Handle OAuth cancellation by user
   - Handle network errors
   - Handle backend authentication errors
   - Display user-friendly error messages
   - Provide retry mechanism

6. LOADING STATES
   - Show loading spinner during OAuth flow
   - Disable button during authentication
   - Prevent multiple simultaneous auth attempts
   - Smooth transitions between states

7. REDIRECT LOGIC
   - Redirect authenticated users away from login page
   - Support "redirect after login" functionality
   - Preserve intended destination URL

CONSTRAINTS:
- Must work with Google OAuth 2.0
- No password fields (OAuth only)
- Must be accessible (WCAG 2.1 AA)
- Fast page load (<2s)
- Mobile-responsive
- Dark theme only

INTEGRATION POINTS:
- Backend OAuth from Task 3.4
- Will integrate with auth store (Task 4.2)
- Will use API client (Task 4.3)
- Protected routes will use this (Task 4.5)

TESTING REQUIREMENTS:
- Login page renders correctly
- Google Sign-In button displays
- Clicking button initiates OAuth flow
- OAuth popup opens (or redirect works)
- Successful auth redirects to dashboard
- Failed auth shows error message
- Loading states display correctly
- Already authenticated users redirect away
- Works on mobile viewport
- Accessible via keyboard navigation

ACCEPTANCE CRITERIA:
✅ Login page created and accessible
✅ Google OAuth provider configured
✅ Sign-in button functional
✅ OAuth flow completes successfully
✅ Backend receives auth code
✅ JWT tokens received and handled
✅ Success redirects to dashboard
✅ Errors display user-friendly messages
✅ Loading states implemented
✅ Mobile responsive
✅ Dark theme applied
✅ Keyboard accessible

QUALITY STANDARDS:
- Follow Next.js 14 App Router best practices
- Implement proper error boundaries
- Use TypeScript for type safety
- Accessible components
- Smooth UX transitions
- Clear error messages
- Secure token handling

DELIVERABLES:
- Login page component
- Google OAuth provider wrapper
- OAuth callback handler
- Error handling logic
- Loading state management
- Redirect logic

SUCCESS METRIC: User can click "Sign in with Google", complete OAuth flow, and land on dashboard with valid JWT tokens.
```

---

## Task 4.2: Web Auth - State Management

```
TASK: Implement global authentication state management for web application

SYSTEM CONTEXT:
Centralized auth state for Barcody web app:
- Track authentication status across all pages
- Store user information and tokens
- Provide login/logout actions
- Automatic token refresh
- Persist auth state across page reloads

REQUIREMENTS:

1. STATE MANAGEMENT LIBRARY
   - Install zustand for lightweight state management
   - Create dedicated auth store
   - TypeScript interfaces for all state
   - Persist middleware for localStorage

2. AUTH STORE STRUCTURE
   - State: user (User object or null), accessToken (string or null), refreshToken (string or null), isAuthenticated (boolean), isLoading (boolean)
   - User object: id, email, googleId, createdAt, lastLogin
   - Clear type definitions for all fields

3. AUTH ACTIONS
   - login(user, accessToken, refreshToken): Store user and tokens, set isAuthenticated to true
   - logout(): Clear all auth state, remove from localStorage, redirect to login
   - setUser(user): Update user information
   - setTokens(accessToken, refreshToken): Update tokens
   - refreshAccessToken(): Call refresh endpoint, update access token
   - checkAuthStatus(): Validate current auth state on app load

4. TOKEN PERSISTENCE
   - Store tokens in localStorage (encrypted if possible)
   - Restore tokens on app initialization
   - Clear tokens on logout
   - Handle token expiration
   - Automatic cleanup on browser close (optional)

5. TOKEN REFRESH LOGIC
   - Monitor access token expiration (decode JWT to check exp)
   - Automatically refresh before expiration (2 minutes before)
   - Use refresh token to get new access token
   - Update store with new access token
   - Handle refresh token expiration (force logout)
   - Retry mechanism for failed refresh

6. AXIOS INTERCEPTOR
   - Create axios instance with base URL from environment
   - Request interceptor: Inject access token in Authorization header
   - Response interceptor: Handle 401 errors (trigger token refresh)
   - Response interceptor: Handle 403 errors (force logout)
   - Retry failed requests after token refresh
   - Queue requests during token refresh

7. INITIALIZATION
   - Check for stored tokens on app load
   - Validate tokens (check expiration)
   - Fetch current user if tokens valid
   - Set loading state during initialization
   - Handle initialization errors gracefully

CONSTRAINTS:
- Type-safe throughout
- Secure token storage
- Handle token expiration gracefully
- No token exposure in URLs
- Automatic refresh before expiration
- Single source of truth for auth state

INTEGRATION POINTS:
- Login UI from Task 4.1
- API client from Task 4.3
- Protected routes from Task 4.5
- All API calls will use this store

TESTING REQUIREMENTS:
- Store initializes correctly
- Login action stores user and tokens
- Logout action clears all state
- Tokens persist across page reload
- Token refresh works automatically
- Expired tokens trigger logout
- Axios interceptor adds auth header
- 401 errors trigger token refresh
- Failed refresh triggers logout
- Multiple simultaneous requests handled correctly

ACCEPTANCE CRITERIA:
✅ Zustand store created
✅ Auth state properly typed
✅ Login/logout actions work
✅ Tokens stored in localStorage
✅ Tokens restored on page load
✅ Automatic token refresh implemented
✅ Axios interceptor configured
✅ 401 errors handled
✅ Refresh failures force logout
✅ Request queueing during refresh
✅ Type-safe throughout

QUALITY STANDARDS:
- Clean, maintainable code
- Proper error handling
- Type safety enforced
- Secure token handling
- Efficient state updates
- No memory leaks
- Clear action names

DELIVERABLES:
- Zustand auth store
- Login/logout actions
- Token refresh logic
- Axios interceptor
- Persistence middleware
- Type definitions

SUCCESS METRIC: User stays authenticated across page reloads, tokens refresh automatically, and logout works correctly.
```

---



## Task 4.3: Web API Client Service

```
TASK: Create centralized, type-safe API client for all backend communication

SYSTEM CONTEXT:
Unified API layer for Barcody web app:
- Single source for all backend calls
- Consistent error handling
- Automatic authentication
- Request retry logic
- Type-safe API methods

REQUIREMENTS:

1. API CLIENT SETUP
   - Create lib/api/client.ts as centralized API client
   - Use axios as HTTP client
   - Configure base URL from environment (NEXT_PUBLIC_API_URL)
   - Set default timeout (30 seconds)
   - Include credentials in requests

2. AUTHENTICATION INTEGRATION
   - Import auth store from Task 4.2
   - Request interceptor: Add Authorization header with access token
   - Format: "Bearer {accessToken}"
   - Only add header if token exists
   - Skip auth header for public endpoints

3. ERROR HANDLING INTERCEPTOR
   - Response interceptor for error handling
   - Parse backend error responses
   - Extract error message from response
   - Handle network errors (no response)
   - Handle timeout errors
   - Transform errors to consistent format
   - Log errors for debugging

4. RETRY LOGIC
   - Implement exponential backoff for failed requests
   - Retry on network errors (not 4xx errors)
   - Retry on 5xx server errors
   - Retry on timeout
   - Max retries: 3 attempts
   - Backoff: 1s, 2s, 4s
   - Don't retry on 401, 403, 404

5. TYPED API METHODS
   - Create type-safe methods for each endpoint
   - Auth methods: login, refresh, logout, getMe
   - Scan methods: createScan, getScans, getScan, deleteScan, bulkCreateScans, getScansSince
   - Product methods: getProduct, compareProducts
   - Export methods: exportCSV, exportJSON, exportPDF, exportExcel
   - Analytics methods: trackEvent
   - All methods return typed promises
   - Use TypeScript generics for flexibility

6. REQUEST/RESPONSE TYPES
   - Define interfaces for all request DTOs
   - Define interfaces for all response DTOs
   - Use consistent naming: CreateScanDto, ScanResponseDto, etc.
   - Export all types for use in components
   - Ensure types match backend Swagger definitions

7. PAGINATION SUPPORT
   - Helper method for paginated requests
   - Accept page, limit parameters
   - Return data, total, page, limit in response
   - Type-safe pagination response

8. FILE UPLOAD SUPPORT
   - Support multipart/form-data for file uploads
   - Helper method for file upload requests
   - Progress callback for upload tracking
   - Proper content-type headers

CONSTRAINTS:
- All methods must be type-safe
- Consistent error format
- No hardcoded URLs (use environment)
- Proper timeout handling
- Retry logic must not retry indefinitely
- Must work with auth store from Task 4.2

INTEGRATION POINTS:
- Auth store from Task 4.2
- Backend API from Tasks 3.6, 5.2, 10.3, 11.1, 11.2, 13.2
- Will be used by React Query hooks (Task 4.4)
- All components will use this client

TESTING REQUIREMENTS:
- API client initializes correctly
- Base URL configured from environment
- Auth header added to requests
- Requests succeed with valid data
- Errors handled and transformed
- Retry logic works for network errors
- No retry for 4xx errors
- Typed methods return correct types
- Pagination helper works
- File upload works

ACCEPTANCE CRITERIA:
✅ API client created and configured
✅ Base URL from environment
✅ Auth header interceptor works
✅ Error handling interceptor implemented
✅ Retry logic with exponential backoff
✅ All API methods typed
✅ Request/response types defined
✅ Pagination support added
✅ File upload support added
✅ Consistent error format

QUALITY STANDARDS:
- Type-safe throughout
- Clean, maintainable code
- Comprehensive error handling
- Efficient retry logic
- Clear method names
- Well-documented types
- No code duplication

DELIVERABLES:
- API client service
- Request/response type definitions
- Typed API methods
- Error handling logic
- Retry mechanism
- Pagination helper
- File upload helper

SUCCESS METRIC: All backend communication goes through this client with proper typing, auth, and error handling.
```

---



## Task 4.4: Web Data Fetching Setup

```
TASK: Configure React Query for efficient data fetching and caching

SYSTEM CONTEXT:
Data fetching layer for Barcody web app:
- Automatic caching and revalidation
- Loading and error states
- Optimistic updates
- Background refetching
- Type-safe hooks

REQUIREMENTS:

1. REACT QUERY SETUP
   - Install @tanstack/react-query
   - Install @tanstack/react-query-devtools (dev only)
   - Create QueryClient configuration
   - Wrap app with QueryClientProvider
   - Configure devtools for development

2. QUERY CLIENT CONFIGURATION
   - Default stale time: 5 minutes (scans, products)
   - Default cache time: 10 minutes
   - Retry failed queries: 3 attempts with exponential backoff
   - Refetch on window focus: true (for scans)
   - Refetch on reconnect: true
   - Error handling: log errors, show toast notifications

3. QUERY HOOKS
   - useScans(page, limit, filters): Fetch paginated scan list
   - useScan(id): Fetch single scan by ID
   - useProduct(barcode): Fetch product information
   - useAnalytics(dateRange): Fetch analytics data (admin only)
   - useMe(): Fetch current user info
   - All hooks return: data, isLoading, isError, error, refetch

4. MUTATION HOOKS
   - useCreateScan(): Create new scan
   - useDeleteScan(): Delete scan by ID
   - useBulkCreateScans(): Create multiple scans
   - useExportData(format): Export scans in specified format
   - useTrackEvent(): Track analytics event
   - All mutations return: mutate, mutateAsync, isLoading, isError, error

5. CUSTOM STALE TIMES
   - Scans: 5 minutes (frequently updated)
   - Products: 30 days (rarely change)
   - User info: 15 minutes
   - Analytics: 1 minute (real-time data)
   - Configure per-query stale time

6. CACHE INVALIDATION
   - Invalidate scans cache after create/delete
   - Invalidate user cache after profile update
   - Invalidate analytics cache after event tracking
   - Use queryClient.invalidateQueries()
   - Proper query key structure for targeted invalidation

7. OPTIMISTIC UPDATES
   - Optimistically add scan to list on create
   - Optimistically remove scan from list on delete
   - Roll back on error
   - Show loading state during mutation
   - Sync with server response

8. ERROR HANDLING
   - Display toast notifications for errors
   - Retry failed mutations (optional)
   - Clear error state on retry
   - Log errors for debugging
   - User-friendly error messages

9. LOADING STATES
   - Show skeleton loaders during initial fetch
   - Show spinner for refetch
   - Disable actions during mutations
   - Smooth transitions between states

CONSTRAINTS:
- All hooks must be type-safe
- Proper query key structure
- Efficient cache invalidation
- No unnecessary refetches
- Handle offline scenarios gracefully
- Memory-efficient caching

INTEGRATION POINTS:
- API client from Task 4.3
- Auth store from Task 4.2
- Will be used by all data-driven components
- Scanner components (Task 6.1, 6.2, 6.3)
- Product display (Task 10.4)

TESTING REQUIREMENTS:
- QueryClient configured correctly
- Query hooks fetch data
- Mutation hooks create/update/delete data
- Cache invalidation works
- Optimistic updates work
- Error handling displays messages
- Loading states display correctly
- Stale time respected
- Refetch on window focus works
- DevTools accessible in development

ACCEPTANCE CRITERIA:
✅ React Query installed and configured
✅ QueryClient with proper defaults
✅ All query hooks created
✅ All mutation hooks created
✅ Custom stale times configured
✅ Cache invalidation implemented
✅ Optimistic updates working
✅ Error handling with toasts
✅ Loading states implemented
✅ DevTools configured
✅ Type-safe throughout

QUALITY STANDARDS:
- Efficient caching strategy
- Proper query key structure
- Clean hook interfaces
- Comprehensive error handling
- Smooth UX transitions
- No memory leaks
- Well-documented hooks

DELIVERABLES:
- QueryClient configuration
- Query hooks for all endpoints
- Mutation hooks for all actions
- Cache invalidation logic
- Optimistic update handlers
- Error handling setup
- DevTools configuration

SUCCESS METRIC: Data fetching is automatic, cached efficiently, and provides smooth UX with proper loading/error states.
```

---



## Task 4.5: Web Auth - Protected Routes

```
TASK: Implement route protection and error boundaries for authenticated pages

SYSTEM CONTEXT:
Route security for Barcody web app:
- Prevent unauthorized access to protected pages
- Redirect unauthenticated users to login
- Handle authentication errors gracefully
- Provide loading states during auth checks

REQUIREMENTS:

1. PROTECTED ROUTE WRAPPER
   - Create ProtectedRoute component
   - Check authentication status from auth store (Task 4.2)
   - Redirect to /login if not authenticated
   - Preserve intended destination URL for post-login redirect
   - Show loading spinner during auth check
   - Allow children to render only when authenticated

2. AUTHENTICATION CHECK
   - Read isAuthenticated from auth store
   - Read isLoading from auth store
   - If loading: show loading spinner
   - If not authenticated: redirect to /login with return URL
   - If authenticated: render children
   - Re-check on auth state changes

3. REDIRECT LOGIC
   - Capture current URL before redirect
   - Store in query parameter: /login?redirect=/dashboard
   - After successful login, redirect to stored URL
   - Default to /dashboard if no redirect URL
   - Handle invalid redirect URLs (security)

4. ERROR BOUNDARY COMPONENT
   - Create ErrorBoundary component
   - Catch React errors in component tree
   - Display user-friendly error message
   - Provide "Try Again" button
   - Log errors to console (and Sentry in production)
   - Reset error state on retry

5. ERROR BOUNDARY INTEGRATION
   - Wrap protected routes with ErrorBoundary
   - Catch authentication errors
   - Catch API errors
   - Catch rendering errors
   - Prevent white screen of death

6. LOADING STATES
   - Show full-page spinner during initial auth check
   - Show skeleton loader for page content
   - Smooth transition from loading to content
   - Prevent flash of unauthenticated content

7. PUBLIC ROUTES
   - Define list of public routes (/, /login, /about)
   - Skip auth check for public routes
   - Redirect authenticated users away from /login
   - Allow public access to landing page

CONSTRAINTS:
- Must prevent unauthorized access
- No flash of protected content
- Secure redirect URL handling
- Fast auth check (<500ms)
- Accessible error messages
- Mobile-responsive

INTEGRATION POINTS:
- Auth store from Task 4.2
- Login page from Task 4.1
- All protected pages will use this
- Error monitoring from Task 1.11

TESTING REQUIREMENTS:
- Unauthenticated users redirected to login
- Authenticated users see protected content
- Redirect URL preserved and used
- Loading state displays during check
- Error boundary catches errors
- Error boundary displays message
- Try again button resets error
- Public routes accessible without auth
- Authenticated users redirect from login

ACCEPTANCE CRITERIA:
✅ ProtectedRoute component created
✅ Auth check implemented
✅ Redirect to login works
✅ Return URL preserved
✅ Post-login redirect works
✅ Loading state displays
✅ ErrorBoundary component created
✅ Errors caught and displayed
✅ Try again functionality works
✅ Public routes accessible
✅ No flash of content

QUALITY STANDARDS:
- Secure route protection
- Smooth UX transitions
- Clear error messages
- Accessible components
- Type-safe implementation
- No security vulnerabilities

DELIVERABLES:
- ProtectedRoute component
- ErrorBoundary component
- Redirect logic
- Loading states
- Public route configuration

SUCCESS METRIC: Unauthorized users cannot access protected pages, and all errors are caught gracefully.
```

---



*[Continuing with remaining tasks 4.6-4.13...]*

## Task 4.6: Mobile Auth - Google OAuth Flow

```
TASK: Implement Google OAuth authentication for React Native mobile app

SYSTEM CONTEXT:
Mobile authentication for Barcody using Google OAuth:
- Native OAuth flow with Expo
- Secure authentication via Google
- Seamless mobile UX
- Integration with backend OAuth from Task 3.4

REQUIREMENTS:

1. DEPENDENCIES
   - Install expo-auth-session for OAuth flow
   - Install expo-web-browser for OAuth popup
   - Install expo-crypto for secure random state generation
   - Ensure compatibility with Expo SDK

2. GOOGLE OAUTH CONFIGURATION
   - Configure Google OAuth in app.json
   - Add Android and iOS client IDs
   - Configure redirect URI scheme
   - Set up OAuth scopes (profile, email)

3. OAUTH HOOK
   - Create useGoogleAuth custom hook
   - Use Expo AuthSession for OAuth flow
   - Generate secure state parameter
   - Handle OAuth redirect
   - Extract authorization code
   - Send code to backend /auth/google endpoint

4. OAUTH FLOW
   - User taps "Sign in with Google" button
   - Open Google OAuth in WebBrowser
   - User authenticates with Google
   - Google redirects back to app
   - App receives authorization code
   - Send code to backend
   - Receive JWT tokens
   - Store tokens securely (Task 4.7)
   - Navigate to main app

5. ERROR HANDLING
   - Handle OAuth cancellation
   - Handle network errors
   - Handle backend errors
   - Display error alerts
   - Provide retry mechanism
   - Log errors for debugging

6. LOADING STATES
   - Show loading indicator during OAuth
   - Disable button during flow
   - Prevent multiple simultaneous attempts
   - Show progress messages

7. PLATFORM-SPECIFIC HANDLING
   - Handle iOS OAuth flow
   - Handle Android OAuth flow
   - Test on both platforms
   - Handle platform-specific errors

CONSTRAINTS:
- Must work on iOS and Android
- Secure OAuth implementation
- Handle all error cases
- Fast OAuth flow (<5s)
- Native feel
- No web views (use WebBrowser)

INTEGRATION POINTS:
- Backend OAuth from Task 3.4
- Token storage from Task 4.7
- Auth store from Task 4.7
- Login screen from Task 4.8

TESTING REQUIREMENTS:
- OAuth flow initiates correctly
- Google login page opens
- User can authenticate
- App receives auth code
- Backend receives code
- JWT tokens returned
- Tokens stored securely
- Navigation to main app works
- Errors display correctly
- Works on iOS
- Works on Android

ACCEPTANCE CRITERIA:
✅ OAuth dependencies installed
✅ Google OAuth configured
✅ useGoogleAuth hook created
✅ OAuth flow completes
✅ Authorization code received
✅ Backend authentication works
✅ JWT tokens received
✅ Error handling implemented
✅ Loading states display
✅ Works on both platforms

QUALITY STANDARDS:
- Secure OAuth implementation
- Smooth native UX
- Comprehensive error handling
- Platform compatibility
- Type-safe code
- Clear user feedback

DELIVERABLES:
- useGoogleAuth hook
- OAuth configuration
- Error handling logic
- Loading states
- Platform-specific handling

SUCCESS METRIC: User can authenticate with Google on mobile and receive valid JWT tokens.
```

---



## Task 4.7: Mobile Auth - Token Storage

```
TASK: Implement secure token storage and auth state management for mobile

SYSTEM CONTEXT:
Secure authentication state for Barcody mobile app:
- Store JWT tokens securely
- Manage auth state globally
- Auto-login on app launch
- Persist auth across app restarts

REQUIREMENTS:

1. SECURE STORAGE DEPENDENCIES
   - Install @react-native-async-storage/async-storage for general storage
   - Install expo-secure-store for sensitive data (tokens)
   - Install zustand for state management
   - Ensure compatibility with Expo

2. SECURE STORAGE SERVICE
   - Create services/secureStorage.ts
   - Wrapper methods for SecureStore
   - saveTokens(accessToken, refreshToken): Store tokens securely
   - getTokens(): Retrieve tokens
   - deleteTokens(): Remove tokens
   - Error handling for storage operations
   - Platform-specific handling (iOS keychain, Android keystore)

3. AUTH STORE WITH ZUSTAND
   - Create stores/authStore.ts
   - State: user, accessToken, refreshToken, isAuthenticated, isLoading
   - Actions: login, logout, setUser, setTokens, refreshAccessToken, initialize
   - Type-safe state and actions
   - No persistence in Zustand (use SecureStore instead)

4. LOGIN ACTION
   - Accept user, accessToken, refreshToken
   - Store tokens in SecureStore
   - Update Zustand state
   - Set isAuthenticated to true
   - Navigate to main app

5. LOGOUT ACTION
   - Clear tokens from SecureStore
   - Clear Zustand state
   - Set isAuthenticated to false
   - Navigate to login screen
   - Revoke tokens on backend (optional)

6. AUTO-LOGIN ON APP LAUNCH
   - Create initialize action
   - Check SecureStore for tokens on app start
   - If tokens exist: validate expiration
   - If valid: fetch user info, set auth state
   - If invalid/expired: attempt refresh or logout
   - Set isLoading during initialization

7. TOKEN REFRESH
   - Monitor access token expiration
   - Automatically refresh before expiration
   - Use refresh token to get new access token
   - Update SecureStore with new token
   - Update Zustand state
   - Handle refresh failure (force logout)

8. ERROR HANDLING
   - Handle SecureStore errors
   - Handle network errors during refresh
   - Handle invalid tokens
   - Clear state on errors
   - Log errors for debugging

CONSTRAINTS:
- Tokens must be stored securely (SecureStore)
- No tokens in AsyncStorage
- Type-safe throughout
- Handle token expiration
- Fast initialization (<1s)
- Platform compatibility

INTEGRATION POINTS:
- OAuth flow from Task 4.6
- API client from Task 4.9
- Protected navigation from Task 4.11
- All authenticated screens

TESTING REQUIREMENTS:
- Tokens stored in SecureStore
- Tokens retrieved correctly
- Login stores tokens and user
- Logout clears all data
- Auto-login works on app restart
- Token refresh works automatically
- Expired tokens trigger logout
- Errors handled gracefully
- Works on iOS
- Works on Android

ACCEPTANCE CRITERIA:
✅ SecureStore service created
✅ Auth store with Zustand created
✅ Login action stores tokens securely
✅ Logout action clears all data
✅ Auto-login on app launch works
✅ Token refresh implemented
✅ Error handling robust
✅ Type-safe throughout
✅ Platform compatible

QUALITY STANDARDS:
- Secure token storage
- Clean state management
- Efficient initialization
- Comprehensive error handling
- Type safety enforced
- No security vulnerabilities

DELIVERABLES:
- Secure storage service
- Zustand auth store
- Login/logout actions
- Auto-login logic
- Token refresh mechanism
- Error handling

SUCCESS METRIC: Tokens stored securely, user stays authenticated across app restarts, automatic token refresh works.
```

---



## Task 4.8: Mobile Auth - UI Components

```
TASK: Create authentication UI screens for mobile app

SYSTEM CONTEXT:
Mobile authentication interface for Barcody:
- Login screen with Google OAuth button
- Loading states during authentication
- User profile screen
- Logout functionality
- Smooth navigation flow

REQUIREMENTS:

1. LOGIN SCREEN
   - Create login screen component
   - Add Barcody branding (logo, tagline)
   - Implement Google Sign-In button (from Task 4.6)
   - Dark theme styling
   - Responsive layout for all screen sizes
   - Loading indicator during OAuth flow
   - Error message display area

2. LOADING SCREEN
   - Create dedicated loading screen
   - Show during initial auth check
   - Display app logo with animation
   - Progress indicator
   - Smooth fade transitions
   - Handle long loading times gracefully

3. USER PROFILE SCREEN
   - Display user information (name, email, profile picture)
   - Show account creation date
   - Show last login timestamp
   - Display scan statistics (total scans, this week, this month)
   - Settings section
   - Logout button

4. LOGOUT FUNCTIONALITY
   - Add logout button to profile screen
   - Confirm logout with alert dialog
   - Clear auth state (Task 4.7)
   - Clear cached data
   - Navigate to login screen
   - Show success message

5. NAVIGATION FLOW
   - Login screen → Home (after successful auth)
   - Home → Profile (tab navigation)
   - Profile → Login (after logout)
   - Splash screen → Login (if not authenticated)
   - Splash screen → Home (if authenticated)
   - Handle deep links appropriately

6. UI/UX POLISH
   - Smooth screen transitions
   - Haptic feedback on button press
   - Loading states for all actions
   - Error states with retry options
   - Consistent styling across screens
   - Accessibility labels for screen readers

CONSTRAINTS:
- Must work on iOS and Android
- Dark theme only
- Responsive to all screen sizes
- Accessible (screen reader support)
- Fast screen transitions (<300ms)
- Native feel

INTEGRATION POINTS:
- OAuth flow from Task 4.6
- Auth store from Task 4.7
- Protected navigation from Task 4.11
- Main app screens (Task 7.1-7.4)

TESTING REQUIREMENTS:
- Login screen renders correctly
- Google button triggers OAuth flow
- Loading screen displays during auth
- Profile screen shows user data
- Logout button works
- Navigation flow correct
- Screens responsive on all sizes
- Haptic feedback works
- Accessible via screen reader
- Works on iOS and Android

ACCEPTANCE CRITERIA:
✅ Login screen created
✅ Loading screen implemented
✅ Profile screen displays user info
✅ Logout functionality works
✅ Navigation flow smooth
✅ Dark theme applied
✅ Responsive design
✅ Haptic feedback added
✅ Accessible
✅ Platform compatible

QUALITY STANDARDS:
- Clean, maintainable code
- Consistent styling
- Smooth animations
- Comprehensive error handling
- Type-safe components
- Accessible UI
- Native feel

DELIVERABLES:
- Login screen component
- Loading screen component
- Profile screen component
- Logout functionality
- Navigation configuration
- UI styling

SUCCESS METRIC: Complete auth UI with smooth navigation and native feel on both platforms.
```

---



## Task 4.9: Mobile API Client Service

```
TASK: Create centralized, type-safe API client for mobile app

SYSTEM CONTEXT:
Unified API layer for Barcody mobile app:
- Single source for all backend calls
- Automatic authentication
- Offline-aware error handling
- Request retry logic
- Type-safe methods

REQUIREMENTS:

1. API CLIENT SETUP
   - Install axios
   - Create services/api/client.ts
   - Configure base URL from environment variable
   - Set default timeout (30 seconds)
   - Include credentials in requests

2. AUTHENTICATION INTEGRATION
   - Import auth store from Task 4.7
   - Request interceptor: Add Authorization header
   - Get access token from SecureStore
   - Format: "Bearer {accessToken}"
   - Only add header if token exists
   - Handle token retrieval errors

3. ERROR HANDLING INTERCEPTOR
   - Response interceptor for errors
   - Parse backend error responses
   - Extract error messages
   - Handle network errors (no response)
   - Handle timeout errors
   - Detect offline status
   - Transform to consistent error format
   - Log errors for debugging

4. RETRY LOGIC
   - Exponential backoff for failed requests
   - Retry on network errors
   - Retry on 5xx server errors
   - Retry on timeout
   - Max retries: 3 attempts
   - Backoff: 1s, 2s, 4s
   - Don't retry on 401, 403, 404
   - Don't retry when offline

5. OFFLINE DETECTION
   - Detect offline status before request
   - Return offline error immediately
   - Don't attempt request when offline
   - Queue requests for later sync (optional)
   - Provide offline-specific error messages

6. TYPED API METHODS
   - Auth methods: login, refresh, logout, getMe
   - Scan methods: createScan, getScans, getScan, deleteScan, bulkCreateScans, syncScans
   - Product methods: getProduct
   - Export methods: exportCSV, exportJSON
   - All methods return typed promises
   - Use TypeScript generics

7. REQUEST/RESPONSE TYPES
   - Define interfaces for all DTOs
   - CreateScanDto, ScanResponseDto, etc.
   - Export all types
   - Match backend Swagger definitions
   - Type-safe throughout

8. SYNC SUPPORT
   - syncScans(timestamp): Get scans since timestamp
   - Support incremental sync
   - Handle large sync payloads
   - Pagination for sync results

CONSTRAINTS:
- All methods must be type-safe
- Handle offline gracefully
- Proper timeout handling
- Retry logic must not retry indefinitely
- Secure token handling
- No hardcoded URLs

INTEGRATION POINTS:
- Auth store from Task 4.7
- Backend API from Tasks 3.6, 5.2, 10.3, 11.1
- Will be used by TanStack Query (Task 4.10)
- Offline sync (Task 8.4)

TESTING REQUIREMENTS:
- API client initializes correctly
- Base URL from environment
- Auth header added to requests
- Requests succeed with valid data
- Errors handled and transformed
- Retry logic works for network errors
- No retry for 4xx errors
- Offline detection works
- Typed methods return correct types
- Sync endpoint works

ACCEPTANCE CRITERIA:
✅ API client created
✅ Base URL configured
✅ Auth header interceptor works
✅ Error handling implemented
✅ Retry logic with backoff
✅ Offline detection added
✅ All API methods typed
✅ Request/response types defined
✅ Sync support added
✅ Consistent error format

QUALITY STANDARDS:
- Type-safe throughout
- Clean, maintainable code
- Comprehensive error handling
- Efficient retry logic
- Offline-aware
- Clear method names
- Well-documented types

DELIVERABLES:
- API client service
- Request/response types
- Typed API methods
- Error handling logic
- Retry mechanism
- Offline detection

SUCCESS METRIC: All backend communication goes through this client with proper typing, auth, offline handling, and error recovery.
```

---



## Task 4.10: Mobile Data Fetching Setup

```
TASK: Configure TanStack Query for efficient mobile data fetching and caching

SYSTEM CONTEXT:
Data fetching layer for Barcody mobile app:
- Automatic caching and revalidation
- Offline support with cached data
- Loading and error states
- Optimistic updates
- Background refetching

REQUIREMENTS:

1. TANSTACK QUERY SETUP
   - Install @tanstack/react-query
   - Create QueryClient configuration
   - Wrap app with QueryClientProvider
   - Configure for mobile use case

2. QUERY CLIENT CONFIGURATION
   - Default stale time: 5 minutes
   - Default cache time: 10 minutes
   - Retry failed queries: 3 attempts
   - Refetch on app focus: true
   - Refetch on reconnect: true
   - Network mode: offlineFirst
   - Error handling: log and display

3. QUERY HOOKS
   - useScans(page, limit, filters): Paginated scan list
   - useScan(id): Single scan by ID
   - useProduct(barcode): Product information
   - useMe(): Current user info
   - All hooks return: data, isLoading, isError, error, refetch

4. MUTATION HOOKS
   - useCreateScan(): Create new scan
   - useDeleteScan(): Delete scan
   - useSyncScans(): Sync with backend
   - useExport(format): Export scans
   - All mutations return: mutate, mutateAsync, isLoading, isError, error

5. CUSTOM STALE TIMES
   - Scans: 1 minute (frequently updated)
   - Products: 30 minutes (cached longer)
   - User info: 15 minutes
   - Configure per-query

6. CACHE INVALIDATION
   - Invalidate scans after create/delete
   - Invalidate user after profile update
   - Use queryClient.invalidateQueries()
   - Proper query key structure

7. OPTIMISTIC UPDATES
   - Optimistically add scan to list
   - Optimistically remove scan from list
   - Roll back on error
   - Sync with server response

8. OFFLINE SUPPORT
   - Return cached data when offline
   - Queue mutations when offline
   - Sync when back online
   - Show offline indicator
   - Handle stale data gracefully

9. ERROR HANDLING
   - Display toast notifications
   - Retry failed mutations
   - Clear error state on retry
   - Log errors
   - User-friendly messages

10. LOADING STATES
    - Show skeleton loaders
    - Pull-to-refresh support
    - Disable actions during mutations
    - Smooth transitions

CONSTRAINTS:
- All hooks must be type-safe
- Efficient caching strategy
- Offline-first approach
- No unnecessary refetches
- Memory-efficient
- Fast query execution

INTEGRATION POINTS:
- API client from Task 4.9
- Auth store from Task 4.7
- Scanner components (Task 7.2-7.4)
- Offline sync (Task 8.4)

TESTING REQUIREMENTS:
- QueryClient configured correctly
- Query hooks fetch data
- Mutation hooks work
- Cache invalidation works
- Optimistic updates work
- Offline mode returns cached data
- Error handling displays messages
- Loading states display
- Stale time respected
- Refetch on app focus works

ACCEPTANCE CRITERIA:
✅ TanStack Query installed
✅ QueryClient configured
✅ All query hooks created
✅ All mutation hooks created
✅ Custom stale times set
✅ Cache invalidation implemented
✅ Optimistic updates working
✅ Offline support added
✅ Error handling with toasts
✅ Loading states implemented
✅ Type-safe throughout

QUALITY STANDARDS:
- Efficient caching strategy
- Proper query key structure
- Clean hook interfaces
- Comprehensive error handling
- Smooth UX
- Offline-first approach
- Well-documented hooks

DELIVERABLES:
- QueryClient configuration
- Query hooks for all endpoints
- Mutation hooks for all actions
- Cache invalidation logic
- Optimistic update handlers
- Offline support
- Error handling setup

SUCCESS METRIC: Data fetching is automatic, cached efficiently, works offline, and provides smooth UX with proper states.
```

---



## Task 4.11: Mobile Auth - Protected Navigation

```
TASK: Implement navigation guards for authenticated routes in mobile app

SYSTEM CONTEXT:
Route security for Barcody mobile app:
- Prevent unauthorized access to app screens
- Redirect unauthenticated users to login
- Handle authentication checks on app launch
- Smooth navigation flow

REQUIREMENTS:

1. AUTH GUARD HOOK
   - Create useAuthGuard custom hook
   - Check authentication status from auth store
   - Return isAuthenticated, isLoading, user
   - Re-check on auth state changes
   - Handle edge cases (expired tokens)

2. NAVIGATION LISTENER
   - Implement navigation state listener
   - Check auth on screen navigation
   - Redirect to login if not authenticated
   - Allow navigation if authenticated
   - Handle deep links appropriately

3. SPLASH SCREEN
   - Create splash screen component
   - Show during initial auth check
   - Display app logo and branding
   - Loading animation
   - Auto-navigate based on auth status
   - Smooth fade transition

4. PROTECTED SCREENS
   - Protect Scan screen (main tab)
   - Protect History screen (tab)
   - Protect Settings screen (tab)
   - Protect Profile screen
   - Allow Login screen for all

5. AUTO-LOGIN
   - Check for stored tokens on app launch
   - Validate tokens (check expiration)
   - Fetch current user if tokens valid
   - Navigate to main app if authenticated
   - Navigate to login if not authenticated
   - Handle auto-login errors gracefully

6. REDIRECT LOGIC
   - Unauthenticated → Login screen
   - Authenticated → Main app (Scan tab)
   - After login → Main app
   - After logout → Login screen
   - Deep link handling (preserve destination)

7. LOADING STATES
   - Show splash screen during auth check
   - Show loading indicator on screens
   - Prevent flash of unauthenticated content
   - Smooth transitions

8. ERROR HANDLING
   - Handle auth check failures
   - Handle token validation errors
   - Display error messages
   - Provide retry mechanism
   - Log errors for debugging

CONSTRAINTS:
- Must prevent unauthorized access
- No flash of protected content
- Fast auth check (<1s)
- Smooth navigation transitions
- Handle all edge cases
- Works on iOS and Android

INTEGRATION POINTS:
- Auth store from Task 4.7
- Login screen from Task 4.8
- Main app screens (Task 7.1-7.4)
- Deep linking configuration

TESTING REQUIREMENTS:
- Unauthenticated users see login
- Authenticated users see main app
- Splash screen displays on launch
- Auto-login works correctly
- Protected screens inaccessible without auth
- Navigation redirects work
- Loading states display
- Error handling works
- Deep links preserved
- Works on both platforms

ACCEPTANCE CRITERIA:
✅ useAuthGuard hook created
✅ Navigation listener implemented
✅ Splash screen created
✅ Protected screens configured
✅ Auto-login functional
✅ Redirect logic works
✅ Loading states implemented
✅ Error handling robust
✅ No flash of content
✅ Platform compatible

QUALITY STANDARDS:
- Secure navigation protection
- Smooth UX transitions
- Comprehensive error handling
- Type-safe implementation
- Clean code structure
- No security vulnerabilities

DELIVERABLES:
- useAuthGuard hook
- Navigation listener
- Splash screen component
- Protected route configuration
- Auto-login logic
- Error handling

SUCCESS METRIC: Unauthorized users cannot access app screens, auto-login works seamlessly, and navigation is smooth.
```

---



## Task 4.12: Admin Dashboard Data Fetching

```
TASK: Configure React Query for admin dashboard data fetching

SYSTEM CONTEXT:
Data fetching layer for Barcody admin dashboard:
- Real-time analytics data
- User management data
- Scan statistics
- Automatic caching and revalidation
- Loading and error states

REQUIREMENTS:

1. REACT QUERY SETUP
   - Install @tanstack/react-query
   - Install @tanstack/react-query-devtools
   - Create QueryClient configuration
   - Wrap app with QueryClientProvider
   - Configure devtools for development

2. QUERY CLIENT CONFIGURATION
   - Default stale time: 5 minutes
   - Default cache time: 10 minutes
   - Retry failed queries: 3 attempts
   - Refetch on window focus: true
   - Refetch on reconnect: true
   - Error handling: log and display

3. ANALYTICS QUERY HOOKS
   - useAnalyticsOverview(): Overall stats (staleTime: 5min)
   - useAnalyticsTrends(dateRange): Trend data (staleTime: 5min)
   - useBarcodeTypes(): Barcode type breakdown (staleTime: 10min)
   - useDeviceBreakdown(): Device usage stats (staleTime: 10min)
   - All hooks return: data, isLoading, isError, error, refetch

4. USER MANAGEMENT HOOKS
   - useUsers(page, limit): Paginated user list (staleTime: 2min)
   - useUser(id): Single user details (staleTime: 5min)
   - useUserActivity(userId): User activity log (staleTime: 1min)

5. SCAN MANAGEMENT HOOKS
   - useScans(page, limit, filters): All scans (staleTime: 1min)
   - useScanStats(): Scan statistics (staleTime: 5min)

6. CUSTOM STALE TIMES
   - Analytics overview: 5 minutes
   - Analytics trends: 5 minutes
   - Barcode types: 10 minutes
   - Device breakdown: 10 minutes
   - Users: 2 minutes
   - Scans: 1 minute
   - Configure per-query based on data volatility

7. CACHE INVALIDATION
   - Invalidate analytics after data changes
   - Invalidate users after user actions
   - Invalidate scans after scan actions
   - Use queryClient.invalidateQueries()
   - Proper query key structure

8. AUTO-REFETCH
   - Refetch on window focus
   - Refetch on reconnect
   - Polling for real-time data (optional)
   - Background refetch for stale data

9. ERROR HANDLING
   - Display toast notifications
   - Retry failed queries
   - Clear error state on retry
   - Log errors
   - User-friendly messages

10. LOADING STATES
    - Show skeleton loaders
    - Show spinner for refetch
    - Disable actions during mutations
    - Smooth transitions

CONSTRAINTS:
- All hooks must be type-safe
- Efficient caching strategy
- No unnecessary refetches
- Fast query execution
- Memory-efficient
- Admin-specific data access

INTEGRATION POINTS:
- API client (similar to Task 4.3)
- Auth store (similar to Task 4.2)
- Backend admin endpoints (Task 13.1)
- Analytics backend (Task 13.2)
- Dashboard components (Task 13.4)

TESTING REQUIREMENTS:
- QueryClient configured correctly
- Analytics hooks fetch data
- User hooks fetch data
- Scan hooks fetch data
- Cache invalidation works
- Error handling displays messages
- Loading states display
- Stale times respected
- Refetch on window focus works
- DevTools accessible

ACCEPTANCE CRITERIA:
✅ React Query installed
✅ QueryClient configured
✅ Analytics hooks created
✅ User management hooks created
✅ Scan hooks created
✅ Custom stale times set
✅ Cache invalidation implemented
✅ Auto-refetch configured
✅ Error handling with toasts
✅ Loading states implemented
✅ DevTools configured
✅ Type-safe throughout

QUALITY STANDARDS:
- Efficient caching strategy
- Proper query key structure
- Clean hook interfaces
- Comprehensive error handling
- Smooth UX
- Admin-optimized
- Well-documented hooks

DELIVERABLES:
- QueryClient configuration
- Analytics query hooks
- User management hooks
- Scan query hooks
- Cache invalidation logic
- Error handling setup
- DevTools configuration

SUCCESS METRIC: Admin dashboard data fetching is automatic, cached efficiently, and provides real-time insights with proper states.
```

---



## Task 4.13: Admin Dashboard Authentication

```
TASK: Implement Google OAuth authentication for admin dashboard with backend validation

SYSTEM CONTEXT:
Admin authentication for Barcody dashboard:
- Secure admin-only access
- Google OAuth for authentication
- Backend validates admin email
- Reuses backend auth infrastructure
- Protected admin routes

REQUIREMENTS:

1. DEPENDENCIES
   - Install @react-oauth/google
   - Install zustand for state management
   - Install axios for API calls
   - Ensure Next.js 14+ compatibility

2. GOOGLE OAUTH PROVIDER
   - Create GoogleOAuthProvider wrapper
   - Configure with Google Client ID (NEXT_PUBLIC_GOOGLE_CLIENT_ID)
   - Wrap application at root level
   - Handle provider initialization errors

3. LOGIN PAGE
   - Create admin login page at /login
   - Display admin dashboard branding
   - Implement Google Sign-In button
   - Dark theme styling
   - Responsive design
   - Loading state during OAuth
   - Error message display

4. OAUTH CALLBACK HANDLER
   - Handle OAuth response from Google
   - Extract authorization code
   - Send to backend /auth/google endpoint
   - Backend validates admin email (whitelist)
   - Receive JWT tokens if admin
   - Reject if not admin email
   - Display appropriate error messages

5. AUTH STORE (ZUSTAND)
   - Create auth store with state: user, accessToken, refreshToken, isAuthenticated, isLoading
   - User object: id, email, googleId, isAdmin, createdAt
   - Actions: login, logout, setUser, setTokens, refreshAccessToken
   - Persist tokens in localStorage
   - Restore tokens on app load

6. API CLIENT SERVICE
   - Create lib/api/client.ts
   - Configure base URL from NEXT_PUBLIC_API_URL
   - Request interceptor: Add Authorization header
   - Response interceptor: Handle 401 errors
   - Response interceptor: Handle 403 errors (not admin)
   - Retry mechanism for failed requests
   - Type-safe API methods

7. PROTECTED ROUTE WRAPPER
   - Create ProtectedRoute component
   - Check isAuthenticated from auth store
   - Redirect to /login if not authenticated
   - Show loading spinner during auth check
   - Allow children to render only when authenticated

8. LOGOUT FUNCTIONALITY
   - Add logout button to dashboard
   - Confirm logout with dialog
   - Clear auth state
   - Clear localStorage
   - Redirect to login page
   - Call backend logout endpoint

9. ADMIN VALIDATION
   - Backend validates email against admin whitelist
   - Only authorized emails can access dashboard
   - 403 error if not admin
   - Clear error message: "Unauthorized: Admin access only"
   - Different Gmail accounts rejected

CONSTRAINTS:
- Only admin emails can access
- Backend enforces admin validation
- Secure token handling
- No admin bypass
- Fast auth check (<1s)
- Mobile-responsive
- Dark theme only

INTEGRATION POINTS:
- Backend OAuth from Task 3.4
- Backend admin validation (Task 13.1)
- Dashboard components (Task 13.4)
- Analytics endpoints (Task 13.2)

TESTING REQUIREMENTS:
- Login page renders correctly
- Google Sign-In button works
- OAuth flow completes
- Admin email grants access
- Non-admin email rejected
- Backend validates admin status
- JWT tokens received and stored
- Protected routes inaccessible without auth
- Logout clears all state
- Different Gmail accounts tested

ACCEPTANCE CRITERIA:
✅ Login page created
✅ Google OAuth configured
✅ OAuth callback handler works
✅ Auth store with Zustand created
✅ API client service created
✅ Protected route wrapper works
✅ Logout functionality works
✅ Admin validation enforced
✅ Only admin emails can access
✅ Non-admin emails rejected
✅ Type-safe throughout

QUALITY STANDARDS:
- Secure admin-only access
- Clean state management
- Comprehensive error handling
- Type safety enforced
- Smooth UX transitions
- Clear error messages
- No security vulnerabilities

DELIVERABLES:
- Admin login page
- Google OAuth provider
- Auth store with Zustand
- API client service
- Protected route wrapper
- Logout functionality
- Admin validation logic

SUCCESS METRIC: Only authorized admin emails can access dashboard, all others are rejected with clear error messages.
```

---



END OF PHASE 4
