import * as FromApp from '../../store/app.reducers';
import * as AuthenticationActions from '../store/authentication.actions';

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private store: Store<FromApp.IAppState>) { }
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

    /* this.authService.signUpUser(email, password)
    .then(
      null,
      errors => this.errors = errors
    ); */
    this.store.dispatch(new AuthenticationActions.TrySignUp({email: email, password: password}))
  }
}
