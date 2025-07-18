package tn.esprit.course.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.course.entity.Course;
import tn.esprit.course.entity.UserCourseAssignment;
import tn.esprit.course.repositories.CourseRepository;
import tn.esprit.course.repositories.UserCourseAssignmentRepository;

@Service
public class CourseAssignmentService {

    private final UserCourseAssignmentRepository assignmentRepository;
    private final CourseRepository courseRepository;
    private final KeyclaokUserService keycloakUserService;
    private final EmailNotificationService emailNotificationService;

    public CourseAssignmentService(UserCourseAssignmentRepository assignmentRepository,
                                   CourseRepository courseRepository,
                                   KeyclaokUserService keycloakUserService,
                                   EmailNotificationService emailNotificationService) {
        this.assignmentRepository = assignmentRepository;
        this.courseRepository = courseRepository;
        this.keycloakUserService = keycloakUserService;
        this.emailNotificationService = emailNotificationService;
    }

    public void assignCourseToUser(String keycloakUserId, String courseName) {
        Course course = courseRepository.findByTitle(courseName)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        UserCourseAssignment assignment = new UserCourseAssignment();
        assignment.setKeycloakUserId(keycloakUserId);
        assignment.setCourse(course);
        assignmentRepository.save(assignment);

        String email = keycloakUserService.getUserEmail(keycloakUserId);
        emailNotificationService.sendCourseAssignedEmail(email, courseName);
    }
}