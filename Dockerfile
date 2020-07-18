FROM node:10.15-alpine

RUN mkdir /app
WORKDIR /app

RUN apk update && apk add git

COPY ["package.json", "yarn.lock", ".babelrc.js",\
      "webpack.config.js", "webpack.production.config.js", "webpack.development.config.js",\
      "start.sh", "server.js", "./"]
RUN apk add git && yarn install
