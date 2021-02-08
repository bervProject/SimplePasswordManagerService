FROM node:lts-alpine as build
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY package.json yarn.lock .npmrc ./
RUN yarn
COPY . .
RUN rm -f .npmrc
RUN yarn compile

FROM node:lts-alpine as runtime
WORKDIR /app
COPY --from=build /app /app
RUN adduser -D spms
USER spms
CMD ["yarn", "start:prod"]