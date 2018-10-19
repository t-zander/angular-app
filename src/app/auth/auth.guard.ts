import * as FromApp from '../store/app.reducers';
import * as AuthenticationActions from './store/authentication.actions';
import * as AuthenticationReducers from './store/authentication.reducers';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<FromApp.IAppState>) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('authentication')
      .pipe(
        map( (authState: AuthenticationReducers.IState) => authState.userAuthenticated )
      )
  }
}
