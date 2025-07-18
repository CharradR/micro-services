package com.example.microservicestudents.entities;
import jakarta.persistence.*;
import lombok.AccessLevel;

import lombok.experimental.FieldDefaults;
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)

public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id ;
    String firstName;
    String lastName;
    @ManyToOne
    GroupStudents group;

    public Student(Integer id, String firstName, String lastName, GroupStudents group) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.group = group;
    }

    public Student() {
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setGroup(GroupStudents group) {
        this.group = group;
    }

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public GroupStudents getGroup() {
        return group;
    }
}
