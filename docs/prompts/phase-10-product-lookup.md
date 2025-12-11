# Phase 10: Product Lookup - AI Implementation Prompts

> **4 Tasks**: API clients, caching strategy, lookup endpoint, frontend display
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 10.1: Backend Product Lookup - API Clients

```
TASK: Implement external API integrations for product data retrieval from Open Food Facts, UPC Database, and Barcode Lookup.

SYSTEM CONTEXT: Enhance barcode scanning with product information. Integrate with multiple external APIs to maximize product coverage. Open Food Facts for food products, UPC Database for general products, Barcode Lookup as fallback.

REQUIREMENTS:

1. Dependencies: Install axios for HTTP requests
2. Product Lookup Module: Create ProductLookupModule
3. Open Food Facts Client: Implement client for api.openfoodfacts.org:
   - GET /api/v0/product/{barcode}.json
   - Parse response for product name, brand, nutrition facts, ingredients
   - Handle "product not found" responses
   - Set User-Agent header (required by API)
4. UPC Database Client: Implement client for api.upcitemdb.com:
   - GET /prod/trial/lookup?upc={barcode}
   - Requires API key from environment
   - Parse response for product title, brand, description, images
   - Handle rate limits (100 requests/day free tier)
5. Barcode Lookup Client: Implement client for api.barcodelookup.com:
   - GET /v3/products?barcode={barcode}&key={api_key}
   - Requires API key from environment
   - Parse response for product name, manufacturer, category
   - Handle rate limits (50 requests/day free tier)
6. Error Handling: Handle network errors, timeouts, API errors, rate limits
7. Response Normalization: Create common ProductInfo interface
8. Environment Configuration: Add API keys to .env files

CONSTRAINTS:
- Respect API rate limits
- Handle API downtime gracefully
- Normalize responses to common format
- Timeout requests after 5 seconds

INTEGRATION POINTS:
- Caching service will wrap these clients (Task 10.2)
- Lookup endpoint will use cascade fallback (Task 10.3)

TESTING REQUIREMENTS:
1. Open Food Facts client fetches data
2. UPC Database client works with API key
3. Barcode Lookup client works with API key
4. All clients handle "not found" correctly
5. Timeout handling works
6. Rate limit errors handled
7. Response normalization works

ACCEPTANCE CRITERIA:
- ✅ All three API clients implemented
- ✅ API keys configured from environment
- ✅ Response normalization working
- ✅ Error handling comprehensive
- ✅ Timeout configured
- ✅ Rate limit handling

QUALITY STANDARDS:
- Follow API documentation
- Proper error handling
- Consistent response format
- Secure API key storage
- Clear logging

DELIVERABLES:
- ProductLookupModule
- Open Food Facts client
- UPC Database client
- Barcode Lookup client
- ProductInfo interface
- Error handling logic

SUCCESS METRIC: All three external APIs successfully queried with proper error handling and response normalization.
```

---

## Task 10.2: Backend Product Lookup - Caching

```
TASK: Implement aggressive Redis caching strategy with cascade fallback and daily API usage tracking.

SYSTEM CONTEXT: Minimize external API calls to stay within free tier limits and improve response times. Cache-first strategy with 30-day TTL for products. Track daily API usage to prevent exceeding limits.

REQUIREMENTS:

1. Caching Service: Create caching service wrapping API clients
2. Cache-First Strategy: Check Redis before calling external APIs
3. Cascade Fallback: Try APIs in order:
   - First: Open Food Facts (free, unlimited)
   - Second: UPC Database (if OFF returns nothing)
   - Third: Barcode Lookup (if UPC returns nothing)
4. Product Cache: Store successful lookups in Redis:
   - Key: product:{barcode}
   - Value: JSON stringified ProductInfo
   - TTL: 30 days (2,592,000 seconds)
5. Not Found Cache: Cache "not found" results:
   - Key: product:notfound:{barcode}
   - Value: "NOT_FOUND"
   - TTL: 24 hours (86,400 seconds)
6. Daily API Usage Counter: Implement in Redis:
   - Keys: api:usage:upc:{YYYY-MM-DD} and api:usage:barcode:{YYYY-MM-DD}
   - Increment on each API call
   - Set expiry to midnight UTC (automatic reset)
   - Use INCR command for atomic increment
7. Usage Check: Before calling paid APIs:
   - Check counter value
   - Skip API call if limit reached (100 for UPC, 50 for Barcode)
   - Return cached data or "limit reached" error
8. Statistics: Track cache hit rate, API call counts

CONSTRAINTS:
- Must not exceed API limits
- Cache must be consistent
- TTL must be appropriate
- Counter must reset daily at midnight UTC

INTEGRATION POINTS:
- API clients from Task 10.1
- Redis from Task 3.3
- Lookup endpoint will use this service (Task 10.3)

TESTING REQUIREMENTS:
1. Cache hit returns cached data
2. Cache miss triggers API call
3. Cascade fallback works correctly
4. Product cache stores for 30 days
5. Not found cache stores for 24 hours
6. Daily counter increments correctly
7. Counter resets at midnight UTC
8. API calls blocked when limit reached
9. Cache hit rate >90%

ACCEPTANCE CRITERIA:
- ✅ Cache-first strategy implemented
- ✅ Cascade fallback working
- ✅ Product cache with 30-day TTL
- ✅ Not found cache with 24-hour TTL
- ✅ Daily usage counter functional
- ✅ Automatic midnight reset
- ✅ API limit enforcement
- ✅ High cache hit rate

QUALITY STANDARDS:
- Efficient caching strategy
- Proper TTL configuration
- Atomic counter operations
- Clear error messages
- Comprehensive logging

DELIVERABLES:
- Caching service
- Cache-first lookup logic
- Cascade fallback implementation
- Daily usage counter
- Limit enforcement
- Statistics tracking

SUCCESS METRIC: Cache hit rate >90%, API limits respected, daily counter resets automatically.
```

---

## Task 10.3: Backend Product Lookup - Endpoint

```
TASK: Create product lookup API endpoint with rate limiting and cache statistics.

SYSTEM CONTEXT: Public API for product information retrieval. Must protect backend from abuse with rate limiting while providing fast responses through caching.

REQUIREMENTS:

1. Dependencies: Install @nestjs/throttler for rate limiting
2. Products Controller: Create ProductsController
3. Lookup Endpoint: Implement GET /products/:barcode:
   - Extract barcode from URL parameter
   - Validate barcode format
   - Call caching service from Task 10.2
   - Return product data or "not found" message
   - Include cache status in response (hit/miss)
4. Rate Limiting: Configure throttler:
   - Limit: 10 requests per minute per user
   - Use JWT user ID for tracking
   - Return 429 Too Many Requests when exceeded
   - Include Retry-After header in 429 response
5. Throttler Guard: Apply @UseGuards(JwtAuthGuard, ThrottlerGuard) to endpoint
6. Statistics Endpoint: Create GET /products/stats:
   - Return cache hit rate
   - Return API call counts by provider
   - Return daily usage remaining
   - Protected by admin guard
7. Error Responses: Standardized error format for all scenarios
8. Swagger Documentation: Add API documentation

CONSTRAINTS:
- Rate limit must be per-user
- Must return proper HTTP status codes
- Clear error messages
- Fast response times from cache

INTEGRATION POINTS:
- Caching service from Task 10.2
- JWT auth guard from Task 3.6
- Frontend will call this endpoint (Task 10.4)

TESTING REQUIREMENTS:
1. Endpoint returns product data
2. Rate limit enforced (11th request returns 429)
3. Retry-After header present in 429 response
4. Invalid barcode returns 400
5. Not found returns 404
6. Cache hit returns quickly
7. Statistics endpoint returns correct data
8. Admin-only access to stats

ACCEPTANCE CRITERIA:
- ✅ Lookup endpoint functional
- ✅ Rate limiting enforced
- ✅ Retry-After header included
- ✅ Statistics endpoint working
- ✅ Error handling comprehensive
- ✅ Swagger documentation complete

QUALITY STANDARDS:
- RESTful API design
- Proper HTTP status codes
- Clear error messages
- Efficient caching
- Security best practices

DELIVERABLES:
- ProductsController
- Lookup endpoint
- Rate limiting configuration
- Statistics endpoint
- Error handling
- Swagger documentation

SUCCESS METRIC: Product lookup endpoint functional with rate limiting and fast cached responses.
```

---

## Task 10.4: Frontend Product Display

```
TASK: Create product detail UI for web and mobile platforms with nutrition visualization and allergen warnings.

SYSTEM CONTEXT: Display rich product information to users after scanning. Show nutrition facts, allergen warnings, and product images in user-friendly format.

REQUIREMENTS:

WEB IMPLEMENTATION:

1. Product Detail Component: Create product detail component
2. Product Info Display: Show:
   - Product name and brand
   - Product image (if available)
   - Barcode number
   - Category
3. Nutrition Visualization: Add nutrition facts display:
   - Nutrition grade (A-E) with color coding
   - Calories per serving
   - Macronutrients (protein, carbs, fat) with bar charts
   - Key nutrients (sodium, sugar, fiber)
4. Allergen Warnings: Show allergen badges:
   - Common allergens (nuts, dairy, gluten, soy, eggs)
   - Color-coded warnings (red for present, green for absent)
   - Clear visual indicators
5. Product Images: Display product images
6. Loading States: Skeleton loader while fetching
7. Error Handling: Show message if product not found
8. Responsive Design: Mobile-friendly layout

MOBILE IMPLEMENTATION:

1. Product Detail Screen: Create dedicated screen
2. Product Information: Display same data as web
3. Nutrition Facts Card: Create card component with:
   - Nutrition grade visualization
   - Macronutrient breakdown
   - Serving size information
4. Allergen Badges: Show allergen information with icons
5. SQLite Caching: Cache product data locally:
   - Store in product_cache table
   - 30-day expiry
   - Offline access to previously viewed products

7. Loading States: Show loading indicator
8. Error Handling: Handle not found and network errors

CONSTRAINTS:
- Fast rendering
- Responsive design
- Offline support (mobile)
- Clear visual hierarchy
- Accessible

INTEGRATION POINTS:
- Backend product endpoint (Task 10.3)
- Scan result screens (Task 6.3, 7.3)
- SQLite cache (Task 8.1)

TESTING REQUIREMENTS:
1. Product details display correctly
2. Nutrition visualization renders
3. Allergen warnings show
4. Images display and zoom works
5. Loading states show
6. Error handling works
7. Responsive on all screen sizes
8. Mobile caching works
9. Offline access functional

ACCEPTANCE CRITERIA:
- ✅ Web product component created
- ✅ Mobile product screen created
- ✅ Nutrition visualization working
- ✅ Allergen warnings displayed
- ✅ Images displayed
- ✅ SQLite caching implemented
- ✅ Responsive design
- ✅ Error handling robust

QUALITY STANDARDS:
- User-friendly interface
- Clear visual design
- Accessible components
- Smooth UX
- Efficient rendering

DELIVERABLES:
- Web product detail component
- Mobile product detail screen
- Nutrition visualization
- Allergen warning badges
- SQLite caching logic
- Loading/error states

SUCCESS METRIC: Users can view comprehensive product information with nutrition facts and allergen warnings on both platforms.
```

---

END OF PHASE 10
