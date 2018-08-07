import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.email, Validators.required]),
        'password' : new FormControl(null, [Validators.required])
      }
    );
  }
  onSignIn() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email, password)
    .then(
      null,
      errors => console.log(errors)
    );
  }
}
