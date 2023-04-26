FROM node:17 as service
WORKDIR /usr/src/app/service
COPY package*.json ./
COPY . .
COPY run.sh /usr/src/app/service
RUN yarn
EXPOSE 3333
CMD ["./run.sh"]