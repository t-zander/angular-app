import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {AuthService} from '../auth/auth.service';
import {RecipeService} from '../recipes/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthGuard} from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    HomeComponent
  ],
  providers: [RecipeService, ShoppingListService, AuthService, AuthGuard]
})
export class CoreModule { }
