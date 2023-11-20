FROM node:20.9.0-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

ENV DB_HOST = localhost
ENV DB_PORT = 5001
ENV DB_USERNAME = leo
ENV DB_PASSWORD = xxxxxxx
ENV DB_DATABASE = VaultGuardDB
ENV DB_REDIS_HOST = localhost
ENV DB_REDIS_PORT = 6379
ENV DB_REDIS_TTL = 900

CMD ["npm", "run", "start:prod"]