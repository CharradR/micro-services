import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {StudentService} from "../../services/student.service";
import {AttendaceService} from "../../services/attendance.service";

@Component({
  selector: 'app-students',
  standalone:true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  classId !:number
  listOfStudents !: any
  absenceRates: { studentId: number; rate:any }[] = [];

  constructor(private  activatedRoute : ActivatedRoute,
              private studentService : StudentService,
              private attendaceService : AttendaceService) {
  }
  ngOnInit(){
    this.classId = this.activatedRoute.snapshot.params['id']
    this.listOfStudents= this.studentService.getStudentsBelongingToClass(this.classId).subscribe(data =>{
      this.listOfStudents =data

    this.listOfStudents.forEach((student:any) => {
      this.attendaceService.rateAbsenceByStudentId(student.id).subscribe(rate => {
        this.absenceRates.push({
          studentId: student.id,
          rate: rate
        });
      });
    });
   // console.log(this.absenceRates['1'])
        console.log(this.absenceRates)

      }
    )
/*
    this.listOfStudents.forEach(student => {
      this.attendaceService.rateAbsenceByStudentId(student.id).subscribe(rate => {
        this.absenceRates[student.id] = rate;
      });*/
  }

  removeStudent(id:number) {
    this.studentService.removeStudent(id).subscribe(
      ()=>{
        alert("student deleted")
        this.ngOnInit()
      }
    )
  }
  getRateByStudentId(id: number): string {
    const rate = this.absenceRates.find(rate => rate.studentId === id)?.rate;
    return rate !== undefined ? (rate * 100).toFixed(2) + ' %' : 'N/A';
  }



}
