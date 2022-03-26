FROM node:8.11
WORKDIR /front_end
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./front_end.conf /etc/nginx/conf.d/front_end.conf
COPY --from=build-stage ./front_end/dist /usr/share/nginx/html/front_end
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
