import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // firstName:["", [Validators.required, Validators.minLength(3)]],
      // lastName:["", [Validators.required, Validators.minLength(5)]],
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      //confirmPassword:[""],
    })
  }
  signup(){
    console.log("Here Object Signup", this.loginForm.value);
  }

}
