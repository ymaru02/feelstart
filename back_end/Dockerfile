FROM openjdk:8 AS builder
WORKDIR /back_end
COPY . .
RUN sudo chmod +x ./gradlew

RUN sudo rm -rf src/test
RUN sudo ./gradlew :clean build
RUN ls ./build/libs
