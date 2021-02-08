FROM node:lts-alpine as build
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY package.json yarn.lock .npmrc ./
RUN yarn
COPY . .
RUN yarn compile

FROM node:lts-alpine as runtime
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/lib /app/lib
COPY --from=build /app/config /app/config
RUN ls
RUN adduser -D spms
USER spms
CMD ["yarn", "start:prod"]