# FROM cypress/included:15.1.0
FROM cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138-edge

WORKDIR /e2e

# Установите зависимости
COPY package.json package-lock.json ./
RUN npm ci

# Установите Cypress и сохраните кэш
RUN npm install cypress@15.1.0 && \
    cypress install

# Скопируйте остальные файлы
COPY . /e2e

ENV CI=true

CMD ["npx", "cypress", "run", "--browser", "chrome"]
