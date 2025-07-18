package com.example.demo.dto;

public class StudentDto {
    Integer id ;
    String firstName ;
    String lastName ;
    GroupDto group;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public GroupDto getGroup() {
        return group;
    }

    public void setGroup(GroupDto groupDto) {
        this.group = groupDto;
    }
}
