package tn.uptech.rh.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
//    @Bean
//    @Qualifier("keycloakRestTemplate")
//    public RestTemplate keycloakRestTemplate() {
//        return new RestTemplate(); // No interceptor for Keycloak
//    }
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((request, body, execution) -> {
            // Récupérer le token JWT complet
            String authToken = "Bearer " + getAuthToken();
            request.getHeaders().add("Authorization", authToken);
            return execution.execute(request, body);
        });
        return restTemplate;
    }

    public String getAuthToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getCredentials() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getCredentials();
            return jwt.getTokenValue();  // Utilisez le token JWT complet
        }
        throw new IllegalStateException("Impossible de récupérer le token JWT depuis le contexte de sécurité.");
    }
}

