import * as FromApp from '../store/app.reducers';
import * as AuthenticationActions from '../auth/store/authentication.actions';

import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(private router: Router, private store: Store<FromApp.IAppState>) { }

  signUpUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (user) => {
          this.store.dispatch(new AuthenticationActions.SignUserUp());

          firebase.auth().currentUser.getIdToken()
            .then(token => {
              this.token = token;
              this.store.dispatch(new AuthenticationActions.SetToken(token));
            });
          this.router.navigate(['recipes']);
        }
      );
  }

  signInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        _ => {
          this.store.dispatch(new AuthenticationActions.SignUserIn());
          
          firebase.auth().currentUser.getIdToken()
            .then(token => {
              this.token = token;
              this.store.dispatch(new AuthenticationActions.SetToken(token));
            });
          this.router.navigate(['recipes']);
        }
      );
  }
  
  logoutUser() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthenticationActions.SignUserOut())
  }
  getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(token => this.token = token);
    return this.token;
  }
  isAuthenticated() {
    return this.token != null;
  }
}
