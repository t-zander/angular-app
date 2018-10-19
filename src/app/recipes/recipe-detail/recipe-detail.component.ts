import { AuthAlertComponent } from './../../auth/auth-alert/auth-alert.component';
import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../Recipe.model';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';

import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as AppReducers from '../../store/app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  currentRecipe: Recipe;

  constructor(private store: Store<AppReducers.IAppState>,
              private recipeService: RecipeService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private containerView: ViewContainerRef,
              private factory: ComponentFactoryResolver,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
          this.recipeId = +params.id;
          this.currentRecipe = this.recipeService.getRecipeById(this.recipeId);
        }
      );
  }

  onNavEditRecipe() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['../edit'], {relativeTo: this.activatedRoute});
    } else {
      const componentFactory = this.factory.resolveComponentFactory(AuthAlertComponent);
      this.containerView.createComponent(componentFactory);
    }
  }

  onAdd2Cart() {
    /* this.shoppingListService
      .addIngredients(this.currentRecipe.ingredients); */
    this.store.dispatch(new shoppingListActions.AddIngredients(this.currentRecipe.ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipeById(this.recipeId);
    this.router.navigate(['/recipes']);
  }
}


