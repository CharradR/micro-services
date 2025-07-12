import { Component,Input,EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() courseInput: any;
  @Output() courseDeleted = new EventEmitter<CourseComponent>();
  coursesTab: any=[];
  newCoursesTab:any=[];
  //course: any={id: 1, title: "Angular", price : 500 , nbrePlaces: "12", description: "Framework Angular"};
  constructor(private courseService: CourseService,
    private router : Router ) { }

  ngOnInit() {
  }

  deleteAndReloadCourses(id){
    console.log("id course",this.courseInput.id );

    this.courseService.deleteCourse(id).subscribe(
      data => {
        console.log("Course deleted");

        this.courseDeleted.emit(this.courseInput); // émettre l'événement
      }
    );
  }
  

    
  // goToDisplay(id){
  //   this.router.navigate([`courses/courseInfo/${id}`]);
  // }
  goToEdit(id){
    this.router.navigate([`courses/courseInfo/${id}`]);
  }

}
