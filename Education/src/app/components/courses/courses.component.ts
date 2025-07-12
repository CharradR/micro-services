import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

import { CourseComponent } from 'src/app/components/course/course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  // coursesTab: any=[
  //   {id: 1, title: "Angular", price : 500 , nbrePlaces: "12", description: "Framework Angular"},
  //   {id: 1, title: "Spring", price : 300 , nbrePlaces: "6", description: "Framework Angular"},
  //   {id: 1, title: "SoftSkills", price : 100 , nbrePlaces: "10", description: "Framework Angular"}
  // ];

  coursesTab: any=[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (response) => {
        this.coursesTab = response;
        console.log("coursesTab : ", this.coursesTab);
      },
      (error) => { console.log('La requete Get a échoué') });
      }
  
      deleteCourse(course: CourseComponent) {
        const index = this.coursesTab.indexOf(course);
        
        if (index !== -1) {
          this.coursesTab.splice(index, 1);
        }

        console.log("newcoursesTab : ", this.coursesTab);
      }
}
