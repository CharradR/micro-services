package com.example.demo.services;

import com.example.demo.entities.Indisponibilities;
import com.example.demo.repositories.IndisponibilitesRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
//@AllArgsConstructor
public class IndisponibilitiesService {
  @Autowired
    IndisponibilitesRepository indisponibilitesRepository ;


   public Indisponibilities addIndiponibilities(Indisponibilities indisponibilities){
       return  indisponibilitesRepository.save(indisponibilities);
   }
    public List<Indisponibilities> findAllIndisponibilities(){
        return indisponibilitesRepository.findAll();
    }


    public void deleteIndisponibilities(Integer id){
        indisponibilitesRepository.deleteById(id);
    }

   public List<Indisponibilities> findAllIndisponibilitiesByEnseignant(Integer id) {
       return indisponibilitesRepository.findAllByEnseignantId(id);
   }
}
