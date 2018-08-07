import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {ShoppingListModule} from './shopping-list/shopping-list-modules/shopping-list.module';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes-modules/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list-modules/shopping-list.module#ShoppingListModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
