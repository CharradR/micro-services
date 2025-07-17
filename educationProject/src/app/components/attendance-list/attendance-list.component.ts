import { Component } from '@angular/core';
import {StudentService} from "../../services/student.service";
import {ClasseService} from "../../services/classe.service";
import {AttendaceService} from "../../services/attendance.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent {
  listOfStudents!: any;
  attendance!:any[]
  group!: number;
  attendanceByGroup!:any
  students!:any
  constructor(
    private studentService: StudentService,
    private groupsService: ClasseService,
    private attendanceService: AttendaceService,
    private activatedRoute : ActivatedRoute
  ) {}
  ngOnInit() {
    this.group = this.activatedRoute.snapshot.params['id'];

    this.attendanceService.findAllAttendancesByGroupId(this.group).subscribe(attendances => {
      this.attendanceByGroup = attendances;

      this.studentService.getStudentsBelongingToClass(this.group).subscribe(students => {
        this.students = students;
      });
    });
  }

  getStudentById(studentId: number): any {
    return this.students.find((s:any) => s.id === studentId);
  }

  getAttendance(studentId: number): any {
    return this.attendanceByGroup.find((a:any) => a.studentId === studentId);
  }
}
