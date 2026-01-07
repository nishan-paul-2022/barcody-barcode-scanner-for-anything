# Contributing to Barcody

Thank you for your interest in contributing to Barcody! To maintain code quality and consistency, we follow a strict development workflow.

## Branch Strategy

We use a feature-branching model based on the `dev` branch.

- **Main Branch (`main`)**: Production-ready code. Only merged from `dev` after thorough testing and release validation.
- **Development Branch (`dev`)**: The primary integration branch. All features and fixes should target this branch.
- **Task Branches**: Created from `dev` for specific tasks or features.
  - Format: `task-X.Y-description` (e.g., `task-2.5-pr-checks`)
  - Description should be short and kebab-cased.

## Commit Convention

We enforce [Conventional Commits](https://www.conventionalcommits.org/) to automate changelog generation and versioning.

Format: `<type>(<scope>): <description>`

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

**Scopes:**
- `backend`, `web`, `mobile`, `admin`, `api`, `auth`, `ui`, etc.

**Example:**
`feat(auth): add google oauth login to mobile app`

## PR Process & Review Guidelines

1. **Create a Branch**: `git checkout -b task-X.Y-description dev`
2. **Implement Changes**: Ensure code follows linting and formatting rules.
3. **Run Local Tests**: Verify your changes locally before pushing.
4. **Push & Open PR**: Push your branch and open a PR targeting the `dev` branch.
5. **Automated Checks**: The `pr-checks` workflow will run automatically. All checks (Lint, Type Check, Tests, Build) must pass.
6. **Code Review**: At least one maintainer must approve the PR.
7. **Address Feedback**: If reviewers request changes, implement them and push to the same branch.
8. **Merge**: Once approved and all checks pass, the PR can be merged into `dev`.

## Merge Requirements

To ensure the stability of the `dev` branch, the following requirements must be met before a PR can be merged:

- ✅ **Successful PR Checks**: Linting, Type-checking, Unit Tests (with coverage), and Build must all pass.
- ✅ **Review Approval**: Requirement of at least one approved review.
- ✅ **Up to Date**: The branch must be up to date with the base branch (`dev`).
- ✅ **No Bypassing**: Administrators are not allowed to bypass these requirements.

## Local Development Hooks

We use Husky to run pre-commit and pre-push hooks:
- **Pre-commit**: Runs `lint-staged` to lint and format staged files.
- **Pre-push**: Runs unit tests and security audits.
- **Commit-msg**: Validates commit messages against conventional commit rules.

Failure to follow these rules will prevent you from committing or pushing code.
