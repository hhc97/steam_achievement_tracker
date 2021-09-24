# syntax=docker/dockerfile:1
FROM node:alpine as builder

COPY /achievement-tracker /achievement-tracker
RUN npm install react-scripts@latest -g
RUN cd achievement-tracker && npm install && npm run build


FROM node:alpine

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY /db /db
COPY /models /models
COPY /routes /routes
COPY server.js ./
COPY --from=builder /achievement-tracker/build /achievement-tracker/build


CMD ["node", "server.js"]
