FROM node:20.19.0-alpine AS build-stage
WORKDIR /app

COPY ./package*.json ./

WORKDIR /app
RUN npm ci
COPY . .
ARG ENVIRONMENT
RUN npm run build:${ENVIRONMENT}

FROM nginx:1.27.4-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]