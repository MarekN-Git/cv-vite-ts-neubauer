FROM openjdk:21-jdk
WORKDIR /app
COPY docker/backend/spring-backend.jar /app/app.jar
CMD ["java", "-jar", "app.jar"]