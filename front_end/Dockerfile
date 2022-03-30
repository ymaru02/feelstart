FROM node:lts-alpine as build-stage
WORKDIR home/ubuntu/docker/jenkins-data/workspace/star-pipeline-cicd/front_end
RUN npm install -g serve
RUN mkdir ./build
COPY ./build /var/jenkins_home/workspace/star-pipeline-cicd/front_end
ENTRYPOINT ["serve", "-s", "build"]
