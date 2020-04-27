FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src/ src/

EXPOSE 80

CMD [ "node", "src/index.js" ]