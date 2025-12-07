# Phase 2: CI/CD Pipeline - AI Implementation Prompts

> **5 Tasks**: Automated builds for Backend, Web, Mobile, Admin + PR validation
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 2.1: Backend CI/CD

```
TASK: Create GitHub Actions workflow for automated backend Docker builds with multi-platform support, semantic versioning, and Docker Hub publishing.

SYSTEM CONTEXT: Automates backend deployment pipeline. Every push to main triggers a production-ready Docker image build and push to Docker Hub, enabling continuous delivery.

REQUIREMENTS:

1. Workflow File: Create .github/workflows/backend-build.yml
2. Trigger: Configure on push to main branch and manual workflow_dispatch
3. Docker Buildx: Set up Docker Buildx for multi-platform builds
4. Authentication: Add Docker Hub login using secrets (DOCKERHUB_USERNAME, DOCKERHUB_TOKEN)
5. Multi-Platform Build: Build for linux/amd64 platform
6. Semantic Versioning: Tag images with git commit SHA, branch name, and latest
7. Build Caching: Configure Docker layer caching for faster builds
8. Secret Documentation: Document required GitHub secrets in workflow comments
9. Build Context: Use backend directory as build context

CONSTRAINTS:
- Workflow must only trigger on backend code changes (paths filter)
- Secrets must never be exposed in logs
- Build must fail if tests fail
- Image tags must follow semantic versioning

INTEGRATION POINTS:
- Docker Hub repository must exist before workflow runs
- Production deployment will pull these images

TESTING REQUIREMENTS:
1. Push to main triggers workflow
2. Docker image builds successfully
3. Image pushed to Docker Hub with correct tags
4. Build cache improves subsequent build times
5. Workflow fails on build errors

ACCEPTANCE CRITERIA:
- ✅ Workflow triggers on push to main
- ✅ Docker image published to Docker Hub
- ✅ Semantic versioning tags applied
- ✅ Build caching functional

QUALITY STANDARDS:
- Follow GitHub Actions best practices
- Use official Docker actions
- Implement proper error handling


DELIVERABLES:
- .github/workflows/backend-build.yml
- Documentation of required secrets


SUCCESS METRIC: Every main branch push produces a tagged Docker image on Docker Hub.
```

---



## Task 2.2: Web CI/CD

```
TASK: Create GitHub Actions workflow for automated web frontend Docker builds with Next.js optimization and Docker Hub publishing.

SYSTEM CONTEXT: Automates web deployment pipeline. Builds optimized Next.js production images with standalone output.

REQUIREMENTS:

1. Workflow File: Create .github/workflows/web-build.yml
2. Trigger: Configure on push to main branch (paths: web/**)
3. Docker Buildx: Set up for multi-platform builds
4. Authentication: Docker Hub login with secrets
5. Build Arguments: Pass NEXT_PUBLIC_API_URL as build arg
6. Multi-Platform: Build for linux/amd64
7. Semantic Versioning: Tag with SHA, branch, latest
8. Build Caching: Configure layer caching
9. Secret Documentation: Document required secrets

CONSTRAINTS:
- Must use Next.js standalone output
- Build must fail on TypeScript errors
- Environment variables must be build-time injected
- Image size must be optimized

INTEGRATION POINTS:
- Connects to backend API URL
- Production deployment pulls these images

TESTING REQUIREMENTS:
1. Push to main triggers build
2. Next.js builds successfully
3. Image pushed with correct tags
4. Standalone output included
5. Build cache works

ACCEPTANCE CRITERIA:
- ✅ Workflow triggers correctly
- ✅ Optimized image published
- ✅ Tags applied correctly
- ✅ Build succeeds consistently

QUALITY STANDARDS:
- Use Next.js build optimization
- Minimize image size
- Cache dependencies effectively
- Handle build failures gracefully

DELIVERABLES:
- .github/workflows/web-build.yml
- Secret documentation


SUCCESS METRIC: Optimized web Docker images published automatically on every main push.
```

---



## Task 2.3: Mobile CI/CD

```
TASK: Create GitHub Actions workflow for automated mobile APK builds using EAS Build with GitHub Releases publishing.

SYSTEM CONTEXT: Automates mobile app builds. Tag-based releases trigger APK generation and publishing to GitHub Releases for distribution.

REQUIREMENTS:

1. Workflow File: Create .github/workflows/mobile-build.yml
2. Trigger: Configure on tag push matching mobile-v* pattern
3. EAS Build: Set up Expo EAS Build
4. Authentication: Add EXPO_TOKEN secret
5. Build Profile: Use production build profile from eas.json
6. APK Generation: Build Android APK (not AAB initially)
7. GitHub Release: Upload APK to GitHub Releases
8. Release Notes: properties from release notes template
9. Secret Documentation: Document EXPO_TOKEN requirement

CONSTRAINTS:
- Only trigger on mobile version tags
- APK must be signed for production
- Build must use production environment variables
- Release must include changelog

INTEGRATION POINTS:
- EAS Build service must be configured
- GitHub Releases for distribution

TESTING REQUIREMENTS:
1. Tag push triggers workflow
2. EAS Build completes successfully
3. APK uploaded to GitHub Releases
4. Release notes generated
5. APK installable on Android devices

ACCEPTANCE CRITERIA:
- ✅ Tag push triggers build
- ✅ APK built and signed
- ✅ Release created with APK
- ✅ Changelog included

QUALITY STANDARDS:
- Follow Expo EAS best practices
- Use production build configuration
- Implement proper versioning
- Test APK before release

DELIVERABLES:
- .github/workflows/mobile-build.yml
- EAS Build configuration
- Release template

SUCCESS METRIC: Tagged releases automatically produce installable APKs on GitHub Releases.
```

---



## Task 2.4: Admin Dashboard CI/CD

```
TASK: Create GitHub Actions workflow for automated admin dashboard Docker builds with separate versioning.

SYSTEM CONTEXT: Automates admin dashboard deployment. Builds separate from main web app with admin-specific configuration.

REQUIREMENTS:

1. Workflow File: Create .github/workflows/admin-dashboard-build.yml
2. Trigger: Push to main (paths: admin-dashboard/**)
3. Docker Buildx: Multi-platform build setup
4. Authentication: Docker Hub login
5. Build Arguments: Pass admin-specific env vars
6. Semantic Versioning: Tag with SHA, branch, latest
7. Build Caching: Layer caching configuration
8. Secret Documentation: Document required secrets

CONSTRAINTS:
- Separate image from main web app
- Admin-specific environment variables
- Optimized build size
- Production-ready configuration

INTEGRATION POINTS:
- Connects to backend admin endpoints
- Deployed separately from web app

TESTING REQUIREMENTS:
1. Push triggers build
2. Image builds successfully
3. Published with correct tags
4. Admin features functional
5. Build cache effective

ACCEPTANCE CRITERIA:
- ✅ Workflow triggers on admin changes
- ✅ Separate image published
- ✅ Correct tagging applied
- ✅ Build optimized

QUALITY STANDARDS:
- Use Next.js standalone output
- Optimize for admin use case
- Implement proper caching
- Handle errors gracefully

DELIVERABLES:
- .github/workflows/admin-dashboard-build.yml
- Secret documentation


SUCCESS METRIC: Admin dashboard images published automatically with separate versioning.
```

---



## Task 2.5: PR Checks & Branch Protection

```
TASK: Create comprehensive PR validation workflow with lint, type-check, test, and build verification plus branch protection rules.

SYSTEM CONTEXT: Quality gate preventing broken code from merging. Enforces code standards, type safety, test coverage, and successful builds before any PR can merge to dev.

REQUIREMENTS:

1. Workflow File: Create .github/workflows/pr-checks.yml
2. Trigger: Pull requests targeting dev branch
3. Lint Job: Run ESLint for backend, web, mobile, admin-dashboard in parallel
4. Type-Check Job: Run TypeScript compiler in strict mode for all projects
5. Test Job: Run Jest unit tests (exclude E2E), generate coverage report
6. Build Job: Verify all projects build successfully
7. Contributing Guide: Create .github/CONTRIBUTING.md documenting:
   - Branch strategy: task-X.Y-description from dev
   - Commit convention: conventional commits
   - PR process and review guidelines
   - Merge requirements
8. Branch Protection: Configure dev branch protection in GitHub settings:
   - Require status checks before merge
   - Require branches up to date
   - Require pr-checks workflow to pass
   - No bypass for admins

CONSTRAINTS:
- All checks must pass before merge allowed
- No bypassing checks even for admins
- Fast feedback (<5 minutes for most PRs)
- Clear error messages on failure

INTEGRATION POINTS:
- Enforces same quality as pre-commit hooks
- Blocks merge until all checks pass

TESTING REQUIREMENTS:
1. Create PR with failing test - merge blocked
2. Create PR with lint errors - merge blocked
3. Create PR with type errors - merge blocked
4. Create PR with build failure - merge blocked
5. Fix all issues - merge enabled
6. Verify admin cannot bypass

ACCEPTANCE CRITERIA:
- ✅ PR checks run on every PR
- ✅ Merge blocked on failures
- ✅ Branch protection enforced
- ✅ Contributing guide complete

QUALITY STANDARDS:
- Fast execution time
- Clear failure messages
- Comprehensive coverage
- No false positives

DELIVERABLES:
- .github/workflows/pr-checks.yml
- .github/CONTRIBUTING.md
- Branch protection configuration
- Test verification

SUCCESS METRIC: No broken code can merge to dev; all PRs validated automatically.
```

---



END OF PHASE 2
