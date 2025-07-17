import { Component } from '@angular/core';
import {ClasseService} from '../services/classe.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-classes',
  imports: [
    NgForOf,
    RouterLink
  ],
  standalone:true,
  templateUrl: './classes.component.html',
  styleUrls:[ './classes.component.css']
})
export class ClassesComponent {
  classes !: any

  constructor(private classeService :ClasseService) {
  }
  ngOnInit(){
    this.classeService.findAllClasses().subscribe(
      data=>
        this.classes = data
    )
    console.log("list of classes",this.classes)
  }
}
