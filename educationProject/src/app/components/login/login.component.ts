import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { KeycloakService, UserProfile } from '../../services/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  userProfile: UserProfile | null = null;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private keycloakService: KeycloakService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    // Don't initialize Keycloak here - it's handled by APP_INITIALIZER

    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });

    // Check if already authenticated
    if (this.keycloakService.isAuthenticated()) {
      this.userProfile = this.keycloakService.getUserProfile();
      console.log('User already authenticated:', this.userProfile);
    }

    // Subscribe to authentication state changes
    this.keycloakService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.userProfile = this.keycloakService.getUserProfile();
        console.log('User authenticated:', this.userProfile);
      } else {
        this.userProfile = null;
      }
    });
  }

  /**
   * Login using Keycloak OAuth2 flow (redirect to Keycloak)
   */
  login() {
    console.log('Redirecting to Keycloak login...');
    this.keycloakService.login();
  }

  /**
   * Alternative: Manual login (for testing only - not recommended for production)
   */
  manualLogin() {
    console.log("Manual login attempted - redirecting to OAuth flow instead");
    this.login();
  }

  signup() {
    console.log("Here Object Signup", this.loginForm.value);
    // You can add signup logic here or navigate to signup page
    this.router.navigate(['/signup']);
  }

  logout() {
    this.keycloakService.logout().subscribe(() => {
      this.userProfile = null;
      this.loginForm.reset();
    });
  }
}
