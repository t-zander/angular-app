import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../Ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
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
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListForm = new FormGroup(
      {
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required])
      }
    );
    this.name = this.shoppingListForm.get('name');
    this.amount = this.shoppingListForm.get('amount');

    this.subscription = this.shoppingListService.editingStarted.subscribe(
      (index: number) => {
        this.editMode = true;
        this.ingredientId = index;
        this.editedItem = this.shoppingListService.getIngredientById(index);
        this.shoppingListForm.setValue(
          {name: this.editedItem.name, amount: this.editedItem.amount}
        );
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const name = this.shoppingListForm.get('name').value;
    const amount = this.shoppingListForm.get('amount').value;

    const ingredient: Ingredient = {
      name: name,
      amount: amount
    };
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.ingredientId, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode = false;
    this.onResetForm();
  }
  onResetForm() {
    this.shoppingListForm.reset();
  }
  onDeleteIngredient() {
    this.shoppingListService.deleteIngredientById(this.ingredientId);
    this.editMode = false;
    this.onResetForm();
  }
}
