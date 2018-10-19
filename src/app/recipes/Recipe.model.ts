import {Ingredient} from '../Ingredient.model';

export class Recipe {
  constructor(
    public name: string, public description: string,
    public imgURL: string, public ingredients: Ingredient[]
  ) {}
}
