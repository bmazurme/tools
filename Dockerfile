FROM node:22.18.0-bullseye AS builder

WORKDIR /app

COPY package*.json ./
COPY .env.production ./

RUN npm ci --no-audit --no-fund --force

COPY . ./

RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install --force

RUN if [ ! -f .env.production ]; then echo ".env.production not found!"; exit 1; fi && \
    npm run build --verbose && \
    rm -rf ./src

FROM nginx:1.23.1-alpine AS proxy

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
