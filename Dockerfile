# 1st step: The build

# Here we state that we will be using the node 14.0.0 version as the base image
FROM node:14.0.0 as build
# We define /app as our working directory -where our incoming commands will be executed-
WORKDIR /app

# We copy our package.json and yarn.lock (adapt if you are using npm to package-lock.json) into our workdir
COPY package.json ./
COPY yarn.lock ./

# We install our dependencies
RUN yarn
# We install react-scripts globally to avoid any bad surprise
RUN yarn add react-scripts@3.1.1 -g

# COPY our app
COPY . ./

# And we build! -yarn comes with the node:16.10 image-
RUN yarn run build