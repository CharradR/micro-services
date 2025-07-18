package tn.esprit.course.service.Iservices;

import tn.esprit.course.entity.CourseModule;
import tn.esprit.course.entity.Subject;

import java.util.List;

public interface CourseModuleService {
    List<CourseModule> getAllModules();
    CourseModule getModuleById(Long id);
    CourseModule createModule(CourseModule module);
    CourseModule updateModule(Long id, CourseModule updatedModule);
    void deleteModule(Long id);
    CourseModule addSubjectsToModule(Long moduleId, List<Subject> subjects);
    CourseModule updateModuleWithSubjects(Long moduleId, CourseModule updatedModule);
}
