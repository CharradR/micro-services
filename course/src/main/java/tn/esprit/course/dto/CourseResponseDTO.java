package tn.esprit.course.dto;

import lombok.Data;

import java.util.List;

@Data
public class CourseResponseDTO {
    private Long id;
    private String title;
    private String description;
    private int credits;
    private List<ModuleResponseDTO> modules;
    public  CourseResponseDTO (){} ;
    public CourseResponseDTO(Long id, String title, String description, int credits, List<ModuleResponseDTO> modules) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.credits = credits;
        this.modules = modules;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public List<ModuleResponseDTO> getModules() {
        return modules;
    }

    public void setModules(List<ModuleResponseDTO> modules) {
        this.modules = modules;
    }
    // Détails modules
}
