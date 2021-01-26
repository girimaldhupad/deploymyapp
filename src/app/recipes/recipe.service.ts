import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';



@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Pizza',
      'A super-tasty Pizza',
      'https://www.foodnetwork.com/recipes/food-network-kitchen/tuscan-chicken-skillet-5421728',
      [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 2)
      ]),

    new Recipe(
      'Big Burger', 
      'What else you need to say?', 
      'https://www.foodnetwork.com/recipes/food-network-kitchen/tuscan-chicken-skillet-5421728',
      [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
      ])
  ];
  
  constructor(private slService: ShoppingListService){}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
   return this.recipes[index]; 
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
