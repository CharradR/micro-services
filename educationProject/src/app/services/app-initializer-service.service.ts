import { Injectable } from '@angular/core';
import { KeycloakService } from '../services/keycloak.service';

@Injectable()
export class AppInitializer {
  constructor(private keycloakService: KeycloakService) {}

  /**
   * Initialize the application by checking authentication status
   */
  init(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // Initialize Keycloak service
        this.keycloakService.init();
        
        // Check if user is authenticated
        this.keycloakService.isAuthenticated$.subscribe(isAuthenticated => {
          console.log('App initialization - User authenticated:', isAuthenticated);
          resolve(true);
        });
      } catch (error) {
        console.error('Error during app initialization:', error);
        resolve(true); // Continue anyway
      }
    });
  }
}
