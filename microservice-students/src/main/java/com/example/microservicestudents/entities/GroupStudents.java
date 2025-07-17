package com.example.microservicestudents.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;

import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupStudents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id ;
   @Column(unique = true)
    String name;
    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
            @JsonIgnore
    List<Student> listOfStudents = new ArrayList<>() ;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setListOfStudents(List<Student> listOfStudents) {
        this.listOfStudents = listOfStudents;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Student> getListOfStudents() {
        return listOfStudents;
    }

    public GroupStudents(Integer id, String name, List<Student> listOfStudents) {
        this.id = id;
        this.name = name;
        this.listOfStudents = listOfStudents;
    }

    public GroupStudents() {
    }
}
