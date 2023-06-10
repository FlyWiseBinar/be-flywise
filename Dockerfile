FROM node:17.8.0-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# RUN npm run build

CMD [ "node", "index.js" ]