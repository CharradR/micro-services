# Docker Build Troubleshooting Guide

## Common Issues and Solutions

### 1. Maven Image Not Found
**Error**: `maven:3.8.6-openjdk-17: not found`

**Solution**: Use the correct Maven image tag:
```dockerfile
FROM maven:3.9-openjdk-17 as build-stage
```

**Alternative images to try**:
- `maven:3.9-openjdk-17` (recommended)
- `maven:3.8-openjdk-17`
- `maven:latest`

### 2. If Maven Images Still Don't Work
Use the official Eclipse Temurin images with Maven installed:

**Alternative Dockerfile pattern**:
```dockerfile
FROM eclipse-temurin:17-jdk as build-stage

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Rest of the build process...
```

### 3. Network Issues
If you're behind a corporate firewall:

**Add proxy settings to Dockerfile**:
```dockerfile
ENV HTTP_PROXY=http://your-proxy:port
ENV HTTPS_PROXY=http://your-proxy:port
```

### 4. Build Performance Issues
**Speed up builds with Maven cache**:
```bash
# Create a volume for Maven cache
docker volume create maven-cache

# Use it in docker-compose
volumes:
  - maven-cache:/root/.m2
```

### 5. Check Available Images
Run this to see available Maven tags:
```bash
docker search maven
```

Or check online: https://hub.docker.com/_/maven

## Quick Fixes

### Fix 1: Use Alternative Dockerfile
If the main Dockerfile fails, try:
```bash
# Copy the alternative Dockerfile
copy Dockerfile.alt Dockerfile

# Then build
docker-compose build --no-cache
```

### Fix 2: Pull Images Manually
```bash
# Pull the Maven image manually first
docker pull maven:3.9-openjdk-17

# Then build your services
docker-compose build --no-cache
```

### Fix 3: Use Local Build Instead
If Docker builds keep failing, build locally:
```bash
# Build each service locally
cd Eureka && mvn clean package -DskipTests && cd ..
cd Gateway && mvn clean package -DskipTests && cd ..
cd ServerConfig && mvn clean package -DskipTests && cd ..
cd LibraryService && mvn clean package -DskipTests && cd ..

# Then use simple Dockerfiles that just copy the JAR
docker-compose build --no-cache
```

## Recommended Command Sequence

1. **First try**:
   ```bash
   docker-compose build --no-cache && docker-compose up -d
   ```

2. **If images not found**:
   ```bash
   docker pull maven:3.9-openjdk-17
   docker pull node:16-alpine
   docker pull maven:3.9-openjdk-17-jdk-slim
   docker-compose build --no-cache && docker-compose up -d
   ```

3. **If still failing**:
   ```bash
   # Use the quick-start script
   quick-start.bat
   ```
