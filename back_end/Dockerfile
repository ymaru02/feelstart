FROM openjdk:8 AS builder
WORKDIR /back_end
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew :build.gradle:clean build
RUN ls build/libs
