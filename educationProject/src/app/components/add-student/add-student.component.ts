import { Component } from '@angular/core';
import {ClasseService} from "../../services/classe.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentService} from "../../services/student.service";
import {group} from "@angular/animations";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  listOfGroups!:any;
  groupId!:number
  groupName!: any;
  group!:any
  constructor(private classeService : ClasseService,
              private formBuilder : FormBuilder,private router : Router,
              private  studentService : StudentService,
              private activateRoute : ActivatedRoute
             )  {
  }
  ngOnInit(){
    this.groupId=this.activateRoute.snapshot.params['classId']
    this.studentForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      group: [null]
    });

    this.classeService.findAllClasses().subscribe(data=>{
      this.listOfGroups=data
    this.group=this.listOfGroups.find((g :any)=> g.id == this.groupId)
    console.log("goupId",this.groupId)
    this.groupName=this.group.name
    console.log("group value",this.group)
        this.studentForm=this.formBuilder.group({
          firstName:[null],
          lastName:[null],
          group:[this.group]
        })

    }
    )



  }
  saveGroup() {
           console.log(this.studentForm.value)
    this.studentService.addStudennt(this.studentForm.value)
    this.studentService.addStudennt(this.studentForm.value).subscribe(()=>{
      alert ("student added")
      this.router.navigateByUrl(`/students/${this.groupId}`)

    })
  }

  cancel() {
    this.router.navigateByUrl(`/students/${this.groupId}`)
  }
}
