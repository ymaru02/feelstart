FROM openjdk:8 AS builder
WORKDIR /back_end
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew :clean build
RUN ls ./build/libs

COPY --from=builder /backend/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./app.jar"]
