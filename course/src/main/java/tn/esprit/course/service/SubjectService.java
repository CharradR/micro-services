package tn.esprit.course.service;

import org.springframework.stereotype.Service;
import tn.esprit.course.entity.CourseModule;
import tn.esprit.course.entity.Subject;
import tn.esprit.course.repositories.CourseModuleRepository;
import tn.esprit.course.repositories.SubjectRepository;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final CourseModuleRepository courseModuleRepository;

    public SubjectService(SubjectRepository subjectRepository, CourseModuleRepository courseModuleRepository) {
        this.subjectRepository = subjectRepository;
        this.courseModuleRepository = courseModuleRepository;
    }

    // ✅ Create Subject
    public Subject createSubject(Long moduleId, Subject subject) {
        CourseModule module = courseModuleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found with id " + moduleId));
        subject.setModule(module);
        return subjectRepository.save(subject);
    }

    // ✅ Get All Subjects
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    // ✅ Get Subject by ID
    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id " + id));
    }

    // ✅ Update Subject
    public Subject updateSubject(Long id, Subject updatedSubject) {
        Subject subject = getSubjectById(id);
        subject.setTitle(updatedSubject.getTitle());
        subject.setHours(updatedSubject.getHours());
        if (updatedSubject.getModule() != null) {
            subject.setModule(updatedSubject.getModule());
        }
        return subjectRepository.save(subject);
    }

    // ✅ Delete Subject
    public void deleteSubject(Long id) {
        Subject subject = getSubjectById(id);
        subjectRepository.delete(subject);
    }
}