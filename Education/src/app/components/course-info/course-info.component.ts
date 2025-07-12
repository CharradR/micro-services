import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  @Input() courseInput: any;
  course: any={id: 1, title: "Angular", price : 500 , nbrePlaces: "12", description: "Framework Angular"};
  id:any;
  

  constructor(private activateRoute: ActivatedRoute,
    private courseService :CourseService) { }

  ngOnInit() {
    this.activateRoute.snapshot.paramMap.get(this.course.id);
    console.log("Here id ", this.course.id);
    // this.courseService.getCourseById(this.id).subscribe();
  }

}
