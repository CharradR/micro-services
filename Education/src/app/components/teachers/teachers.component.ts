import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { TeacherComponent } from '../teacher/teacher.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachersTab: any =[];
  constructor(private teacherService : TeacherService) { }

  ngOnInit() {
    this.teacherService.getAllteachers().subscribe(
      (response) => {
      this.teachersTab = response;
      console.log("teachersTab : ", this.teachersTab);
    },
    (error) => { console.log('La requete Get a échoué') });
    }

    deleteTeacher(teacher: TeacherComponent) {
      const index = this.teachersTab.indexOf(teacher);
      
      if (index !== -1) {
        this.teachersTab.splice(index, 1);
      }

      console.log("newTeachersTab : ", this.teachersTab);
    }

  }


