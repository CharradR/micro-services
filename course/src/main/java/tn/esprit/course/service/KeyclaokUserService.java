package tn.esprit.course.service;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class KeyclaokUserService {

    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public KeyclaokUserService(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    public String getUserEmail(String userId) {
        UserRepresentation user = keycloak.realm(realm)
                .users()
                .get(userId)
                .toRepresentation();
        return user.getEmail();
    }
}
