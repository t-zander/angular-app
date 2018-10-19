import { NgModule } from '@angular/core';
import {RecipeDetailComponent} from '../recipe-detail/recipe-detail.component';
import {RecipesComponent} from '../recipes.component';
import {RecipeEditComponent} from '../recipe-edit/recipe-edit.component';
import {RecipesListComponent} from '../recipes-list/recipes-list.component';
import {RecipeItemComponent} from '../recipes-list/recipe-item/recipe-item.component';
import {RecipesRoutingModule} from './recipes-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ],
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipesListComponent,
    RecipeItemComponent
  ]
})
export class RecipesModule { }
