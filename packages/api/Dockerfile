FROM node:lts-alpine as build
WORKDIR /app
COPY package.json tsconfig.json ./
RUN yarn install --frozen-lockfile
COPY src/ ./src
RUN yarn build

FROM node:lts-alpine as runtime
WORKDIR /app
COPY --from=build /app/lib /app/lib
COPY package.json ./
COPY config/ /app/config/
COPY public/ /app/public/
RUN yarn --frozen-lockfile --production && yarn cache clean
RUN adduser -D spms && chown -R spms /app
USER spms
CMD ["yarn", "start:prod"]