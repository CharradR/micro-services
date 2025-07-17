package com.example.grade.Controlleur;

import com.example.grade.Entity.Matiere;
import com.example.grade.Services.Interface.MatiereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matieres")
@CrossOrigin(origins = "*")
public class MatiereController {

    private final MatiereService matiereService;

    @Autowired
    public MatiereController(MatiereService ms) {
        this.matiereService = ms;
    }

    // GET All
    @GetMapping
    public List<Matiere> getAllMatieres() {
        return matiereService.getAllMatieres();
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<Matiere> getMatiereById(@PathVariable Long id) {
        Matiere matiere = matiereService.getMatiereById(id);
        if (matiere != null) {
            return ResponseEntity.ok(matiere);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST
    @PostMapping
    public Matiere createMatiere(@RequestBody Matiere matiere) {
        return matiereService.saveMatiere(matiere);
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Matiere> updateMatiere(@PathVariable Long id, @RequestBody Matiere matiereDetails) {
        Matiere updatedMatiere = matiereService.updateMatiere(id, matiereDetails);
        if (updatedMatiere != null) {
            return ResponseEntity.ok(updatedMatiere);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatiere(@PathVariable Long id) {
        boolean deleted = matiereService.deleteMatiere(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

