@echo off
echo Building all microservices with Docker...

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
echo All services built successfully!
echo =================================
echo.
echo You can now run: docker-compose up -d
echo.
