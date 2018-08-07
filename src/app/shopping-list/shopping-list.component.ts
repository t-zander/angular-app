import {Component, OnInit, Output} from '@angular/core';
import { Ingredient } from '../Ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
  onEditItem(ingredientId: number) {
    this.shoppingListService.editingStarted.next(ingredientId);
  }
}
