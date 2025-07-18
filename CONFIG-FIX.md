# Config Server Health Check Fix

## Issue: "dependency failed to start: container config-server is unhealthy"

## Root Causes Fixed:
1. ✅ **Missing Actuator dependency** - Added to pom.xml
2. ✅ **Actuator endpoints not exposed** - Added to application.properties  
3. ✅ **Empty config directory** - Added configuration files
4. ✅ **Inadequate health check timing** - Increased retries and start_period

## What I Fixed:

### 1. Added Spring Boot Actuator to Config Server
**File**: `ServerConfig/pom.xml`
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### 2. Enabled Actuator Endpoints
**File**: `ServerConfig/src/main/resources/application.properties`
```properties
# Enable actuator endpoints for health check
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always
```

### 3. Created Configuration Files
**Files created**:
- `ServerConfig/config/application.properties`
- `ServerConfig/config/eureka-server.properties`
- `ServerConfig/config/gateway.properties`
- `ServerConfig/config/library-service.properties`

### 4. Improved Health Check Timing
**File**: `docker-compose.yml`
```yaml
healthcheck:
  test: ["CMD-SHELL", "curl -f http://localhost:8889/actuator/health || exit 1"]
  interval: 15s
  timeout: 10s
  retries: 10
  start_period: 30s
```

## How to Test:

### Option 1: Test Config Server alone
```cmd
troubleshoot-config.bat
```

### Option 2: Rebuild and restart everything
```cmd
docker-compose down
docker-compose build --no-cache config-server
docker-compose up -d
```

### Option 3: Check logs
```cmd
docker-compose logs config-server
```

## Expected Results:
- Config Server should start successfully on port 8889
- Health check at http://localhost:8889/actuator/health should return "UP"
- Other services should be able to connect to Config Server
- No more "unhealthy" errors

## If Still Failing:
1. Check if port 8889 is available: `netstat -an | findstr 8889`
2. Try starting without dependencies: Use `docker-compose.config-test.yml`
3. Check application logs: `docker-compose logs config-server`
