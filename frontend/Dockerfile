FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:18-alpine AS deploy-node

WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/build-node .

RUN yarn --production

CMD ["node", "index.js"]
