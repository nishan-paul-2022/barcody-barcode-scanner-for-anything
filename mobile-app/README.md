# Barcody Mobile App

## CI/CD and Builds

This project uses GitHub Actions and Expo EAS (Expo Application Services) for automated builds and releases.

### Triggering a Build

The build pipeline is triggered by pushing a git tag matching the pattern `mobile-v*`:

```bash
git tag mobile-v1.0.0
git push origin mobile-v1.0.0
```

### Required Secrets

To make the CI/CD pipeline work, ensure the following secrets are added to GitHub repository settings:

- **`EXPO_TOKEN`**: Your Expo personal access token.
  - Generate one at [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens).
- **`GITHUB_TOKEN`**: Provided automatically by GitHub Actions, but ensure the workflow has write permissions (already configured in `mobile-build.yml`).

### Build Profiles

We use the following build profiles (configured in `eas.json`):

- **`production`**: Generates a signed Android APK for distribution.
