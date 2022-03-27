FROM openjdk:8 AS builder
WORKDIR /back_end
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew :clean build
RUN ls ./build/libs
