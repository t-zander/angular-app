import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../recipes/recipe.service';
import {Router} from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private recipeService: RecipeService,
              private router: Router,
              private authService: AuthService) { }
  ngOnInit() {
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
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
