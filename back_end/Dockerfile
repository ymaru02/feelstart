FROM openjdk:8-alpine

WORKDIR /server
COPY ./build/libs/jenkins-cicd-stars-0.0.1-SNAPSHOT.jar stars-server.jar
ENTRYPOINT ["java", "-jar", "stars-server.jar"]
