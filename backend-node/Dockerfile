FROM node:16
RUN npm install -g nodemon
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
EXPOSE 5000
RUN npm install
CMD [ "nodemon", "server.js" ]
