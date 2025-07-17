package com.example.grade.Services.Interface;

import com.example.grade.Entity.Matiere;

import java.util.List;

public interface MatiereService {
    List<Matiere> getAllMatieres();
    Matiere getMatiereById(Long id);
    Matiere saveMatiere(Matiere matiere);
    Matiere updateMatiere(Long id, Matiere matiere);
    boolean deleteMatiere(Long id);
}
