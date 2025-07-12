# Multi-stage build for Config Server
FROM openjdk:17 as build-stage
# Expose port
EXPOSE 8889

ADD target/ServerConfig-0.0.1-SNAPSHOT.jar ServerConfig.jar
# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8889/actuator/health || exit 1
# Run the application
ENTRYPOINT ["java", "-jar", "ServerConfig.jar"]
