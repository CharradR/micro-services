# Keycloak OAuth2 Integration Guide

This guide explains how the updated Keycloak integration works with OAuth2/OIDC flow for automatic redirects to Keycloak authentication.

## 🔄 **How It Works Now**

### **OAuth2/OIDC Flow**
1. **User visits protected page** → Auth Guard checks authentication
2. **Not authenticated** → Automatically redirects to Keycloak login page
3. **User logs in at Keycloak** → Keycloak redirects back with authorization code
4. **Angular app exchanges code for tokens** → User is now authenticated
5. **All API requests** → Include JWT token automatically via interceptor

### **Key Changes Made**

1. **✅ OAuth2 Redirect Flow** - No more username/password forms
2. **✅ Automatic Keycloak Redirect** - Users go directly to Keycloak
3. **✅ Secure Token Exchange** - Authorization code flow with PKCE
4. **✅ Session Management** - Automatic token refresh and logout
5. **✅ State Validation** - CSRF protection with state parameter

## 🛠️ **Keycloak Configuration Required**

### **1. Create Realm**
- **Realm Name**: `LibraryKeyClock` (as per your config)
- **Display Name**: `Library Education Platform`

### **2. Create Client**
- **Client ID**: `frontend-client` (as per your config)
- **Client Type**: `OpenID Connect`
- **Access Type**: `public`
- **Standard Flow Enabled**: `ON`
- **Direct Access Grants**: `OFF` (more secure)
- **Valid Redirect URIs**: 
  ```
  http://localhost:4200/*
  http://localhost:4200
  ```
- **Web Origins**: 
  ```
  http://localhost:4200
  ```
- **Admin URL**: `http://localhost:4200`

### **3. Client Settings**
```json
{
  "clientId": "frontend-client",
  "enabled": true,
  "clientAuthenticatorType": "client-secret",
  "redirectUris": ["http://localhost:4200/*"],
  "webOrigins": ["http://localhost:4200"],
  "publicClient": true,
  "protocol": "openid-connect",
  "attributes": {
    "pkce.code.challenge.method": "S256"
  }
}
```

## 🔐 **Security Features**

### **1. PKCE (Proof Key for Code Exchange)**
- Protects against authorization code interception attacks
- Generates random code verifier and challenge

### **2. State Parameter**
- CSRF protection for OAuth2 flow
- Validates callback authenticity

### **3. Nonce Parameter**
- Replay attack protection
- Validates ID token authenticity

## 📱 **User Experience Flow**

### **Scenario 1: First Visit**
```
User visits /courses → Auth Guard → Redirect to Keycloak → Login → Redirect back → Access granted
```

### **Scenario 2: Returning User**
```
User visits /courses → Auth Guard → Check token → Valid → Access granted
```

### **Scenario 3: Expired Token**
```
API call → 401 error → Interceptor → Refresh token → Retry API call → Success
```

### **Scenario 4: Refresh Failed**
```
API call → 401 error → Interceptor → Refresh failed → Redirect to Keycloak
```

## 🚀 **Testing the Integration**

### **1. Test Authentication Flow**
```bash
# Start your services
docker-compose up -d

# Visit Angular app
http://localhost:4200

# Try to access protected route
http://localhost:4200/courses
```

**Expected behavior:**
- Automatically redirects to Keycloak login
- After login, redirects back to original page
- Token appears in localStorage
- API calls include Authorization header

### **2. Test Token Refresh**
```javascript
// In browser console, expire the token manually
localStorage.setItem('access_token', 'expired_token');

// Make an API call - should auto-refresh
fetch('http://localhost:8083/api/courses');
```

### **3. Test Logout**
```javascript
// Click logout button or call
keycloakService.logout().subscribe();
```

## 🔧 **Configuration Updates**

### **Update Keycloak Config** (`keycloak.config.ts`)
```typescript
export const KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'LibraryKeyClock',           // Your realm name
  clientId: 'frontend-client',        // Your client ID
  // ... other settings
};
```

### **Update API URLs** 
All API calls should go through the Gateway:
```typescript
// Courses API
http://localhost:8083/api/courses

// Books API  
http://localhost:8083/api/books

// Library Service
http://localhost:8083/api/library-service
```

## 🛡️ **Route Protection**

### **Protect Routes** (`app-routing.module.ts`)
```typescript
import { KeycloakAuthGuard } from './services/keycloak-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'courses', 
    component: CoursesComponent, 
    canActivate: [KeycloakAuthGuard] 
  },
  { 
    path: 'books', 
    component: BooksComponent, 
    canActivate: [KeycloakAuthGuard] 
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [KeycloakAuthGuard],
    data: { roles: ['admin'] }  // Role-based access
  }
];
```

## 🎯 **API Integration**

### **Automatic Token Injection**
```typescript
// This automatically includes JWT token
this.http.get<Course[]>('http://localhost:8083/api/courses')
  .subscribe(courses => {
    console.log('Courses:', courses);
  });
```

### **Manual Token Access**
```typescript
// Get current token
const token = this.keycloakService.getToken();

// Check authentication
if (this.keycloakService.isAuthenticated()) {
  // User is logged in
}

// Check roles
if (this.keycloakService.hasRole('admin')) {
  // User has admin role
}
```

## 🐛 **Troubleshooting**

### **1. Redirect Loop**
**Problem**: Endless redirects between Angular and Keycloak
**Solution**: 
- Check Valid Redirect URIs in Keycloak client
- Ensure Web Origins are set correctly
- Verify realm and client names match

### **2. CORS Errors**
**Problem**: CORS policy blocks requests
**Solution**: 
- Add `http://localhost:4200` to Web Origins in Keycloak
- Configure Gateway CORS settings
- Check Keycloak CORS settings

### **3. Token Not Included**
**Problem**: API requests missing Authorization header
**Solution**:
- Check browser network tab for Authorization header
- Verify token exists: `localStorage.getItem('access_token')`
- Check interceptor is registered in app.module.ts

### **4. Login Page Shows Instead of Redirect**
**Problem**: Shows Angular login page instead of Keycloak
**Solution**:
- Ensure AuthGuard calls `keycloakService.login()`
- Check login component calls OAuth2 flow
- Verify no manual routing to /login

## 📊 **Monitoring & Debugging**

### **Browser Console Logs**
```javascript
// Check authentication status
console.log('Authenticated:', keycloakService.isAuthenticated());

// Check token
console.log('Token:', localStorage.getItem('access_token'));

// Check user profile
keycloakService.userProfile$.subscribe(profile => 
  console.log('User:', profile)
);
```

### **Network Tab Inspection**
- **Authorization Header**: Should be present on API calls
- **Token Request**: Check `/protocol/openid-connect/token` calls
- **User Info**: Check `/protocol/openid-connect/userinfo` calls

## 🎉 **Summary**

The integration now provides:
- ✅ **Seamless OAuth2 flow** with automatic Keycloak redirects
- ✅ **No password handling** in Angular (more secure)
- ✅ **Automatic token management** with refresh
- ✅ **Route protection** with role-based access
- ✅ **CSRF protection** with state validation
- ✅ **Modern security standards** (PKCE, OAuth2, OIDC)

Users will now automatically be redirected to Keycloak for authentication, providing a more secure and user-friendly experience! 🚀
