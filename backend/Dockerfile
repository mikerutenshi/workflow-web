FROM node:20.19.0-alpine AS base
WORKDIR /usr/src/backend

# Delete node_modules and package-lock.json for a clean install
RUN rm -rf node_modules
RUN rm -rf package-lock.json

COPY prisma ./
COPY package*.json ./

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

FROM base AS staging
RUN npm install
COPY . .
EXPOSE 3001
CMD ["/bin/sh", "-c", "/wait && npm run start:staging"]

FROM base AS production
RUN npm install
COPY . .
EXPOSE 3001
CMD ["/bin/sh", "-c", "/wait && npm run start"]

# COPY ./docker-entrypoint.sh /docker-entrypoint.sh
# ENTRYPOINT ["docker-entrypoint.sh"]