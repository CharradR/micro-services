package tn.esprit.course.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import tn.esprit.course.entity.Course;
import tn.esprit.course.mapper.CourseMapper;
import tn.esprit.course.repositories.CourseModuleRepository;
import tn.esprit.course.repositories.CourseRepository;
import tn.esprit.course.service.Iservices.CourseService;

import java.util.List;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository CourseModuleRepository; // si besoin
    //private final CourseMapper courseMapper ;
    public CourseServiceImpl(CourseRepository courseRepository, CourseModuleRepository CourseModuleRepository) {
        this.courseRepository = courseRepository;
        this.CourseModuleRepository = CourseModuleRepository;

    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Long id, Course updatedCourse) {
        Course course = getCourseById(id);
        course.setTitle(updatedCourse.getTitle());
        course.setDescription(updatedCourse.getDescription());
        course.setCredits(updatedCourse.getCredits());
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
    }
}