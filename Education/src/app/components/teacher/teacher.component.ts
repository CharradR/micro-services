import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  @Input() teacherInput: any;
  @Output() teacherDeleted = new EventEmitter<TeacherComponent>();
  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
  }


  deleteAndReloadTeachers(id){
    console.log("id teacher",this.teacherInput.id );

    this.teacherService.deleteteacher(id).subscribe(
      data => {
        console.log("Teacher deleted");

        this.teacherDeleted.emit(this.teacherInput); // émettre l'événement
      }
    );
  }

}
