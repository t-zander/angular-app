import * as AuthenticationActions from './authentication.actions';

export interface IState{
  userAuthenticated: boolean,
  token: string
}

const initialState: IState = {
  userAuthenticated: false,
  token: null
}

export function authReducer(state = initialState, action: AuthenticationActions.AuthenticationActions) {
  switch(action.type){
    case AuthenticationActions.SIGN_USER_IN:
    case AuthenticationActions.SIGN_USER_UP:
      return {
        ...state,
        userAuthenticated: true
      }

    case AuthenticationActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }

    case AuthenticationActions.SIGN_USER_OUT:
      return {
        ...state,
        userAuthenticated: false,
        token: null
      }
      
    default:
      return state;
  } 
}