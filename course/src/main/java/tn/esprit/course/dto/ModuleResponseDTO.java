package tn.esprit.course.dto;

import lombok.Data;

import java.util.List;

@Data
public class ModuleResponseDTO {
    private Long id;
    private String name;
    private String description;
    private List<SubjectResponseDTO> subjects;
}
