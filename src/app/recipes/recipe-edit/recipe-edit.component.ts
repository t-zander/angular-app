import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLinkActive} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../Recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode = false;
  editRecipeForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.recipeId = +params.id;
          this.editMode = params.id != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    let recipeName = '';
    let imageURL = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.recipeId);
      recipeName = recipe.name;
      imageURL = recipe.imgURL;
      description = recipe.description;

      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.required)
            })
          );
        }
      }
    }

    this.editRecipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imageURL': new FormControl(imageURL, Validators.required),
        'description': new FormControl(description, Validators.required),
        'ingredients': ingredients
      }
    );
    // this.editRecipeForm.get('ingredients');
  }
  getControls() {
    return (<FormArray>this.editRecipeForm.get('ingredients'));
  }
  onAddIngredient() {
    const controls = this.getControls();
    controls.push(
      new FormGroup(
        {
          'name' : new FormControl(null, Validators.required),
          'amount' : new FormControl(null, Validators.required)
        }
      )
    );
  }
  onDeleteIngredient(index) {
    const controls = this.getControls();
    controls.removeAt(index);
  }

  onSubmit() {
    const recipe = new Recipe(
      this.editRecipeForm.get('name').value,
      this.editRecipeForm.get('description').value,
      this.editRecipeForm.get('imageURL').value,
      this.editRecipeForm.get('ingredients').value
    );
    if (this.editMode) {
      this.recipeService.updateRecipeById(this.recipeId, recipe);
      this.router.navigate(['recipes']);
    } else {
      this.recipeService.addRecipe(recipe);
      this.router.navigate(['recipes']);
    }

  }
  onCancel() {
    this.router.navigate(['recipes']);
  }
}
