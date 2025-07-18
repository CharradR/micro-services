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
COPY --from=build /app/target/config-server-0.0.1-SNAPSHOT.jar  /app/config-server.jar
ex

# Set the working directory in the container
WORKDIR /app

# Start the application
CMD ["java", "-jar", "config-server.jar"]