import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService, UserProfile } from './keycloak.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {
    this.initialize();
  }

  private initialize(): void {
    // Don't initialize Keycloak here - it's handled by APP_INITIALIZER
    // Just subscribe to authentication state changes
    this.keycloakService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        console.log('User authenticated, checking roles for redirection...');
        // Small delay to ensure user profile is loaded
        setTimeout(() => {
          this.redirectAfterLogin();
        }, 100);
      }
    });
  }


  private redirectAfterLogin() {
    console.log('All roles:', this.allRoles);
    console.log('Client roles:', this.clientRoles);
    console.log('Keycloak roles:', this.keycloakService.getUserRoles());

    if (this.hasRole('ROLE_ADMIN')) {
      console.log('Redirecting to admin dashboard');
      this.router.navigate(['/admin-dashboard']);
    } else if (this.hasRole('ROLE_STUDENT')) {
      console.log('Redirecting to student dashboard');
      this.router.navigate(['/student-dashboard']);
    } else {
      console.log('Redirecting to home');
      this.router.navigate(['/home']);
    }
  }
  get clientRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  get allRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  login() {
    this.keycloakService.login();
  }

  get userName(): string | null {
    const profile = this.keycloakService.getUserProfile();
    return profile ? (profile.preferred_username || null) : null;
  }

  logout(): void {
    this.keycloakService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.error('Logout error:', error);
        this.router.navigate(['/home']);
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.keycloakService.isAuthenticated();
  }

  get accessToken(): string {
    return this.keycloakService.getToken() || '';
  }

  get roles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  hasRole(role: string): boolean {
    const userRoles = this.keycloakService.getUserRoles();
    console.log('Checking role:', role, 'against user roles:', userRoles);
    return userRoles.includes(role);
  }

  // Additional convenience methods
  getUserProfile(): UserProfile | null {
    return this.keycloakService.getUserProfile();
  }

  refreshToken(): Observable<boolean> {
    return this.keycloakService.refreshToken();
  }

  isTokenExpired(): boolean {
    const token = this.keycloakService.getToken();
    return token ? this.keycloakService.isTokenExpired(token) : true;
  }
}
