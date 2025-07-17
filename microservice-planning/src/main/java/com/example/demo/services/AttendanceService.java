package com.example.demo.services;

import com.example.demo.StudentClient;
import com.example.demo.dto.StudentDto;
import com.example.demo.entities.Attendance;
import com.example.demo.repositories.AttendanceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {
    @Autowired
    AttendanceRepository attendanceRepository;
    @Autowired
    StudentClient studentClient;


    public Attendance saveAttendance(Attendance attendance){
        return  attendanceRepository.save(attendance);

    }


    public Attendance getAttendanceById(Integer id){
        return  attendanceRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("attendance not found"));
    }


    public Attendance editAttendance(Integer id,Attendance attendance){
        Attendance attendanceToEdit = attendanceRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("attendance not found"));
        attendanceToEdit.setS1(attendance.isS1());
        attendanceToEdit.setS2(attendance.isS2());
        attendanceToEdit.setS3(attendance.isS3());
        attendanceToEdit.setS4(attendance.isS4());
        return  attendanceRepository.save(attendanceToEdit);
    }


    public List<Attendance> findAllAttendancesByGroupId(Integer id){
        return  attendanceRepository.findAllByGroupId(id);
    }

    public List<Attendance> findAllAttendancesByStudentId(Integer id){
        return attendanceRepository.findAllByStudentId(id);
    }


    @GetMapping("student/{id}")
    public StudentDto findStudentById(@PathVariable Integer id) {
        return studentClient.findStudentById(id);
    }



    public Attendance addAttendanceForStudent(Attendance attendance ,Integer studentId){
        StudentDto student = studentClient.findStudentById(studentId);
        if (student==null){
            throw new RuntimeException("student does not exist");
        }
        attendance.setStudentId(student.getId());
        attendance.setGroupId(student.getGroup().getId());
        return attendanceRepository.save(attendance);

    }


    public List<Attendance> findByDateAndGourpId(LocalDate date , Integer groupId){
        return   attendanceRepository.findAllByDateAndGroupId(date,groupId);
    }



    public double getAbsenceRateByStudentId(Integer studentId) {
        List<Attendance> attendances = attendanceRepository.findAllByStudentId(studentId);

        int totalSessions = 0;
        int totalAbsences = 0;

        for (Attendance attendance : attendances) {
            if (!attendance.isS1()) totalAbsences++;
            if (!attendance.isS2()) totalAbsences++;
            if (!attendance.isS3()) totalAbsences++;
            if (!attendance.isS4()) totalAbsences++;

            totalSessions += 4;
        }

        if (totalSessions == 0) return 0.0;

        return (double) totalAbsences / totalSessions;
    }



}

