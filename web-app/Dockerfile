FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY web-app/package.json ./web-app/
COPY admin-dashboard/package.json ./admin-dashboard/
COPY mobile-app/package.json ./mobile-app/
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/web-app
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/web-app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/web-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/web-app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=60s \
  CMD wget --spider -q http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
