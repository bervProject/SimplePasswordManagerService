FROM node:lts-alpine as build
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY package.json yarn.lock .npmrc ./
RUN yarn
COPY . .
RUN yarn compile

FROM node:lts-alpine as runtime
WORKDIR /app
COPY --from=build /app/package.json /app/node_modules/ /app/lib/ ./
RUN adduser -D spms
USER spms
CMD ["yarn", "start:prod"]