import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { AuthGuard } from '../../auth/auth.guard';
import { RecipesComponent } from '../recipes.component';

const routes: Routes = [
  {path: '', component: RecipesComponent,
    children: [
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
      {path: ':id/details', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
