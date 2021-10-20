FROM node:14-alpine3.12

WORKDIR /trello_copy

COPY package*.json   ./


RUN npm install 

COPY . .

CMD ["npm", "run", "dev"]