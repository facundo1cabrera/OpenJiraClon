FROM node:19.2-alpine3.16 as dev
WORKDIR /app
COPY package.json ./
RUN yarn install
CMD [ "yarn","dev" ]

FROM node:19.2-alpine3.16 as dev-deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:19.2-alpine3.16 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN npm run test
RUN yarn build

FROM node:19.2-alpine3.16 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --prod

FROM node:19.2-alpine3.16 as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps ./app/node_modules ./node_modules
COPY --from=builder ./app/ ./
CMD [ "yarn","start" ]
