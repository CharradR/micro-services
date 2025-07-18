FROM maven:3.8.3-openjdk-17-slim AS build

# Copy the application source code to the container
COPY . /app

# Set the working directory in the container
WORKDIR /app

# Build the application and skip tests to speed up the process
RUN mvn clean install -DskipTests

# Step 2: Use a lightweight JRE 17 runtime image to run the application
FROM openjdk:17.0.1-jdk-slim

# Copy the JAR file created in the build stage to the runtime image
COPY --from=build /app/target/discovery-0.0.1-SNAPSHOT.jar  /app/discovery.jar
# Set environment variables for the config server URL and eureka server URL
ENV SPRING_CONFIG_IMPORT=optional:configserver:http://config-server:8888
ENV EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka/

# Expose the port that the application will run on
EXPOSE 8761
# Set the working directory in the container
WORKDIR /app

# Start the application
CMD ["java", "-jar", "discovery.jar"]