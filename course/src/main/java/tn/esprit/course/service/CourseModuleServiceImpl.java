package tn.esprit.course.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import tn.esprit.course.entity.CourseModule;
import tn.esprit.course.entity.Subject;
import tn.esprit.course.repositories.CourseModuleRepository;
import tn.esprit.course.service.Iservices.CourseModuleService;

import java.util.List;

@Service
@Transactional
public class CourseModuleServiceImpl implements CourseModuleService {

    private final CourseModuleRepository courseModuleRepository;

    public CourseModuleServiceImpl(CourseModuleRepository courseModuleRepository) {
        this.courseModuleRepository = courseModuleRepository;
    }
@Override
    public List<CourseModule> getAllModules() {
        return courseModuleRepository.findAll();
    }
@Override
    public CourseModule getModuleById(Long id) {
        return courseModuleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found with id " + id));
    }
@Override
    public CourseModule createModule(CourseModule module) {
        return courseModuleRepository.save(module);
    }
@Override
    public CourseModule updateModule(Long id, CourseModule updatedModule) {
        CourseModule module = getModuleById(id);
        module.setTitle(updatedModule.getTitle());
        module.setCourse(updatedModule.getCourse());
        return courseModuleRepository.save(module);
    }
    @Override
    public CourseModule addSubjectsToModule(Long moduleId, List<Subject> subjects) {
        CourseModule module = getModuleById(moduleId);

        for (Subject subject : subjects) {
            subject.setModule(module);
            module.getSubjects().add(subject);
        }

        return courseModuleRepository.save(module);
    }
    @Override
    public void deleteModule(Long id) {
        CourseModule module = getModuleById(id);
        courseModuleRepository.delete(module);
    }
@Override
    public CourseModule updateModuleWithSubjects(Long moduleId, CourseModule updatedModule) {
        CourseModule module = getModuleById(moduleId);

        module.setTitle(updatedModule.getTitle());
        module.setCourse(updatedModule.getCourse());

        // On efface les anciens subjects et on les remplace
        module.getSubjects().clear();

        for (Subject subject : updatedModule.getSubjects()) {
            subject.setModule(module);
            module.getSubjects().add(subject);
        }

        return courseModuleRepository.save(module);
    }
}