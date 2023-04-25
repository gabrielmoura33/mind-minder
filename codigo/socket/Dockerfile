FROM node:17 as ui-build
WORKDIR /usr/src/app/socket
COPY package*.json ./
COPY . .
RUN yarn
EXPOSE 3335
CMD ["yarn", "start"]
