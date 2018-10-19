import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import {Recipe} from '../Recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthAlertComponent } from "../../auth/auth-alert/auth-alert.component";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private viewContainerRef: ViewContainerRef,
              private factory: ComponentFactoryResolver) { }

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    this.recipeService.fetchRecipesFromDB();

    this.recipeService.recipesChanged.subscribe(
      (recipes) => this.recipes = recipes
    );
  }

  onAddRecipe() {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['new'], {relativeTo: this.activatedRoute});
    } else {
      const componentFactory = this.factory.resolveComponentFactory(AuthAlertComponent);
      this.viewContainerRef.createComponent(componentFactory);
    }
  }
}
