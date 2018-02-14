import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
const routes: Routes =[
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent },
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