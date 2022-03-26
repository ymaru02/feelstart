FROM openjdk:8 AS builder
WORKDIR /back_end
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf module-api/src/test
RUN rm -rf module-web/src/test
RUN ./gradlew :module-web:clean build
RUN ls module-web/build/libs
