@echo off
echo Starting Microservices Deployment...

echo.
echo =================================
echo Stopping any running containers...
echo =================================
docker-compose down

echo.
echo =================================
echo Building Docker images...
echo =================================
docker-compose build --no-cache
if %ERRORLEVEL% neq 0 (
    echo Failed to build Docker images
    exit /b 1
)

echo.
echo =================================
echo Starting all services...
echo =================================
docker-compose up -d

echo.
echo =================================
echo Waiting for services to be ready...
echo =================================
timeout /t 60 /nobreak

echo.
echo =================================
echo Deployment completed!
echo =================================
echo.
echo Service URLs:
echo - Config Server: http://localhost:8889
echo - Eureka Server: http://localhost:8761
echo - Keycloak Admin: http://localhost:8080 (admin/admin123)
echo - API Gateway: http://localhost:8083
echo - Library Service: http://localhost:8081
echo - Education Frontend: http://localhost:4200
echo.
echo Use 'docker-compose logs -f' to view logs
echo Use 'docker-compose ps' to check service status
echo.
