package com.example.grade.Services.Interface;

import com.example.grade.Entity.Note;

import java.util.List;

public interface IGradeService {
    Note ajouterNote(Note note);
    List<Note> getNotesByEtudiant(Long etudiantId);
    double calculerMoyenne(Long etudiantId);
    List<Note> getAllNotes(); // ➕ nouvelle méthode

}
