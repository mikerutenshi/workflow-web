FROM node:20.19.0-alpine AS base
WORKDIR /usr/src

# Delete node_modules and package-lock.json for a clean install
RUN rm -rf node_modules
RUN rm -rf package-lock.json

COPY package*.json ./

FROM base AS staging
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]