FROM node:22.18.0-bullseye AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund --force

COPY . ./

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Проверяем, что переменная задана (опционально, для надёжности)
RUN if [ -z "$VITE_API_URL" ]; then echo "VITE_API_URL is required!"; exit 1; fi

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
