import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private keycloakService: KeycloakService) { }

  initializeApp(): Promise<void> {
    return new Promise<void>((resolve) => {
      console.log('Initializing Keycloak...');
      this.keycloakService.init();
      resolve();
    });
  }
}
