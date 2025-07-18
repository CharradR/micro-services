package tn.esprit.course.controllers;

import org.springframework.web.bind.annotation.*;
import tn.esprit.course.entity.CourseModule;
import tn.esprit.course.entity.Subject;
import tn.esprit.course.service.Iservices.CourseModuleService;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class CourseModuleController {

    private final CourseModuleService courseModuleService;

    public CourseModuleController(CourseModuleService courseModuleService) {
        this.courseModuleService = courseModuleService;
    }

    @GetMapping
    public List<CourseModule> getAllModules() {
        return courseModuleService.getAllModules();
    }

    @GetMapping("/{id}")
    public CourseModule getModuleById(@PathVariable Long id) {
        return courseModuleService.getModuleById(id);
    }

    @PostMapping
    public CourseModule createModule(@RequestBody CourseModule module) {
        return courseModuleService.createModule(module);
    }

    @PutMapping("/{id}")
    public CourseModule updateModule(@PathVariable Long id, @RequestBody CourseModule updatedModule) {
        return courseModuleService.updateModule(id, updatedModule);
    }
    @PostMapping("/{id}/subjects")
    public CourseModule addSubjectsToModule(@PathVariable Long id, @RequestBody List<Subject> subjects) {
        return courseModuleService.addSubjectsToModule(id, subjects);
    }

    // ✅ Mettre à jour un module et ses subjects
    @PutMapping("/{id}/with-subjects")
    public CourseModule updateModuleWithSubjects(@PathVariable Long id, @RequestBody CourseModule updatedModule) {
        return courseModuleService.updateModuleWithSubjects(id, updatedModule);
    }
    @DeleteMapping("/{id}")
    public void deleteModule(@PathVariable Long id) {
        courseModuleService.deleteModule(id);
    }
}
