FROM node:lts-alpine as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn compile
CMD ["yarn", "start:prod"]