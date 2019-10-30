FROM node:10.15.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install @vue/cli@3.7.0 -g

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]