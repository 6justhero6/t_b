FROM node:16
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]

