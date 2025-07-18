package tn.esprit.course.controllers;

import org.springframework.web.bind.annotation.*;
import tn.esprit.course.entity.Subject;
import tn.esprit.course.service.SubjectService;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    // ✅ Create a new Subject for a specific Module
    @PostMapping("/module/{moduleId}")
    public Subject createSubject(@PathVariable Long moduleId, @RequestBody Subject subject) {
        return subjectService.createSubject(moduleId, subject);
    }

    // ✅ Get all Subjects
    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    // ✅ Get a Subject by ID
    @GetMapping("/{id}")
    public Subject getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id);
    }

    // ✅ Update a Subject
    @PutMapping("/{id}")
    public Subject updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        return subjectService.updateSubject(id, subject);
    }

    // ✅ Delete a Subject
    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
    }
}