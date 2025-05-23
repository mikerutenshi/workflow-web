FROM node:20.19.0-alpine AS build
WORKDIR /app/backend

# Delete node_modules and package-lock.json for a clean install
# RUN rm -rf node_modules
# RUN rm -f package-lock.json

# COPY prisma ./
COPY package*.json ./
# COPY tsconfig*.json ./

RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20.19.0-alpine AS base
WORKDIR /app/backend
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/package*.json ./
COPY --from=build /app/backend/prisma ./prisma
COPY --from=build /app/backend/.env* ./


ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 3001

FROM base AS staging
WORKDIR /app/backend
CMD ["npm", "run", "start:staging"]
# CMD ["/bin/sh", "-c", "/wait && npm run start:staging"]

FROM base AS production
WORKDIR /app/backend
CMD ["npm", "run", "start"]
# CMD ["/bin/sh", "-c", "/wait && npm run start"]
