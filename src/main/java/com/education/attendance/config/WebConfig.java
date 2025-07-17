package com.education.attendance.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Appliquez la configuration CORS à tous les chemins commençant par /api/
                .allowedOrigins("http://localhost:5173") // Autorisez l'origine de votre frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Autorisez les méthodes HTTP nécessaires
                .allowedHeaders("*") // Autorisez tous les headers
                .allowCredentials(true); // Si vous utilisez des cookies ou des sessions (peut-être pas nécessaire ici)
    }
}

