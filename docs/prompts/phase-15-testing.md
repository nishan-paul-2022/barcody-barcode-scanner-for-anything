# Phase 15: Testing & Quality - AI Implementation Prompts

> **5 Tasks**: Backend, Web, Mobile, Admin, Cross-Platform Testing
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 15.1: Backend Testing

```
TASK: Implement comprehensive backend testing suite achieving >75% code coverage.

SYSTEM CONTEXT: Ensure backend reliability, catch bugs early, validate business logic, and maintain code quality through comprehensive testing strategy.

REQUIREMENTS:

UNIT TESTS:
1. Test Configuration: Create separate test database configuration, use in-memory SQLite for unit tests, configure test environment variables
2. Service Tests: Write unit tests for all services using Jest, test business logic in isolation, mock dependencies, test edge cases and error scenarios
3. Utility Tests: Write tests for validators, utilities, helpers, test all utility functions
4. Coverage Target: Achieve >80% unit test coverage

INTEGRATION TESTS:
1. Test Database: Use Docker PostgreSQL for integration tests, add database cleanup between tests (beforeEach/afterEach hooks)
2. REST Endpoint Tests: Write integration tests using Supertest, test all endpoints (GET, POST, PUT, DELETE), test authentication and authorization, test request validation, test response formats
3. WebSocket Tests: Write WebSocket integration tests using socket.io-client, test WebSocket authentication, test room isolation, test event broadcasting, test connection/disconnection
4. Coverage Target: Achieve >70% integration test coverage

E2E TESTS:
1. Auth Flow: Test complete auth flow (login → JWT → protected routes)
2. Scan Flow: Test scan flow (create → list → get → delete)
3. Product Lookup Flow: Test product lookup (barcode → cache check → API fallback)
4. Export Flow: Test export generation (filters → export → download)

API CONTRACT TESTING:
1. Pact Setup: Install Pact for contract testing
2. Consumer Contracts: Define consumer contracts (Web and Mobile expectations)
3. Provider Verification: Implement provider verification tests
4. Contract Validation: Ensure all API contracts verified

LOAD/PERFORMANCE TESTING:
1. k6 Setup: Install k6 for load testing
2. Load Scenarios: Create load test scenarios:
   - Bulk scan endpoint (100 scans/request)
   - WebSocket concurrent connections (50+ users)
   - Product lookup under load (measure cache hit rate)
3. Performance Targets:
   - Bulk endpoint handles 1000 scans in <5s
   - WebSocket supports 100 concurrent connections
   - API response time <200ms (p95)

DATABASE MIGRATION TESTING:
1. Rollback Tests: Write migration rollback tests
2. Data Integrity: Test each migration can roll back without data loss
3. Idempotency: Test migration idempotency (can run multiple times safely)

CI CONFIGURATION:
1. CI Setup: Configure CI to run all test suites
2. Test Reporting: Add test result reporting
3. Coverage Reporting: Generate and publish coverage reports
4. Quality Gates: Ensure all tests pass in CI, enforce >75% overall coverage

CONSTRAINTS:
- All tests must pass
- Coverage targets mandatory
- Fast test execution
- Isolated test environment
- No test interdependencies

INTEGRATION POINTS:
- All backend modules
- Database from Task 3.1
- WebSocket from Task 5.3
- CI/CD from Task 2.1

TESTING REQUIREMENTS:
1. All unit tests pass
2. All integration tests pass
3. All E2E tests pass
4. Contract tests verified
5. Load tests pass performance targets
6. Migration tests pass
7. CI runs all tests successfully
8. Coverage >75%

ACCEPTANCE CRITERIA:
- ✅ Unit tests >80% coverage
- ✅ Integration tests >70% coverage
- ✅ E2E tests for critical flows
- ✅ API contracts verified
- ✅ Load tests pass
- ✅ Migration tests pass
- ✅ CI configured
- ✅ Overall coverage >75%

QUALITY STANDARDS:
- Comprehensive test coverage
- Fast test execution
- Isolated tests
- Clear test names
- Proper assertions
- Good test organization

DELIVERABLES:
- Unit test suite
- Integration test suite
- E2E test suite
- Contract tests
- Load tests
- Migration tests
- CI configuration
- Coverage reports

SUCCESS METRIC: Comprehensive backend test coverage >75% with all tests passing and performance validated.
```

---

## Task 15.2: Web Testing

```
TASK: Implement web application testing suite achieving >75% code coverage.

SYSTEM CONTEXT: Ensure web app reliability, validate user flows, verify accessibility, and maintain code quality.

REQUIREMENTS:

COMPONENT TESTS:
1. React Testing Library: Use React Testing Library for component tests
2. Component Coverage: Test all components (buttons, forms, modals, cards, etc.)
3. User Interactions: Test user interactions (clicks, typing, form submissions)
4. Conditional Rendering: Test conditional rendering logic
5. Props Validation: Test component behavior with different props

INTEGRATION TESTS:
1. Page Tests: Write integration tests for all pages
2. User Flows: Test complete user flows (login → scan → view history)
3. API Integration: Test API integration with mocked responses
4. State Management: Test Zustand store integration
5. React Query: Test React Query hooks and cache updates

E2E TESTS:
1. Playwright Setup: Use Playwright for E2E tests
2. Critical Flows: Test critical user journeys:
   - Login flow
   - Scan barcode flow
   - View scan history
   - Export data
   - Product comparison
3. Cross-Browser: Test on Chrome, Firefox, Safari
4. Responsive Testing: Test on different viewport sizes



RESPONSIVE DESIGN TESTS:
1. Viewport Tests: Test on mobile, tablet, desktop viewports
2. Breakpoint Tests: Test all responsive breakpoints
3. Touch Interactions: Test touch interactions on mobile

COVERAGE TARGET:
1. Overall Coverage: Achieve >75% code coverage
2. Critical Paths: 100% coverage for critical user paths

CONSTRAINTS:
- All tests must pass
- Accessibility compliance required
- Fast test execution
- No flaky tests
- Cross-browser compatibility

INTEGRATION POINTS:
- All web components
- API client from Task 4.3
- React Query from Task 4.4
- CI/CD from Task 2.2

TESTING REQUIREMENTS:
1. All component tests pass
2. All integration tests pass
3. All E2E tests pass
4. Accessibility tests pass
5. Responsive tests pass
6. Cross-browser tests pass
7. Coverage >75%

ACCEPTANCE CRITERIA:
- ✅ Component tests comprehensive
- ✅ Integration tests complete
- ✅ E2E tests for critical flows
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Responsive design tested
- ✅ Cross-browser tested
- ✅ Coverage >75%

QUALITY STANDARDS:
- Comprehensive test coverage
- Accessibility-first testing
- Fast test execution
- Clear test descriptions
- Proper test organization

DELIVERABLES:
- Component test suite
- Integration test suite
- E2E test suite
- Accessibility tests
- Responsive tests
- Coverage reports

SUCCESS METRIC: Comprehensive web test coverage >70% with accessibility compliance and cross-browser compatibility.
```

---

## Task 15.3: Mobile Testing

```
TASK: Implement mobile application testing suite achieving >75% code coverage on both platforms.

SYSTEM CONTEXT: Ensure mobile app reliability on iOS and Android, validate offline functionality, and maintain code quality.

REQUIREMENTS:

COMPONENT TESTS:
1. React Native Testing Library: Use RNTL for component tests
2. Component Coverage: Test all components (screens, buttons, forms, modals)
3. User Interactions: Test touches, swipes, gestures
4. Navigation: Test navigation flows
5. Props Testing: Test component behavior with different props

INTEGRATION TESTS:
1. Screen Tests: Write integration tests for all screens
2. User Flows: Test complete flows (login → scan → save → sync)
3. API Integration: Test API integration with mocked responses
4. SQLite Integration: Test SQLite CRUD operations
5. State Management: Test Zustand store integration

E2E TESTS:
1. Detox Setup: Use Detox for E2E tests
2. Critical Flows: Test critical user journeys:
   - Login flow
   - Camera scan flow
   - Offline scan and sync
   - View scan history
   - Export data
3. Platform Testing: Test on both iOS and Android
4. Device Testing: Test on different device sizes

OFFLINE FUNCTIONALITY TESTS:
1. Offline Scan: Test scanning while offline
2. SQLite Storage: Test offline data storage
3. Sync on Reconnect: Test auto-sync when back online
4. Queue Management: Test offline queue management
5. Conflict Resolution: Test sync conflict resolution

PERMISSION TESTS:
1. Camera Permission: Test camera permission flow
2. Permission Denied: Test behavior when permission denied
3. Permission Granted: Test behavior when permission granted
4. Storage Permission: Test storage permission (Android)

PLATFORM-SPECIFIC TESTS:
1. iOS Tests: Test iOS-specific features and behaviors
2. Android Tests: Test Android-specific features and behaviors
3. Platform Differences: Test platform-specific UI differences

COVERAGE TARGET:
1. Overall Coverage: Achieve >75% code coverage
2. Critical Paths: 100% coverage for critical paths

CONSTRAINTS:
- All tests must pass on both platforms
- Offline functionality thoroughly tested
- Fast test execution
- No flaky tests
- Real device testing required

INTEGRATION POINTS:
- All mobile components
- API client from Task 4.9
- SQLite from Task 8.2
- CI/CD from Task 2.3

TESTING REQUIREMENTS:
1. All component tests pass
2. All integration tests pass
3. All E2E tests pass on iOS
4. All E2E tests pass on Android
5. Offline tests pass
6. Permission tests pass
7. Coverage >75%

ACCEPTANCE CRITERIA:
- ✅ Component tests comprehensive
- ✅ Integration tests complete
- ✅ E2E tests for critical flows
- ✅ iOS testing complete
- ✅ Android testing complete
- ✅ Offline functionality tested
- ✅ Permissions tested
- ✅ Coverage >75%

QUALITY STANDARDS:
- Comprehensive test coverage
- Platform compatibility verified
- Offline-first testing
- Fast test execution
- Clear test organization

DELIVERABLES:
- Component test suite
- Integration test suite
- E2E test suite (iOS/Android)
- Offline functionality tests
- Permission tests
- Coverage reports

SUCCESS METRIC: Comprehensive mobile test coverage >75% on both platforms with offline functionality verified.
```

---

## Task 15.4: Admin Dashboard Testing

```
TASK: Implement admin dashboard testing suite with authorization verification.

SYSTEM CONTEXT: Ensure admin dashboard reliability, validate admin-only access, verify analytics accuracy, and maintain code quality.

REQUIREMENTS:

COMPONENT TESTS:
1. React Testing Library: Use RTL for component tests
2. Chart Components: Test all chart components (line, pie, bar charts)
3. Metric Cards: Test overview metric cards
4. Filter Components: Test date range selector and filters
5. Table Components: Test user/scan tables

INTEGRATION TESTS:
1. Dashboard Page: Test complete dashboard page integration
2. API Integration: Test admin API integration
3. React Query: Test data fetching and caching
4. Filter Application: Test filter application to charts
5. Real-Time Updates: Test auto-refresh functionality

E2E TESTS:
1. Playwright Setup: Use Playwright for E2E tests
2. Admin Login: Test admin login flow
3. Analytics View: Test viewing analytics dashboard
4. Filter Usage: Test applying date range filters
5. User Management: Test viewing user list
6. Scan Management: Test viewing all scans

AUTHORIZATION TESTS:
1. Admin Access: Test admin email can access dashboard
2. Non-Admin Rejection: Test non-admin email rejected (403)
3. Unauthenticated Rejection: Test unauthenticated access rejected (401)
4. Token Validation: Test JWT token validation
5. Session Expiry: Test behavior on token expiry

ANALYTICS ACCURACY TESTS:
1. Data Accuracy: Verify analytics calculations are correct
2. Chart Data: Verify chart data matches backend data
3. Metric Cards: Verify metric card values are accurate
4. Trend Calculations: Verify trend percentage calculations

COVERAGE TARGET:
1. Overall Coverage: Comprehensive code coverage
2. Critical Paths: 100% coverage for admin authorization

CONSTRAINTS:
- All tests must pass
- Authorization thoroughly tested
- Analytics accuracy verified
- Fast test execution
- No flaky tests

INTEGRATION POINTS:
- Admin API from Task 13.1
- React Query from Task 4.12
- Auth from Task 4.13
- CI/CD from Task 2.4

TESTING REQUIREMENTS:
1. All component tests pass
2. All integration tests pass
3. All E2E tests pass
4. Authorization tests pass
5. Analytics accuracy verified
6. Coverage >70%

ACCEPTANCE CRITERIA:
- ✅ Component tests comprehensive
- ✅ Integration tests complete
- ✅ E2E tests for critical flows
- ✅ Admin authorization tested
- ✅ Non-admin rejection tested
- ✅ Analytics accuracy verified
- ✅ Coverage comprehensive

QUALITY STANDARDS:
- Comprehensive test coverage
- Security-first testing
- Analytics validation
- Fast test execution
- Clear test organization

DELIVERABLES:
- Component test suite
- Integration test suite
- E2E test suite
- Authorization tests
- Analytics accuracy tests
- Coverage reports

SUCCESS METRIC: Comprehensive admin dashboard test coverage with authorization and analytics accuracy verified.
```

---

## Task 15.5: Cross-Platform Testing

```
TASK: Implement cross-platform integration testing to verify data consistency and real-time sync.

SYSTEM CONTEXT: Ensure seamless experience across web and mobile platforms, validate data consistency, verify real-time updates, and test offline-online transitions.

REQUIREMENTS:

WEB-MOBILE SYNC TESTS:
1. Scan on Mobile, View on Web: Test scanning on mobile and verifying on web
2. Scan on Web, View on Mobile: Test scanning on web and verifying on mobile
3. Delete on Mobile, Verify on Web: Test deletion sync
4. Delete on Web, Verify on Mobile: Test deletion sync
5. Data Consistency: Verify data matches across platforms

REAL-TIME UPDATE TESTS:
1. WebSocket Sync: Test real-time updates via WebSocket
2. Mobile to Web: Test scan created on mobile appears on web instantly
3. Web to Mobile: Test scan created on web appears on mobile instantly
4. Multiple Devices: Test updates across multiple devices simultaneously
5. Connection Status: Test connection status indicators

OFFLINE-ONLINE TRANSITION TESTS:
1. Offline Scan: Test scanning while offline on mobile
2. Auto-Sync on Reconnect: Test automatic sync when back online
3. Conflict Resolution: Test handling of sync conflicts
4. Queue Processing: Test offline queue processing
5. Data Integrity: Verify no data loss during transitions

TAILSCALE CONNECTIVITY TESTS:
1. Mobile via Tailscale: Test mobile connecting to backend via Tailscale
2. QR Code Setup: Test QR code scanning for backend URL
3. Manual Entry: Test manual backend URL entry
4. Connection Test: Test connection test functionality
5. Network Switching: Test switching between networks

DATA CONSISTENCY TESTS:
1. Scan Data: Verify scan data consistency across platforms
2. Product Data: Verify product data consistency
3. User Data: Verify user data consistency
4. Timestamps: Verify timestamp consistency
5. Metadata: Verify metadata consistency



CONSTRAINTS:
- All scenarios must pass
- Data consistency required
- Real-time sync verified
- Offline functionality tested
- Comprehensive documentation

INTEGRATION POINTS:
- Web app from Tasks 6.1-6.4
- Mobile app from Tasks 7.1-7.4
- WebSocket from Task 5.3
- Offline sync from Task 8.4
- Tailscale from Tasks 9.1-9.3

TESTING REQUIREMENTS:
1. Web-mobile sync works bidirectionally
2. Real-time updates functional
3. Offline-online transitions smooth
4. Tailscale connectivity works
5. Data consistency verified
6. All scenarios documented
7. No data loss in any scenario

ACCEPTANCE CRITERIA:
- ✅ Web-mobile sync tested
- ✅ Real-time updates verified
- ✅ Offline-online transitions tested
- ✅ Tailscale connectivity tested
- ✅ Data consistency verified
- ✅ Test scenarios documented
- ✅ All tests pass

QUALITY STANDARDS:
- Comprehensive scenario coverage
- Thorough documentation
- Real-world testing
- Data integrity focus
- Clear test organization

DELIVERABLES:
- Cross-platform test suite
- Sync tests
- Real-time update tests
- Offline-online tests
- Tailscale tests
- Data consistency tests
- Test scenarios document

SUCCESS METRIC: All cross-platform scenarios work correctly with verified data consistency and seamless sync.
```

---

END OF PHASE 15
