import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  teacher: any = {};
  teacherForm: FormGroup;
  constructor(private teacherService : TeacherService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
  addTeacher(){
    console.log("Here Object", this.teacher);
    this.teacherService.addteacher(this.teacher).subscribe( data => {console.log("Teacher Object", data)
    this.router.navigate(['teachers'])});
  }
}
