import { ActivatedRoute, Router } from '@angular/router';import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { TeacherService } from 'src/app/services/teacher.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  course: any = {};
  // teachers: any =[{id:1,name:"Azhar"},{id:2,name:"Siwar"}];
  teachers: any =[];
  courseForm: FormGroup;
  constructor(private courseService : CourseService,private route: ActivatedRoute,
    private router: Router, private teacherService: TeacherService) { }

  ngOnInit() {

  }

  
  addCourse(){
    console.log("Here Object", this.course);
    this.courseService.addCourse(this.course).subscribe( data => {console.log("Course Object", data)
                                                                  this.router.navigate(['courses'])});
  }



}
