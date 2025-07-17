package com.example.demo;


import com.example.demo.dto.StudentDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "microservice-students")
public interface StudentClient {
    @GetMapping("student/{id}")
    public StudentDto findStudentById(@PathVariable Integer id) ;
}

