package tn.esprit.course.dto;

import lombok.Data;

import java.util.List;

@Data
public class CourseRequestDTO {
    private String title;
    private String description;
    private int credits;
    private List<ModuleRequestDTO> modules; // Liste des modules à créer
}