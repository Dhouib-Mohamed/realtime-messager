FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 5000 5001

CMD ["yarn", "run", "start"]