FROM node:alpine

RUN mkdir -p /opt/app && chown -R node:node /opt/app

WORKDIR /opt/app

USER node

RUN yarn install

COPY --chown=node:node . .

EXPOSE 3000

