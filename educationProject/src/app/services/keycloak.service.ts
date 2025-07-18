import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Keycloak from 'keycloak-js';

export interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  preferred_username?: string;
  name?: string;
  roles?: string[];
  email_verified?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak = new Keycloak({
    url: 'http://localhost:8084',
    realm: 'LibraryKeyClock',
    clientId: 'frontend-client',
  });

  private _isInitialized = false;
  private _authenticationSubject = new BehaviorSubject<boolean>(false);

  // Observable for authentication state changes
  public readonly isAuthenticated$ = this._authenticationSubject.asObservable();

  init(): Promise<boolean> {
    // Prevent multiple initializations
    if (this._isInitialized) {
      console.log('Keycloak already initialized, returning current state');
      return Promise.resolve(this.isAuthenticated());
    }

    return this.keycloak
      .init({
        onLoad: 'check-sso', // Changed from 'login-required' to prevent infinite redirects
        checkLoginIframe: false,
        enableLogging: true
        // Removed silentCheckSsoRedirectUri to prevent routing conflicts
      })
      .then((authenticated) => {
        this._isInitialized = true;
        this._authenticationSubject.next(authenticated);
        console.log(
          'Keycloak initialized successfully. Authenticated:',
          authenticated
        );
        if (authenticated) {
          console.log(
            'Keycloak token:',
            this.keycloak.token?.substring(0, 50) + '...'
          );
        } else {
          console.log('User not authenticated - manual login required');
        }
        return authenticated;
      })
      .catch((err) => {
        console.error('Keycloak init failed', err);
        console.error('Realm:', 'LibraryKeyClock');
        console.error('Client ID:', 'frontend-client');
        this._isInitialized = true; // Still mark as initialized to prevent retries
        this._authenticationSubject.next(false);
        return false;
      });
  }

  getToken(): string | undefined {
    if (!this._isInitialized) {
      console.warn('Keycloak not initialized yet');
      return undefined;
    }
    return this.keycloak?.token;
  }

  isAuthenticated(): boolean {
    return this._isInitialized && !!this.keycloak?.authenticated;
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.keycloak.logout().then(() => {
        this._authenticationSubject.next(false);
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  register(): Promise<void> {
    return this.keycloak.register();
  }

  updateToken(minValidity?: number): Promise<boolean> {
    return this.keycloak.updateToken(minValidity || 30);
  }

  getUsername(): string | undefined {
    return this.keycloak?.tokenParsed?.['preferred_username'];
  }

  getUserRoles(): string[] {
    return this.keycloak?.tokenParsed?.['realm_access']?.['roles'] || [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  getTokenParsed(): any {
    return this.keycloak?.tokenParsed;
  }

  getUserProfile(): UserProfile | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    const tokenParsed = this.getTokenParsed();
    if (!tokenParsed) {
      return null;
    }

    return {
      id: tokenParsed.sub,
      username: tokenParsed.preferred_username,
      email: tokenParsed.email,
      firstName: tokenParsed.given_name,
      lastName: tokenParsed.family_name,
      preferred_username: tokenParsed.preferred_username,
      name: tokenParsed.name || `${tokenParsed.given_name || ''} ${tokenParsed.family_name || ''}`.trim(),
      roles: this.getUserRoles(),
      email_verified: tokenParsed.email_verified
    };
  }

  refreshToken(minValidity?: number): Observable<boolean> {
    return new Observable(observer => {
      this.updateToken(minValidity).then(refreshed => {
        observer.next(refreshed);
        observer.complete();
      }).catch(error => {
        console.error('Token refresh failed:', error);
        observer.next(false);
        observer.complete();
      });
    });
  }

  isTokenExpired(token?: string): boolean {
    if (!this._isInitialized) {
      return true;
    }
    return this.keycloak.isTokenExpired();
  }

  getRefreshToken(): string | undefined {
    return this.keycloak?.refreshToken;
  }
}
