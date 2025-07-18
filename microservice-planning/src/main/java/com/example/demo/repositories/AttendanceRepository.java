package com.example.demo.repositories;

import com.example.demo.entities.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance,Integer> {

    List<Attendance> findAllByStudentId(Integer id);
    List<Attendance> findAllByGroupId(Integer id);

    List< Attendance>  findAllByDateAndGroupId (LocalDate date, Integer groupId);
}
