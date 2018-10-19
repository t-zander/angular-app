import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthAlertComponent } from './auth/auth-alert/auth-alert.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth-modules/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './auth/store/authentication.effects';

@NgModule({
  declarations: [
    AppComponent,
    AuthAlertComponent,
  ],
  entryComponents: [
    AuthAlertComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthenticationEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
