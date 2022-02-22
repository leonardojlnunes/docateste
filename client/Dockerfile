FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

COPY . .

RUN yarn && yarn build

RUN rm -rf node_modules
RUN yarn cache clean

RUN yarn install --production

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/docateste /usr/share/nginx/html

EXPOSE 80
