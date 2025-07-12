# Microservices Project with Docker Compose

This project contains a complete microservices architecture with the following components:

## Services Overview

### Core Services
- **Config Server** (Port 8889) - Centralized configuration management
- **Eureka Server** (Port 8761) - Service discovery and registration
- **API Gateway** (Port 8083) - Entry point for all client requests with OAuth2 security

### Business Services  
- **Library Service** (Port 8081) - Main business microservice using MongoDB

### Security & Authentication
- **Keycloak** (Port 8080, 9000) - OAuth2/OIDC authentication server

### Frontend
- **Education Frontend** (Port 4200) - Angular application

### Database
- **MongoDB** (Port 27017) - NoSQL database for Library Service

## Prerequisites

Before running the project, ensure you have:

1. **Docker** and **Docker Compose** installed
2. **Java 17** for building Spring Boot services
3. **Node.js 16+** for building Angular frontend
4. **Maven** for building Java services

## Project Structure

```
├── docker-compose.yml          # Main orchestration file
├── Eureka/                     # Service Discovery
├── Gateway/                    # API Gateway with Security
├── LibraryService/            # Business Microservice
├── ServerConfig/              # Configuration Server
├── keycloak-23.0.0/          # Authentication Server
├── Education/                 # Angular Frontend
└── mongo-init/               # MongoDB initialization scripts
```

## Building the Services

### 1. Build Java Services

Build all Spring Boot services:

```bash
# Build Config Server
cd ServerConfig
mvn clean package -DskipTests
cd ..

# Build Eureka Server
cd Eureka
mvn clean package -DskipTests
cd ..

# Build Gateway
cd Gateway
mvn clean package -DskipTests
cd ..

# Build Library Service
cd LibraryService
mvn clean package -DskipTests
cd ..
```

### 2. Build Angular Frontend

```bash
cd Education
npm install
npm run build
cd ..
```

## Running the Application

### Start All Services

```bash
# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Start specific services
docker-compose up -d mongodb config-server eureka-server
```

### Service Startup Order

The services will start in the following order due to dependencies:

1. **MongoDB** - Database
2. **Config Server** - Configuration management
3. **Eureka Server** - Service discovery
4. **Keycloak** - Authentication
5. **Library Service** - Business service
6. **Gateway** - API Gateway
7. **Education Frontend** - Web application

## Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| Config Server | http://localhost:8889 | Configuration management |
| Eureka Server | http://localhost:8761 | Service registry dashboard |
| Keycloak Admin | http://localhost:8080 | Authentication admin console |
| API Gateway | http://localhost:8083 | Main API entry point |
| Library Service | http://localhost:8081 | Business service (via Gateway) |
| Education Frontend | http://localhost:4200 | Web application |
| MongoDB | mongodb://localhost:27017 | Database |

## Default Credentials

### Keycloak Admin Console
- **URL**: http://localhost:8080
- **Username**: admin
- **Password**: admin123

### MongoDB
- **Username**: root
- **Password**: rootpassword
- **Database**: librarydb

## Configuration

### Environment-Specific Configurations

The services use Spring profiles for environment-specific configurations:
- `docker` profile for containerized deployment
- Configuration files should be placed in `ServerConfig/config/`

### Keycloak Setup

1. Access Keycloak admin console: http://localhost:8080
2. Create a new realm or import the existing realm configuration
3. Configure clients for your services
4. Update the Gateway configuration with correct realm and client details

## Development

### Hot Reload Development

For development with hot reload:

```bash
# Run only infrastructure services
docker-compose up -d mongodb keycloak config-server eureka-server

# Run services locally
cd LibraryService && mvn spring-boot:run
cd Gateway && mvn spring-boot:run
cd Education && npm start
```

### Scaling Services

Scale specific services:

```bash
# Scale library service to 3 instances
docker-compose up -d --scale library-service=3
```

## Monitoring and Health Checks

All services include health checks accessible at:
- `http://service-url/actuator/health`

Monitor service status:

```bash
# Check service health
docker-compose ps

# View service logs
docker-compose logs [service-name]
```

## Troubleshooting

### Common Issues

1. **Services not starting**: Check if all JARs are built
2. **Database connection issues**: Ensure MongoDB is running
3. **Authentication issues**: Verify Keycloak configuration
4. **Service discovery issues**: Check Eureka server status

### Useful Commands

```bash
# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Rebuild specific service
docker-compose build [service-name]

# View resource usage
docker stats
```

## API Documentation

- **Library Service API**: http://localhost:8081/swagger-ui.html
- **Gateway Routes**: Check Eureka dashboard for registered services

## Security Notes

- All API calls should go through the Gateway (port 8083)
- Authentication is handled by Keycloak OAuth2/OIDC
- JWT tokens are validated by the Gateway
- Services behind the Gateway are protected by OAuth2 Resource Server

## Production Deployment

For production deployment:

1. Update environment variables for production values
2. Use proper secrets management
3. Configure SSL/TLS certificates
4. Set up monitoring and logging
5. Configure resource limits and scaling policies
