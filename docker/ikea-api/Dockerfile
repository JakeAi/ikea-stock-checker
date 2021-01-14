FROM node:12.18.3-alpine
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
USER node
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install --only=prod

WORKDIR /usr/src/app
USER node
COPY ./dist/apps/api ./
EXPOSE 4000
CMD [ "node", "main.js" ]
