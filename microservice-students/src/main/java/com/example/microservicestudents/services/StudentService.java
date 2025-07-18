package com.example.microservicestudents.services;

import com.example.microservicestudents.entities.GroupStudents;
import com.example.microservicestudents.entities.Student;
import com.example.microservicestudents.repositories.GroupRepositoy;
import com.example.microservicestudents.repositories.StudentRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
//@AllArgsConstructor
public class StudentService {
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    GroupRepositoy groupRepositoy;



    public Student addStudent(Student student){
        return  this.studentRepository.save(student);
    }





    public List<Student> findAllByGroup(Integer groupId){
        return studentRepository.findAllByGroupId(groupId);
    }



    public Student findStudentById(Integer id){
        return  studentRepository.findById(id).orElseThrow(
                ()->new EntityNotFoundException("student not found"));
    }
}
