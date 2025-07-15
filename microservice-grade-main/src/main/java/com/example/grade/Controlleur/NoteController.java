package com.example.grade.Controlleur;

import com.example.grade.Entity.Note;
import com.example.grade.Services.Interface.IGradeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private final IGradeService iGradeService;

    public NoteController(IGradeService iGradeService) {
        this.iGradeService = iGradeService;
    }

    @PostMapping
    public ResponseEntity<Note> ajouterNote(@RequestBody Note note) {
        return ResponseEntity.ok(iGradeService.ajouterNote(note));
    }

    @GetMapping("/etudiant/{etudiantId}")
    public ResponseEntity<List<Note>> getNotesByEtudiant(@PathVariable Long etudiantId) {
        return ResponseEntity.ok(iGradeService.getNotesByEtudiant(etudiantId));
    }

    @GetMapping("/etudiant/{etudiantId}/moyenne")
    public ResponseEntity<Double> calculerMoyenne(@PathVariable Long etudiantId) {
        return ResponseEntity.ok(iGradeService.calculerMoyenne(etudiantId));
    }
}
