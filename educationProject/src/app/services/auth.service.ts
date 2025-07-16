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
        this.redirectAfterLogin();
      }
    });
  }
  private redirectAfterLogin() {
    if (this.hasRole('ADMIN')) {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.hasRole('STUDENT')) {
      this.router.navigate(['/student-dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }
  get allRoles(): string[] {
  const claims: any = this.oauthService.getIdentityClaims();
  if (!claims) {
    return [];
  }
  const realmRoles = claims.realm_access?.roles || [];
  const clientRoles = claims.resource_access?.['angular-client']?.roles || [];
  return [...realmRoles, ...clientRoles];
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

  // get userName(): string | null {
  //   const claims = this.oauthService.getIdentityClaims();
  //   return claims ? claims['preferred_username'] : null;
  // }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }
  // get roles(): string[] {
  //   const claims: any = this.oauthService.getIdentityClaims();
  //   if (!claims || !claims.realm_access) {
  //     return [];
  //   }
  //   return claims.realm_access.roles || [];
  // }
  get roles(): string[] {
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims || !claims.resource_access || !claims.resource_access['angular-client']) {
      return [];
    }

    return claims.resource_access['angular-client'].roles || [];
  }


  // get roles(): string[] {
  //   const claims: any = this.oauthService.getIdentityClaims();
  //   if (!claims || !claims.realm_access) {
  //     return [];
  //   }
  //   return claims.realm_access.roles || [];
  // }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

}