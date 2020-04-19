FROM node:13.12.0-alpine3.11
WORKDIR /usr/worker/src
COPY ./package*.json ./
RUN yarn install
COPY . /usr/worker
CMD ["yarn", "start"]
