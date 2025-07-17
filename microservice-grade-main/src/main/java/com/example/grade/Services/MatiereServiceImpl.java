package com.example.grade.Services;

import com.example.grade.Entity.Matiere;
import com.example.grade.Repository.MatiereRepository;
import com.example.grade.Repository.NoteRepository;
import com.example.grade.Services.Interface.MatiereService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class MatiereServiceImpl  implements MatiereService {
    private final NoteRepository noteRepository;

    private final MatiereRepository matiereRepository;
    public MatiereServiceImpl(NoteRepository noteRepository, MatiereRepository matiereRepository) {
        this.noteRepository = noteRepository;
        this.matiereRepository = matiereRepository;
    }


    @Override
    public List<Matiere> getAllMatieres() {
        return matiereRepository.findAll();
    }

    @Override
    public Matiere getMatiereById(Long id) {
        return matiereRepository.findById(id).orElse(null);
    }

    @Override
    public Matiere saveMatiere(Matiere matiere) {
        return matiereRepository.save(matiere);
    }

    @Override
    public Matiere updateMatiere(Long id, Matiere matiere) {
        Optional<Matiere> existing = matiereRepository.findById(id);
        if (existing.isPresent()) {
            Matiere m = existing.get();
            m.setNom(matiere.getNom());
            m.setCoefficient(matiere.getCoefficient());
            return matiereRepository.save(m);
        }
        return null;
    }

    @Override
    public boolean deleteMatiere(Long id) {
        if (matiereRepository.existsById(id)) {
            matiereRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
