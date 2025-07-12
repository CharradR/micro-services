import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursesTab: any=[
    {id: 1, title: "Angular", price : 500 , nbrePlaces: "12", description: "Framework Angular"},
    {id: 1, title: "Spring", price : 300 , nbrePlaces: "6", description: "Framework Angular"},
    {id: 1, title: "SoftSkills", price : 100 , nbrePlaces: "10", description: "Framework Angular"}
  ];
  constructor() { }

  ngOnInit() {
  }

}
