FROM node:20.19.0-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
COPY . .
RUN npm run build

FROM node:20.19.0-alpine AS base
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env* ./
COPY --from=build /app/prisma.config.ts ./
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait_aarch64 /wait
RUN chmod +x /wait

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 3001

FROM base AS staging
CMD ["npm", "run", "start:staging"]

FROM base AS production
CMD ["npm", "run", "start"]