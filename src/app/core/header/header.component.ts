import { AuthService } from './../../auth/auth.service';
import * as FromApp from '../../store/app.reducers';
import * as AuthenticationReducers from '../../auth/store/authentication.reducers';
import * as AuthenticationActions from './../../auth/store/authentication.actions';

import { Store } from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../recipes/recipe.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authenticationState: Observable<AuthenticationReducers.IState>;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private store: Store<FromApp.IAppState>,
              private authService: AuthService) { }

  ngOnInit() {
    this.authenticationState = this.store.select('authentication');
  }

  onSaveRecipes() {
    this.recipeService.saveRecipesToDB()
      .subscribe(
        (data) => console.log(data)
    );
  }
  onFetchRecipes() {
    this.recipeService.fetchRecipesFromDB();
    this.router.navigate(['/recipes']);
  }
  onLogout() {
    this.authService.logoutUser();
  }

  /* isAuthenticated() {
    return this.authService.isAuthenticated();
  } */
}
