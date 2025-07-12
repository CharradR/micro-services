import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() courseInput: any;
  course: any={id: 1, title: "Angular", price : 500 , nbrePlaces: "12", description: "Framework Angular"};
  constructor(private courseService: CourseService,
    private router : Router) { }

  ngOnInit() {
   
  }

  deleteMatch(id){
    this.courseService.deleteCourse(id).subscribe();
  }
  // goToDisplay(id){
  //   this.router.navigate([`courses/courseInfo/${id}`]);
  // }
  goToEdit(id){
    this.router.navigate([`courses/courseInfo/${id}`]);
  }

}
