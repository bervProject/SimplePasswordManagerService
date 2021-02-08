FROM node:lts-alpine as build
ARG NODE_AUTH_TOKEN
WORKDIR /usr/src/app
COPY package.json yarn.lock .npmrc ./
RUN yarn
RUN rm -f .npmrc
COPY . .
RUN yarn compile
RUN adduser -D spms
USER spms
CMD ["yarn", "start:prod"]