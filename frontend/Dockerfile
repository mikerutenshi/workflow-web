FROM node:20.19.0-alpine AS build
WORKDIR /app

COPY frontend/package*.json ./frontend/

WORKDIR /app/frontend
RUN npm ci
COPY frontend/. .
ARG ENVIRONMENT
RUN npm run build:${ENVIRONMENT}


FROM node:20.19.0-alpine
WORKDIR /app/frontend
COPY --from=build /app/frontend/.output ./.output
COPY --from=build /app/frontend/node_modules ./node_modules
COPY --from=build /app/frontend/package*.json ./
COPY --from=build /app/frontend/.env* ./

EXPOSE 3000

CMD ["npm", "run", "start"]