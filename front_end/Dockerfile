FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
