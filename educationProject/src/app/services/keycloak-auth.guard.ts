import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.keycloakService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Check for required roles if specified in route data
          const requiredRoles = route.data['roles'] as string[];
          if (requiredRoles && requiredRoles.length > 0) {
            const hasRequiredRole = requiredRoles.some(role => 
              this.keycloakService.hasRole(role)
            );
            
            if (!hasRequiredRole) {
              console.warn('Access denied: Required role not found');
              // You could redirect to an unauthorized page here
              return false;
            }
          }
          
          return true;
        } else {
          // Redirect to Keycloak login instead of local login page
          console.log('User not authenticated, redirecting to Keycloak...');
          this.keycloakService.login();
          return false;
        }
      })
    );
  }
}
