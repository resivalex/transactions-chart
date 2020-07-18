FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY ["package.json", "yarn.lock", ".babelrc.js",\
      "webpack.config.js", "webpack.production.config.js", "webpack.development.config.js",\
      "server.js", "./"]
COPY src src
COPY build build

RUN yarn install
RUN yarn run build
