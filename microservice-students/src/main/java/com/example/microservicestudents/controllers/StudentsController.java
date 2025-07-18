package com.example.microservicestudents.controllers;

import com.example.microservicestudents.entities.GroupStudents;
import com.example.microservicestudents.entities.Student;
import com.example.microservicestudents.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student")
public class StudentsController {
    @Autowired
    StudentService studentService;

@PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @GetMapping("all/{groupId}")
    public List<Student> findAllByGroup (@PathVariable Integer groupId) {
        return studentService.findAllByGroup(groupId);
    }
@GetMapping("{id}")
    public Student findStudentById(@PathVariable Integer id) {
        return studentService.findStudentById(id);
    }
}
