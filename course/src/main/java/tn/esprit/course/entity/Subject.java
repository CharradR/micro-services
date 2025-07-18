package tn.esprit.course.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;


@Entity
public class Subject {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private int hours;

    @ManyToOne
    private CourseModule module;

    public Subject(Long id, String title, int hours, CourseModule module) {
        this.id = id;
        this.title = title;
        this.hours = hours;
        this.module = module;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public CourseModule getModule() {
        return module;
    }

    public void setModule(CourseModule module) {
        this.module = module;
    }
}

