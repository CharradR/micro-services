import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  course: any = {};
  courseForm: FormGroup;
  constructor(private courseService : CourseService) { }

  ngOnInit() {
  }
  addCourse(){
    console.log("Here Object", this.course);
    this.courseService.addCourse(this.course).subscribe();
  }

}
