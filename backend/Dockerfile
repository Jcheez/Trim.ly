FROM node:20-alpine3.20

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "dev:docker"]
