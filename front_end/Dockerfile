FROM node:lts-alpine as build-stage
WORKDIR /front_end
RUN npm install -g serve
RUN mkdir ./build
COPY ./build ./build
ENTRYPOINT ["serve", "-s", "build"]
