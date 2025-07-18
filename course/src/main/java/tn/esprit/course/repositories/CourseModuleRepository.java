package tn.esprit.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.course.entity.CourseModule;


public interface CourseModuleRepository extends JpaRepository<CourseModule, Long> {
}
