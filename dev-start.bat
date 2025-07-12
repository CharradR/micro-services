@echo off
echo Starting development environment...

echo.
echo =================================
echo Building all services with Docker...
echo =================================
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
if %ERRORLEVEL% neq 0 (
    echo Build failed!
    exit /b 1
)

echo.
echo =================================
echo Starting development environment...
echo =================================
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

echo.
echo =================================
echo Development environment started!
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
echo Development Features:
echo - Debug logging enabled
echo - Hot reload for Angular frontend
echo - Configuration files mounted for real-time changes
echo.
echo Use 'docker-compose logs -f [service-name]' to view logs
echo Use 'docker-compose down' to stop all services
echo.
