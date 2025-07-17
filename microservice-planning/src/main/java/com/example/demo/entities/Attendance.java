package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id ;
    LocalDate date;
    boolean s1;
    boolean s2;
    boolean s3;
    boolean s4;
    Integer studentId ;
    Integer groupId;

    public Attendance(Integer id, LocalDate date, boolean s1, boolean s2, boolean s3, boolean s4, Integer studentId, Integer groupId) {
        this.id = id;
        this.date = date;
        this.s1 = s1;
        this.s2 = s2;
        this.s3 = s3;
        this.s4 = s4;
        this.studentId = studentId;
        this.groupId = groupId;
    }

    public Attendance() {
    }

    public Integer getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public boolean isS1() {
        return s1;
    }

    public boolean isS2() {
        return s2;
    }

    public boolean isS3() {
        return s3;
    }

    public boolean isS4() {
        return s4;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setS1(boolean s1) {
        this.s1 = s1;
    }

    public void setS2(boolean s2) {
        this.s2 = s2;
    }

    public void setS3(boolean s3) {
        this.s3 = s3;
    }

    public void setS4(boolean s4) {
        this.s4 = s4;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }
}
