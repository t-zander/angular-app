import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(private router: Router) { }

  signUpUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  signInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      () => {
        firebase.auth().currentUser.getIdToken()
        .then(token => this.token = token);
        this.router.navigate(['recipes']);
      }
    );
  }
  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
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
