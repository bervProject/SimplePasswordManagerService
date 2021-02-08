FROM node:lts-alpine as build
ARG GITHUB_AUTH_TOKEN
ENV GITHUB_AUTH_TOKEN=$GITHUB_AUTH_TOKEN
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN echo -e "@berviantoleo:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=$GITHUB_AUTH_TOKEN" > .npmrc
RUN yarn
COPY . .
RUN yarn compile
CMD ["yarn", "start:prod"]