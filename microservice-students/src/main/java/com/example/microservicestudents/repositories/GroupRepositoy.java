package com.example.microservicestudents.repositories;

import com.example.microservicestudents.entities.GroupStudents;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepositoy extends JpaRepository<GroupStudents,Integer> {

}
