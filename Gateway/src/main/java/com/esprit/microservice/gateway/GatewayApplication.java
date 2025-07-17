package com.esprit.microservice.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@SpringBootApplication
public class GatewayApplication {

        public static void main(String[] args) {
                SpringApplication.run(GatewayApplication.class, args);
        }

        @Bean
        public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
                return builder.routes()
                                // Auth test route for JWT validation testing
                                .route("auth-test", r -> r.path("/auth-test")
                                                .uri("forward:/auth-test"))

                                // User Service routes
                                .route("user-service", r -> r.path("/api/users/**", "/api/auth/**")
                                                .uri("lb://user-service")) // Routes both users and auth to USER-SERVICE

                                // Library Service routes
                                .route("library-service", r -> r.path("/api/books/**", "/api/loans/**")
                                                .uri("lb://library-service")) // Routes books and loans to
                                                                              // library-service
                               .route("grade-service", r -> r.path("/api/notes/**", "/api/matieres/**")
                                .uri("lb://grade-service"))

                        .build();
        }

        @Bean
        public CorsWebFilter corsWebFilter() {
                CorsConfiguration corsConfig = new CorsConfiguration();

                // Allow all origins for development (more permissive)
                corsConfig.addAllowedOriginPattern("*");

                // Allow credentials
                corsConfig.setAllowCredentials(true);
                corsConfig.setMaxAge(3600L);

                // Allow all methods
                corsConfig.addAllowedMethod("*");

                // Allow all headers
                corsConfig.addAllowedHeader("*");

                // Expose important headers
                corsConfig.addExposedHeader("*");

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", corsConfig);

                return new CorsWebFilter(source);
        }
}
