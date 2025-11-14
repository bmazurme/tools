FROM node:22.18.0-bullseye AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund --force

COPY . ./

# Принимаем аргумент VITE_API_URL
ARG VITE_API_URL
# Передаём его в среду при сборке
ENV VITE_API_URL=$VITE_API_URL

RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install --force
# RUN npm run build && rm -rf ./src
RUN npm run build --verbose && rm -rf ./src

FROM nginx:1.23.1-alpine AS proxy

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
