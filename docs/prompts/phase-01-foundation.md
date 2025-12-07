# Phase 1: Foundation - AI Implementation Prompts

> **11 Tasks**: Backend, Web, Mobile, Admin Dashboard Setup + Code Quality + Monitoring
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 1.1: Backend Project Setup

**TASK**: Initialize production-ready NestJS backend with enterprise configuration, strict TypeScript, comprehensive logging, and environment validation.

**SYSTEM CONTEXT**: Foundation for all backend services. Must establish patterns for configuration management, logging standards, error handling, and API versioning that all future modules will follow.

**REQUIREMENTS**:

1. **Project Initialization**: Create NestJS project with TypeScript strict mode
2. **Directory Structure**: Organize code into `common/`, `shared/`, `database/`, `modules/` with clear separation of concerns
3. **Path Aliases**: Configure TypeScript paths (`@/modules`, `@/common`, `@/config`, `@/shared`) for clean imports
4. **Environment Management**: Create `.env.example`, `.env.development`, `.env.production`, `.env.test` with all 11 required variables (DATABASE_URL, REDIS_URL, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, SENTRY_DSN, NODE_ENV, PORT, API_VERSION, LOG_LEVEL)
5. **Environment Validation**: Implement schema validation that fails fast on missing/invalid environment variables
6. **Winston Logger**: Configure structured JSON logging with timestamps, log levels (error, warn, info, debug), and environment-based configuration
7. **API Versioning**: Set global prefix `/api/v1` for all endpoints
8. **Global Interceptors**: Create logging interceptor to log all requests/responses with duration
9. **Global Filters**: Create HTTP exception filter for consistent error responses
10. **Validation Pipeline**: Enable global validation with class-validator and class-transformer

**CONSTRAINTS**:
- TypeScript strict mode must be enabled
- No `any` types allowed
- All environment variables must be validated at startup
- Logger must output JSON format for production
- API must be versioned from day one

**INTEGRATION POINTS**:
- Future auth module will use JWT_SECRET
- Future database module will use DATABASE_URL
- Future Redis module will use REDIS_URL
- All modules will use the Winston logger instance

**TESTING REQUIREMENTS**:
1. App starts successfully with valid environment variables
2. App fails to start with missing environment variables
3. Logger outputs JSON format in production mode
4. All endpoints are accessible at `/api/v1/*`
5. HTTP exception filter returns consistent error format

**ACCEPTANCE CRITERIA**:
- ✅ `npm run start:dev` starts without errors
- ✅ Winston logger outputs structured JSON logs
- ✅ Environment validation prevents startup with missing vars
- ✅ Global prefix `/api/v1` applied to all routes
- ✅ TypeScript compilation has zero errors

**QUALITY STANDARDS**:
- Follow NestJS best practices and official documentation
- Use dependency injection for all services
- Implement proper error handling at application level
- Document all environment variables in .env.example

**DELIVERABLES**:
- Fully configured NestJS project
- Environment validation schema
- Winston logger configuration
- Global interceptors and filters
- Working development server

**SUCCESS METRIC**: Backend starts cleanly, logs structured output, and enforces environment validation.

---

## Task 1.2: Backend Docker Setup

**TASK**: Create optimized multi-stage Docker build for NestJS backend with PostgreSQL and Redis orchestration.

**SYSTEM CONTEXT**: Containerization enables consistent development/production environments and simplifies deployment. Multi-stage builds minimize image size and attack surface.

**REQUIREMENTS**:

1. **Multi-Stage Dockerfile**: Create builder stage (compile TypeScript) and runner stage (production runtime)
2. **Base Image**: Use Alpine Linux for minimal image size
3. **Dependency Optimization**: Copy only production dependencies to final image
4. **Health Check**: Add Docker health check using `/health` endpoint
5. **Docker Compose**: Orchestrate backend, PostgreSQL, Redis services
6. **Named Volumes**: Configure persistent volumes for PostgreSQL data and Redis data
7. **Environment Variables**: Pass all required env vars through docker-compose
8. **Networking**: Create custom bridge network for service communication
9. **Dockerignore**: Exclude node_modules, .git, logs, coverage from build context

**CONSTRAINTS**:
- Final production image must be <200MB
- Health check must use actual application endpoint
- Data must persist across container restarts
- No secrets in Dockerfile or docker-compose.yml

**INTEGRATION POINTS**:
- Backend connects to PostgreSQL on internal network
- Backend connects to Redis on internal network
- Health check endpoint from Task 1.3

**TESTING REQUIREMENTS**:
1. `docker-compose up -d` starts all services successfully
2. Backend accessible at `localhost:8000`
3. PostgreSQL data persists after container restart
4. Redis data persists after container restart
5. Production image size is <200MB
6. Health check shows healthy status

**ACCEPTANCE CRITERIA**:
- ✅ All containers start without errors
- ✅ Backend responds to HTTP requests
- ✅ Data persistence verified
- ✅ Image size optimized

**QUALITY STANDARDS**:
- Follow Docker best practices for layer caching
- Use specific version tags, not `latest`
- Implement proper signal handling for graceful shutdown
- Use non-root user in final image

**DELIVERABLES**:
- Optimized Dockerfile with multi-stage build
- docker-compose.yml with all services
- .dockerignore file
- Named volumes for data persistence

**SUCCESS METRIC**: `docker-compose up` brings up entire stack with persistent data and optimized images.

---

## Task 1.3: Backend Health Checks

**TASK**: Implement comprehensive health monitoring endpoints for application, database, and cache using NestJS Terminus.

**SYSTEM CONTEXT**: Health checks enable orchestrators (Docker, Kubernetes) to detect and recover from failures automatically. Critical for production reliability.

**REQUIREMENTS**:

1. **Install Terminus**: Add `@nestjs/terminus` package
2. **Health Module**: Create dedicated HealthModule
3. **Overall Health**: `/health` endpoint checking all dependencies
4. **Database Health**: `/health/db` endpoint with PostgreSQL connection check
5. **Redis Health**: `/health/redis` endpoint with Redis connection check
6. **Docker Integration**: Configure health check in Dockerfile using `/health` endpoint
7. **Response Format**: Return standard health check response with status and details

**CONSTRAINTS**:
- Health checks must not affect application performance
- Each check must have reasonable timeout (5 seconds max)
- Failed health check must return 503 Service Unavailable
- Successful health check must return 200 OK

**INTEGRATION POINTS**:
- Docker Compose uses health check for container status
- Future Kubernetes deployment will use these endpoints
- Monitoring systems will poll these endpoints

**TESTING REQUIREMENTS**:
1. `/health` returns 200 when all services healthy
2. `/health/db` returns 200 when PostgreSQL connected
3. `/health/redis` returns 200 when Redis connected
4. `/health` returns 503 when any dependency fails
5. Docker health status shows "healthy"

**ACCEPTANCE CRITERIA**:
- ✅ All health endpoints return correct status codes
- ✅ Docker health check passes
- ✅ Health checks complete within timeout
- ✅ Failed dependencies properly reported

**QUALITY STANDARDS**:
- Use NestJS Terminus health indicators
- Implement proper error handling
- Log health check failures
- Return detailed status information

**DELIVERABLES**:
- HealthModule with all endpoints
- Docker health check configuration
- Health check tests

**SUCCESS METRIC**: Docker shows "healthy" status and all health endpoints respond correctly.

---

## Task 1.4: Backend API Documentation

**TASK**: Set up Swagger/OpenAPI documentation with comprehensive API metadata and example DTOs.

**SYSTEM CONTEXT**: Auto-generated API documentation improves developer experience and serves as living documentation that stays in sync with code.

**REQUIREMENTS**:

1. **Install Swagger**: Add `@nestjs/swagger` package
2. **Swagger Configuration**: Configure in main.ts with API metadata (title: "Barcody API", description, version: "1.0")
3. **Swagger UI**: Mount at `/api/docs` endpoint
4. **DTO Decorators**: Add Swagger decorators to example DTOs (@ApiProperty, @ApiPropertyOptional)
5. **Response Examples**: Document response schemas
6. **Authentication**: Document JWT bearer authentication scheme

**CONSTRAINTS**:
- Swagger UI must be accessible in development only
- All DTOs must have Swagger decorators
- API documentation must be complete and accurate

**INTEGRATION POINTS**:
- Future modules will add their endpoints to Swagger
- Frontend developers will use this for API reference

**TESTING REQUIREMENTS**:
1. Swagger UI loads at `/api/docs`
2. API documentation renders correctly
3. Example requests/responses shown
4. Authentication scheme documented

**ACCEPTANCE CRITERIA**:
- ✅ Swagger UI accessible and functional
- ✅ API metadata displayed correctly
- ✅ Example DTOs documented

**QUALITY STANDARDS**:
- Follow OpenAPI 3.0 specification
- Provide clear descriptions for all endpoints
- Include example values in DTOs

**DELIVERABLES**:
- Swagger configuration in main.ts
- Example DTO with decorators
- Accessible Swagger UI

**SUCCESS METRIC**: Developers can explore and test API through Swagger UI.

---

## Task 1.5: Web Project Setup

**TASK**: Initialize Next.js 14+ web application with App Router, TypeScript, Tailwind CSS, shadcn/ui, and dark mode.

**SYSTEM CONTEXT**: Web frontend for desktop/tablet users. Must establish design system, component library, and development patterns for all future UI work.

**REQUIREMENTS**:

1. **Project Initialization**: Create Next.js 14+ with App Router, TypeScript, Tailwind CSS
2. **Path Aliases**: Configure `@/components`, `@/lib`, `@/app`, `@/hooks`, `@/types`
3. **Environment Setup**: Create `.env.local.example` with NEXT_PUBLIC_API_URL
4. **shadcn/ui Installation**: Initialize with dark mode as default
5. **Component Installation**: Install button, input, card, dialog, dropdown-menu, table, tabs, toast, select, checkbox, skeleton, badge, alert, separator
6. **Dark Mode**: Configure dark mode with system preference detection
7. **Layout**: Create root layout with header component
8. **Health Check**: Create `/api/health/route.ts` for health monitoring
9. **Typography**: Configure Tailwind with custom font stack

**CONSTRAINTS**:
- Must use App Router (not Pages Router)
- Dark mode must be default
- All components must use shadcn/ui design system
- TypeScript strict mode enabled

**INTEGRATION POINTS**:
- Will connect to backend API (Task 4.3)
- Will use auth state management (Task 4.2)

**TESTING REQUIREMENTS**:
1. `npm run dev` starts successfully
2. App loads at `localhost:3000`
3. Dark mode applied by default
4. shadcn components render correctly
5. Tailwind CSS working

**ACCEPTANCE CRITERIA**:
- ✅ Next.js app running with App Router
- ✅ Dark mode enabled
- ✅ shadcn/ui components installed
- ✅ TypeScript compilation successful

**QUALITY STANDARDS**:
- Follow Next.js 14 best practices
- Use server components by default
- Implement proper SEO metadata
- Optimize for performance

**DELIVERABLES**:
- Configured Next.js project
- shadcn/ui component library
- Root layout with header
- Health check API route

**SUCCESS METRIC**: Web app loads with dark mode and all shadcn components render correctly.

---

## Task 1.6: Web Docker Setup

**TASK**: Containerize Next.js web application with optimized multi-stage build.

**SYSTEM CONTEXT**: Enables consistent deployment and development environments for web frontend.

**REQUIREMENTS**:

1. **Multi-Stage Dockerfile**: Builder stage and runner stage
2. **Base Image**: Use Node Alpine for minimal size
3. **Build Optimization**: Enable standalone output in next.config.js
4. **Environment Variables**: Pass NEXT_PUBLIC_API_URL through docker-compose
5. **Docker Compose**: Add web service to root docker-compose.yml (port 3000)
6. **Dockerignore**: Exclude .next, node_modules, .git

**CONSTRAINTS**:
- Image must use Next.js standalone output
- Must support hot reload in development
- Production build must be optimized

**INTEGRATION POINTS**:
- Connects to backend service in Docker network

**TESTING REQUIREMENTS**:
1. `docker-compose up web` starts successfully
2. Web accessible at `localhost:3000`
3. Hot reload works in development
4. Production build optimized

**ACCEPTANCE CRITERIA**:
- ✅ Web container runs successfully
- ✅ App accessible via browser
- ✅ Development mode supports hot reload

**QUALITY STANDARDS**:
- Use Next.js standalone output
- Optimize layer caching
- Minimize image size

**DELIVERABLES**:
- Dockerfile for web
- Updated docker-compose.yml
- .dockerignore file

**SUCCESS METRIC**: Web app runs in Docker with hot reload in development.

---

## Task 1.7: Mobile Project Setup

**TASK**: Initialize Expo mobile application with TypeScript, expo-router, dark theme, optimized assets, and performance optimization.

**SYSTEM CONTEXT**: React Native mobile app for iOS/Android. Must establish navigation patterns, theming, asset optimization, and performance best practices.

**REQUIREMENTS**:

1. **Project Initialization**: Create Expo project with TypeScript template
2. **App Configuration**: Configure app.json (name: "Barcody", slug, version, dark mode)
3. **EAS Build**: Set up eas.json with production, preview, development profiles
4. **App Icon**: Design 1024x1024px icon with neon blue theme, generate all sizes
5. **Splash Screen**: Design dark mode splash with neon blue branding
6. **Image Optimization**: Configure WebP format, compress all assets
7. **Navigation**: Install and configure expo-router with file-based routing
8. **Tab Layout**: Create app/(tabs)/_layout.tsx with Scan, History, Settings tabs
9. **Placeholder Screens**: Create lazy-loaded screens for each tab
10. **Performance**: Implement dynamic imports for heavy components

**CONSTRAINTS**:
- Must use expo-router (not React Navigation directly)
- Dark theme must be default
- All images must be optimized (WebP, compressed)
- App icon must follow platform guidelines

**INTEGRATION POINTS**:
- Will connect to backend API (Task 4.9)
- Will use auth flow (Task 4.6-4.8)
- Will use camera for scanning (Task 7.2)

**TESTING REQUIREMENTS**:
1. `npx expo start` runs successfully
2. App loads in Expo Go
3. Tab navigation works
4. Custom icon and splash screen display
5. Images load quickly
6. Dark theme applied

**ACCEPTANCE CRITERIA**:
- ✅ Expo app runs in development
- ✅ Tab navigation functional
- ✅ Dark theme enabled
- ✅ Custom branding applied

**QUALITY STANDARDS**:
- Follow Expo best practices
- Optimize bundle size
- Use lazy loading for performance
- Follow platform design guidelines

**DELIVERABLES**:
- Configured Expo project
- Tab navigation setup
- Optimized app icon and splash
- Placeholder screens

**SUCCESS METRIC**: Mobile app runs in Expo Go with tab navigation and optimized assets.

---

## Task 1.8: Admin Dashboard Setup

**TASK**: Initialize Next.js admin dashboard with TypeScript, Tailwind CSS, shadcn/ui, and dark mode.

**SYSTEM CONTEXT**: Separate admin interface for analytics, user management, and system monitoring. Shares tech stack with web but isolated codebase.

**REQUIREMENTS**:

1. **Project Initialization**: Create Next.js 14+ with App Router, TypeScript, Tailwind
2. **Path Aliases**: Configure `@/components`, `@/lib`, `@/app`
3. **Environment Setup**: Create `.env.local.example` with NEXT_PUBLIC_API_URL
4. **shadcn/ui**: Initialize and install button, input, card, dialog, table, tabs, select, badge, alert, skeleton, dropdown-menu, separator
5. **Dark Mode**: Configure as default
6. **Layout**: Create dashboard layout with header and sidebar
7. **Axios**: Install for API communication

**CONSTRAINTS**:
- Must use App Router
- Dark mode default
- Separate from main web app
- Admin-specific UI components

**INTEGRATION POINTS**:
- Connects to backend admin endpoints (Task 13.1)
- Uses admin authentication (Task 4.13)

**TESTING REQUIREMENTS**:
1. `npm run dev` starts successfully
2. Dashboard loads at `localhost:3000`
3. Dark mode applied
4. shadcn components render

**ACCEPTANCE CRITERIA**:
- ✅ Admin dashboard running
- ✅ Dark mode enabled
- ✅ Component library installed

**QUALITY STANDARDS**:
- Follow Next.js best practices
- Implement admin-specific layouts
- Use consistent design patterns

**DELIVERABLES**:
- Configured Next.js project
- Dashboard layout
- shadcn/ui components

**SUCCESS METRIC**: Admin dashboard loads with dark mode and component library.

---

## Task 1.9: Admin Dashboard Docker Setup

**TASK**: Containerize admin dashboard with multi-stage build and separate port.

**SYSTEM CONTEXT**: Enables deployment of admin dashboard alongside main web app.

**REQUIREMENTS**:

1. **Dockerfile**: Multi-stage build for admin dashboard
2. **Docker Compose**: Add admin-dashboard service (port 3001)
3. **Environment Variables**: Configure NEXT_PUBLIC_API_URL
4. **Dockerignore**: Exclude build artifacts

**CONSTRAINTS**:
- Must run on different port than web (3001)
- Optimized production build
- Standalone output enabled

**INTEGRATION POINTS**:
- Shares Docker network with backend

**TESTING REQUIREMENTS**:
1. `docker-compose up admin-dashboard` works
2. Dashboard accessible at `localhost:3001`
3. Production build optimized

**ACCEPTANCE CRITERIA**:
- ✅ Container runs successfully
- ✅ Dashboard accessible
- ✅ Separate port from web app

**QUALITY STANDARDS**:
- Use Next.js standalone output
- Optimize build size
- Proper layer caching

**DELIVERABLES**:
- Dockerfile for admin dashboard
- Updated docker-compose.yml

**SUCCESS METRIC**: Admin dashboard runs in Docker on port 3001.

---

## Task 1.10: Git Hooks & Code Quality Setup

**TASK**: Configure Husky, lint-staged, ESLint, Prettier, Commitlint across all projects with pre-commit, pre-push, and commit-msg hooks.

**SYSTEM CONTEXT**: Enforces code quality, formatting, and commit conventions across entire monorepo. Prevents bad code from entering repository.

**REQUIREMENTS**:

1. **Root Configuration**: Install Husky, lint-staged, Commitlint, Prettier at root
2. **Prettier**: Create .prettierrc with shared rules (semi: true, singleQuote: true, tabWidth: 2)
3. **Commitlint**: Configure conventional commits (feat, fix, docs, style, refactor, test, chore)
4. **Backend ESLint**: Configure with @typescript-eslint, no any, import ordering
5. **Web ESLint**: Configure with Next.js rules, React hooks
6. **Mobile ESLint**: Configure with Expo rules, React Native
7. **Admin ESLint**: Configure with Next.js rules
8. **Pre-commit Hook**: Run lint-staged + type-check on affected files
9. **Pre-push Hook**: Run unit tests + security audit (npm audit --audit-level=high)
10. **Commit-msg Hook**: Validate commit message format

**CONSTRAINTS**:
- All projects must pass linting before commit
- Type errors must block commits
- Failed tests must block pushes
- High/critical vulnerabilities must block pushes
- Commit messages must follow conventional commits

**INTEGRATION POINTS**:
- CI/CD will run same checks (Task 2.1-2.5)

**TESTING REQUIREMENTS**:
1. Bad code fails pre-commit
2. Good code auto-fixes and passes
3. Invalid commit message fails
4. Valid commit message passes
5. Failed tests block push
6. Security vulnerabilities block push

**ACCEPTANCE CRITERIA**:
- ✅ All hooks working correctly
- ✅ Code quality enforced
- ✅ Conventional commits required
- ✅ Tests must pass before push

**QUALITY STANDARDS**:
- Use industry-standard linting rules
- Auto-fix when possible
- Clear error messages
- Fast execution

**DELIVERABLES**:
- Husky hooks configuration
- ESLint configs for all projects
- Prettier configuration
- Commitlint configuration
- lint-staged configuration

**SUCCESS METRIC**: Hooks prevent bad code, enforce formatting, and require conventional commits.

---

## Task 1.11: Error Monitoring Setup

**TASK**: Configure Sentry error tracking for backend, web, mobile, and admin dashboard.

**SYSTEM CONTEXT**: Centralized error monitoring enables proactive bug detection and debugging in production.

**REQUIREMENTS**:

1. **Backend Sentry**: Install @ntegral/nestjs-sentry, configure in app.module.ts
2. **Web Sentry**: Install @sentry/nextjs, run wizard, configure client and server
3. **Mobile Sentry**: Install sentry-expo, configure in app.json
4. **Admin Sentry**: Install @sentry/nextjs, configure client and server
5. **Environment Variables**: Add SENTRY_DSN to all .env files
6. **Environment Tags**: Tag errors with production/development/staging
7. **Release Tracking**: Configure release versions
8. **Source Maps**: Upload source maps for better stack traces

**CONSTRAINTS**:
- Sentry must be disabled in development (optional)
- Must not impact application performance
- PII must not be sent to Sentry
- Source maps must be uploaded

**INTEGRATION POINTS**:
- CI/CD uploads source maps (Task 2.1-2.4)

**TESTING REQUIREMENTS**:
1. Backend errors appear in Sentry
2. Web errors tracked
3. Mobile errors tracked
4. Admin errors tracked
5. Stack traces readable
6. Environment tags correct

**ACCEPTANCE CRITERIA**:
- ✅ Errors tracked in Sentry dashboard
- ✅ Source maps uploaded
- ✅ Environment tags applied
- ✅ No PII leaked

**QUALITY STANDARDS**:
- Follow Sentry best practices
- Configure appropriate sample rates
- Set up error filtering
- Configure user context (non-PII)

**DELIVERABLES**:
- Sentry configuration for all projects
- Error tracking verified
- Source map upload configured

**SUCCESS METRIC**: Errors from all platforms appear in Sentry with readable stack traces.

---

**END OF PHASE 1**
