# Dockerfile
FROM node:alpine3.12
ARG NEXT_PUBLIC_FRONTEND_PROTOCOL
ARG NEXT_PUBLIC_BACKEND_HOST
ARG NEXT_PUBLIC_BACKEND_PORT
ARG NEXT_PUBLIC_BACKEND_PREFIX
ARG NEXT_PUBLIC_NGINX_HOST
ARG NEXT_PUBLIC_NGINX_PORT

# create destination directory
RUN mkdir -p /usr/src/next-app
WORKDIR /usr/src/next-app

# update and install dependency
RUN apk update && apk upgrade

# copy the app, note .dockerignore
COPY package*.json /usr/src/next-app/
RUN npm install
COPY . /usr/src/next-app/

RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]