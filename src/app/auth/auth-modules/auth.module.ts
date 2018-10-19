import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from '../sign-in/sign-in.component';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AuthModule { }
