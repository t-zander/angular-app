import * as shoppingListActions from './../store/shopping-list.actions';
import * as appReducers from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../Ingredient.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  shoppingListForm: FormGroup;
  name;
  amount;
  subscription: Subscription;
  editMode = false;
  ingredientId: number;
  editedItem;
  constructor(private store: Store<appReducers.IAppState>) { }

  ngOnInit() {
    this.shoppingListForm = new FormGroup(
      {
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required])
      }
    );
    this.name = this.shoppingListForm.get('name');
    this.amount = this.shoppingListForm.get('amount');

    this.subscription = this.store.select('shoppingList')
      .subscribe((item) => {
        
        if(item.editedIngredientIndex > -1) {
          this.editedItem = item.editedIngredient;
          this.shoppingListForm.setValue(
            {name: this.editedItem.name, amount: this.editedItem.amount}
          );
          this.editMode = true;
        }else{
          this.editMode = false;
        }
      })
  }

  onSubmit() {
    const name = this.shoppingListForm.get('name').value;
    const amount = this.shoppingListForm.get('amount').value;

    const ingredient: Ingredient = {
      name: name,
      amount: amount
    };
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.ingredientId, ingredient);
      this.store.dispatch(new shoppingListActions
        .UpdateIngredient({ingredient}))
    } else {
      // this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(new shoppingListActions.AddIngredient(ingredient));
    }
    this.editMode = false;
    this.onResetForm();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
  onResetForm() {
    this.shoppingListForm.reset();
  }
  onDeleteIngredient() {
    // this.shoppingListService.deleteIngredientById(this.ingredientId);
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.editMode = false;
    this.onResetForm();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit())
  }
}