FROM node:17 as service
WORKDIR /usr/src/app/service
COPY package*.json ./
COPY . .
RUN yarn
# RUN yarn build
# RUN npx prisma migrate deploy
EXPOSE 3333
CMD ["yarn", "start:dev"]