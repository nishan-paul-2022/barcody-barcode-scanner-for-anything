# GitHub Secrets Configuration

To enable the automated CI/CD pipelines, the following secrets must be configured in your GitHub repository settings (**Settings > Secrets and variables > Actions**).

## Docker Hub Secrets

These are required for building and pushing Docker images to Docker Hub.

| Secret Name | Description |
| ----------- | ----------- |
| `DOCKERHUB_USERNAME` | Your Docker Hub username. |
| `DOCKERHUB_TOKEN` | Your Docker Hub Personal Access Token (PAT). It is recommended to use a token with read/write access instead of your password. |

## Expo Secrets (Mobile)

Required for building and releasing the mobile application via EAS.

| Secret Name | Description |
| ----------- | ----------- |
| `EXPO_TOKEN` | Your Expo access token for EAS build services. |

---

## Workflow Integration

The workflows are configured to use these secrets automatically:
- **Backend Build**: Uses `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.
- **Web Build**: Uses `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.
- **Mobile Build**: Uses `EXPO_TOKEN`.
