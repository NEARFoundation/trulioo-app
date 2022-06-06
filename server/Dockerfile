FROM node:14

WORKDIR /trulioo_app
COPY package.json .
RUN npm install
COPY . .
CMD npm start
