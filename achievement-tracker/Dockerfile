# syntax=docker/dockerfile:1
FROM node:alpine


COPY package.json ./
COPY package-lock.json ./
COPY /achievement-tracker /achievement-tracker
COPY /db /db
COPY /models /models
COPY /routes /routes
COPY server.js ./

RUN npm install react-scripts@latest -g
RUN cd achievement-tracker && npm install && npm run build && cd ..
RUN npm install


CMD ["node", "server.js"]
