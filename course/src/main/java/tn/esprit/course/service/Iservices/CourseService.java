package tn.esprit.course.service.Iservices;

import tn.esprit.course.dto.CourseRequestDTO;
import tn.esprit.course.dto.CourseResponseDTO;
import tn.esprit.course.entity.Course;

import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    Course getCourseById(Long id);
    Course createCourse(Course course);
    Course updateCourse(Long id, Course updatedCourse);
    void deleteCourse(Long id);
}


