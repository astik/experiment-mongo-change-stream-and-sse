# Build files
FROM node:14.8.0-stretch as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
ENV REACT_APP_API_BASE_URL=/api
COPY public public/
COPY src src/
RUN npm run build

# Serve built files
FROM nginx:1.19.2-alpine
COPY Docker-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
