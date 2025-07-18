package tn.esprit.course.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.course.dto.CourseRequestDTO;
import tn.esprit.course.dto.CourseResponseDTO;
import tn.esprit.course.entity.Course;
import tn.esprit.course.mapper.CourseMapper;
import tn.esprit.course.service.CourseAssignmentService;
import tn.esprit.course.service.Iservices.CourseService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final CourseMapper courseMapper;
    private final CourseAssignmentService courseAssignmentService;


    public CourseController(CourseService courseService, CourseMapper courseMapper, CourseAssignmentService courseAssignmentService) {
        this.courseService = courseService;
        this.courseMapper = courseMapper;
        this.courseAssignmentService = courseAssignmentService;
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignCourseToUser(@RequestParam String keycloakUserId,
                                                     @RequestParam String courseName) {
        try {
            courseAssignmentService.assignCourseToUser(keycloakUserId, courseName);
            return ResponseEntity.ok("Course assigned successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal error");
        }
    }
    @GetMapping
    public List<CourseResponseDTO> getAll() {
        return courseService.getAllCourses().stream()
                .map(courseMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CourseResponseDTO getById(@PathVariable Long id) {
        return courseMapper.toResponseDTO(courseService.getCourseById(id));
    }

    @PostMapping
    public CourseResponseDTO create(@RequestBody CourseRequestDTO dto) {
        Course course = courseMapper.toEntity(dto);
        Course savedCourse = courseService.createCourse(course);
        return courseMapper.toResponseDTO(savedCourse);
    }

    @PutMapping("/{id}")
    public CourseResponseDTO update(@PathVariable Long id, @RequestBody CourseRequestDTO dto) {
        Course updatedCourse = courseMapper.toEntity(dto);
        Course savedCourse = courseService.updateCourse(id, updatedCourse);
        return courseMapper.toResponseDTO(savedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    } }