import * as fromShoppingList from "../shopping-list/store/shopping-list.reducers";
import * as fromAuthentication from "../auth/store/authentication.reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface IAppState {
  shoppingList: fromShoppingList.IState
  authentication: fromAuthentication.IState
};

export const appReducers: ActionReducerMap<IAppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  authentication: fromAuthentication.authReducer
};