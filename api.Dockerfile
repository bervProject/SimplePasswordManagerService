FROM node:lts-alpine as build
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY packages/api/package.json .npmrc ./
RUN yarn
COPY packages/api .
RUN rm -f .npmrc
RUN yarn build

FROM node:lts-alpine as runtime
WORKDIR /app
COPY --from=build /app /app
RUN adduser -D spms
USER spms
CMD ["yarn", "start:prod"]