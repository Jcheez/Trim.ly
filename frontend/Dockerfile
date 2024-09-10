FROM node:20-alpine3.20

WORKDIR /frontend

COPY package*.json ./

RUN npm install --omit=dev

COPY ./build ./build

EXPOSE 3000

CMD ["npm", "start"]
