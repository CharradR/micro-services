import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  email: string;
  email_verified: boolean;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private config: KeycloakConfig = {
    url: 'http://localhost:8080',
    realm: 'LibraryKeyClock',
    clientId: 'frontend-client' // Update this to match your client
  };

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public token$ = this.tokenSubject.asObservable();
  public userProfile$ = this.userProfileSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTokenFromStorage();
    this.handleAuthCallback();
  }

  /**
   * Initialize the service and check for existing tokens or auth callback
   */
  init(): void {
    // Check if we're returning from Keycloak with auth code
    if (this.isAuthCallback()) {
      this.handleAuthCallback();
      return;
    }

    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.setToken(token);
      this.loadUserProfile();
    } else {
      this.clearToken();
    }
  }

  /**
   * Redirect to Keycloak login page (OAuth2/OIDC flow)
   */
  login(): void {
    const state = this.generateRandomString(32);
    const nonce = this.generateRandomString(32);

    // Store state and nonce for security validation
    sessionStorage.setItem('oauth_state', state);
    sessionStorage.setItem('oauth_nonce', nonce);
    sessionStorage.setItem('return_url', window.location.href);

    const authUrl = this.buildAuthUrl(state, nonce);

    console.log('Redirecting to Keycloak login:', authUrl);
    window.location.href = authUrl;
  }

  /**
   * Build authorization URL for OAuth2/OIDC flow
   */
  private buildAuthUrl(state: string, nonce: string): string {
    const params = new URLSearchParams({
      'client_id': this.config.clientId,
      'redirect_uri': this.getRedirectUri(),
      'state': state,
      'nonce': nonce,
      'response_type': 'code',
      'scope': 'openid profile email',
      'response_mode': 'query'
    });

    return `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/auth?${params.toString()}`;
  }

  /**
   * Get redirect URI for OAuth2 callback
   */
  private getRedirectUri(): string {
    const currentUrl = window.location.origin + window.location.pathname;
    return currentUrl;
  }

  /**
   * Check if current URL is an OAuth2 callback
   */
  private isAuthCallback(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('code') && urlParams.has('state');
  }

  /**
   * Handle OAuth2 callback and exchange code for tokens
   */
  private handleAuthCallback(): void {
    if (!this.isAuthCallback()) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = sessionStorage.getItem('oauth_state');

    // Validate state parameter for security
    if (!state || state !== storedState) {
      console.error('Invalid state parameter in OAuth callback');
      this.clearToken();
      return;
    }

    if (code) {
      this.exchangeCodeForTokens(code).subscribe({
        next: (success) => {
          if (success) {
            // Clean up URL and redirect to original page
            this.cleanupAuthCallback();
            this.redirectToOriginalPage();
          } else {
            console.error('Failed to exchange code for tokens');
            this.clearToken();
          }
        },
        error: (error) => {
          console.error('Error during token exchange:', error);
          this.clearToken();
        }
      });
    }
  }

  /**
   * Exchange authorization code for access tokens
   */
  private exchangeCodeForTokens(code: string): Observable<boolean> {
    const tokenUrl = `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/token`;

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', this.config.clientId);
    body.set('code', code);
    body.set('redirect_uri', this.getRedirectUri());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<TokenResponse>(tokenUrl, body.toString(), { headers }).pipe(
      map(response => {
        this.setToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
        this.loadUserProfile();
        return true;
      }),
      catchError(error => {
        console.error('Token exchange failed:', error);
        return of(false);
      })
    );
  }

  /**
   * Clean up OAuth callback parameters from URL
   */
  private cleanupAuthCallback(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('code');
    url.searchParams.delete('state');
    url.searchParams.delete('session_state');

    // Update URL without refreshing the page
    window.history.replaceState({}, document.title, url.toString());

    // Clean up session storage
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('oauth_nonce');
  }

  /**
   * Redirect to original page after authentication
   */
  private redirectToOriginalPage(): void {
    const returnUrl = sessionStorage.getItem('return_url');
    sessionStorage.removeItem('return_url');

    if (returnUrl && returnUrl !== window.location.href) {
      window.location.href = returnUrl;
    }
  }

  /**
   * Generate random string for state/nonce parameters
   */
  private generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Logout the user
   */
  logout(): Observable<boolean> {
    const logoutUrl = `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/logout`;

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearToken();
      return of(true);
    }

    const body = new URLSearchParams();
    body.set('client_id', this.config.clientId);
    body.set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(logoutUrl, body.toString(), { headers }).pipe(
      map(() => {
        this.clearToken();
        return true;
      }),
      catchError(error => {
        console.error('Logout failed:', error);
        this.clearToken(); // Clear token anyway
        return of(true);
      })
    );
  }

  /**
   * Refresh the access token
   */
  refreshToken(): Observable<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return of(false);
    }

    const tokenUrl = `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/token`;

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', this.config.clientId);
    body.set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<TokenResponse>(tokenUrl, body.toString(), { headers }).pipe(
      map(response => {
        this.setToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
        return true;
      }),
      catchError(error => {
        console.error('Token refresh failed:', error);
        this.clearToken();
        return of(false);
      })
    );
  }

  /**
   * Get the current access token
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Get the current refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (error) {
      return true;
    }
  }

  /**
   * Get user roles from token
   */
  // getUserRoles(): string[] {
  //   const token = this.getToken();
  //   if (!token) return [];

  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     return payload.realm_access?.roles || [];
  //   } catch (error) {
  //     return [];
  //   }
  // }
getUserRoles(): string[] {
  const token = this.getToken();
  if (!token) return [];

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Realm roles (optionnel)
    const realmRoles = payload.realm_access?.roles || [];

    // Client roles (important ici)
    const clientRoles = payload.resource_access?.[this.config.clientId]?.roles || [];

    // Fusionner les deux si nécessaire
    return [...realmRoles, ...clientRoles];
  } catch (error) {
    return [];
  }
}


  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  /**
   * Get user profile
   */
  getUserProfile(): UserProfile | null {
    return this.userProfileSubject.value;
  }

  /**
   * Load user profile from Keycloak
   */
  private loadUserProfile(): void {
    const userInfoUrl = `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/userinfo`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    this.http.get<UserProfile>(userInfoUrl, { headers }).pipe(
      map(profile => {
        const roles = this.getUserRoles();
        const userProfile: UserProfile = { ...profile, roles };
        this.userProfileSubject.next(userProfile);
        return userProfile;
      }),
      catchError(error => {
        console.error('Failed to load user profile:', error);
        return of(null);
      })
    ).subscribe();
  }

  /**
   * Set the access token
   */
  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Set the refresh token
   */
  private setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  /**
   * Clear all tokens and user data
   */
  private clearToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.tokenSubject.next(null);
    this.userProfileSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Load token from storage on service initialization
   */
  private loadTokenFromStorage(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.tokenSubject.next(token);
      this.isAuthenticatedSubject.next(true);
    }
  }
}
