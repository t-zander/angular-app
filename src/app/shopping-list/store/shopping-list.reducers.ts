import { Ingredient } from "../../Ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface IState {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number;
}

const initialState: IState = {
  ingredients: [
    new Ingredient('apples', '10'),
    new Ingredient('tomatoes', '15')
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

/* What is the action? ADD_INGREDIENT -> ADD IT. USES ACTION PAYLOAD(what was added) */
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients
      }

    case ShoppingListActions.DELETE_INGREDIENT:
      const deleteIngredients = [...state.ingredients];
      deleteIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: deleteIngredients
      }

    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      }

    case ShoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}