FROM openjdk:8 AS builder
WORKDIR /back_end
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew :clean build
RUN ls ./build/libs

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./build/libs/gambyeol-0.0.1-SNAPSHOT.jar"]
