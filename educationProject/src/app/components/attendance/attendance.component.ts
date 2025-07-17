import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {StudentService} from "../../services/student.service";
import {ClasseService} from "../../services/classe.service";
import {AttendaceService} from "../../services/attendance.service";

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  date: string = new Date().toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
  listOfStudents!: any ;
  listOfClasses!: any ;
  group!: number;
  attendance: any[] = [];

  constructor(
    private studentService: StudentService,
    private groupsService: ClasseService,
    private attendanceService: AttendaceService
  ) {}

  ngOnInit() {
    this.groupsService.findAllClasses().subscribe((data) => {
      this.listOfClasses = data;
      console.log('Classes:', this.listOfClasses);
    });
  }
  onGroupSelection(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    if (value === "null") {
      this.group = 0;
      this.listOfStudents = [];
      this.attendance = [];
      return;
    }

    this.group = parseInt(value, 10);
    const today = this.date;

    this.studentService.getStudentsBelongingToClass(this.group).subscribe((students) => {
      this.listOfStudents = Object.values(students);

      this.attendanceService.getAttendanceByDateAndGroup(this.group, today).subscribe((data) => {
        const existing = data || [];

        // merge les étudiants avec attendance existante ou vide
        this.attendance = this.listOfStudents.map((student :any)=> {
          const existingAtt = existing.find(a => a.studentId === student.id);
          return existingAtt || {
            studentId: student.id,
            groupId: this.group,
            date: this.date,
            s1: '',
            s2: '',
            s3: '',
            s4: ''
          };
        });
      });
    });
  }

  save() {
    this.attendance.forEach((a) => {
      const { studentId, ...attendanceData } = a;
      this.attendanceService.PostStudentsAttendanceBelongingToClass(studentId, attendanceData).subscribe(() => {
        console.log(`Attendance saved for student ${studentId}`);
        alert ("attendance have been saved ")
      });
    });
  }

  private initializeEmptyAttendance(date: string) {
    return this.listOfStudents.map((student: any) => ({
      studentId: student.id,
      groupId: this.group,
      s1: false,
      s2: false,
      s3: false,
      s4: false,
      date: date
    }));
  }

  /* getAttendance(studentId: number): any {
     return this.attendance.find(a => a.studentId === studentId);
   }*/
  getAttendance(studentId: number) {
    let att = this.attendance.find(a => a.studentId === studentId);
    if (!att) {
      // Si aucun attendance trouvé, créer un vide et l'ajouter à la liste
      att = {
        studentId: studentId,
        groupId: this.group,
        date: this.date,
        s1: '',
        s2: '',
        s3: '',
        s4: ''
      };
      this.attendance.push(att);
    }
    return att;
  }

}
