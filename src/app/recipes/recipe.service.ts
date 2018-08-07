import { AuthService } from "./../auth/auth.service";
import {Injectable} from '@angular/core';
import {Recipe} from './Recipe.model';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getRecipes() {
    return this.recipes;
  }
  getRecipeById(index: number) {
    return this.recipes[index];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }
  updateRecipeById(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes);
  }
  deleteRecipeById(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }
  /*DATABASE OPERATIONS*/
  saveRecipesToDB() {
    const token = this.authService.getToken();
    return this.http.put('https://recipie-app-4e224.firebaseio.com/recipes.json?auth-modules=' + token, this.recipes);
  }
  fetchRecipesFromDB() {
    this.http.get<Recipe[]>('https://recipie-app-4e224.firebaseio.com/recipes.json')
      .subscribe((recipes) => {
        this.recipes = recipes;
        this.recipesChanged.next(recipes);
      }
    );
  }
}
