@echo off
echo Troubleshooting Config Server...

echo.
echo =================================
echo Testing Config Server standalone...
echo =================================

echo Stopping any running containers...
docker-compose down

echo Building Config Server...
docker-compose -f docker-compose.config-test.yml build --no-cache

echo Starting Config Server standalone...
docker-compose -f docker-compose.config-test.yml up -d

echo.
echo Waiting for Config Server to start...
timeout /t 60 /nobreak

echo.
echo =================================
echo Checking Config Server status...
echo =================================
docker-compose -f docker-compose.config-test.yml ps
docker-compose -f docker-compose.config-test.yml logs config-server

echo.
echo =================================
echo Testing Config Server endpoints...
echo =================================
echo Testing: http://localhost:8889/actuator/health
curl -f http://localhost:8889/actuator/health

echo.
echo Testing: http://localhost:8889/actuator/info
curl -f http://localhost:8889/actuator/info

echo.
echo =================================
echo Config Server troubleshooting complete!
echo =================================
