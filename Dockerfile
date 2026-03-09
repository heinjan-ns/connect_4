FROM node:20-alpine AS test

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm test

FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN CI=true npm ci

COPY --from=test /app/src ./src
COPY --from=test /app/tsconfig.json ./
COPY --from=test /app/tests/smoketest.ts ./tests/
RUN npm run build
RUN node dist/tests/smoketest.js

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

# Non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app
USER nodejs
CMD ["node", "dist/main.js"]
