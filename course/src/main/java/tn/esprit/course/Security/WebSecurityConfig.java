package tn.esprit.course.Security;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
//import tn.uptech.rh.enums.RoleRH;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
//@RequiredArgsConstructor
public class WebSecurityConfig {

    public static final String ADMIN = "client_admin";

    public static final String CANDIDAT = "client_Candidat";
    public static final String RESPONSABLE_RH = "client_ResponsableRH";
    public static final String EMPLOYEE = "client_user";
    private final JwtAuthConverter jwtAuthConverter;

    public WebSecurityConfig(JwtAuthConverter jwtAuthConverter) {
        this.jwtAuthConverter = jwtAuthConverter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests

                        .requestMatchers(HttpMethod.GET, "/api/job-offers/**").hasAnyRole(ADMIN)
                        .requestMatchers(HttpMethod.POST, "/api/candidatures/postuler/{jobOfferId}").hasAnyRole(CANDIDAT, ADMIN, RESPONSABLE_RH)

                        //   .requestMatchers(HttpMethod.POST, "/api/job-offers/**").hasRole(ADMIN)
                        .requestMatchers("/api/job-offers/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.POST, "/api/teams/**").hasRole(ADMIN)
                        .requestMatchers("/api/users/**").hasAnyRole(CANDIDAT, ADMIN, RESPONSABLE_RH)


                        .requestMatchers("/api/candidatures/**").hasAnyRole(ADMIN, RESPONSABLE_RH)

                        .requestMatchers("/api/interviews/**").hasAnyRole(ADMIN, RESPONSABLE_RH)

                        .requestMatchers(HttpMethod.GET, "/api/candidatures/postuler/**").hasRole(ADMIN) // Changed to hasAuthority


                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthConverter) // Custom JWT authentication converter
                        )
                )
                .sessionManagement(sess ->
                        sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Set session management to stateless
                )
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                        })
                );

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> {
            web.ignoring()
                    .requestMatchers("/v3/api-docs/**", "/configuration/**", "/swagger-ui/**",
                            "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/api-docs/**");
        };
    }


}
   /* @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                       .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
    }*/

//        @Configuration
//   @EnableWebSecurity
//    public class WebSecurityConfig {
//
////        @Bean
////        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////            http
////                    .cors(withDefaults()) // Enable CORS
////                    .authorizeHttpRequests(authorizeRequests -> authorizeRequests
////                            .requestMatchers("/admin/**").hasRole("ADMIN") // Only ADMIN can access /admin/** paths
////                            .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN") // Both USER and ADMIN can access /user/** paths
////                            .anyRequest().authenticated() // All other endpoints require authentication
////                    )
////                    .oauth2ResourceServer(oauth2 -> oauth2.jwt(
////                            jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())
////                    ))
////                    .exceptionHandling(exceptionHandling ->
////                            exceptionHandling.authenticationEntryPoint((request, response, authException) -> {
////                                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
////                            })
////                    );
////
////            return http.build();
////        }
////
////        @Bean
////        public WebSecurityCustomizer webSecurityCustomizer() {
////            return (web) -> {
////                web.ignoring()
////                        .requestMatchers("/v3/api-docs/**", "/configuration/**", "/swagger-ui/**",
////                                "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/api-docs/**");
////            };
////        }
////
////
////        private JwtAuthenticationConverter jwtAuthenticationConverter() {
////            JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
////            grantedAuthoritiesConverter.setAuthoritiesClaimName("roles"); // Extracts roles claim
////            grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_"); // Role prefix, e.g., "ROLE_ADMIN"
////
////            JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
////            jwtConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
////            return jwtConverter;
////        }
////
////
////        @Bean
////        public WebMvcConfigurer corsConfigurer() {
////            return new WebMvcConfigurer() {
////                @Override
////                public void addCorsMappings(CorsRegistry registry) {
////                    registry.addMapping("/**")
////                            .allowedOrigins("http://localhost:4200")
////                            .allowedMethods("*")
////                            .allowedHeaders("*");
////                }
////            };
////        }
////    }
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class WebSecurityConfig {
//
//
//
//    public static final String ADMIN = "client_admin";
//    public static final String Candidat = "client_Candidat";
//    public static final String GENERAL = "client_user";
// private final JwtAuthConverter jwtAuthConverter;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        return httpSecurity
//                .cors(withDefaults())
//                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
//                      //  .requestMatchers(HttpMethod.GET, "/test/anonymous", "/test/anonymous/**").permitAll()
//                       // .requestMatchers("/api/job-offers/**").permitAll()
//                        .requestMatchers("/api/job-offers/**").hasAnyRole(ADMIN,Candidat)
//                     //   .requestMatchers("/api/job-offers/**").hasRole(String.valueOf(RoleRH.client_Candidat))
//
//                      //  .requestMatchers(HttpMethod.POST, "/api/job-offers/**").permitAll()
//                        .requestMatchers( "/api/interviews/**").hasAnyRole(ADMIN,Candidat)
//
//                        .requestMatchers("/api/interviews/**").hasAnyRole(ADMIN,Candidat)
//
//                        //hasRole(String.valueOf(RoleRH.client_Candidat))
//                  //      .requestMatchers(HttpMethod.GET, "/api/job-offers").hasRole(String.valueOf(RoleRH.client_Candidat))
//
//                        .requestMatchers(HttpMethod.GET, "/test/user").hasAnyRole(GENERAL)
//                        .anyRequest().authenticated()
//                )
//                .oauth2ResourceServer(oauth2 -> oauth2
//                        .jwt(jwt -> jwt
//                                .jwtAuthenticationConverter(jwtAuthConverter)
//                        )
//                )
//                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .build();
//    }
//
//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        config.addAllowedOrigin("http://localhost:4200"); // Ajoutez ici votre origine autorisée
//        config.addAllowedMethod("*");
//        config.addAllowedHeader("*");
//        source.registerCorsConfiguration("/**", config);
//        return new CorsFilter(source);
//    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> {
//            web.ignoring()
//                    .requestMatchers("/v3/api-docs/**", "/configuration/**", "/swagger-ui/**",
//                            "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/api-docs/**");
//
//        };
//
//    }}