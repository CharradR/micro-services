package com.example.microservicestudents.controllers;

import com.example.microservicestudents.entities.GroupStudents;
import com.example.microservicestudents.services.GroupService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("group")
public class GroupController {
    @Autowired
    GroupService groupService;

    @GetMapping("all")
    public List<GroupStudents> findAllGroups() {
        return groupService.findAllGroups();
    }
@PostMapping
    public GroupStudents addGroup(@RequestBody GroupStudents group) {
        return groupService.addGroup(group);
    }

    @DeleteMapping("remove/{id}")
    public void deleteGroup(@PathVariable Integer id) {
        groupService.deleteGroup(id);
    }


}
