import { Ingredient } from './../Ingredient.model';
import {Component, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as shoppingListActions from './store/shopping-list.actions';
import * as AppReducers from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  constructor(private store: Store<AppReducers.IAppState>) { }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListState = this.store.select('shoppingList');
  }
  onEditItem(ingredientId: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(ingredientId))
  }
}
