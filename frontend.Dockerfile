# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY packages/frontend/package.json ./
RUN yarn
COPY packages/frontend .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf