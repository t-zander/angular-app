import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD-g-ex2XkLgXdIADJ3hBaNs9xs62LkOXs',
      authDomain: 'recipie-app-4e224.firebaseapp.com',
    });
  }
}
