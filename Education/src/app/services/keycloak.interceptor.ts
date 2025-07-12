import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add token to request if available and not a Keycloak request
    if (this.shouldAddToken(request)) {
      request = this.addTokenToRequest(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401 && this.shouldRetryWithRefresh(request)) {
          return this.handle401Error(request, next);
        }
        
        return throwError(error);
      })
    );
  }

  /**
   * Check if we should add token to this request
   */
  private shouldAddToken(request: HttpRequest<any>): boolean {
    const token = this.keycloakService.getToken();
    
    // Don't add token if:
    // 1. No token available
    // 2. Request is to Keycloak auth endpoints (to avoid circular calls)
    // 3. Request already has Authorization header
    if (!token || 
        this.isKeycloakAuthRequest(request) ||
        request.headers.has('Authorization')) {
      return false;
    }

    return true;
  }

  /**
   * Check if request is to Keycloak authentication endpoints
   */
  private isKeycloakAuthRequest(request: HttpRequest<any>): boolean {
    const keycloakAuthPaths = [
      '/protocol/openid-connect/token',
      '/protocol/openid-connect/logout',
      '/protocol/openid-connect/userinfo'
    ];
    
    return keycloakAuthPaths.some(path => request.url.includes(path));
  }

  /**
   * Check if we should retry the request with token refresh
   */
  private shouldRetryWithRefresh(request: HttpRequest<any>): boolean {
    // Don't retry Keycloak auth requests
    return !this.isKeycloakAuthRequest(request) && 
           this.keycloakService.getRefreshToken() !== null;
  }

  /**
   * Add authorization token to request
   */
  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.keycloakService.getToken();
    
    if (token) {
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    
    return request;
  }

  /**
   * Handle 401 errors by refreshing token and retrying request
   */
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.keycloakService.refreshToken().pipe(
        switchMap((success: boolean) => {
          this.isRefreshing = false;
          
          if (success) {
            // Token refreshed successfully, retry the original request
            this.refreshTokenSubject.next(this.keycloakService.getToken());
            return next.handle(this.addTokenToRequest(request));
          } else {
            // Token refresh failed, redirect to login
            this.redirectToLogin();
            return throwError('Token refresh failed');
          }
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.redirectToLogin();
          return throwError(error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      // If already refreshing, wait for the new token
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => next.handle(this.addTokenToRequest(request)))
      );
    }
  }

  /**
   * Redirect to login page
   */
  private redirectToLogin(): void {
    // Clear tokens
    this.keycloakService.logout().subscribe();
    
    // Redirect to Keycloak login page instead of local login
    console.warn('Session expired. Redirecting to Keycloak login...');
    
    // Use Keycloak OAuth2 flow
    this.keycloakService.login();
  }
}
