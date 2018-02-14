import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

import { ProductRecipeComponent } from './products/product-recipe/product-recipe.component';

const routes: Routes =[
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductRecipeComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }