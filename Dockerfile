FROM node:alpine

WORKDIR /opt/app

COPY package.json .

RUN yarn install 

EXPOSE 3000
