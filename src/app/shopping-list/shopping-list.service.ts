import {EventEmitter, Injectable, Output} from '@angular/core';
import {Ingredient} from '../Ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [];
  editingStarted = new Subject<number>();
  constructor() { }

  getIngredients() {
    return this.ingredients;
  }
  getIngredientById(ingredientId: number) {
    return this.ingredients[ingredientId];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
  }
  addIngredients(ingredients: Ingredient[]) {
   this.ingredients.push(...ingredients);
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
  }
  deleteIngredientById(ingredientId: number) {
    this.ingredients.splice(ingredientId, 1);
  }
}
