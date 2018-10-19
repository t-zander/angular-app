import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppingListEditComponent} from '../shopping-list-edit/shopping-list-edit.component';
import {ShoppingListComponent} from '../shopping-list.component';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    SharedModule
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ]
})
export class ShoppingListModule { }
