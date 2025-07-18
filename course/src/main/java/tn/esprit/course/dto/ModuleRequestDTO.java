package tn.esprit.course.dto;

import lombok.Data;

import java.util.List;

@Data
public class ModuleRequestDTO {
    private String name;
    private String description;
    private List<SubjectRequestDTO> subjects; // Liste des matières
}
