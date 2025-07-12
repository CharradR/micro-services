import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName:["", [Validators.required, Validators.minLength(3)]],
      lastName:["", [Validators.required, Validators.minLength(5)]],
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword:[""],
    })
  }

}
