FROM openjdk:17
# Expose port
EXPOSE 8081

ADD target/library-0.0.1-SNAPSHOT.jar library-service.jar
# Run the application
ENTRYPOINT ["java", "-jar", "library-service.jar"]

