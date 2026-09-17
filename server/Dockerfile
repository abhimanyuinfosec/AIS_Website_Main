# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

# Install openssl and libc6-compat for Prisma engines on Alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Install dependencies based on lockfile
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev && npx prisma generate

# Copy source files
COPY src ./src

# Create uploads directory and set permissions
RUN mkdir -p uploads && chown -R node:node /app

USER node

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["npm", "run", "start:prod"]
