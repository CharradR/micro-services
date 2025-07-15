package com.example.grade.client;

import com.example.grade.Entity.EtudiantDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service") // Le nom du microservice User (à vérifier dans l'autre projet)
public interface EtudiantClient {

    @GetMapping("/etudiants/{id}") // Endpoint de l'autre microservice
    EtudiantDTO getEtudiantById(@PathVariable Long id);
}
