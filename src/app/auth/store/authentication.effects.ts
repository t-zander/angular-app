import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthenticationActions from './authentication.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as firebase from 'firebase';

@Injectable()

export class AuthenticationEffects{
  @Effect() authenticationSignUp = this.actions
    .ofType(AuthenticationActions.TRY_SIGN_UP)
    .pipe(
      
      /* get payload (email and password of user) */
      map(
        (action: AuthenticationActions.TrySignUp) => action.payload
      ),
      /* create user and return observable(responce from firebase) */
      switchMap(
        (authData: {email:string, password: string}) => 
          from(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password))
      ),
      /* data doesn't matter it's important just to know thatwe got success status */
      switchMap(
        _ => from(firebase.auth().currentUser.getIdToken())
      ),
      mergeMap(
        (token: string) => {
          console.log(token);
          return [
            { type: AuthenticationActions.SIGN_USER_UP },
            { 
              type: AuthenticationActions.SET_TOKEN,
              payload: token
            }

          ];
        }
      )
    )

  @Effect() authenticationSignIn = this.actions
    .ofType(AuthenticationActions.TRY_SIGN_IN)
    .pipe(

      /* get payload from user */
      map( 
        (action: AuthenticationActions.TrySignIn) => action.payload
      ),
      switchMap(
        (userCredentials: {email: string, password: string}) => userCredentials
      )
    )

  constructor(private actions: Actions) {

  }
}