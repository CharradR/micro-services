import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
constructor(public authService: AuthService) {}

get userRolesDisplay(): string {
  if (!this.authService.isLoggedIn || !this.authService.allRoles.length) {
    return 'No role';
  }
  
  // Filter roles that start with 'ROLE_' or just show all roles
  const roleRoles = this.authService.allRoles.filter(role => role.startsWith('ROLE_'));
  if (roleRoles.length > 0) {
    return roleRoles.join(', ');
  }
  
  // If no 'ROLE_' prefixed roles, show all roles
  return this.authService.allRoles.join(', ');
}

login() {
  this.authService.login();
}

logout() {
  this.authService.logout();
}

}
