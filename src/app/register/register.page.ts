import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateEqualPasswords} from "../core/validators/password.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;

  form_messages = {
    'firstName': [
      { type: 'required', message: 'First name is required!' },
      { type: 'minLength', message: 'First name length must be between 1 and 250!' },
      { type: 'maxLength', message: 'First name length must be between 1 and 250!' },
    ],
    'lastName': [
      { type: 'required', message: 'Last name is required!' },
      { type: 'minLength', message: 'Last name length must be between 1 and 250!' },
      { type: 'maxLength', message: 'Last name length must be between 1 and 250!' },
    ],
    'email': [
      { type: 'required', message: 'Email is required!' },
      { type: 'email', message: 'Email format is bad!' }
    ],
    'password': [
      { type: 'required', message: 'Password is required!' },
      { type: 'minLength', message: 'Password must be at least 4 characters long!' }
    ],
    'passwordConfirm': [
      { type: 'required', message: 'Password confirmation is required!' }
    ]
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ['', [Validators.required]]
    }, {
      validators: validateEqualPasswords
    });
  }

  _handleRegister() {
    this.submitted = true;
    if(this.registerForm.valid) {
      console.table(this.registerForm.value);
    } else {
      for(let name in this.registerForm.controls) {
        if(this.registerForm.controls[name].invalid) {
          console.log(name + ' is invalid');
        }
      }
    }
  }
}
