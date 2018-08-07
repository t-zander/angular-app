import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private authService: AuthService) { }
  errors;
  ngOnInit() {
    this.signUpForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.email, Validators.required]),
        'password' : new FormControl(null, [Validators.required])
      }
    );
  }
  onSignUp() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    this.authService.signUpUser(email, password)
    .then(
      null,
      errors => this.errors = errors
    );
  }
}
