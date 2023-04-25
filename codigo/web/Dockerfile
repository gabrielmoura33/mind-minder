FROM node:17 as ui-build
WORKDIR /usr/src/app/web
COPY package*.json ./
COPY . .
RUN yarn
EXPOSE 3000
CMD ["yarn", "dev"]
