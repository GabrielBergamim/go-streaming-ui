# Stage 1: build your Angular app
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod   # produces /app/dist/go-streaming

# Stage 2: serve it with nginx
FROM nginx:alpine

# 1) Clear out the default nginx html dir
RUN rm -rf /usr/share/nginx/html/*

# 2) Make sure our target folder exists
RUN mkdir -p /usr/share/nginx/html/ui

# 3) Drop in our custom config
COPY nginx.conf /etc/nginx/nginx.conf

# 4) Copy *contents* of the dist folder into /usr/share/nginx/html/ui
COPY --from=builder /app/dist/go-streaming/browser/* /usr/share/nginx/html/ui/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

