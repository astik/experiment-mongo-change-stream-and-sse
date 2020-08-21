# Build files
FROM node:14.8.0-stretch as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY angular.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.base.json ./
COPY src src/
RUN npm run build

# Serve built files
FROM nginx:1.19.2-alpine
COPY Docker-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/dist/ui-angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
