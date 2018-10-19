import { TrySignIn } from './../store/authentication.actions';
import * as FromApp from '../../store/app.reducers';
import * as AuthenticationReducers from '../../auth/store/authentication.reducers';
import * as AuthenticationActions from './../../auth/store/authentication.actions';

import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor(
    private authService: AuthService,
    private store: Store<FromApp.IAppState>) { }

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
    this.store.dispatch(new TrySignIn)
    /* this.authService.signInUser(email, password)
      .then(
        errors => console.log(errors)
      ); */
  }
}
