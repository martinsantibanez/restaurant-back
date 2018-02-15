import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryProductsComponent } from './categories/category-products/category-products.component';

import { IngredientsComponent } from './ingredients/ingredients.component';

import { ProductsComponent } from './products/products.component';
import { ProductRecipeComponent } from './products/product-recipe/product-recipe.component';


const routes: Routes =[
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:id', component: CategoryProductsComponent },
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