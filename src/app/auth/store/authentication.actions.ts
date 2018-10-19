import { Action } from '@ngrx/store';

export const TRY_SIGN_IN = 'TRY_SIGN_IN';
export const SIGN_USER_IN = 'SIGN_USER_IN';

export const TRY_SIGN_UP = 'TRY_SIGN_UP';
export const SIGN_USER_UP = 'SIGN_USER_UP';

export const SET_TOKEN = 'SET_TOKEN';
export const SIGN_USER_OUT = 'SIGN_USER_OUT';


export class TrySignUp implements Action {
  readonly type = TRY_SIGN_UP;
  constructor(public payload : {email: string, password: string}) {}
}
export class SignUserUp implements Action {
  readonly type = SIGN_USER_UP;
}


export class TrySignIn implements Action {
  readonly type = TRY_SIGN_IN;
  constructor(public payload: {email: string, password: string}) {}
}
export class SignUserIn implements Action {
  readonly type = SIGN_USER_IN;
}


export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export class SignUserOut implements Action {
  readonly type = SIGN_USER_OUT;
}


export type AuthenticationActions =
  TrySignIn     |
  SignUserIn    |
  
  TrySignUp     |
  SignUserUp    |
  
  SetToken      |
  SignUserOut;

