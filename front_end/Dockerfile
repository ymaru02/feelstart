FROM node:lts-alpine as build-stage

COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
