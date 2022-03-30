FROM node:lts-alpine as build-stage
WORKDIR docker/jenkins-data/workspace/star-pipeline-cicd/front_end

COPY . .
RUN npm install
RUN npm run build
