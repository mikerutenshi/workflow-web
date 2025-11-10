FROM node:20.19.0-alpine AS build
WORKDIR /app/backend

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
COPY . .
RUN npm run build

FROM node:20.19.0-alpine AS base
WORKDIR /app/backend
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/package*.json ./
COPY --from=build /app/backend/prisma ./prisma
COPY --from=build /app/backend/.env* ./
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