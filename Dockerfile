ARG NODE_IMAGE=node:18.13-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --production --ignore-ts-errors

FROM base AS production
ENV NODE_ENV=production
ENV PORT=5555
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --production --ignore-scripts
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE $PORT
EXPOSE 9000
EXPOSE 8080
CMD [ "dumb-init", "node", "server.js"]
