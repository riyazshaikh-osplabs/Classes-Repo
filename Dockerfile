# setting the lightweight baseimage of official Node.js 18
# https://hub.docker.com/_/node
FROM node:18-alpine

# set the working directory inside the container
WORKDIR /app

# copying both package and package-lock .json files
COPY package*.json ./

# create and change to the directory app and installing dependencies
RUN npm install

# copy the content of your host directory (including subdirectory) to the container /class/app
COPY . .

# expose the port on which your app will listen on
EXPOSE 5000

# use nodemon to start your application
CMD [ "npm", "start" ]

