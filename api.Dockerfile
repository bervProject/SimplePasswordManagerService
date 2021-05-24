FROM node:lts-alpine as build
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY packages/api/package.json packages/api/tsconfig.json .npmrc ./
RUN yarn install && rm -f .npmrc
COPY packages/api/src ./src
RUN yarn build

FROM node:lts-alpine as runtime
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY --from=build /app/lib /app/lib
COPY packages/api/package.json ./
COPY packages/api/config/ /app/config/
COPY packages/api/public/ /app/public/
COPY .npmrc ./
RUN yarn --production && yarn cache clean && rm -f .npmrc
RUN adduser -D spms && chown -R spms /app
USER spms
CMD ["yarn", "start:prod"]