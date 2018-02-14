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
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { MessageService } from './message.service';

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
    ProductRemoveComponent
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
  providers: [CategoryService, MessageService, ProductService],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryRemoveComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductRemoveComponent
  ]
})
export class AppModule { }
