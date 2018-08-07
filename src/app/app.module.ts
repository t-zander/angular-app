import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthAlertComponent } from './auth/auth-alert/auth-alert.component';
import { SharedModule } from './shared/shared.module';
import {AuthModule} from './auth/auth-modules/auth.module';
import {CoreModule} from './core/core.module';

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
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
