import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  teacher: any = {};
  teacherForm: FormGroup;
  constructor(private teacherService : TeacherService) { }

  ngOnInit() {
  }
  addTeacher(){
    console.log("Here Object", this.teacher);
    this.teacherService.addteacher(this.teacher).subscribe();
  }
}
