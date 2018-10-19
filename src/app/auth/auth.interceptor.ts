import * as FromApp from '../store/app.reducers';
import * as AuthenticationReducers from '../auth/store/authentication.reducers';

import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { switchMap, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<FromApp.IAppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('authentication')
      .pipe(
        take(1),
        switchMap((authState) => {
          let copiedRequest;
          if(req.url.indexOf('/auth/') !== -1){
            return next.handle(req);  
          } else{
            copiedRequest = req.clone({params: req.params.set('auth', authState.token)});
            copiedRequest = req;
            return next.handle(copiedRequest);
          }
        })
      )
  }
}