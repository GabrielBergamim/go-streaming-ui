# Stage 1: build your Angular app
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod   # produces /app/dist/go-streaming

# Stage 2: serve it with nginx
FROM nginx:alpine

# 2) Make sure our target folder exists
RUN mkdir -p /var/www/go.streaming/html/ui

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/go-streaming/browser/* /var/www/go.streaming/html/ui/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

