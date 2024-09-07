FROM node:20-alpine3.20

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]
