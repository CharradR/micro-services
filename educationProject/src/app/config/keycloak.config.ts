// Keycloak Configuration
export const KeycloakConfig = {
  // Keycloak server URL
  url: 'http://localhost:8080',

  // Realm name (update this to match your Keycloak realm)
  realm: 'microservices-realm',

  // Client ID for the Angular frontend (update this to match your Keycloak client)
  clientId: 'education-frontend',

  // Optional: Client secret (only needed for confidential clients)
  clientSecret: '',

  // API Gateway URL
  gatewayUrl: 'http://localhost:8083',

  // Enable automatic token refresh
  enableTokenRefresh: true,

  // Token refresh threshold (in seconds before expiry)
  refreshThreshold: 60,

  // Enable debug logging
  enableDebugLogging: true,

  // Default scope for token requests
  scope: 'openid profile email',

  // Response type for authorization code flow
  responseType: 'code',

  // PKCE (Proof Key for Code Exchange) enabled
  pkce: true
};

// API Endpoints Configuration
export const ApiConfig = {
  // Base API URL (through Gateway)
  baseUrl: 'http://localhost:8083/api',

  // Service specific endpoints
  endpoints: {
    courses: '/courses',
    teachers: '/teachers',
    books: '/books',
    library: '/library-service',
    users: '/users',
    auth: '/auth'
  },

  // Request timeout (milliseconds)
  timeout: 30000,

  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000
  }
};

// Environment-specific configurations
export const EnvironmentConfig = {
  production: false,
  apiUrl: ApiConfig.baseUrl,
  keycloakUrl: KeycloakConfig.url,
  enableLogging: true,
  enableMocks: false
};
