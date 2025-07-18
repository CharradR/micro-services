package tn.esprit.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.course.entity.Subject;

public interface SubjectRepository  extends JpaRepository<Subject, Long>  {


}
