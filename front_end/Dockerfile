FROM node:lts-alpine as build-stage
WORKDIR /front_end

COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000


