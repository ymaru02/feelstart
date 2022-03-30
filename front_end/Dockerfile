FROM node:lts-alpine as build-stage
WORKDIR /front_end

COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY /etc/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=build-stage /home/ubuntu/docker/jenkins-data/workspace/star-pipeline-cicd/front_end /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
