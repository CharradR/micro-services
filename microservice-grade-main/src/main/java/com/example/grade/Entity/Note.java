package com.example.grade.Entity;

import jakarta.persistence.*;
@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long etudiantId;

    @ManyToOne
    @JoinColumn(name = "matiere_id")
    private Matiere matiere;

    private double note;

    public Note() {

    }

    // Getters et Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEtudiantId() {
        return etudiantId;
    }

    public void setEtudiantId(Long etudiantId) {
        this.etudiantId = etudiantId;
    }

    public Matiere getMatiere() {
        return matiere;
    }

    public void setMatiere(Matiere matiere) {
        this.matiere = matiere;
    }

    public double getNote() {
        return note;
    }

    public void setNote(double note) {
        this.note = note;
    }

    //  Constructeurs


    public Note(Long id, Long etudiantId, Matiere matiere, double note) {
        this.id = id;
        this.etudiantId = etudiantId;
        this.matiere = matiere;
        this.note = note;
    }
}
