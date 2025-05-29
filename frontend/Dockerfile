FROM node:20.19.0-alpine AS build
WORKDIR /app

COPY frontend/package*.json ./frontend/
# COPY shared/schema.ts ./shared/

WORKDIR /app/frontend
RUN npm ci
COPY frontend/. .
RUN npm run build


FROM node:20.19.0-alpine
WORKDIR /app/frontend
COPY --from=build /app/frontend/.output ./.output
COPY --from=build /app/frontend/node_modules ./node_modules
COPY --from=build /app/frontend/package*.json ./
COPY --from=build /app/frontend/.env* ./

EXPOSE 3000

CMD ["npm", "run", "start"]