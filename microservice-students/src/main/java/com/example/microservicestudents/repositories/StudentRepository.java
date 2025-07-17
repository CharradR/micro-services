package com.example.microservicestudents.repositories;

import com.example.microservicestudents.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Integer> {
    List<Student> findAllByGroupId(Integer groupId);
}
