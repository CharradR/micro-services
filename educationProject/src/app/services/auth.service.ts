import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // constructor(private oauthService: OAuthService) {
  //   this.configure();
  // }
  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
  }

  // private configure() {
  //   this.oauthService.configure(authConfig);
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }

  private configure() {
    this.oauthService.configure(authConfig);

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        const claims: any = this.oauthService.getIdentityClaims();
        console.log('User claims:', claims);
        console.log('realm_access:', claims?.realm_access);
        console.log('resource_access:', claims?.resource_access);

        // Wait a bit for the token to be fully processed
        setTimeout(() => {
          this.redirectAfterLogin();
        }, 100);
      } else {
        console.log('No valid access token found');
      }
    }).catch(error => {
      console.error('Error during OAuth configuration:', error);
    });
  }


  private redirectAfterLogin() {
    if (this.hasRole('ROLE_ADMIN')) {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.hasRole('ROLE_STUDENT')) {
      this.router.navigate(['/student-dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }
  get clientRoles(): string[] {
    const token = this.oauthService.getAccessToken();
    if (!token) return [];

  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const clientId = this.oauthService.clientId || 'frontend-client';
    const roles = tokenPayload.resource_access?.[clientId]?.roles || [];
    console.log('Client roles for', clientId, ':', roles);
    return roles;
  } catch (e) {
    console.error('Error decoding token:', e);
    return [];
  }
}


//   get allRoles(): string[] {
//   const claims: any = this.oauthService.getIdentityClaims();
//   if (!claims) {
//     return [];
//   }
//   const realmRoles = claims.realm_access?.roles || [];
//   const clientRoles = claims.resource_access?.['frontend-client']?.roles || [];
//   return [...realmRoles, ...clientRoles];
// }
get allRoles(): string[] {
  const token = this.oauthService.getAccessToken();
  if (!token) {
    console.log('No access token found');
    return [];
  }

  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.log('Invalid token format');
      return [];
    }

    const payload = JSON.parse(atob(tokenParts[1]));

    const realmRoles = payload.realm_access?.roles || [];

    const clientId = this.oauthService.clientId || 'frontend-client';
    const clientRoles = payload.resource_access?.[clientId]?.roles || [];

    const allRoles = [...realmRoles, ...clientRoles];
    return allRoles;
  } catch (error) {
    console.error('Error parsing token for roles:', error);
    return [];
  }
}


  login() {
    this.oauthService.initCodeFlow();
  }
  get userName(): string | null {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims['preferred_username'] : null;
  }


  logout() {
    this.oauthService.logOut();
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  get roles(): string[] {
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims || !claims.resource_access || !claims.resource_access['frontend-client']) {
      return [];
    }

    return claims.resource_access['frontend-client'].roles || [];
  }



  hasRole(role: string): boolean {
    const userRoles = this.allRoles;
    console.log('Checking role:', role, 'against user roles:', userRoles);
    return userRoles.includes(role);
  }

}
