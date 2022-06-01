FROM node:lts-alpine

RUN apk update
RUN apk upgrade

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
ENV NODE_ENV=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]