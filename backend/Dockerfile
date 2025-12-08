# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies separately to leverage layer caching
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Prune development dependencies
RUN npm prune --production

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install curl/wget for health check if needed, though we can use node or wget
# Alpine includes wget by default.
# We might need to install curl if strict requirements, but wget is lighter.

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -u 1001 -S nestjs -G nodejs

# Copy built assets and dependencies from builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

# Use non-root user
USER nestjs

# Expose application port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --spider -q http://localhost:8000/api/v1/health || exit 1

# Start the application
CMD ["node", "dist/main"]
