package com.example.demo.contollers;

import com.example.demo.entities.Indisponibilities;
import com.example.demo.services.IndisponibilitiesService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("indisponibilities")
//@AllArgsConstructor
public class IndisponibilitiesController {
    @Autowired
    IndisponibilitiesService indisponibilitiesService;



 @PostMapping("add")
    public Indisponibilities addIndiponibilities(@RequestBody Indisponibilities indisponibilities) {
        return indisponibilitiesService.addIndiponibilities(indisponibilities);
    }

    @GetMapping("all")
    public List<Indisponibilities> findAllIndisponibilities() {
        return indisponibilitiesService.findAllIndisponibilities();
    }

    @DeleteMapping("delete/{id}")
    public void deleteIndisponibilities(@PathVariable Integer id) {
        indisponibilitiesService.deleteIndisponibilities(id);
    }

    @GetMapping("enseignant/{id}")
    public List<Indisponibilities> findAllIndisponibilitiesByEnseignant(@PathVariable Integer id) {
        return indisponibilitiesService.findAllIndisponibilitiesByEnseignant(id);
    }

}
