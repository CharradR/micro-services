# Keycloak Integration for Education Angular App

This guide explains how to set up and use Keycloak authentication in your Angular Education application.

## 🚀 Features Added

### 1. **Keycloak Service** (`keycloak.service.ts`)
- ✅ Login with username/password
- ✅ Automatic token refresh
- ✅ User profile management
- ✅ Role-based access control
- ✅ Logout functionality
- ✅ Token expiration checking

### 2. **Keycloak Interceptor** (`keycloak.interceptor.ts`)
- ✅ Automatically adds JWT tokens to HTTP requests
- ✅ Handles 401 errors with token refresh
- ✅ Excludes Keycloak auth endpoints from token injection
- ✅ Automatic redirect to login on session expiry

### 3. **Auth Guard** (`keycloak-auth.guard.ts`)
- ✅ Protects routes that require authentication
- ✅ Role-based route protection
- ✅ Automatic redirect to login page

### 4. **Updated Login Component**
- ✅ Integrated with Keycloak authentication
- ✅ Shows user profile when logged in
- ✅ Error handling and loading states

## 🔧 Setup Instructions

### 1. **Configure Keycloak Server**

Update the configuration in `src/app/config/keycloak.config.ts`:

```typescript
export const KeycloakConfig = {
  url: 'http://localhost:8080',           // Your Keycloak server
  realm: 'microservices-realm',           // Your realm name
  clientId: 'education-frontend',         // Your client ID
  // ... other settings
};
```

### 2. **Create Keycloak Realm and Client**

1. **Access Keycloak Admin Console**: http://localhost:8080
   - Username: `admin`
   - Password: `admin123`

2. **Create Realm**:
   - Go to "Add realm"
   - Name: `microservices-realm`
   - Click "Create"

3. **Create Client**:
   - Go to "Clients" → "Create"
   - Client ID: `education-frontend`
   - Client Protocol: `openid-connect`
   - Access Type: `public`
   - Valid Redirect URIs: `http://localhost:4200/*`
   - Web Origins: `http://localhost:4200`

4. **Create Users**:
   - Go to "Users" → "Add user"
   - Create test users with credentials

5. **Create Roles** (optional):
   - Go to "Roles" → "Add Role"
   - Create roles like: `admin`, `user`, `course-manager`

### 3. **Update Angular App Module**

The `app.module.ts` has been updated to include:
```typescript
providers: [
  KeycloakService,
  KeycloakAuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: KeycloakInterceptor,
    multi: true
  }
]
```

## 📝 Usage Examples

### 1. **Protect Routes with Authentication**

Update `app-routing.module.ts`:
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
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [KeycloakAuthGuard],
    data: { roles: ['admin'] }  // Require admin role
  }
];
```

### 2. **Use in Components**

```typescript
import { KeycloakService } from '../services/keycloak.service';

export class SomeComponent {
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    // Check if user is authenticated
    this.keycloakService.isAuthenticated$.subscribe(isAuth => {
      console.log('Is authenticated:', isAuth);
    });

    // Get user profile
    this.keycloakService.userProfile$.subscribe(profile => {
      if (profile) {
        console.log('User:', profile.name, 'Email:', profile.email);
      }
    });

    // Check user roles
    if (this.keycloakService.hasRole('admin')) {
      console.log('User is admin');
    }
  }

  logout() {
    this.keycloakService.logout().subscribe();
  }
}
```

### 3. **Use in Services (HTTP Requests)**

The Keycloak interceptor automatically adds tokens to HTTP requests:

```typescript
// This will automatically include the JWT token
this.http.get<Course[]>('http://localhost:8083/api/courses')
  .subscribe(courses => {
    console.log('Courses:', courses);
  });
```

### 4. **Manual Token Usage**

```typescript
// Get current token
const token = this.keycloakService.getToken();

// Add custom headers
const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`,
  'Custom-Header': 'value'
});

this.http.get(url, { headers }).subscribe();
```

## 🔒 Security Features

### 1. **Automatic Token Management**
- Tokens are stored in localStorage
- Automatic refresh before expiration
- Automatic logout on token failure

### 2. **Request Interception**
- All HTTP requests automatically include JWT tokens
- Excludes Keycloak authentication endpoints
- Handles 401 errors with token refresh

### 3. **Role-Based Access**
- Check user roles: `keycloakService.hasRole('admin')`
- Protect routes with role requirements
- Fine-grained permission control

## 🚦 API Gateway Integration

Your requests will go through the API Gateway:
```
Angular App → API Gateway (8083) → Microservices
            ↑
        JWT Token validated here
```

### Gateway Routes Example:
- **Courses**: `http://localhost:8083/api/courses`
- **Books**: `http://localhost:8083/api/books`
- **Library**: `http://localhost:8083/api/library-service`

## 🔍 Troubleshooting

### 1. **CORS Issues**
Make sure Keycloak and Gateway are configured for CORS:
```
Valid Redirect URIs: http://localhost:4200/*
Web Origins: http://localhost:4200
```

### 2. **Token Not Added to Requests**
Check browser network tab to verify:
- Request has `Authorization: Bearer <token>` header
- Token is not expired
- URL is not a Keycloak auth endpoint

### 3. **Login Fails**
- Verify Keycloak server is running on port 8080
- Check realm and client configuration
- Verify user credentials are correct

### 4. **Automatic Redirect Issues**
- Check routes configuration
- Verify AuthGuard is properly imported
- Update return URL handling

## 📚 Available Methods

### Keycloak Service Methods:
- `login(username, password)` - Login user
- `logout()` - Logout user
- `refreshToken()` - Refresh access token
- `isAuthenticated()` - Check authentication status
- `getToken()` - Get current access token
- `getUserProfile()` - Get user profile
- `hasRole(role)` - Check if user has specific role
- `getUserRoles()` - Get all user roles

### Service Properties:
- `token$` - Observable of current token
- `userProfile$` - Observable of user profile
- `isAuthenticated$` - Observable of authentication status

## 🎯 Next Steps

1. **Test Authentication**: Try logging in with Keycloak users
2. **Protect Routes**: Add AuthGuard to sensitive routes
3. **Role Management**: Implement role-based features
4. **Error Handling**: Add proper error handling for auth failures
5. **Loading States**: Add loading indicators during authentication

The Keycloak integration is now ready to use! 🎉
