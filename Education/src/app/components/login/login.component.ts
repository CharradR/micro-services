import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { KeycloakService, UserProfile } from '../../services/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    // Initialize Keycloak service first
    this.keycloakService.init();

    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });

    // Check if already authenticated
    this.keycloakService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
      if (profile) {
        // Already logged in, redirect to home or return URL
        this.router.navigate([this.returnUrl]);
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
