FROM node:20-alpine3.20

WORKDIR /frontend

COPY package*.json ./

RUN npm install --omit=dev

COPY ./build ./build

CMD ["npm", "start"]
