FROM node:12 AS builder
WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm prune --production
RUN npm run build
RUN /usr/local/bin/node-prune

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /src .
EXPOSE 80
CMD [ "npm", "start" ]