import { Component } from '@angular/core';
import {ClasseService} from "../../services/classe.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  classeForm!: any;
 constructor(private classeService : ClasseService,
             private formBuilder : FormBuilder,
             private router :Router) {
 }
 ngOnInit(){
   this.classeForm=this.formBuilder.group({
     name:[null]
   })
 }

  saveGroup() {
  console.log(this.classeForm.value)
    this.classeService.addGroup(this.classeForm.value).subscribe(()=>
    {
      alert("The group is added successfully")
      this.router.navigateByUrl('/classes')
    })
  }

  cancel() {
    this.router.navigateByUrl('/classes')
  }
}
