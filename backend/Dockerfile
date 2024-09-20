FROM node:20-alpine3.20

WORKDIR /backend

COPY package*.json ./

RUN npm install --omit=dev

COPY ./dist ./dist

CMD ["npm", "start"]
