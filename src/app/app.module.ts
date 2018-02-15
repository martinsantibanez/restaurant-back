import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { MessagesComponent } from './messages/messages.component';


//Services
import { CategoryService } from './core/category.service';
import { ProductService } from './core/product.service';
import { MessageService } from './core/message.service';
import { IngredientService } from './core/ingredient.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CategoryRemoveComponent } from './categories/category-remove/category-remove.component';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductRemoveComponent } from './products/product-remove/product-remove.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngredientAddComponent } from './ingredients/ingredient-add/ingredient-add.component';
import { IngredientEditComponent } from './ingredients/ingredient-edit/ingredient-edit.component';
import { IngredientRemoveComponent } from './ingredients/ingredient-remove/ingredient-remove.component';
import { ProductRecipeComponent } from './products/product-recipe/product-recipe.component';
import { RecipeAddIngredientComponent } from './products/product-recipe/recipe-add-ingredient/recipe-add-ingredient.component';
import { RecipeEditIngredientComponent } from './products/product-recipe/recipe-edit-ingredient/recipe-edit-ingredient.component';
import { RecipeRemoveIngredientComponent } from './products/product-recipe/recipe-remove-ingredient/recipe-remove-ingredient.component';
import { CategoryProductsComponent } from './categories/category-products/category-products.component';
import { CategoryRemoveProductComponent } from './categories/category-products/category-remove-product/category-remove-product.component';
import { CategoryAddProductComponent } from './categories/category-products/category-add-product/category-add-product.component';



@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    CategoriesComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryRemoveComponent,
    ProductsComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductRemoveComponent,
    IngredientsComponent,
    IngredientAddComponent,
    IngredientEditComponent,
    IngredientRemoveComponent,
    ProductRecipeComponent,
    RecipeAddIngredientComponent,
    RecipeEditIngredientComponent,
    RecipeRemoveIngredientComponent,
    CategoryProductsComponent,
    CategoryRemoveProductComponent,
    CategoryAddProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    DataTablesModule
  ],
  providers: [CategoryService, MessageService, ProductService, IngredientService],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryRemoveComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductRemoveComponent,
    IngredientAddComponent,
    IngredientEditComponent,
    IngredientRemoveComponent,
    RecipeAddIngredientComponent,
    RecipeEditIngredientComponent,
    RecipeRemoveIngredientComponent,
    CategoryRemoveProductComponent,
    CategoryAddProductComponent
  ]
})
export class AppModule { }
