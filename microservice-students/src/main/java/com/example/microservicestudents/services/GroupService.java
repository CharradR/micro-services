package com.example.microservicestudents.services;

import com.example.microservicestudents.entities.GroupStudents;
import com.example.microservicestudents.repositories.GroupRepositoy;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
//@AllArgsConstructor
public class GroupService {
    @Autowired
    GroupRepositoy groupRepositoy;


    public List<GroupStudents>findAllGroups(){
        return groupRepositoy.findAll();
    }
    public List<GroupStudents> findAll(){
        return groupRepositoy.findAll();
    }


    public GroupStudents addGroup(GroupStudents group){
        return groupRepositoy.save(group);
    }

    public void deleteGroup(Integer id){
        groupRepositoy.deleteById(id);
    }
}
