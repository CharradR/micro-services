package com.example.demo.repositories;

import com.example.demo.entities.Indisponibilities;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IndisponibilitesRepository extends JpaRepository<Indisponibilities,Integer> {
    List<Indisponibilities> findAllByEnseignantId(Integer id);
}
