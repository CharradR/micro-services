package tn.esprit.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.course.entity.UserCourseAssignment;

public interface UserCourseAssignmentRepository extends JpaRepository<UserCourseAssignment, Long> {
    // méthodes custom si besoin
}

