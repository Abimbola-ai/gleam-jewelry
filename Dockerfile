FROM node:14

# Working directory
WORKDIR /usr/src/app


#Copy package json files
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node" , "server.js" ]