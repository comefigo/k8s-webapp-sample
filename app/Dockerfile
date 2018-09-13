FROM node:6.9.2

COPY package.json .
COPY server.js .

RUN npm install

EXPOSE 8080
CMD node server.js