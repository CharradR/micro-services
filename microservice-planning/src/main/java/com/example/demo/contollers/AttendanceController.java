package com.example.demo.contollers;

import com.example.demo.dto.StudentDto;
import com.example.demo.entities.Attendance;
import com.example.demo.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("attendance")
public class AttendanceController {
    @Autowired
    AttendanceService attendanceService;

    @PostMapping("add")
    public Attendance saveAttendance(@RequestBody Attendance attendance) {
        return attendanceService.saveAttendance(attendance);
    }

    @GetMapping("{id}")
    public Attendance getAttendanceById(@PathVariable Integer id) {
        return attendanceService.getAttendanceById(id);
    }

    @PostMapping("edit/{id}")
    public Attendance editAttendance(@PathVariable Integer id,@RequestBody Attendance attendance) {
        return attendanceService.editAttendance(id, attendance);
    }

    @GetMapping("/groups/{id}")
    public List<Attendance> findAllAttendancesByGroupId(@PathVariable Integer id) {
        return attendanceService.findAllAttendancesByGroupId(id);
    }

    @GetMapping("/students/{id}")
    public List<Attendance> findAllAttendancesByStudentId(@PathVariable Integer id) {
        return attendanceService.findAllAttendancesByStudentId(id);
    }


    @GetMapping("student/{id}")
    public StudentDto findStudentById(@PathVariable Integer id) {

        return attendanceService.findStudentById(id);
    }

    @PostMapping("add/student/{studentId}")
    public Attendance addAttendanceForStudent(@RequestBody Attendance attendance,@PathVariable Integer studentId) {
        return attendanceService.addAttendanceForStudent(attendance, studentId);
    }


    @GetMapping("/date/{groupId}")
    public List<Attendance> findByDateAndGourpId(@RequestParam LocalDate date, @PathVariable Integer groupId) {
        return attendanceService.findByDateAndGourpId(date, groupId);
    }

@GetMapping("rate/{studentId}")
    public double getAbsenceRateByStudentId(@PathVariable Integer studentId) {
        return attendanceService.getAbsenceRateByStudentId(studentId);
    }


    //testttttttt
}
