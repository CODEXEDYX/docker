# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

FROM node AS build

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN yarn install --prod && yarn cache clean


FROM node:${NODE_VERSION}-bookworm-slim AS prod

ENV NODE_ENV production

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

COPY --chown=node:node index.js /usr/src/app/

COPY --chown=node:node tasks* /usr/src/app/tasks/