package com.example.user.controllers;

import com.example.user.dtos.ErrorResponse;
import com.example.user.dtos.JwtResponse;
import com.example.user.dtos.LoginRequest;
import com.example.user.dtos.SignupRequest;
import com.example.user.models.ERole;
import com.example.user.models.Role;
import com.example.user.models.User;
import com.example.user.repositories.RoleRepository;
import com.example.user.repositories.UserRepository;
import com.example.user.security.jwt.JwtUtils;
import com.example.user.services.LoginAttemptService;
import com.example.user.services.PasswordValidationService;
import com.example.user.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
        @Autowired
        AuthenticationManager authenticationManager;

        @Autowired
        UserRepository userRepository;

        @Autowired
        RoleRepository roleRepository;

        @Autowired
        PasswordEncoder encoder;

        @Autowired
        JwtUtils jwtUtils;

        @Autowired
        private PasswordValidationService passwordValidationService;

        @Autowired
        private LoginAttemptService loginAttemptService;

        @PostMapping("/signin")
        public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
                String username = loginRequest.getUsername();

                System.out.println("=== Authentication Debug Info ===");
                System.out.println("Attempting to authenticate user: " + username);
                System.out.println("Password provided: "
                                + (loginRequest.getPassword() != null ? "[PASSWORD PROVIDED]" : "[NO PASSWORD]"));

                // Check if user exists in database
                Optional<User> userOpt = userRepository.findByUsername(username);
                if (userOpt.isEmpty()) {
                        System.out.println("ERROR: User not found in database: " + username);
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                        .body(new ErrorResponse(
                                                        "Authentication failed",
                                                        "Invalid username or password",
                                                        Map.of("debug", "User not found")));
                }

                User user = userOpt.get();
                System.out.println("User found in database:");
                System.out.println("- ID: " + user.getId());
                System.out.println("- Username: " + user.getUsername());
                System.out.println("- Email: " + user.getEmail());
                System.out.println(
                                "- Password hash starts with: "
                                                + (user.getPassword() != null
                                                                ? user.getPassword().substring(0,
                                                                                Math.min(10, user.getPassword()
                                                                                                .length()))
                                                                                + "..."
                                                                : "NULL"));
                System.out.println("- Roles count: " + (user.getRoles() != null ? user.getRoles().size() : 0));

                // Check if account is locked
                if (loginAttemptService.isBlocked(username)) {
                        long remainingTime = loginAttemptService.getLockTimeRemaining(username);
                        System.out.println("Account is locked for user: " + username);
                        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                                        .body(new ErrorResponse(
                                                        "Account locked",
                                                        "Too many failed attempts",
                                                        Map.of(
                                                                        "remaining_time_minutes",
                                                                        TimeUnit.MILLISECONDS.toMinutes(remainingTime),
                                                                        "unlock_time",
                                                                        new Date(System.currentTimeMillis()
                                                                                        + remainingTime))));
                }

                // Test password encoding
                String rawPassword = loginRequest.getPassword();
                boolean passwordMatches = encoder.matches(rawPassword, user.getPassword());
                System.out.println("Password validation:");
                System.out.println("- Raw password length: " + rawPassword.length());
                System.out.println("- Encoded password length: " + user.getPassword().length());
                System.out.println("- Password matches: " + passwordMatches);

                try {
                        System.out.println("Attempting Spring Security authentication...");
                        Authentication authentication = authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(
                                                        loginRequest.getUsername(),
                                                        loginRequest.getPassword()));

                        System.out.println("Authentication successful!");
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        String jwt = jwtUtils.generateJwtToken(authentication);

                        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                        List<String> roles = userDetails.getAuthorities().stream()
                                        .map(GrantedAuthority::getAuthority)
                                        .collect(Collectors.toList());

                        System.out.println("JWT generated, user roles: " + roles);
                        loginAttemptService.loginSucceeded(username);
                        return ResponseEntity.ok(new JwtResponse(
                                        jwt,
                                        userDetails.getId(),
                                        userDetails.getUsername(),
                                        userDetails.getEmail(),
                                        roles));
                } catch (Exception e) {
                        System.out.println("Authentication failed with exception: " + e.getClass().getSimpleName());
                        System.out.println("Exception message: " + e.getMessage());
                        e.printStackTrace();

                        loginAttemptService.loginFailed(username);
                        int remainingAttempts = loginAttemptService.getRemainingAttempts(username);

                        ErrorResponse errorResponse;
                        if (remainingAttempts > 0) {
                                errorResponse = new ErrorResponse(
                                                "Authentication failed",
                                                "Invalid username or password",
                                                Map.of(
                                                                "remaining_attempts", remainingAttempts,
                                                                "debug_info", Map.of(
                                                                                "user_exists", true,
                                                                                "password_matches", passwordMatches,
                                                                                "exception",
                                                                                e.getClass().getSimpleName(),
                                                                                "message", e.getMessage())));
                        } else {
                                errorResponse = new ErrorResponse(
                                                "Account locked",
                                                "Too many failed attempts",
                                                Map.of(
                                                                "lock_duration_minutes",
                                                                TimeUnit.MILLISECONDS.toMinutes(
                                                                                LoginAttemptService.LOCK_TIME_DURATION)));
                        }

                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                        .body(errorResponse);
                }
        }

        @PostMapping("/signup")
        public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest,
                        BindingResult bindingResult) {
                // Validate username
                if (signUpRequest.getPassword().length() < 6 || signUpRequest.getPassword().length() > 40) {
                        bindingResult.rejectValue("password", "size",
                                        "Password must be between 6-40 characters");
                }

                // Check for any validation errors
                if (bindingResult.hasErrors()) {
                        Map<String, String> errors = new HashMap<>();
                        bindingResult.getFieldErrors().forEach(error -> {
                                errors.put(error.getField(), error.getDefaultMessage());
                        });
                        return ResponseEntity.badRequest().body(errors);
                }

                // Rest of your existing logic
                if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                        return ResponseEntity.badRequest()
                                        .body("Error: Username is already taken!");
                }

                if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                        return ResponseEntity.badRequest()
                                        .body("Error: Email is already in use!");
                }

                if (!passwordValidationService.validatePassword(signUpRequest.getPassword())) {
                        return ResponseEntity.badRequest()
                                        .body("Error: " + passwordValidationService.getPasswordRequirements());
                }
                try {
                        // Create new user's account
                        User user = new User(
                                        signUpRequest.getUsername(),
                                        signUpRequest.getEmail(),
                                        encoder.encode(signUpRequest.getPassword()));

                        // Set roles
                        Set<Role> roles = new HashSet<>();
                        Set<String> strRoles = signUpRequest.getRoles();

                        if (strRoles == null || strRoles.isEmpty()) {
                                roles.add(roleRepository.findByName(ERole.ROLE_USER)
                                                .orElseThrow(() -> new RuntimeException("ROLE_USER not found")));
                        } else {
                                strRoles.forEach(role -> {
                                        switch (role.toLowerCase()) {
                                                case "admin":
                                                        roles.add(roleRepository.findByName(ERole.ROLE_ADMIN)
                                                                        .orElseThrow(() -> new RuntimeException(
                                                                                        "ROLE_ADMIN not found")));
                                                        break;
                                                case "user":
                                                        roles.add(roleRepository.findByName(ERole.ROLE_USER)
                                                                        .orElseThrow(() -> new RuntimeException(
                                                                                        "ROLE_USER not found")));
                                                        break;
                                                default:
                                                        throw new RuntimeException("Unsupported role: " + role);
                                        }
                                });
                        }

                        user.setRoles(roles);
                        User savedUser = userRepository.save(user);

                        return ResponseEntity.ok(Map.of(
                                        "status", "SUCCESS",
                                        "message", "User registered successfully",
                                        "userId", savedUser.getId()));

                } catch (Exception ex) {
                        return ResponseEntity
                                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body(Map.of(
                                                        "error", "REGISTRATION_FAILED",
                                                        "message", "An error occurred during registration",
                                                        "details", ex.getMessage()));
                }
        }

        // Debug endpoint to check if users exist and create a test user
        @GetMapping("/debug/users")
        public ResponseEntity<?> debugUsers() {
                List<User> allUsers = userRepository.findAll();
                Map<String, Object> debugInfo = new HashMap<>();

                debugInfo.put("total_users", allUsers.size());
                debugInfo.put("users", allUsers.stream().map(user -> Map.of(
                                "id", user.getId(),
                                "username", user.getUsername(),
                                "email", user.getEmail(),
                                "password_hash_length", user.getPassword() != null ? user.getPassword().length() : 0,
                                "roles", user.getRoles().stream().map(role -> role.getName().name())
                                                .collect(Collectors.toList())))
                                .collect(Collectors.toList()));

                return ResponseEntity.ok(debugInfo);
        }

        // Create a test user for debugging
        @PostMapping("/debug/create-test-user")
        public ResponseEntity<?> createTestUser() {
                String username = "testuser";
                String email = "test@example.com";
                String password = "password123";

                if (userRepository.existsByUsername(username)) {
                        return ResponseEntity.badRequest().body("Test user already exists");
                }

                try {
                        User user = new User(username, email, encoder.encode(password));

                        Set<Role> roles = new HashSet<>();
                        roles.add(roleRepository.findByName(ERole.ROLE_USER)
                                        .orElseThrow(() -> new RuntimeException("ROLE_USER not found")));

                        user.setRoles(roles);
                        User savedUser = userRepository.save(user);

                        return ResponseEntity.ok(Map.of(
                                        "message", "Test user created successfully",
                                        "username", username,
                                        "password", password,
                                        "user_id", savedUser.getId(),
                                        "encoded_password_length", savedUser.getPassword().length()));
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body(Map.of("error", e.getMessage()));
                }
        }

        // Test endpoint to debug password encoding
        @PostMapping("/debug/test-password")
        public ResponseEntity<?> testPassword(@RequestBody Map<String, String> request) {
                String username = request.get("username");
                String password = request.get("password");

                Optional<User> userOpt = userRepository.findByUsername(username);
                if (userOpt.isEmpty()) {
                        return ResponseEntity.badRequest().body("User not found");
                }

                User user = userOpt.get();
                boolean matches = encoder.matches(password, user.getPassword());

                return ResponseEntity.ok(Map.of(
                                "username", username,
                                "password_provided", password,
                                "password_hash", user.getPassword(),
                                "password_matches", matches,
                                "encoder_class", encoder.getClass().getSimpleName()));
        }
}