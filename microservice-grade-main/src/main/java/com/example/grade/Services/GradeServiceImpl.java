package com.example.grade.Services;

import com.example.grade.Entity.Note;
import com.example.grade.Repository.MatiereRepository;
import com.example.grade.Repository.NoteRepository;
import com.example.grade.Services.Interface.IGradeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeServiceImpl implements IGradeService {
    private final NoteRepository noteRepository;
    private final MatiereRepository matiereRepository;

    public GradeServiceImpl(NoteRepository noteRepository, MatiereRepository matiereRepository) {
        this.noteRepository = noteRepository;
        this.matiereRepository = matiereRepository;
    }
    @Override
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }



    @Override
    public Note ajouterNote(Note note) {
        return noteRepository.save(note);
    }

    @Override
    public List<Note> getNotesByEtudiant(Long etudiantId) {
        return noteRepository.findByEtudiantId(etudiantId);
    }

    @Override
    public double calculerMoyenne(Long etudiantId) {
        List<Note> notes = noteRepository.findByEtudiantId(etudiantId);
        double somme = 0;
        double sommeCoefficients = 0;

        for (Note note : notes) {
            somme += note.getNote() * note.getMatiere().getCoefficient();
            sommeCoefficients += note.getMatiere().getCoefficient();
        }

        if (sommeCoefficients == 0) return 0;
        return somme / sommeCoefficients;
    }
}
